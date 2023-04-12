import { Button, Group, Modal, ModalProps, Text } from "@mantine/core";
import { ISource } from "../../models";
import { Form, useActionData } from "react-router-dom";
import { useEffect } from "react";
import { AxiosResponse } from "axios";
import { notifications } from "@mantine/notifications";

interface Props extends ModalProps {
    source: ISource;
}

export function RemoveSourceModal(props: Props) {
    return (
        <Modal {...props}>
            <Form method="delete" action={`/sources/${props.source.id}/delete`}>
                <Text mb={"md"}>
                    Вы действительно хотите удалить источник{" "}
                    <b>{props.source.title}</b>? Это действие необратимо.
                </Text>
                <Group grow>
                    <Button color={"red"} type={"submit"}>
                        Да, удалить
                    </Button>
                    <Button variant={"light"} onClick={props.onClose}>
                        Нет, отмена
                    </Button>
                </Group>
            </Form>
        </Modal>
    );
}
