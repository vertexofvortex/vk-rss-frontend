import { ActionIcon, Menu, Table } from "@mantine/core";
import { IconAdjustments, IconEdit, IconTrash } from "@tabler/icons-react";
import { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { SourceActions } from "../../components";
import { ISource } from "../../models";

export function Sources() {
    const { data } = useLoaderData() as AxiosResponse<ISource[]>;

    return (
        <Table striped>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Ссылка на RSS</th>
                    <th>Описание</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>
                            <a href={item.rss_url} target="_blank">
                                {item.rss_url}
                            </a>
                        </td>
                        <td>{item.description}</td>
                        <td
                            style={{
                                display: "flex",
                                justifyContent: "right",
                            }}
                        >
                            <SourceActions />
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
