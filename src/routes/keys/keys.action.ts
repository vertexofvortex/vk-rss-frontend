import { isAxiosError } from "axios";
import { ActionFunctionArgs, redirect } from "react-router-dom";
import { IKeyCreate } from "../../models";
import { createKey, deleteKey } from "../../network/keys";

export const createKeyAction = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  try {
    const data = Object.fromEntries(await request.formData());
    const res = await createKey(data as IKeyCreate);

    return redirect("/keys");
  } catch (error) {
    console.log("error", error);

    if (isAxiosError(error)) {
      return error;
    }
  }
};

export const deleteKeyAction = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  return deleteKey(Number(params.id)).then(() => redirect("/keys"));
};
