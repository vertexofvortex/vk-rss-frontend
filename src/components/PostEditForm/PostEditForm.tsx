import {
  Accordion,
  Alert,
  Button,
  FileInput,
  Flex,
  Image,
  Modal,
  ModalProps,
  Select,
  SelectItem,
  Text,
  TextInput,
  Textarea,
  Tooltip,
} from "@mantine/core";
import { DateTimePicker, DateValue } from "@mantine/dates";
import { Form, useForm } from "@mantine/form";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle, IconUpload } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { removePost } from "../../features/postsCart/postsCartSlice";
import { IGroup, IKey } from "../../models";
import { IPost, IPostInCart } from "../../models/Post";
import axiosInstance from "../../network/axios-instance";
import { getGroupById } from "../../network/groups";
import { generateImage } from "../../network/image-gen";
import { getKeyById } from "../../network/keys";
import { createPost } from "../../network/publish";
import { InputPassword } from "../InputPassword/InputPassword";

interface Props {
  post: IPostInCart;
  groups: IGroup[];
}

interface FormValues {
  title: string;
  description: string;
  source_text: string;
  source_url: string;
  image_url: string;
  image_file: File;
  for_group?: string;
  queued_date?: DateValue;
  passphrase: string;
  snippet: {
    title?: string;
    description?: string;
    source_text?: string;
    image?: File;
    logo?: File;
  };
}

