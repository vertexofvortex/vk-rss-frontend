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
} from "@mantine/core";
import { IGroupWithPosts } from "../../models/Group";
import { memo, useState } from "react";
import { PostCard } from "../PostCard/PostCard";

export const GroupFeed = memo((group: IGroupWithPosts) => {
    const [activePage, setActivePage] = useState<number>(1);
    const [activeCategory, setActiveCategory] = useState<string>();
    const [categories, setCategories] = useState<Set<string>>();

    function parseCategories(): Set<string> {
        return new Set(group.posts.map((post) => post.categories));
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
                            <b>{group.name}</b>
                        </Text>
                        <Text size={"xs"} opacity={0.5}>
                            #{group.vk_id}
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
                                            mr={"xs"}
                                        >
                                            Все
                                        </Badge>
                                    </UnstyledButton>
                                    {[...parseCategories()].map((category) => (
                                        <UnstyledButton
                                            onClick={() =>
                                                setActiveCategory(category)
                                            }
                                            key={category}
                                        >
                                            <Badge
                                                variant={
                                                    category == activeCategory
                                                        ? "filled"
                                                        : "outline"
                                                }
                                                style={{
                                                    width: "fit-content",
                                                }}
                                                mr={"xs"}
                                            >
                                                {category}
                                            </Badge>
                                        </UnstyledButton>
                                    ))}
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
                                        <PostCard {...post} />
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
                        К этой группе не привязан ни один источник.
                    </Alert>
                </Accordion.Panel>
            )}
        </Accordion.Item>
    );
});
