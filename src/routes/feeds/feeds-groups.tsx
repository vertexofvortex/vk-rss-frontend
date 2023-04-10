import {
    Accordion,
    Alert,
    Avatar,
    Flex,
    Grid,
    Group,
    Pagination,
    Stack,
    Text,
} from "@mantine/core";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { IGroup, IPost, ISource } from "../../models";
import { IGroupWithPosts } from "../../models/Group";
import { getGroupSources } from "../../network/sources";
import { getPostsBySourceId } from "../../network/posts";
import { GroupFeed, PostCard } from "../../components";
import { getGroupPosts } from "../../network/groups";

export function FeedsGroups() {
    const { data } = useLoaderData() as AxiosResponse<IGroupWithPosts[]>;
    const [groups, setGroups] = useState<IGroupWithPosts[]>();

    return (
        <Stack>
            <Accordion
                radius={"md"}
                chevronPosition={"right"}
                variant={"contained"}
            >
                {data?.map((group) => (
                    <GroupFeed {...group} />
                ))}
            </Accordion>
        </Stack>
    );
}
