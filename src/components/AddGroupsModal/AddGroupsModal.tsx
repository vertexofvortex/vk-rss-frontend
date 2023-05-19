import {
  Avatar,
  Button,
  Flex,
  Group,
  LoadingOverlay,
  Modal,
  ModalProps,
  MultiSelect,
  PasswordInput,
  Select,
  SelectItem as SelectComponentItem,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { forwardRef, useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import { IKey } from "../../models";
import { IGroupExternal } from "../../models/Group";
import { getVKGroups } from "../../network/groups";
import { getKeys } from "../../network/keys";

interface IGroupMantine {
  image: string;
  label: string;
  value: string;
  description: string;
}

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  description: string;
}

interface KeyFormValues {
  usertoken_id: number;
  passphrase: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />

        <div>
          <Text>{label}</Text>
          <Text size="xs" color="dimmed">
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);

export function AddGroupsModal(props: ModalProps) {
  const fetcher = useFetcher();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [keys, setKeys] = useState<IKey[]>([]);
  const [groups, setGroups] = useState<IGroupExternal[]>([]);
  const [groupsMantine, setGroupsMantine] = useState<IGroupMantine[]>([]);
  const [step, setStep] = useState<"selectKey" | "addGroups">("selectKey");
  const [tokenId, setTokenId] = useState<string>();
  const [passphrase, setPassphrase] = useState<string>();

  const formKey = useForm<KeyFormValues>();
  const formGroups = useForm({
    initialValues: {
      groups: "",
    },
  });

  useEffect(() => {
    getKeys()
      .then((res) => setKeys(res.data))
      .catch((err) => console.log(err));
  }, []);

  function handleLoadGroups(usertoken_id: number, passphrase: string) {
    setIsLoading(true);

    getVKGroups(usertoken_id, passphrase)
      .then((res) => {
        setGroups(res.data);
        setTokenId(usertoken_id.toString());
        setPassphrase(passphrase);

        setStep("addGroups");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    let groups_mantine: IGroupMantine[] = [];

    groups.map((group) =>
      groups_mantine.push({
        image: group.photo_200,
        label: group.name,
        value: `${group.id}`,
        description: `@${group.screen_name}`,
      })
    );

    setGroupsMantine(groups_mantine);
  }, [groups]);

  function adaptKey(key: IKey): SelectComponentItem {
    return {
      label: key.name,
      value: key.id.toString(),
    };
  }

  return (
    <Modal {...props}>
      {/* TODO: loading blur */}
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      {step === "selectKey" && (
        <fetcher.Form
          onSubmit={formKey.onSubmit((values) =>
            handleLoadGroups(
              values.usertoken_id as number,
              values.passphrase as string
            )
          )}
        >
          <Select
            label={"Выберите ключ"}
            description={
              "С этой страницы будет получен список групп, в которых вы являетесь администратором"
            }
            mb={"md"}
            data={keys?.map((key) => adaptKey(key))}
            {...formKey.getInputProps("usertoken_id")}
          />
          <PasswordInput
            label={"Введите кодовую фразу для этого ключа"}
            mb={"md"}
            {...formKey.getInputProps("passphrase")}
          />
          <Button fullWidth type={"submit"}>
            Получить список групп
          </Button>
        </fetcher.Form>
      )}
      {step === "addGroups" && (
        <fetcher.Form
          onSubmit={formGroups.onSubmit((values) => {
            fetcher.submit(
              {
                groups: values.groups,
                usertoken_id: tokenId!,
                passphrase: passphrase!,
              },
              {
                method: "POST",
                action: "/groups/create",
              }
            );
            props.onClose();
          })}
        >
          <MultiSelect
            label="Выберите одну или несколько групп"
            description={
              "Они будут подключены к сервису, после чего в них можно будет создавать посты и прикреплять к ним нужные источники"
            }
            itemComponent={SelectItem}
            data={groupsMantine}
            searchable
            nothingFound="Nobody here"
            maxDropdownHeight={400}
            filter={(value, selected, item) =>
              !selected &&
              (item.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
                item.description
                  .toLowerCase()
                  .includes(value.toLowerCase().trim()))
            }
            mb={"md"}
            withinPortal={true}
            {...formGroups.getInputProps("groups")}
          />
          <Flex gap={"md"}>
            <Button fullWidth type="submit">
              Подключить
            </Button>
            <Button
              fullWidth
              variant={"light"}
              onClick={() => setStep("selectKey")}
            >
              Назад
            </Button>
          </Flex>
        </fetcher.Form>
      )}
    </Modal>
  );
}
