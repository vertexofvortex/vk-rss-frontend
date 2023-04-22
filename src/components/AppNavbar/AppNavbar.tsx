import { Badge, Loader, NavLink, Navbar } from "@mantine/core";
import {
  IconChevronRight,
  IconKey,
  IconListDetails,
  IconNews,
  IconShare,
  IconUsersGroup,
} from "@tabler/icons-react";
import { NavLink as RouterLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import styles from "./AppNavbar.module.scss";

// TODO: loaders for all links (мб их декомпозировать?)
export function AppNavbar() {
  return (
    <Navbar width={{ base: 300 }}>
      <AppNavbarContent />
    </Navbar>
  );
}

interface Props {
  drawerActions?: {
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
  };
}

export function AppNavbarContent({ drawerActions }: Props) {
  const postsCart = useAppSelector((state) => state.postsCart.posts);

  return (
    <>
      <Navbar.Section grow>
        <RouterLink to={"/sources"} className={styles.link}>
          {({ isActive, isPending }) => (
            <NavLink
              label="Источники новостей"
              description={
                "Добавьте или удалите источники, которые будут предоставлять вам новости"
              }
              icon={
                !isPending ? (
                  <IconListDetails size={20} />
                ) : (
                  <Loader size={20} />
                )
              }
              rightSection={<IconChevronRight size={20} />}
              active={isActive}
              onClick={drawerActions && drawerActions.close}
            />
          )}
        </RouterLink>
        <NavLink
          label="Ленты"
          description={"Выберите новости, которые хотите опубликовать"}
          icon={<IconNews size={20} />}
          rightSection={<IconChevronRight size={20} />}
        >
          <RouterLink to={"/feeds/all"} className={styles.link}>
            {({ isActive, isPending }) => (
              <NavLink
                label="Общая лента"
                icon={
                  !isPending ? (
                    <IconListDetails size={20} />
                  ) : (
                    <Loader size={20} />
                  )
                }
                rightSection={<IconChevronRight size={20} />}
                active={isActive}
                onClick={drawerActions && drawerActions.close}
              />
            )}
          </RouterLink>
          <RouterLink to={"/feeds/groups"} className={styles.link}>
            {({ isActive, isPending }) => (
              <NavLink
                label="Ленты подключенных групп"
                icon={
                  !isPending ? (
                    <IconListDetails size={20} />
                  ) : (
                    <Loader size={20} />
                  )
                }
                rightSection={<IconChevronRight size={20} />}
                active={isActive}
                onClick={drawerActions && drawerActions.close}
              />
            )}
          </RouterLink>
        </NavLink>
        <RouterLink to={"/groups"} className={styles.link}>
          {({ isActive, isPending }) => (
            <NavLink
              icon={<IconUsersGroup size={20} />}
              label={"Подключенные группы"}
              description={
                "Подключите группы к сервису и настройте для них источники"
              }
              rightSection={<IconChevronRight size={20} />}
              active={isActive}
              onClick={drawerActions && drawerActions.close}
            />
          )}
        </RouterLink>
        <RouterLink to={"/keys"} className={styles.link}>
          {({ isActive, isPending }) => (
            <NavLink
              icon={<IconKey size={20} />}
              label={"Подключенные токены"}
              description={"Управление подключенными ключами доступа"}
              rightSection={<IconChevronRight size={20} />}
              active={isActive}
              onClick={drawerActions && drawerActions.close}
            />
          )}
        </RouterLink>
      </Navbar.Section>
      <Navbar.Section>
        <RouterLink to={"/publish"} className={styles.link}>
          {({ isActive, isPending }) => (
            <NavLink
              icon={
                Object.keys(postsCart).length > 0 ? (
                  <Badge
                    size="xs"
                    variant="filled"
                    color="red"
                    w={20}
                    h={20}
                    p={0}
                  >
                    {Object.keys(postsCart).length}
                  </Badge>
                ) : (
                  <IconShare size={20} />
                )
              }
              label={"Публикация"}
              description={"Опубликуйте выбранные новости на стене сообщества"}
              rightSection={<IconChevronRight size={20} />}
              active={isActive}
              onClick={drawerActions && drawerActions.close}
            />
          )}
        </RouterLink>
      </Navbar.Section>
    </>
  );
}
