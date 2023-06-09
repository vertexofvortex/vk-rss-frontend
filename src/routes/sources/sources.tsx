import { Alert, Button, Flex, Group, Table, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle, IconPlus, IconRefresh } from "@tabler/icons-react";
import { AxiosResponse } from "axios";
import { useLoaderData } from "react-router-dom";
import { AddSourceModal, SourceActions } from "../../components";
import { ISource } from "../../models";
import axiosInstance from "../../network/axios-instance";
import { forceParse } from "../../network/parsing";

export function Sources() {
  const { data } = useLoaderData() as AxiosResponse<ISource[]>;
  const [sourcesModalOpened, sourcesModalActions] = useDisclosure(false);

  function handleForceParse() {
    forceParse()
      .then(({ data }) => {
        notifications.show({
          message: `Посты обновлены. Всего постов в базе: ${data}`,
        });
      })
      .catch(() => {
        notifications.show({
          message: "Произошла ошибка.",
          color: "red",
        });
      });
  }

  return (
    <>
      <Group mb={"xs"}>
        {data.length > 0 ? (
          <>
            <Alert
              icon={<IconAlertCircle size="1rem" />}
              color={"blue"}
              w={"100%"}
              mb={"xs"}
            >
              Все добавленные источники будут автоматически опрашиваться раз в
              15 минут, а полученные посты записываться в базу данных. Дубли
              постов будут пропускаться. Также раз в 15 минут будет происходить
              очистка старых постов, настроить это можно в конфигурационном
              файле
            </Alert>
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
                      <td>
                        <img
                          src={`${axiosInstance.getUri()}/source_logo/${
                            item.id
                          }`}
                          style={{
                            maxHeight: 30,
                            maxWidth: 30,
                            marginRight: "1rem",
                          }}
                        />
                        {item.title}
                      </td>
                      <td>
                        <a href={item.rss_url} target="_blank">
                          {item.rss_url}
                        </a>
                      </td>
                      <td>
                        {item.description && item.description != "undefined"
                          ? item.description
                          : ""}
                      </td>
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
            </div>
          </>
        ) : (
          <Alert
            title={"Вы ещё не добавили ни одного источника"}
            icon={<IconAlertCircle size="1rem" />}
            color={"orange"}
            w={"100%"}
          >
            Подключите их, нажав кнопку ниже.
          </Alert>
        )}
      </Group>
      <Group>
        <Flex justify={"center"} gap={"md"} w={"100%"} wrap={"wrap"}>
          <Button
            onClick={sourcesModalActions.open}
            variant={"light"}
            leftIcon={<IconPlus size={"1rem"} />}
            style={{ flexGrow: 1 }}
          >
            Добавить новый источник новостей
          </Button>
          <Tooltip
            label={
              "Произойдёт опрос всех источников. Это может занять некоторое время"
            }
          >
            <Button
              onClick={handleForceParse}
              variant={"light"}
              leftIcon={<IconRefresh size={"1rem"} />}
              color={"orange"}
              style={{ flexGrow: 1 }}
            >
              Принудительно обновить
            </Button>
          </Tooltip>
        </Flex>
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

export default Sources;
