import { AppShell, Button, Container, Flex } from "@mantine/core";
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
  const actionData = useActionData() as AxiosResponse | boolean;
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const loginForm = useForm<FormValues>({
    validate: {
      password: (v) => (v ? null : "Введите пароль"),
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData == undefined || actionData == null) return;
    if (typeof actionData === "boolean") {
      return;
    }
    if (actionData.status != 200) return;

    dispatch(set(actionData.data.access_token));
    navigate("/");
  }, [actionData]);

  function handleLogin() {
    if (loginForm.validate().hasErrors) return;

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
      <Flex align={"center"} h={"100%"}>
        <Container size={"xs"} style={{ flexGrow: 1 }}>
          <Form form={loginForm}>
            <InputPassword
              placeholder={"Пароль"}
              description={"Введите пароль"}
              {...loginForm.getInputProps("password")}
              mb={"md"}
            />
            <Button onClick={handleLogin} fullWidth>
              Авторизоваться
            </Button>
          </Form>
        </Container>
      </Flex>
    </AppShell>
  );
}

export default Login;