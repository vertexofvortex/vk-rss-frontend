import { Alert, AppShell, Text } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { isRouteErrorResponse, Outlet, useRouteError } from "react-router-dom";
import { AppHeader, AppNavbar } from "../../components";

interface Props {
    isError?: boolean;
}

export function Root({ isError }: Props) {
    const error = useRouteError();

    return (
        <AppShell navbar={<AppNavbar />} header={<AppHeader />} padding={"xl"}>
            {!isError ? (
                <Outlet />
            ) : (
                <Alert
                    icon={<IconAlertCircle size="1rem" />}
                    title="Ошибка!"
                    color="red"
                >
                    <Text>
                        Произошла ошибка маршрутизации:
                        {isRouteErrorResponse(error) && (
                            <b>{` ${error.status} ${error.statusText}`}</b>
                        )}
                        . Если вы считаете, что так быть не должно, обратитесь к
                        разработчику.
                    </Text>
                </Alert>
            )}
        </AppShell>
    );
}
