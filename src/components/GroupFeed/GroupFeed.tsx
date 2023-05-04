import {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Flex,
  Grid,
  Group,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { memo, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { IGroupWithPosts } from "../../models/Group";
import { filterPosts, paginatePosts } from "../../reusables";
import FeedCategoriesBlock from "../FeedCategoriesBlock/FeedCategoriesBlock";
import PaginationBlock from "../PaginationBlock/PaginationBlock";
import { PostCard } from "../PostCard/PostCard";

export const GroupFeed = memo((group: IGroupWithPosts) => {
  const [activePage, setActivePage] = useState<number>(1);
  const [activeCategory, setActiveCategory] = useState<string>();
  const mobileWidth = useMediaQuery("(max-width: 851px)");
  const postsCart = useAppSelector((state) => state.postsCart.posts);

  return (
    <Accordion.Item value={group.name} key={group.id}>
      <Accordion.Control>
        <Group>
          <Avatar src={group.photo_url}>
            {group.name.slice(0, 2).toUpperCase()}
          </Avatar>
          <div>
            <Text lh={"1em"}>
              <Flex align={"center"}>
                <b>{group.name}</b>
                <Badge
                  size="xs"
                  variant="light"
                  color="red"
                  w={"auto"}
                  miw={20}
                  h={20}
                  ml={10}
                  p={0}
                  pr={5}
                  pl={5}
                >
                  {group.posts.length}
                </Badge>
              </Flex>
            </Text>
            <Text size={"xs"} opacity={0.5}>
              @{group.vk_id}
            </Text>
          </div>
        </Group>
      </Accordion.Control>
      {group.posts.length > 0 && (
        <>
          <Accordion.Panel>
            <FeedCategoriesBlock
              data={group.posts}
              actions={[activeCategory, setActiveCategory]}
            />
            <PaginationBlock
              itemsTotal={filterPosts(group.posts, activeCategory).length}
              pageLength={36}
              actions={[activePage, setActivePage]}
              mb={"md"}
              grow
            />
            <Grid mb={"xs"}>
              {paginatePosts(
                filterPosts(group.posts, activeCategory),
                activePage
              ).map((post) => (
                <Grid.Col key={post.id} span={mobileWidth ? 12 : 4}>
                  <PostCard
                    {...post}
                    for_group={group}
                    isInCart={post.id in postsCart}
                  />
                </Grid.Col>
              ))}
            </Grid>
            <PaginationBlock
              itemsTotal={filterPosts(group.posts, activeCategory).length}
              pageLength={36}
              actions={[activePage, setActivePage]}
              mb={"md"}
              grow
            />
          </Accordion.Panel>
        </>
      )}
      {group.posts.length == 0 && (
        <Accordion.Panel>
          <Alert color={"yellow"}>
            К этой группе не привязан ни один источник. Перейдите в раздел
            "Подключенные группы", нажмите на шестерёнку и выберите пункт
            "Настроить источники"
          </Alert>
        </Accordion.Panel>
      )}
    </Accordion.Item>
  );
});
