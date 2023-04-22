import { ActionIcon, Flex, Group, Header, Title } from "@mantine/core";
import { IconLogout, IconMenu2 } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clear } from "../../features/authSlice/authSlice";

interface Props {
  isDrawerOpened: boolean;
  drawerActions: {
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
  };
}

export function AppHeader({ isDrawerOpened, drawerActions }: Props) {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(clear());
    navigate("/login");
  }

  return (
    <Header height={"60"} p={"xs"}>
      <Flex h={"100%"} justify={"space-between"} align={"center"}>
        <Flex gap={"xs"} align={"center"}>
          <img src={"/logo.png"} style={{ height: "2rem" }} />
          <Title order={4}>VK RSS PARSER</Title>
        </Flex>
        <Group>
          {auth.token && (
            <ActionIcon
              variant={"subtle"}
              color={"red"}
              h={"40px"}
              w={"40px"}
              onClick={handleLogout}
            >
              <IconLogout size={"1rem"} />
            </ActionIcon>
          )}
          <ActionIcon
            variant={"subtle"}
            color={"blue"}
            h={"40px"}
            w={"40px"}
            onClick={drawerActions.toggle}
          >
            <IconMenu2 size={"1rem"} />
          </ActionIcon>
        </Group>
      </Flex>
    </Header>
  );
}
