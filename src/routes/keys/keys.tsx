import {
  Alert,
  Button,
  Container,
  Group,
  LoadingOverlay,
  Modal,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconAlertCircle, IconPlus } from "@tabler/icons-react";
import { AxiosResponse } from "axios";
import { useState } from "react";
import {
  useActionData,
  useFetcher,
  useLoaderData,
  useSubmit,
} from "react-router-dom";
import { InputPassword, KeyActions } from "../../components";
import { IKey } from "../../models";

export function Keys() {
  const { data } = useLoaderData() as AxiosResponse<IKey[]>;
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);
  let submit = useSubmit();
  const fetcher = useFetcher();
  let errors = useActionData();
  const form = useForm({
    initialValues: {
      name: "",
      token: "",
      passphrase: "",
    },
    validate: {
      name: (value) => (value ? null : "Это обязательное поле"),
      token: (value) => (value ? null : "Это обязательное поле"),
      passphrase: (value) => (value ? null : "Это обязательное поле"),
    },
  });

  return (
    <>
      <Group mb={"xs"}>
        <div
          style={{
            width: "100%",
            overflowX: "scroll",
          }}
        >
          <Table striped>
            <thead>
              <tr>
                <th>ID</th>
                <th>Наименование ключа</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((token) => (
                <tr key={token.id}>
                  <td>{token.id}</td>
                  <td>{token.name}</td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "right",
                    }}
                  >
                    <KeyActions token={token} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Group>
      <Group>
        <Container>
          <Button
            onClick={open}
            variant={"light"}
            leftIcon={<IconPlus size={"1rem"} />}
          >
            Добавить новый ключ доступа
          </Button>
        </Container>
        {/* TODO: decompose it */}
        <Modal
          opened={opened}
          onClose={close}
          title="Добавление ключа доступа"
          centered
        >
          <LoadingOverlay visible={isLoading} overlayBlur={2} />
          <fetcher.Form
            onSubmit={form.onSubmit((values) => {
              fetcher.submit(values, {
                method: "POST",
                action: "/keys/create",
              });
              close();
            })}
          >
            <TextInput
              label={"Название ключа"}
              description={
                "Выберите такое имя для ключа, с помощью которого сможете отличить его от других. Например, имя и фамилию страницы ВКонтакте"
              }
              mb={"md"}
              withAsterisk
              {...form.getInputProps("name")}
              name={"name"}
            />
            <TextInput
              label={"Введите ключ API"}
              description={
                <>
                  Перейдите по{" "}
                  <a
                    href="https://oauth.vk.com/authorize?client_id=51606555&scope=335876&redirect_uri=https://oauth.vk.com/blank.html&display=page&response_type=token&revoke=1"
                    target={"_blank"}
                  >
                    этой ссылке
                  </a>
                  , нажмите <b>Разрешить</b>, после чего скопируйте содержимое
                  адресной строки между <b>access_token=</b> и{" "}
                  <b>&expires_in</b>. Не обращайте внимание на содержимое
                  страницы
                </>
              }
              mb={"md"}
              placeholder={"vk1.a..."}
              withAsterisk
              {...form.getInputProps("token")}
              name={"token"}
            />
            <InputPassword
              label={"Придумайте код или пароль"}
              description={
                "С помощью этого пароля ключ будет храниться в базе данных в зашифрованном виде"
              }
              mb={"md"}
              withAsterisk
              {...form.getInputProps("passphrase")}
              name={"passphrase"}
            />
            <Alert
              color={"orange"}
              icon={<IconAlertCircle size="1rem" />}
              title="Важная информация!"
              mb={"md"}
            >
              <Text size={"xs"} mb={"xs"}>
                В случае, если доступ к базе данных получит злоумышленник, у вас
                будет время на аннулирование ключей доступа{" "}
                <a
                  href="https://id.vk.com/account/#/services"
                  target={"_blank"}
                >
                  в настройках VK ID
                </a>{" "}
                привязанных страниц. Чем длиннее и сложнее пароль, тем
                потенциально больше времени у вас будет до момента, когда вашим
                ключом воспользуются.
              </Text>
              <Text size={"xs"} mb={"xs"}>
                Ввод пароля также понадобится для совершения действий, связанных
                с ВКонтакте, например, при постинге новостей.
              </Text>
              <Text size={"xs"}>
                После добавления ключа он будет скрыт и вы больше никогда его не
                увидите. Если он нужен вам в исходном виде, то запишите его,
                однако делиться им нельзя ни в коем случае.
              </Text>
            </Alert>
            <Button fullWidth type={"submit"}>
              Добавить ключ
            </Button>
          </fetcher.Form>
        </Modal>
      </Group>
    </>
  );
}

export default Keys;
