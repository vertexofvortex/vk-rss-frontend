import { ActionFunctionArgs } from "react-router-dom";
import { login } from "../../network/auth";

export const loginAction = async ({ params, request }: ActionFunctionArgs) => {
  const fd = await request.formData();
  let response;

  try {
    response = await login(fd);
  } catch (error) {
    return error;
  }

  return response;
};
