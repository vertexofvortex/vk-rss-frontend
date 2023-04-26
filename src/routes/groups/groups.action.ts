import { notifications } from "@mantine/notifications";
import { AxiosPromise, isAxiosError } from "axios";
import { ActionFunctionArgs, redirect } from "react-router-dom";
import { createGroup, removeGroup } from "../../network/groups";

export const createGroupAction = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  try {
    let formData = await request.formData();

    let groups_vk_ids = (formData.get("groups") as string).split(",");
    let usertoken_id = formData.get("usertoken_id");
    let passphrase = formData.get("passphrase");
    let requestPromises: AxiosPromise<any>[] = [];

    groups_vk_ids.map((group_vk_id) => {
      requestPromises.push(
        createGroup(
          parseInt(group_vk_id),
          parseInt(usertoken_id as string),
          passphrase as string
        )
      );
    });

    return Promise.all(requestPromises).then(() => {
      notifications.show({
        message:
          requestPromises.length == 1 ? "Группа добавлена" : "Группы добавлены",
      });

      return redirect("/groups");
    });
  } catch (error) {
    console.log("error", error);

    if (isAxiosError(error)) {
      return error;
    }
  }
};

export const deleteGroupAction = async ({ params }: ActionFunctionArgs) => {
  try {
    return removeGroup(parseInt((params as { id: string }).id)).then((res) => {
      notifications.show({
        message: "Группа удалена",
      });

      return redirect("/groups");
    });
  } catch (error) {
    console.log(error);

    if (isAxiosError(error)) return error;
  }
};
