import { Button, Container } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { useActionData, useNavigate, useSubmit } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { InputPassword } from "../../components";
import { set } from "../../features/auth/authSlice";

interface FormValues {
  password: string;
}

export function Login() {
  const submit = useSubmit();
  const actionData = useActionData() as AxiosResponse | null;
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

    if (actionData instanceof AxiosError) {
      loginForm.setFieldError("password", "Неверный пароль");

      return;
    }

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
    <Container>
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
  );
}

export default Login;
