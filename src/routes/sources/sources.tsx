import {
    ActionIcon,
    Button,
    Container,
    Group,
    Menu,
    Table,
} from "@mantine/core";
import {
    IconAdjustments,
    IconEdit,
    IconPlus,
    IconTrash,
} from "@tabler/icons-react";
import { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { AddSourceModal, SourceActions } from "../../components";
import { ISource } from "../../models";
import { useDisclosure } from "@mantine/hooks";

export function Sources() {
    const { data } = useLoaderData() as AxiosResponse<ISource[]>;
    const [sourcesModalOpened, sourcesModalActions] = useDisclosure(false);

    return (
        <>
            <Group mb={"xs"}>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Название</th>
                            <th>Ссылка на RSS</th>
                            <th>Описание</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>
                                    <a href={item.rss_url} target="_blank">
                                        {item.rss_url}
                                    </a>
                                </td>
                                <td>{item.description}</td>
                                <td
                                    style={{
                                        display: "flex",
                                        justifyContent: "right",
                                    }}
                                >
                                    <SourceActions {...item} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Group>
            <Group>
                <Container>
                    <Button
                        onClick={sourcesModalActions.open}
                        variant={"light"}
                        leftIcon={<IconPlus size={"1rem"} />}
                    >
                        Добавить новый источник новостей
                    </Button>
                </Container>
                <AddSourceModal
                    opened={sourcesModalOpened}
                    onClose={sourcesModalActions.close}
                    centered
                    actionType={"create"}
                />
            </Group>
        </>
    );
}
