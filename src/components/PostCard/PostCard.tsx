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
import { IPost } from "../../models/Post";

export function PostCard(props: IPost) {
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
                <Image
                    src={props.image_url ? props.image_url : undefined}
                    height={160}
                    imageProps={{ loading: "lazy" }}
                    placeholder={<div>bruh</div>}
                />
            </Card.Section>
            <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{props.title}</Text>
            </Group>
            <Text
                size="sm"
                color="dimmed"
                style={{
                    flexGrow: "1",
                }}
            >
                {props.description}
            </Text>
            <Space p={"xs"} />
            <Badge
                variant={"dot"}
                style={{
                    width: "fit-content",
                }}
            >
                {props.categories}
            </Badge>
            {/* <Flex gap={"xs"}>
        {!postsCart.includes(props) ? (
          <Button
            variant="light"
            color="blue"
            mt="md"
            radius="md"
            style={{
              flexGrow: "1",
            }}
            onClick={() => dispatch(add_post(props))}
          >
            Добавить в очередь постинга
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
            onClick={() => dispatch(remove_post(props))}
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
          href={props.url}
          target={"_blank"}
        >
          <IconExternalLink size={20} />
        </Button>
      </Flex> */}
        </Card>
    );
}
