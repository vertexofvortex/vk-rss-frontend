import { ActionIcon, TextInput } from "@mantine/core";
import { TextInputProps } from "@mantine/core/lib/TextInput";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";

export function InputPassword(props: TextInputProps) {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  return (
    <TextInput
      {...props}
      type={isHidden ? "password" : "text"}
      rightSection={
        <ActionIcon onClick={() => setIsHidden(!isHidden)}>
          {isHidden ? (
            <IconEye size={"1rem"} opacity={0.5} />
          ) : (
            <IconEyeOff size={"1rem"} opacity={0.5} />
          )}
        </ActionIcon>
      }
    />
  );
}
