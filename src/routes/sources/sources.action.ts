import { notifications } from "@mantine/notifications";
import { isAxiosError } from "axios";
import { ActionFunctionArgs } from "react-router-dom";
import {
  createSourceWithForm,
  deleteSource,
  editSource,
} from "../../network/sources";

export const createSourceAction = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  try {
    let fd = await request.formData();

    return createSourceWithForm(fd);
  } catch (error) {
    if (isAxiosError(error)) {
      return error;
    }
  }
};

export const editSourceAction = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  try {
    let formData = await request.formData();

    return editSource(
      formData.get("title") as string,
      formData.get("description") as string,
      formData.get("rss_url") as string
    );
  } catch (error) {
    console.log(error);
  }
};

export const deleteSourceAction = async ({ params }: ActionFunctionArgs) => {
  try {
    notifications.show({
      message: "Источник удалён",
    });

    return deleteSource(parseInt((params as { id: string }).id));
  } catch (error) {
    notifications.show({
      message: "Произошла ошибка",
      color: "red",
    });

    if (isAxiosError(error)) return error;
  }
};
