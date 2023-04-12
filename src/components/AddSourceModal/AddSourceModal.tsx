import {
    ActionIcon,
    Button,
    Flex,
    Group,
    HoverCard,
    Input,
    LoadingOverlay,
    Modal,
    ModalProps,
    TextInput,
    Textarea,
    Tooltip,
} from "@mantine/core";
import { IconCheck, IconExternalLink, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Form, useActionData } from "react-router-dom";
import { checkSourceURL } from "../../network/sources";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

interface Props extends ModalProps {
    actionType: "create" | "edit";
}

interface FormProps {
    title: string;
    description: string;
    rss_url: string;
}

export function AddSourceModal({ actionType, ...props }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const form = useForm<FormProps>();
    const actionData = useActionData();

    useEffect(() => {
        if (actionData) {
            if ((actionData as any).status == 200) {
                setIsLoading(false);
                props.onClose();
            }
        }
    }, [actionData]);

    return (
        <Modal {...props} title="Добавление нового источника">
            <LoadingOverlay visible={isLoading} overlayBlur={2} />
            <Form
                method={actionType === "create" ? "post" : "put"}
                action={
                    actionType === "create"
                        ? "/sources/create"
                        : "/sources/edit"
                }
            >
                <TextInput
                    label={"Введите название источника"}
                    placeholder={"Лента новостей Краснодара"}
                    mb={"md"}
                    withAsterisk
                    name={"title"}
                    {...form.getInputProps("title")}
                />
                <Textarea
                    label={"Укажите описание источнику"}
                    mb={"md"}
                    withAsterisk
                    name={"description"}
                    {...form.getInputProps("description")}
                    placeholder={
                        "Коротко о событиях дня, новости публикуются раз в час, встречаются посты без картинок и описания..."
                    }
                    minRows={4}
                    autosize
                />
                <TextInput
                    label={"Ссылка на RSS ленту"}
                    placeholder={"https://example.com/rss/index.xml"}
                    mb={"md"}
                    withAsterisk
                    name={"rss_url"}
                    {...form.getInputProps("rss_url")}
                    rightSection={
                        <CheckURLValidity url={form.values.rss_url} />
                    }
                />
                <Flex gap={"md"}>
                    <Button
                        fullWidth
                        type="submit"
                        onClick={() => setIsLoading(true)}
                    >
                        Подключить
                    </Button>
                    <Button
                        fullWidth
                        variant={"light"}
                        color={"red"}
                        onClick={props.onClose}
                    >
                        Отмена
                    </Button>
                </Flex>
            </Form>
        </Modal>
    );
}

function CheckURLValidity({ url }: { url: string }) {
    function handleSubmit() {
        checkSourceURL(url)
            .then((res) => {
                notifications.show({
                    title: "Проверка выполнена",
                    message: (
                        <>
                            <div>
                                Постов на данный момент: {res.data.total_posts}
                            </div>
                            <div>У {res.data.titles} постов есть заголовок</div>
                            <div>
                                У {res.data.descriptions} постов есть описание
                            </div>
                            <div>
                                У {res.data.image_urls} постов есть картинки
                            </div>
                            <div>
                                У {res.data.categories} постов указана категория
                            </div>
                            <div>
                                У {res.data.publish_dates} постов указана дата
                                публикации
                            </div>
                            <div>
                                У {res.data.post_urls} постов есть ссылка на
                                новость
                            </div>
                        </>
                    ),
                    icon: <IconCheck size="1.1rem" />,
                    color: "teal",
                });
            })
            .catch((err) => {
                notifications.show({
                    title: "Проверка не выполнена",
                    message: "RSS лента по указанной ссылке не найдена",
                    icon: <IconX size="1.1rem" />,
                    color: "red",
                });
            });
    }

    return (
        <Tooltip label={"Провеить, рабочая ли ссылка"}>
            <ActionIcon onClick={handleSubmit}>
                <IconExternalLink size={"1rem"} />
            </ActionIcon>
        </Tooltip>
    );
}
