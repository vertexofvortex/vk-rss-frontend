import {
    ActionIcon,
    Button,
    Flex,
    Group,
    Table,
    Text,
    Image,
    TextInput,
    Textarea,
    Alert,
    FileInput,
    Select,
    SelectItem,
    Tooltip,
} from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IconAlertCircle, IconTrash, IconUpload } from "@tabler/icons-react";
import { removePost } from "../../features/postsCart/postsCartSlice";
import { IGroup } from "../../models";
import { useEffect, useState } from "react";
import { IPostInCart } from "../../models/Post";
import { Form, useForm } from "@mantine/form";
import { useLoaderData } from "react-router-dom";
import { AxiosResponse } from "axios";
import { DateTimePicker } from "@mantine/dates";

export function Publish() {
    const postsCart = useAppSelector((state) => state.postsCart);
    const dispatch = useAppDispatch();
    const groups = (useLoaderData() as AxiosResponse<IGroup[]>).data;
    const [currentPost, setCurrentPost] = useState<IPostInCart>(
        Object.values(postsCart.posts)[0]
    );

    return (
        <>
            {Object.keys(postsCart.posts).length > 0 ? (
                <>
                    <PostEditForm post={currentPost} groups={groups} />
                    <Group
                        p={"xl"}
                        style={{
                            margin: "-1.5rem",
                            marginTop: "0px",
                            backgroundColor: "#f8f9fa",
                        }}
                    >
                        <Text>Очередь постов</Text>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Заголовок</th>
                                    <th>Группа</th>
                                    <th
                                        align={"right"}
                                        style={{ textAlign: "right" }}
                                    >
                                        Действия
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.values(postsCart.posts).map((post) => (
                                    <tr
                                        key={post.id}
                                        style={{
                                            background:
                                                post.id == currentPost?.id
                                                    ? "#0000001b"
                                                    : "",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => setCurrentPost(post)}
                                    >
                                        <td>{post.title}</td>
                                        <td>
                                            {post.for_group ? (
                                                <Flex
                                                    align={"center"}
                                                    gap={"sm"}
                                                >
                                                    <img
                                                        src={
                                                            post.for_group
                                                                ?.photo_url
                                                        }
                                                        style={{
                                                            width: "25px",
                                                            borderRadius:
                                                                "25px",
                                                        }}
                                                    />
                                                    {post.for_group?.name}
                                                </Flex>
                                            ) : (
                                                <div>Из общей ленты</div>
                                            )}
                                        </td>
                                        <td align={"right"}>
                                            <ActionIcon
                                                color={"red"}
                                                onClick={() => {
                                                    dispatch(removePost(post));
                                                    // if (currentPost?.id == post.id) {
                                                    //     setCurrentPost(undefined);
                                                    // }
                                                }}
                                            >
                                                <IconTrash size={"1rem"} />
                                            </ActionIcon>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Group>
                </>
            ) : (
                <Alert
                    icon={<IconAlertCircle size="1rem" />}
                    color={"blue"}
                    w={"100%"}
                    mb={"xs"}
                >
                    Вы ещё не добавили ни одной новости в список публикации.
                </Alert>
            )}
        </>
    );
}

interface FormValues {
    post_body: string;
    source: string;
    image_url: string;
    image_file?: File;
    for_group?: string;
    queued_date?: any;
}

interface PostEditFormProps {
    post: IPostInCart;
    groups: IGroup[];
}

function PostEditForm({ post, groups }: PostEditFormProps) {
    const form = useForm<FormValues>({
        initialValues: {
            post_body: post.description,
            source: post.post_url,
            image_url: post.image_url,
            for_group: `${post.for_group?.id}`,
        },
        validate: {
            post_body: (v) => (v ? null : "У поста должен быть текст"),
            source: (v) =>
                /^(ftp|http|https):\/\/[^ "]+\.[^ "]+$/.test(v)
                    ? null
                    : "Ссылка должна быть действительной",
            for_group: (v) =>
                v && v !== "undefined"
                    ? null
                    : "Укажите, в какую группу опубликовать новость",
            queued_date: (v) =>
                !v || v > new Date()
                    ? null
                    : "Опубликовать новость в прошлое невозможно",
        },
    });

    useEffect(() => {
        form.setValues({
            post_body: `${post.title}\n\n${post.description}\n\n\n${post.post_url}`,
            source: post.post_url,
            image_url: post.image_url,
            image_file: undefined,
            for_group: `${post.for_group?.id}`,
        });
        console.log(form.values);
    }, [post]);

    function fileToBase64(file: File | undefined | null): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!file) {
                resolve("");
                return;
            }

            let reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.onerror = () => {
                resolve("");
            };
        });
    }

    function adaptGroup(group: IGroup): SelectItem {
        return {
            label: group.name,
            value: `${group.id}`,
        };
    }

    function handleSubmit() {
        console.log(form.values);
    }

    return (
        <Form form={form} style={{ minHeight: 500 }}>
            <Flex gap={"md"}>
                <div style={{ flexGrow: 1 }}>
                    <Textarea
                        label={"Текст поста"}
                        mb={"md"}
                        minRows={5}
                        {...form.getInputProps("post_body")}
                        autosize
                    />
                    <TextInput
                        label={"Источник"}
                        description={
                            "Укажите источник, который будет отображаться у поста в ВК (может отличаться от ссылки на пост)"
                        }
                        {...form.getInputProps("source")}
                        mb={"md"}
                    />
                    <Flex align={"start"} gap={"md"}>
                        <Tooltip
                            label={
                                "Можете опубликовать сейчас или указать дату и время для отложенного поста"
                            }
                        >
                            <Button
                                onClick={() => {
                                    form.validate();
                                    handleSubmit();
                                }}
                            >
                                {form.values.queued_date
                                    ? "Отложить"
                                    : "Опубликовать"}
                            </Button>
                        </Tooltip>
                        <DateTimePicker
                            placeholder={
                                "Введите дату, когда нужно опубликовать пост"
                            }
                            maw={400}
                            valueFormat={"ddd, DD MMM YYYY, HH:MM"}
                            {...form.getInputProps("queued_date")}
                            // onChange={(date) =>
                            //     form.setFieldValue("queued_date", date)
                            // }
                            clearable
                            style={{ flexGrow: 1 }}
                        />
                        <Select
                            placeholder={
                                "Выберите, в какую группу отправить пост"
                            }
                            data={groups.map((group) => adaptGroup(group))}
                            {...form.getInputProps("for_group")}
                            style={{ flexGrow: 1 }}
                        />
                    </Flex>
                </div>
                <div>
                    <Text size={"sm"} weight={500} mb={2}>
                        Изображение
                    </Text>
                    {form.values.image_url && (
                        <Image
                            src={form.values.image_url}
                            miw={500}
                            maw={500}
                            height={300}
                            radius={"md"}
                            mb={"md"}
                        />
                    )}
                    {!form.values.image_url && (
                        <div
                            style={{
                                minWidth: 500,
                                maxWidth: 500,
                            }}
                        >
                            <Alert
                                icon={<IconAlertCircle size="1rem" />}
                                mb={"md"}
                            >
                                У новости нет картинки
                            </Alert>
                        </div>
                    )}
                    <FileInput
                        w={"100%"}
                        opacity={0.8}
                        label={"Загрузите или поменяйте изображение"}
                        placeholder={"Нажмите или перетяните сюда файл"}
                        icon={<IconUpload size={"1rem"} />}
                        {...form.getInputProps("image_file")}
                        onChange={async (file) => {
                            fileToBase64(file).then((url) => {
                                form.setFieldValue("image_url", url);
                                console.log(url);
                            });
                        }}
                        clearable
                        accept={"image/png,image/jpeg"}
                    />
                </div>
            </Flex>
        </Form>
    );
}
