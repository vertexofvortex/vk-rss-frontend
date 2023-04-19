import { ActionIcon, Flex, Header, Title } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clear } from "../../features/authSlice/authSlice";

export function AppHeader() {
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
          <img src={"/logo.png"} style={{ height: "40px" }} />
          <Title order={4}>VK RSS PARSER</Title>
        </Flex>
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
      </Flex>
    </Header>
  );
}
