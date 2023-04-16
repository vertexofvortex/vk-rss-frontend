import {
    ActionIcon,
    Button,
    FileInput,
    Flex,
    LoadingOverlay,
    Modal,
    ModalProps,
    TextInput,
    Textarea,
    Tooltip,
} from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconExternalLink, IconUpload, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useActionData, useFetcher, useSubmit } from "react-router-dom";
import { checkSourceURL } from "../../network/sources";

interface Props extends ModalProps {
    actionType: "create" | "edit";
}

interface FormValues {
    title: string;
    description: string;
    rss_url: string;
    logo: File;
}

export function AddSourceModal({ actionType, ...props }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [rssSource, setRssSource] = useState<string>("");
    const actionData = useActionData();
    const form = useForm<FormValues>();
    const submit = useSubmit();
    const fetcher = useFetcher();

    useEffect(() => {
        if (actionData) {
            if ((actionData as any).status == 200) {
                setIsLoading(false);
                props.onClose();
            }
        }
    }, [actionData]);

    async function handleSubmit() {
        console.log("logo from handle:", URL.createObjectURL(form.values.logo));

        const fd = new FormData();
        fd.append("title", form.values.title);
        fd.append("description", form.values.description);
        fd.append("rss_url", form.values.rss_url);
        fd.append("logo", form.values.logo);

        submit(fd, {
            method: "POST",
            action: "/sources/create",
            encType: "multipart/form-data",
        });
    }

    return (
        <Modal {...props} title="Добавление нового источника">
            <LoadingOverlay visible={isLoading} overlayBlur={2} />
            <Form form={form}>
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
                    placeholder={
                        "Коротко о событиях дня, новости публикуются раз в час, встречаются посты без картинок и описания..."
                    }
                    minRows={4}
                    autosize
                    {...form.getInputProps("description")}
                />
                <TextInput
                    label={"Ссылка на RSS ленту"}
                    placeholder={"https://example.com/rss/index.xml"}
                    mb={"md"}
                    withAsterisk
                    name={"rss_url"}
                    rightSection={<CheckURLValidity url={rssSource} />}
                    {...form.getInputProps("rss_url")}
                />
                <FileInput
                    label={"Иконка"}
                    description={"Будет отображаться в сгенерированном сниппете поста"}
                    mb={"md"}
                    placeholder={"Загрузите файл..."}
                    icon={<IconUpload size={"1rem"} />}
                    clearable
                    accept={"image/png,image/jpeg"}
                    name={"logo"}
                    {...form.getInputProps("logo")}
                />
                <Flex gap={"md"}>
                    <Button fullWidth onClick={handleSubmit}>
                        Подключить
                    </Button>
                    <Button fullWidth variant={"light"} color={"red"} onClick={props.onClose}>
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
                            <div>Постов на данный момент: {res.data.total_posts}</div>
                            <div>У {res.data.titles} постов есть заголовок</div>
                            <div>У {res.data.descriptions} постов есть описание</div>
                            <div>У {res.data.image_urls} постов есть картинки</div>
                            <div>У {res.data.categories} постов указана категория</div>
                            <div>У {res.data.publish_dates} постов указана дата публикации</div>
                            <div>У {res.data.post_urls} постов есть ссылка на новость</div>
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
