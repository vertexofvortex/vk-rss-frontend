import { ActionIcon, Button, Group, Menu, Modal, Text } from "@mantine/core";
import { IconListDetails, IconSettings, IconTrash } from "@tabler/icons-react";
import { IGroup } from "../../models";
import { GroupsSourcesModal } from "../GroupsSourcesModal/GroupsSourcesModal";
import { useDisclosure } from "@mantine/hooks";
import { Form, useActionData } from "react-router-dom";

export function GroupActions(group: IGroup) {
    const [sourcesModalOpened, sourcesModalActions] = useDisclosure(false);
    const [removalModalOpened, removalModalActions] = useDisclosure(false);

    return (
        <>
            <Menu shadow={"md"} width={200} withinPortal={true}>
                <Menu.Target>
                    <ActionIcon>
                        <IconSettings size={"1.125rem"} />
                    </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Label>Действия</Menu.Label>
                    <Menu.Item
                        icon={<IconListDetails size={14} />}
                        onClick={() => sourcesModalActions.open()}
                    >
                        Настроить источники
                    </Menu.Item>
                    <Menu.Item
                        icon={<IconTrash size={14} />}
                        onClick={() => removalModalActions.open()}
                        color={"red"}
                    >
                        Удалить
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <GroupsSourcesModal
                opened={sourcesModalOpened}
                onClose={sourcesModalActions.close}
                centered
                group={group}
            />
            <Modal
                opened={removalModalOpened}
                onClose={removalModalActions.close}
                centered
                withCloseButton={false}
            >
                <Form method="delete" action={`/groups/${group.id}/delete`}>
                    <Text mb={"md"}>
                        Вы действительно хотите удалить группу{" "}
                        <b>{group.name}</b>? От неё также отвяжутся все
                        источники.
                    </Text>
                    <Group grow>
                        <Button color={"red"} type={"submit"}>
                            Да, удалить
                        </Button>
                        <Button
                            variant={"light"}
                            onClick={removalModalActions.close}
                        >
                            Нет, отмена
                        </Button>
                    </Group>
                </Form>
            </Modal>
        </>
    );
}
