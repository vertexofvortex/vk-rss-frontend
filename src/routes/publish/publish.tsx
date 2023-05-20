import { ActionIcon, Alert, Flex, Group, Table, Text } from "@mantine/core";
import {
  IconAlertCircle,
  IconCheck,
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
import { IPost, IPostInCart } from "../../models/Post";
import { getSourceByPostId } from "../../network/posts";

export function Publish() {
  const postsCart = useAppSelector((state) => state.postsCart);
  const dispatch = useAppDispatch();
  const groups = (useLoaderData() as AxiosResponse<IGroup[]>).data;
  const [currentPost, setCurrentPost] = useState<IPostInCart | null>(
    Object.values(postsCart.posts)[0]
  );
  const [postSource, setPostSource] = useState<ISource>();

  // FIXME: buggy, there is no switch to another post when 0st deleted

  function handlePostRemoval(post: IPost): void {
    if (currentPost?.id == post.id) {
      setCurrentPost(Object.values(postsCart.posts)[0]);
    }

    dispatch(removePost(post));
  }

  useEffect(() => {
    if (!currentPost) return;

    getSourceByPostId(currentPost?.id)
      .then(({ data }) => setPostSource(data))
      .catch((err) => console.log(err));
  }, [currentPost]);

  return (
    <>
      {Object.keys(postsCart.posts).length > 0 ? (
        <>
          {currentPost ? (
            <PostEditForm
              post={currentPost}
              postSource={postSource}
              groups={groups}
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
            <Text>Очередь постов</Text>
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
                  {Object.values(postsCart.posts).map((post) => (
                    <tr
                      key={post.id}
                      style={{
                        background:
                          post.id == currentPost?.id ? "#0000001b" : "",
                      }}
                    >
                      <td>
                        <ActionIcon
                          variant={"light"}
                          onClick={() => setCurrentPost(post)}
                        >
                          <IconEdit size={"1rem"} />
                        </ActionIcon>
                      </td>
                      <td
                        style={{
                          fontWeight:
                            post.id == currentPost?.id ? "bold" : "unset",
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
                          onClick={() => handlePostRemoval(post)}
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
