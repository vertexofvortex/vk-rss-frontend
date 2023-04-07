import { Accordion, Stack, Text } from "@mantine/core";
import { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { IGroup, IPost, ISource } from "../../models";

export function FeedsGroups() {
    const { data } = useLoaderData() as AxiosResponse<IGroup[]>;

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <Stack>
            {data.map((group) => (
                <div key={group.id}>{group.vk_id}</div>
            ))}
        </Stack>
    );
}
