import { ActionIcon, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAdjustments, IconEdit, IconTrash } from "@tabler/icons-react";
import { ISource } from "../../models";
import { RemoveSourceModal } from "../RemoveSourceModal/RemoveSourceModal";

export function SourceActions(source: ISource) {
  const [removalModalOpened, removalModalActions] = useDisclosure();

  return (
    <>
      <Menu shadow={"md"} width={200}>
        <Menu.Target>
          <ActionIcon>
            <IconAdjustments size="1.125rem" />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Действия</Menu.Label>
          <Menu.Item icon={<IconEdit size={14} />}>Редактировать</Menu.Item>
          <Menu.Item
            icon={<IconTrash size={14} />}
            color={"red"}
            onClick={removalModalActions.open}
          >
            Удалить
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <RemoveSourceModal
        opened={removalModalOpened}
        onClose={removalModalActions.close}
        centered
        withCloseButton={false}
        source={source}
      />
    </>
  );
}
