import { ActionIcon, Menu } from "@mantine/core";
import { IconListDetails, IconSettings, IconTrash } from "@tabler/icons-react";
import { IGroup } from "../../models";

export function GroupActions(group: IGroup) {
    return (
        <Menu shadow={"md"} width={200} withinPortal={true}>
            <Menu.Target>
                <ActionIcon>
                    <IconSettings size={"1.125rem"} />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Действия</Menu.Label>
                <Menu.Item
                    icon={<IconTrash size={14} />}
                    //onClick={() => open()}
                    color={"red"}
                >
                    Удалить
                </Menu.Item>
                <Menu.Item
                    icon={<IconListDetails size={14} />}
                    //onClick={() => open()}
                >
                    Настроить источники
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
