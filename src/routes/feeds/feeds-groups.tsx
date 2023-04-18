import { Accordion, Alert, Stack } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { GroupFeed } from "../../components";
import { IGroupWithPosts } from "../../models/Group";

export function FeedsGroups() {
  const { data } = useLoaderData() as AxiosResponse<IGroupWithPosts[]>;
  const [groups, setGroups] = useState<IGroupWithPosts[]>();

  return (
    <Stack>
      <Accordion radius={"md"} chevronPosition={"right"} variant={"contained"}>
        {data?.map((group) => (
          <GroupFeed {...group} key={group.id} />
        ))}
        {data.length == 0 && (
          <Alert
            title={"Вы ещё не подключили ни одной группы"}
            icon={<IconAlertCircle size="1rem" />}
            color={"orange"}
          >
            Добавьте хотя бы одну в разделе "Подключенные группы".
          </Alert>
        )}
      </Accordion>
    </Stack>
  );
}
