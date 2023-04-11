import {
    Button,
    Group,
    LoadingOverlay,
    Modal,
    ModalProps,
    TransferList,
    TransferListData,
    TransferListItem,
    Notification,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { IGroup, ISource } from "../../models";
import { getGroupSources, getSources } from "../../network/sources";
import {
    attachSourcesToGroup,
    detachSourceFromGroup,
} from "../../network/groups";
import { notifications } from "@mantine/notifications";

interface Props extends ModalProps {
    group: IGroup;
}

export function GroupsSourcesModal({ group, ...props }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sources, setSources] = useState<ISource[]>([]);
    const [groupSources, setGroupSources] = useState<ISource[]>([]);
    const [transferLists, setTransferLists] = useState<TransferListData>([
        [],
        [],
    ]);

    useEffect(() => {
        getSources().then((res) => setSources(res.data));
    }, []);

    useEffect(() => {
        getGroupSources(group.id).then((res) =>
            setGroupSources(copySources(res.data, sources))
        );
    }, [sources]);

    useEffect(() => {
        setTransferLists([
            sources
                .filter((source) => !groupSources.includes(source))
                .map((source) => adaptSource(source)),
            groupSources.map((source) => adaptSource(source)),
        ]);
    }, [groupSources]);

    function copySources(
        groupSources: ISource[],
        allSources: ISource[]
    ): ISource[] {
        let copiedSources: ISource[] = [];

        for (let i = 0; i < groupSources.length; i++) {
            let copiedSource = allSources.find(
                (source) => source.id === groupSources[i].id
            );

            if (copiedSource) copiedSources.push(copiedSource);
        }

        return copiedSources;
    }

    function adaptSource(source: ISource): TransferListItem {
        return {
            value: source.id.toString(),
            label: source.title,
        };
    }

    function submitSources() {
        setIsLoading(true);
        let taskList = [];

        taskList.push(
            attachSourcesToGroup(
                transferLists[1].map((item) => ({
                    group_id: group.id,
                    source_id: parseInt(item.value),
                }))
            )
        );

        transferLists[0].map((item) =>
            taskList.push(detachSourceFromGroup(group.id, parseInt(item.value)))
        );

        Promise.all(taskList).finally(() => {
            setIsLoading(false);
            let sourcesNames = transferLists[1].map((item) => item.label);

            sourcesNames.length > 1 &&
                notifications.show({
                    title: "Источники настроены",
                    message: `Теперь для этой группы будут отображаться посты только от ${sourcesNames
                        .slice(0, sourcesNames.length - 1)
                        .join(", ")} и ${
                        sourcesNames[sourcesNames.length - 1]
                    }.`,
                });

            sourcesNames.length == 1 &&
                notifications.show({
                    title: "Источники настроены",
                    message: `Теперь для этой группы будут отображаться посты только от ${sourcesNames[0]}.`,
                });

            sourcesNames.length == 0 &&
                notifications.show({
                    title: "Источники настроены",
                    message: `От группы ${group.name} откреплены все источники.`,
                });
        });
    }

    return (
        <>
            <Modal
                {...props}
                title={`Настройка источников ${group.name}`}
                size={"lg"}
            >
                <LoadingOverlay visible={isLoading} overlayBlur={2} />
                <TransferList
                    value={transferLists}
                    onChange={(transferLists) =>
                        setTransferLists(transferLists)
                    }
                    searchPlaceholder={"Поиск..."}
                    nothingFound={"Пусто"}
                    titles={["Все источники", "Источники группы"]}
                    mb={"md"}
                />
                <Group grow>
                    <Button onClick={submitSources}>Сохранить</Button>
                    <Button
                        variant={"light"}
                        color={"red"}
                        onClick={props.onClose}
                    >
                        Закрыть
                    </Button>
                </Group>
            </Modal>
        </>
    );
}
