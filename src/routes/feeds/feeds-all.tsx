import { Grid, Pagination, Space } from "@mantine/core";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { PostCard } from "../../components";
import { IPost } from "../../models/Post";

export function FeedsAll() {
    const { data } = useLoaderData() as AxiosResponse<IPost[]>;
    const [activePage, setActivePage] = useState<number>(1);

    return (
        <>
            <Pagination
                value={activePage}
                onChange={setActivePage}
                total={Math.floor(data.length / 36) + 1}
                mb={"md"}
                grow
            />
            <Grid>
                {data
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
                total={Math.floor(data.length / 36) + 1}
                mt={"md"}
                grow
            />
        </>
    );
}
