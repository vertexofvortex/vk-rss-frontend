import { notifications } from "@mantine/notifications";
import { ActionFunctionArgs } from "react-router-dom";
import { blockPost, unblockPost } from "../../network/posts";

export const blockPostAction = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  notifications.show({
    message:
      "Новость добавлена в чёрный список, она больше не будет отображаться в ленте",
    color: "red",
  });
  return blockPost(parseInt(params.id!));
};

export const unblockPostAction = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  notifications.show({
    message: "Новость восстановлена из чёрного списка",
    color: "green",
  });
  return unblockPost(parseInt(params.id!));
};
