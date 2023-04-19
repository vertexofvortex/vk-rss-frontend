import { AppShell, Button } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useActionData, useNavigate, useSubmit } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AppHeader, InputPassword } from "../../components";
import { set } from "../../features/authSlice/authSlice";

interface FormValues {
  password: string;
}

export function Login() {
  const submit = useSubmit();
  const actionData = useActionData() as AxiosResponse;
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const loginForm = useForm<FormValues>({
    validate: {
      password: (v) => (v ? null : "Введите пароль"),
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!actionData) return;
    if (actionData.status != 200) return;

    dispatch(set(actionData.data.access_token));
    navigate("/");
  }, [actionData]);

  function handleLogin() {
    const fd = new FormData();
    fd.append("password", loginForm.values.password);
    fd.append("username", "admin");

    submit(fd, {
      method: "POST",
      action: "/login",
    });
  }

  return (
    <AppShell header={<AppHeader />} padding={"xl"} bg={"#FCFCFC"}>
      <Form form={loginForm}>
        <InputPassword
          placeholder={"Пароль"}
          description={"Введите пароль"}
          {...loginForm.getInputProps("password")}
        />
        <Button onClick={handleLogin}>Авторизоваться</Button>
      </Form>
    </AppShell>
  );
}
