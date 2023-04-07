import {
    Button,
    InputBase,
    LoadingOverlay,
    Modal,
    ModalProps,
    PasswordInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import { IKey } from "../../models";
import { getKeys } from "../../network/keys";

export function AddGroupsModal(props: ModalProps) {
    const fetcher = useFetcher();
    const [keys, setKeys] = useState<IKey[]>();

    useEffect(() => {
        getKeys()
            .then((res) => setKeys(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <Modal {...props}>
            {/* TODO: loading blur */}
            <LoadingOverlay visible={false} overlayBlur={2} />
            <fetcher.Form>
                <InputBase
                    label={"Выберите ключ"}
                    description={
                        "С этой страницы будет получен список групп, в которых вы являетесь администратором"
                    }
                    component={"select"}
                    mb={"md"}
                >
                    {keys?.map((key) => (
                        <option key={key.id}>{key.name}</option>
                    ))}
                </InputBase>
                <PasswordInput
                    label={"Введите кодовую фразу для этого ключа"}
                    mb={"md"}
                />
                <Button fullWidth>Получить список групп</Button>
                {/* <MultiSelect
            label={"fff"}
            itemComponent={SelectItem}
            data={}
        /> */}
            </fetcher.Form>
        </Modal>
    );
}
