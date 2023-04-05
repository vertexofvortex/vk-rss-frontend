import { ActionIcon, Menu } from "@mantine/core";
import { IconAdjustments, IconEdit, IconTrash } from "@tabler/icons-react";

export function SourceActions() {
    return (
        <Menu shadow={"md"} width={200}>
            <Menu.Target>
                <ActionIcon>
                    <IconAdjustments size="1.125rem" />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Действия</Menu.Label>
                <Menu.Item icon={<IconTrash size={14} />}>Удалить</Menu.Item>
                <Menu.Item icon={<IconEdit size={14} />}>
                    Редактировать
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
