import {
  ActionIcon,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Text,
} from "@mantine/core";
import {
  IconCalendarEvent,
  IconCategory,
  IconExternalLink,
  IconTrash,
} from "@tabler/icons-react";
import { memo } from "react";
import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addPost, removePost } from "../../features/postsCart/postsCartSlice";
import { IPostInCart } from "../../models/Post";

export const PostCard = memo((post: IPostInCart) => {
  const postsCart = useAppSelector((state) => state.postsCart.posts);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const submit = useSubmit();
  const actionData = useActionData();

  // function submitPostBlock() {
  //   console.log("submit");

  //   submit(null, {
  //     action: `${post.id}/block`,
  //     method: "POST",
  //     relative: "route",
  //   });
  // }

  // useEffect(() => {
  //   console.log(actionData);
  // }, [actionData]);

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Card.Section>
        {post.image_url && (
          <Image
            src={post.image_url}
            height={160}
            imageProps={{ loading: "lazy" }}
            placeholder={<div>bruh</div>}
          />
        )}
      </Card.Section>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={600}>{post.title}</Text>
      </Group>
      <Text
        size="sm"
        color="dimmed"
        style={{
          flexGrow: "1",
        }}
        mb={"md"}
      >
        {post.description}
      </Text>
      <Text size={"xs"} color={"blue"} mb={"md"}>
        <Group>
          <Flex gap={"5px"}>
            <IconCalendarEvent size={"1rem"} />
            {new Date(post.publish_date * 1000).toLocaleString("ru-RU", {
              dateStyle: "short",
            })}
            {`, `}
            {new Date(post.publish_date * 1000).toLocaleTimeString("ru-RU", {
              timeStyle: "short",
            })}
          </Flex>
          <Flex gap={"5px"}>
            <IconCategory size={"1rem"} />
            {post.categories}
          </Flex>
        </Group>
      </Text>
      <Flex gap={"md"} align={"center"} wrap={"wrap"}>
        {!post.blacklisted ? (
          <>
            {!(post.id in postsCart) ? (
              <Button
                variant="light"
                color="blue"
                radius="md"
                style={{
                  flexGrow: "1",
                }}
                onClick={() => dispatch(addPost(post))}
              >
                Добавить в очередь
              </Button>
            ) : (
              <Button
                variant="light"
                color="red"
                radius="md"
                style={{
                  flexGrow: "1",
                }}
                onClick={() => dispatch(removePost(post))}
              >
                Удалить из очереди
              </Button>
            )}
          </>
        ) : (
          <Form
            method={"POST"}
            action={`${post.id}/unblock`}
            relative={"route"}
            style={{
              flexGrow: "1",
            }}
          >
            <Button
              variant="light"
              color="blue"
              radius="md"
              type={"submit"}
              fullWidth
            >
              Восстановить
            </Button>
          </Form>
        )}
        <Link to={post.post_url} target={"_blank"}>
          <ActionIcon
            h={"2.25rem"}
            w={"2.25rem"}
            radius={"md"}
            color={"blue"}
            variant={"light"}
          >
            <IconExternalLink size={"1rem"} />
          </ActionIcon>
        </Link>
        {!post.blacklisted && (
          <Form method={"POST"} action={`${post.id}/block`} relative={"route"}>
            <ActionIcon
              h={"2.25rem"}
              w={"2.25rem"}
              radius={"md"}
              color={"red"}
              variant={"light"}
              type={"submit"}
            >
              <IconTrash size={"1rem"} />
            </ActionIcon>
          </Form>
        )}
      </Flex>
    </Card>
  );
});
