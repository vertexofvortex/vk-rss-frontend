import { ActionIcon, Alert, Flex, Group, Table, Text } from "@mantine/core";
import { IconAlertCircle, IconTrash } from "@tabler/icons-react";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PostEditForm } from "../../components";
import { removePost } from "../../features/postsCart/postsCartSlice";
import { IGroup } from "../../models";
import { IPostInCart } from "../../models/Post";

export function Publish() {
  const postsCart = useAppSelector((state) => state.postsCart);
  const dispatch = useAppDispatch();
  const groups = (useLoaderData() as AxiosResponse<IGroup[]>).data;
  const [currentPost, setCurrentPost] = useState<IPostInCart>(
    Object.values(postsCart.posts)[0]
  );

  return (
    <>
      {Object.keys(postsCart.posts).length > 0 ? (
        <>
          <PostEditForm post={currentPost} groups={groups} />
          <Group
            p={"xl"}
            style={{
              margin: "-1.5rem",
              marginTop: "0px",
              backgroundColor: "#f8f9fa",
            }}
          >
            <Text>Очередь постов</Text>
            <Table striped>
              <thead>
                <tr>
                  <th>Заголовок</th>
                  <th>Группа</th>
                  <th align={"right"} style={{ textAlign: "right" }}>
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.values(postsCart.posts).map((post) => (
                  <tr
                    key={post.id}
                    style={{
                      background: post.id == currentPost?.id ? "#0000001b" : "",
                      cursor: "pointer",
                    }}
                    onClick={() => setCurrentPost(post)}
                  >
                    <td>{post.title}</td>
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
                        onClick={() => {
                          dispatch(removePost(post));
                          // if (currentPost?.id == post.id) {
                          //     setCurrentPost(undefined);
                          // }
                        }}
                      >
                        <IconTrash size={"1rem"} />
                      </ActionIcon>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
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