export function PostEditForm({ post, groups }: Props) {
  const [isImgModalOpen, imgModalActions] = useDisclosure();
  const [isSuccessModalOpen, successModalActions] = useDisclosure();
  const [image, setImage] = useState<string>();
  const [isImageLoading, setImageLoading] = useState<boolean>(false);
  const [usertoken, setUsertoken] = useState<IKey>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState<string>(); // костыль для отображения ошибки
  const mobileWidth = useMediaQuery("(max-width: 851px)");

  const form = useForm<FormValues>({
    validate: {
      description: (v) => (v ? null : "У поста должен быть текст"),
      source_url: (v) =>
        /^(http|https):\/\/[^ "]+\.[^ "]+$/.test(v)
          ? null
          : "Ссылка должна быть действительной",
      for_group: (v) =>
        v ? null : "Укажите, в какую группу опубликовать новость",
      queued_date: (v) =>
        !v || v > new Date()
          ? null
          : "Опубликовать новость в прошлое невозможно",
      image_url: (v) => (v ? null : "Прикрепите картинку"),
      passphrase: (v) => (v ? null : "Вы не указали пароль от ключа"),
    },
  });

  //FIXME:
  useEffect(() => {
    console.log(form.values);
  }, [form.values]);

  useEffect(() => {
    form.setValues({
      title: post.title,
      description: post.description,
      source_text: post.post_url,
      source_url: post.post_url,
      image_url: post.image_url,
      image_file: undefined,
      for_group: `${post.for_group?.id}`,
      snippet: {
        title: undefined,
        description: undefined,
        source_text: undefined,
        logo: undefined,
      },
    });
  }, [post]);

  useEffect(() => {
    if (!form.values.image_file) return;

    form.setFieldValue(
      "image_url",
      URL.createObjectURL(form.values.image_file)
    );

    console.log(form.values);
  }, [form.values.image_file]);

  useEffect(() => {
    if (!form.values.for_group) return;

    getGroupById(form.values.for_group)
      .then((res) => getKeyById(res.data.token_id))
      .then((res) => setUsertoken(res.data))
      .catch((err) => console.log(err));
  }, [form.values.for_group]);

  function adaptGroup(group: IGroup): SelectItem {
    return {
      label: group.name,
      value: `${group.id}`,
    };
  }

  async function generateSnippet() {
    console.log(form.values);

    // Check if form has image URL or uploaded file
    if (!form.values.image_url && !form.values.image_file) {
      throw Error(
        "У поста должна быть картинка. Если её нет изначально, то загрузите свою"
      );
    }

    // Trying to get the source logo
    let logo;
    try {
      logo = await axiosInstance.get(`/source_logo/${post.source_id}`, {
        responseType: "blob",
      });
    } catch (error) {
      throw Error("Произошла ошибка при получении логотипа источника.");
    }

    // If uploaded file is provided
    if (form.values.image_file) {
      return generateImage(
        form.values.snippet?.title || form.values.title,
        form.values.snippet?.description || form.values.description,
        form.values.snippet?.source_text || form.values.source_text,
        logo.data,
        form.values.image_file,
        null
      );
    } else {
      return generateImage(
        form.values.snippet?.title || form.values.title,
        form.values.snippet?.description || form.values.description,
        form.values.snippet?.source_text || form.values.source_text,
        logo.data,
        null,
        form.values.image_url
      );
    }
  }

  async function handleLoadImagePreview() {
    generateSnippet()
      .then((res) => {
        setImage(URL.createObjectURL(res.data));
        imgModalActions.open();
      })
      .catch((err) => {
        notifications.show({
          message: err?.message,
          color: "red",
        });
      });
  }

  async function handleSubmit() {
    const validation = form.validate();

    if (validation.hasErrors) {
      console.log(validation);

      if ("image_url" in validation.errors) {
        setImageError(validation.errors.image_url?.toString());
      }

      return;
    }

    setIsLoading(true);

    generateSnippet()
      .then((res) =>
        createPost(
          form.values.title,
          form.values.description,
          form.values.source_text,
          form.values.source_url,
          res.data as File,
          usertoken!.id,
          form.values.passphrase,
          form.values.for_group!,
          form.values.queued_date
            ? form.values.queued_date?.getTime() / 1000
            : null
        )
      )
      .then((res) => {
        successModalActions.open();
        setIsLoading(false);
      })
      .catch((err) => {
        notifications.show({
          message: err?.message,
          color: "red",
        });
        setIsLoading(false);
      });
  }

  return (
    <>
      <Form form={form} style={{ minHeight: 500 }}>
        <Flex gap={"md"} direction={mobileWidth ? "column" : "row"}>
          <div style={{ flexGrow: 1 }}>
            <TextInput
              label={"Заголовок поста"}
              mb={"md"}
              {...form.getInputProps("title")}
            />
            <Textarea
              label={"Текст поста"}
              mb={"md"}
              minRows={5}
              {...form.getInputProps("description")}
              autosize
            />
            <TextInput
              label={"Ссылка в посте"}
              description={
                "Ссылка будет отображаться под описанием в тексте записи. Может не совпадать с источником"
              }
              {...form.getInputProps("source_text")}
              mb={"md"}
            />
            <TextInput
              label={"Источник"}
              description={
                "Укажите источник, который будет отображаться у записи в ВК (может отличаться от ссылки на новость, например, ссылка на сайт издания)"
              }
              {...form.getInputProps("source_url")}
              mb={"md"}
            />
            <Select
              label={"Выберите, в какую группу отправить пост"}
              placeholder={"Нажмите, чтобы выбрать..."}
              data={groups.map((group) => adaptGroup(group))}
              {...form.getInputProps("for_group")}
              mb={"md"}
            />
            <InputPassword
              label={
                usertoken ? (
                  <>
                    Введите кодовую фразу для ключа <b>{usertoken.name}</b>
                  </>
                ) : (
                  "Введите кодовую фразу для ключа"
                )
              }
              placeholder={
                form.values.for_group ? "Ваш пароль" : "Сначала выберите группу"
              }
              {...form.getInputProps("passphrase")}
              mb={"md"}
              disabled={form.values.for_group ? false : true}
            />
            <Flex
              align={"stretch"}
              gap={"md"}
              mb={"md"}
              direction={mobileWidth ? "column-reverse" : "row"}
            >
              <Tooltip
                label={
                  "Можете опубликовать сейчас или указать дату и время для отложенного поста"
                }
              >
                <Button
                  onClick={() => {
                    handleSubmit();
                  }}
                  loading={isLoading}
                >
                  {form.values.queued_date ? "Отложить" : "Опубликовать"}
                </Button>
              </Tooltip>
              <DateTimePicker
                placeholder={"Введите дату, если хотите отложить пост"}
                valueFormat={"ddd, DD MMM YYYY, HH:MM"}
                {...form.getInputProps("queued_date")}
                clearable
                style={{ flexGrow: 1 }}
              />
            </Flex>
          </div>
          <div style={{ maxWidth: 500 }}>
            <Text size={"sm"} weight={500} mb={2}>
              Изображение
            </Text>
            {form.values.image_url && (
              <Image
                src={form.values.image_url}
                miw={mobileWidth ? "100%" : 500}
                maw={mobileWidth ? "100%" : 500}
                height={300}
                radius={"md"}
                mb={"md"}
              />
            )}
            {!form.values.image_url && (
              <div
                style={{
                  minWidth: mobileWidth ? "100%" : 500,
                  maxWidth: mobileWidth ? "100%" : 500,
                }}
              >
                <Alert
                  icon={<IconAlertCircle size="1rem" />}
                  mb={"md"}
                  color={"orange"}
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
              clearable
              accept={"image/png,image/jpeg"}
              mb={"md"}
              error={imageError}
            />
            <Accordion variant={"contained"} mb={"md"}>
              <Accordion.Item value={"imggen"}>
                <Accordion.Control>Настроить сниппет</Accordion.Control>
                <Accordion.Panel>
                  <Alert mb={"md"}>
                    При публикации записи на стену сообщества будет
                    сгенерирована картинка-сниппет. Фоновым изображением
                    сниппета станет прикреплённое к новости изображение.
                    Остальные параметры по умолчанию будут получены из полей
                    новости, но вы можете указать свои.
                  </Alert>
                  <TextInput
                    label={"Заголовок"}
                    placeholder={"Можете оставить пустым"}
                    mb={"md"}
                    {...form.getInputProps("snippet.title")}
                  />
                  <Textarea
                    label={"Текст"}
                    placeholder={"Можете оставить пустым"}
                    mb={"md"}
                    {...form.getInputProps("snippet.description")}
                    autosize
                    minRows={2}
                  />
                  <TextInput
                    label={"Источник"}
                    placeholder={"Можете оставить пустым"}
                    mb={"md"}
                    {...form.getInputProps("snippet.source_text")}
                  />
                  <Button
                    fullWidth
                    variant={"outline"}
                    loading={isImageLoading}
                    onClick={handleLoadImagePreview}
                  >
                    Проверить сниппет
                  </Button>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </div>
        </Flex>
      </Form>
      <ImagePreviewModal
        opened={isImgModalOpen}
        onClose={imgModalActions.close}
        centered
        src={image}
        size={"xl"}
        padding={0}
        withCloseButton={false}
      />
      <PublishSuccessModal
        opened={isSuccessModalOpen}
        onClose={successModalActions.close}
        post={post}
        centered
      />
    </>
  );
}

interface ImagePreviewModalProps extends ModalProps {
  src: any;
}

function ImagePreviewModal({ src, ...props }: ImagePreviewModalProps) {
  return (
    <Modal {...props}>
      <img src={src} style={{ width: "100%" }} />
    </Modal>
  );
}

interface PublishSuccessProps extends ModalProps {
  post: IPost;
}

function PublishSuccessModal({ post, ...props }: PublishSuccessProps) {
  const dispatch = useAppDispatch();

  function handlePostQueueRemove() {
    dispatch(removePost(post));
    props.onClose();
  }

  return (
    <Modal {...props} title={"Запись успешно опубликована"}>
      <Flex gap={"md"}>
        <Button
          color={"red"}
          style={{ flexGrow: 1 }}
          onClick={handlePostQueueRemove}
        >
          Удалить пост из очереди
        </Button>
        <Button style={{ flexGrow: 1 }} onClick={props.onClose}>
          Ничего не делать
        </Button>
      </Flex>
    </Modal>
  );
}
