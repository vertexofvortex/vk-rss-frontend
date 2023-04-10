import {
    Card,
    Grid,
    Group,
    Avatar,
    Text,
    Stack,
    UnstyledButton,
    Button,
    ActionIcon,
    Flex,
    Modal,
    LoadingOverlay,
    MultiSelect,
    InputBase,
    TextInput,
    PasswordInput,
    SelectItem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconSettings } from "@tabler/icons-react";
import { AxiosResponse } from "axios";
import { forwardRef, useEffect, useState } from "react";
import { useFetcher, useLoaderData } from "react-router-dom";
import { AddGroupsModal, GroupActions } from "../../components";
import { IGroup, IKey } from "../../models";
import { getVKGroups } from "../../network/groups";
import { getKeys } from "../../network/keys";

export function Groups() {
    const { data } = useLoaderData() as AxiosResponse<IGroup[]>;
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Grid>
                {data.map((group) => (
                    <Grid.Col key={group.id} span={4}>
                        <Card shadow="sm" padding="xs" radius="md" withBorder>
                            <Flex justify={"space-between"} align={"center"}>
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
                                <GroupActions {...group} />
                            </Flex>
                        </Card>
                    </Grid.Col>
                ))}
                <Grid.Col span={4}>
                    <Button
                        fullWidth
                        variant={"light"}
                        style={{ height: "100%" }}
                        radius={"md"}
                        leftIcon={<IconPlus size={"1rem"} />}
                        onClick={() => open()}
                    >
                        Добавить группу
                    </Button>
                </Grid.Col>
            </Grid>
            <AddGroupsModal
                opened={opened}
                onClose={close}
                title="Добавление группы"
                centered
            />
        </>
    );
}
