import { AppShell, Header, Navbar } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { AppHeader, AppNavbar } from "../../components";

export function Root() {
    return (
        <AppShell navbar={<AppNavbar />} header={<AppHeader />} padding={"xl"}>
            <Outlet />
        </AppShell>
    );
}
