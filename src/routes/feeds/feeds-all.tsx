import { Accordion, Badge, Flex, Grid, Pagination, UnstyledButton } from "@mantine/core";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { PostCard } from "../../components";
import { IPost } from "../../models/Post";

export function FeedsAll() {
    const { data } = useLoaderData() as AxiosResponse<IPost[]>;
    const [activePage, setActivePage] = useState<number>(1);
    const [activeCategory, setActiveCategory] = useState<string>();

    function parseCategories(): Set<string> {
        return new Set(data.map((post) => post.categories).filter((category) => category != null));
    }

    return (
        <>
            <Accordion variant={"contained"} mb={"md"}>
                <Accordion.Item value={"categories"}>
                    <Accordion.Control>Категории</Accordion.Control>
                    <Accordion.Panel>
                        <Flex wrap={"wrap"} gap={3}>
                            <UnstyledButton onClick={() => setActiveCategory(undefined)}>
                                <Badge
                                    variant={!activeCategory ? "filled" : "outline"}
                                    style={{
                                        width: "fit-content",
                                    }}
                                    mr={0}
                                >
                                    Все
                                </Badge>
                            </UnstyledButton>
                            {[...parseCategories()].map((category) => (
                                <UnstyledButton onClick={() => setActiveCategory(category)} key={category}>
                                    <Badge
                                        variant={category == activeCategory ? "filled" : "outline"}
                                        style={{
                                            width: "fit-content",
                                        }}
                                        mr={0}
                                    >
                                        {category}
                                    </Badge>
                                </UnstyledButton>
                            ))}
                        </Flex>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
            <Pagination
                value={activePage}
                onChange={setActivePage}
                total={
                    Math.floor(
                        data.filter((value) => (activeCategory ? value.categories == activeCategory : value)).length /
                            36
                    ) + 1
                }
                mb={"md"}
                grow
            />
            <Grid>
                {data
                    .filter((value) => (activeCategory ? value.categories == activeCategory : value))
                    .slice((activePage - 1) * 36, activePage * 36)
                    .map((item) => (
                        <Grid.Col key={item.id} span={4}>
                            <PostCard {...item} />
                        </Grid.Col>
                    ))}
            </Grid>
            <Pagination
                value={activePage}
                onChange={setActivePage}
                total={
                    Math.floor(
                        data.filter((value) => (activeCategory ? value.categories == activeCategory : value)).length /
                            36
                    ) + 1
                }
                mb={"md"}
                grow
            />
        </>
    );
}
