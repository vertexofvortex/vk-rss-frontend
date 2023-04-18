import {
  Badge,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Space,
  Text,
} from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import { memo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addPost, removePost } from "../../features/postsCart/postsCartSlice";
import { IPostInCart } from "../../models/Post";

export const PostCard = memo((post: IPostInCart) => {
  const postsCart = useAppSelector((state) => state.postsCart.posts);
  const dispatch = useAppDispatch();

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
        <Text weight={500}>{post.title}</Text>
      </Group>
      <Text
        size="sm"
        color="dimmed"
        style={{
          flexGrow: "1",
        }}
      >
        {post.description}
      </Text>
      <Space p={"xs"} />
      <Badge
        variant={"dot"}
        style={{
          width: "fit-content",
        }}
      >
        {post.categories}
      </Badge>
      <Flex gap={"md"}>
        {!(post.id in postsCart) ? (
          <Button
            variant="light"
            color="blue"
            mt="md"
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
            mt="md"
            radius="md"
            style={{
              flexGrow: "1",
            }}
            onClick={() => dispatch(removePost(post))}
          >
            Удалить из очереди
          </Button>
        )}
        <Button
          variant="light"
          color="blue"
          mt="md"
          radius="md"
          component="a"
          href={post.post_url}
          target={"_blank"}
        >
          <IconExternalLink size={20} />
        </Button>
      </Flex>
    </Card>
  );
});
