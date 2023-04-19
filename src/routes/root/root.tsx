import { AppShell, Code, Flex, Group, Title } from "@mantine/core";
import { IconMoodSadSquint } from "@tabler/icons-react";
import { isAxiosError } from "axios";
import { Outlet, useRouteError } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { AppHeader, AppNavbar } from "../../components";

interface Props {
  isError?: boolean;
}

export function Root({ isError }: Props) {
  const error = useRouteError() as object;
  const auth = useAppSelector((state) => state.auth);

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

export default Root;
