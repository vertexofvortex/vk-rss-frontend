import { Accordion, Badge, Flex, UnstyledButton } from "@mantine/core";
import { memo } from "react";
import { IPost } from "../../models";

interface Props {
  data: IPost[];
  actions: [
    string | undefined,
    React.Dispatch<React.SetStateAction<string | undefined>>
  ];
}

export const FeedCategoriesBlock = memo(({ data, actions }: Props) => {
  function parseCategories(): Set<string> {
    return new Set(
      data.map((post) => post.categories).filter((category) => category != null)
    );
  }

  return (
    <Accordion variant={"contained"} mb={"md"}>
      <Accordion.Item value={"categories"}>
        <Accordion.Control>Категории</Accordion.Control>
        <Accordion.Panel>
          <Flex wrap={"wrap"} gap={3}>
            <UnstyledButton onClick={() => actions[1](undefined)}>
              <Badge
                variant={!actions[0] ? "filled" : "outline"}
                style={{
                  width: "fit-content",
                }}
                mr={0}
              >
                Все
              </Badge>
            </UnstyledButton>
            {[...parseCategories()].map((category) => (
              <UnstyledButton
                onClick={() => actions[1](category)}
                key={category}
              >
                <Badge
                  variant={category == actions[0] ? "filled" : "outline"}
                  style={{
                    width: "fit-content",
                  }}
                  mr={0}
                >
                  {category}
                </Badge>
              </UnstyledButton>
            ))}
          </Flex>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
});

export default FeedCategoriesBlock;
