import {
    Accordion,
    Alert,
    Avatar,
    Badge,
    Grid,
    Group,
    Pagination,
    Text,
    UnstyledButton,
    Indicator,
    Flex,
} from "@mantine/core";
import { IGroupWithPosts } from "../../models/Group";
import { memo, useEffect, useState } from "react";
import { PostCard } from "../PostCard/PostCard";

export const GroupFeed = memo((group: IGroupWithPosts) => {
    const [activePage, setActivePage] = useState<number>(1);
    const [activeCategory, setActiveCategory] = useState<string>();

    function parseCategories(): Set<string> {
        return new Set(
            group.posts
                .map((post) => post.categories)
                .filter((category) => category != null)
        );
    }

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
                        <Accordion variant={"contained"} mb={"md"}>
                            <Accordion.Item value={"categories"}>
                                <Accordion.Control>Категории</Accordion.Control>
                                <Accordion.Panel>
                                    <Flex wrap={"wrap"} gap={3}>
                                        <UnstyledButton
                                            onClick={() =>
                                                setActiveCategory(undefined)
                                            }
                                        >
                                            <Badge
                                                variant={
                                                    !activeCategory
                                                        ? "filled"
                                                        : "outline"
                                                }
                                                style={{
                                                    width: "fit-content",
                                                }}
                                                mr={0}
                                            >
                                                Все
                                            </Badge>
                                        </UnstyledButton>
                                        {[...parseCategories()].map(
                                            (category) => (
                                                <UnstyledButton
                                                    onClick={() =>
                                                        setActiveCategory(
                                                            category
                                                        )
                                                    }
                                                    key={category}
                                                >
                                                    <Badge
                                                        variant={
                                                            category ==
                                                            activeCategory
                                                                ? "filled"
                                                                : "outline"
                                                        }
                                                        style={{
                                                            width: "fit-content",
                                                        }}
                                                        mr={0}
                                                    >
                                                        {category}
                                                    </Badge>
                                                </UnstyledButton>
                                            )
                                        )}
                                    </Flex>
                                </Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
                        <Pagination
                            value={activePage}
                            onChange={setActivePage}
                            total={
                                Math.floor(
                                    group.posts.filter((value) =>
                                        activeCategory
                                            ? value.categories == activeCategory
                                            : value
                                    ).length / 21
                                ) + 1
                            }
                            mb={"md"}
                            grow
                        />
                        <Grid>
                            {group.posts
                                .filter((value) =>
                                    activeCategory
                                        ? value.categories == activeCategory
                                        : value
                                )
                                .slice((activePage - 1) * 21, activePage * 21)
                                .map((post) => (
                                    <Grid.Col key={post.id} span={4}>
                                        <PostCard {...post} for_group={group} />
                                    </Grid.Col>
                                ))}
                        </Grid>
                        <Pagination
                            value={activePage}
                            onChange={setActivePage}
                            total={
                                Math.floor(
                                    group.posts.filter((value) =>
                                        activeCategory
                                            ? value.categories == activeCategory
                                            : value
                                    ).length / 21
                                ) + 1
                            }
                            mt={"md"}
                            grow
                        />
                    </Accordion.Panel>
                </>
            )}
            {group.posts.length == 0 && (
                <Accordion.Panel>
                    <Alert color={"yellow"}>
                        К этой группе не привязан ни один источник. Перейдите в
                        раздел "Подключенные группы", нажмите на шестерёнку и
                        выберите пункт "Настроить источники"
                    </Alert>
                </Accordion.Panel>
            )}
        </Accordion.Item>
    );
});
