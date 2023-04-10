import { ActionIcon, Menu, Modal, Button, Text, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAdjustments, IconTrash } from "@tabler/icons-react";
import { IKey } from "../../models";
import { deleteKey } from "../../network/keys";
import { Form, useSubmit } from "react-router-dom";

interface Props {
    token: IKey;
}

export function KeyActions({ token }: Props) {
    const [opened, { open, close }] = useDisclosure(false);
    const submit = useSubmit();

    // function submit() {
    //     deleteKey(token.id)
    //         .then((res) => close())
    //         .catch((err) => close());
    // }

    return (
        <>
            <Menu shadow={"md"} width={200}>
                <Menu.Target>
                    <ActionIcon>
                        <IconAdjustments size="1.125rem" />
                    </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Label>Действия</Menu.Label>
                    <Menu.Item
                        icon={<IconTrash size={14} />}
                        onClick={() => open()}
                        color={"red"}
                    >
                        Удалить
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <Modal
                opened={opened}
                onClose={close}
                centered
                withCloseButton={false}
            >
                <Form method="delete" action={`/keys/${token.id}/delete`}>
                    <Text mb={"md"}>
                        Вы действительно хотите удалить ключ "{token.name}"? Это
                        действие необратимо.
                    </Text>
                    <Group grow>
                        <Button color={"red"} type={"submit"}>
                            Да, удалить
                        </Button>
                        <Button variant={"light"} onClick={() => close()}>
                            Нет, отмена
                        </Button>
                    </Group>
                </Form>
            </Modal>
        </>
    );
}
