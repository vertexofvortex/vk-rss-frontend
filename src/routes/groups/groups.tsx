import {
  Avatar,
  Card,
  Flex,
  Grid,
  Group,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { AxiosResponse } from "axios";
import { useLoaderData } from "react-router-dom";
import { AddGroupsModal, GroupActions } from "../../components";
import { IGroup } from "../../models";

export function Groups() {
  const { data } = useLoaderData() as AxiosResponse<IGroup[]>;
  const [opened, { open, close }] = useDisclosure(false);
  const mobileWidth = useMediaQuery("(max-width: 851px)");

  return (
    <>
      <Grid>
        {data.map((group) => (
          <Grid.Col key={group.id} span={mobileWidth ? 12 : 4}>
            <Card shadow="sm" padding="xs" radius="md" withBorder>
              <Flex justify={"space-between"} align={"center"}>
                <Group>
                  <Avatar src={group.photo_url}>
                    {group.name.slice(0, 2).toUpperCase()}
                  </Avatar>
                  <div>
                    <Text lh={"1em"}>
                      <b>{group.name}</b>
                    </Text>
                    <Text size={"xs"} opacity={0.5}>
                      @{group.vk_id}
                    </Text>
                  </div>
                </Group>
                <GroupActions {...group} />
              </Flex>
            </Card>
          </Grid.Col>
        ))}
        <Grid.Col span={mobileWidth ? 12 : 4}>
          <UnstyledButton onClick={() => open()} w={"100%"}>
            <Card
              padding="xs"
              radius="md"
              withBorder
              style={{ borderStyle: "dashed" }}
            >
              <Flex justify={"space-between"} align={"center"}>
                <Group>
                  <Avatar color={"blue"}>+</Avatar>
                  <div>
                    <Text color={"dimmed"} lh={"1em"}>
                      Добавить группу
                    </Text>
                  </div>
                </Group>
              </Flex>
            </Card>
          </UnstyledButton>
        </Grid.Col>
      </Grid>
      <AddGroupsModal
        opened={opened}
        onClose={close}
        title="Добавление группы"
        centered
      />
    </>
  );
}

export default Groups;
