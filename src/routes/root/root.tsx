import { AppShell, Code, Flex, Group, Title } from "@mantine/core";
import { IconMoodSadSquint } from "@tabler/icons-react";
import { isAxiosError } from "axios";
import { Outlet, useRouteError } from "react-router-dom";
import { AppHeader, AppNavbar } from "../../components";

interface Props {
  isError?: boolean;
}

export function Root({ isError }: Props) {
  const error = useRouteError() as object;

  return (
    <AppShell
      navbar={<AppNavbar />}
      header={<AppHeader />}
      padding={"xl"}
      bg={"#FCFCFC"}
    >
      {!isError ? (
        <Outlet />
      ) : (
        // <Alert
        //     icon={<IconAlertCircle size="1rem" />}
        //     title="Ошибка!"
        //     color="red"
        // >
        //     <Text>
        //         Произошла ошибка маршрутизации:
        //         {isRouteErrorResponse(error) && (
        //             <b>{` ${error.status} ${error.statusText}`}</b>
        //         )}
        //         . Если вы считаете, что так быть не должно, обратитесь к
        //         разработчику.
        //     </Text>
        // </Alert>
        <Group w={"100%"} h={"100%"} opacity={0.33}>
          <Flex
            align={"center"}
            justify={"center"}
            direction={"column"}
            w={"100%"}
          >
            <IconMoodSadSquint size={200} stroke={1} />
            <Title mt={"xl"} mb={"xl"}>
              Произошла ошибка
            </Title>
            {!isAxiosError(error) ? (
              <Code w={"60%"}>{JSON.stringify(error)}</Code>
            ) : (
              <Code w={"60%"}>{error.message}</Code>
            )}
          </Flex>
        </Group>
      )}
    </AppShell>
  );
}
