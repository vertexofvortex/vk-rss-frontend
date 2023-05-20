import { ActionIcon, Alert, Flex, Group, Table, Text } from "@mantine/core";
import {
  IconAlertCircle,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconEdit,
  IconPhoto,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PostEditForm } from "../../components";
import { removePost } from "../../features/postsCart/postsCartSlice";
import { IGroup, ISource } from "../../models";
import { getSourceByPostId } from "../../network/posts";

export function Publish() {
  const postsCart = useAppSelector((state) => state.postsCart);
  const dispatch = useAppDispatch();
  const groups = (useLoaderData() as AxiosResponse<IGroup[]>).data;

  const [posts, setPosts] = useState(Object.values(postsCart.posts));
  const [currentPostIndex, setCurrentPostIndex] = useState<number>();
  const [postSource, setPostSource] = useState<ISource>();

  useEffect(() => {
    setPosts(Object.values(postsCart.posts));
  }, [postsCart.posts]);

  function handleNextPost() {
    if (currentPostIndex === undefined) return;
    if (currentPostIndex >= posts.length - 1) return;

    setCurrentPostIndex(currentPostIndex + 1);
  }

  function handlePrevPost() {
    if (currentPostIndex === undefined) return;
    if (currentPostIndex <= 0) return;

    setCurrentPostIndex(currentPostIndex - 1);
  }

  function handleChangePostOnDeletion() {
    if (posts.length <= 1) return;

    if (currentPostIndex === 0) {
      handleNextPost();
    }
    if (currentPostIndex === posts.length - 1) {
      handlePrevPost();
    }
  }

  function handlePostDeletion(postIndex: number) {
    dispatch(removePost(posts[postIndex]));

    if (currentPostIndex === undefined) return;
    if (posts.length === 0) setCurrentPostIndex(undefined);

    setCurrentPostIndex(0);
  }

  function handleCurrentPostDeletion() {
    if (currentPostIndex === undefined) return;

    //handleChangePostOnDeletion();
    handlePostDeletion(currentPostIndex);
  }

  useEffect(() => {
    if (currentPostIndex === undefined) return;
    if (posts.length === 0) return;

    getSourceByPostId(posts[currentPostIndex].id)
      .then(({ data }) => setPostSource(data))
      .catch((err) => console.log(err));
  }, [posts, currentPostIndex]);

  return (
    <>
      {posts.length > 0 ? (
        <>
          {currentPostIndex !== undefined && postSource !== undefined ? (
            <PostEditForm
              post={posts[currentPostIndex]}
              postSource={postSource}
              groups={groups}
              handleCurrentPostDeletion={handleCurrentPostDeletion}
              handleNextPost={handleNextPost}
            />
          ) : (
            <Alert>Выберите пост</Alert>
          )}
          <Group
            p={"xl"}
            style={{
              margin: "-1.5rem",
              marginTop: "0px",
              backgroundColor: "#f8f9fa",
            }}
          >
            <Flex justify={"space-between"} w={"100%"}>
              <Text>Очередь постов</Text>
              <Group>
                <ActionIcon
                  disabled={currentPostIndex === 0}
                  onClick={handlePrevPost}
                >
                  <IconChevronLeft size={"1rem"} />
                </ActionIcon>
                <ActionIcon
                  disabled={currentPostIndex === posts.length - 1}
                  onClick={handleNextPost}
                >
                  <IconChevronRight size={"1rem"} />
                </ActionIcon>
              </Group>
            </Flex>
            <div
              style={{
                width: "100%",
                overflowX: "scroll",
              }}
            >
              <Table striped>
                <thead>
                  <tr>
                    <th></th>
                    <th>Новость</th>
                    <th>
                      <IconPhoto size={"1rem"} />
                    </th>
                    <th>Группа</th>
                    <th align={"right"} style={{ textAlign: "right" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, index) => (
                    <tr
                      key={post.id}
                      style={{
                        background:
                          index == currentPostIndex ? "#0000001b" : "",
                      }}
                    >
                      <td>
                        <ActionIcon
                          variant={"light"}
                          onClick={() => setCurrentPostIndex(index)}
                        >
                          <IconEdit size={"1rem"} />
                        </ActionIcon>
                      </td>
                      <td
                        style={{
                          fontWeight:
                            index == currentPostIndex ? "bold" : "unset",
                        }}
                      >
                        {post.title}
                      </td>
                      <td>
                        {post.image_url ? (
                          <IconCheck size={"1rem"} color={"green"} />
                        ) : (
                          <IconX size={"1rem"} color={"tomato"} />
                        )}
                      </td>
                      <td>
                        {post.for_group ? (
                          <Flex align={"center"} gap={"sm"}>
                            <img
                              src={post.for_group?.photo_url}
                              style={{
                                width: "25px",
                                borderRadius: "25px",
                              }}
                            />
                            {post.for_group?.name}
                          </Flex>
                        ) : (
                          <div>Из общей ленты</div>
                        )}
                      </td>
                      <td align={"right"}>
                        <ActionIcon
                          color={"red"}
                          onClick={() => handlePostDeletion(index)}
                        >
                          <IconTrash size={"1rem"} />
                        </ActionIcon>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Group>
        </>
      ) : (
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          color={"blue"}
          w={"100%"}
          mb={"xs"}
        >
          Вы ещё не добавили ни одной новости в список публикации.
        </Alert>
      )}
    </>
  );
}

export default Publish;
