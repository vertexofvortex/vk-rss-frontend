import { Accordion, Text } from "@mantine/core";
import { IPost, ISource } from "../../models";

interface Props {
    source: ISource;
    posts: IPost[];
}

export function GroupFeed({ source, posts }: Props) {
    return (
        <Accordion variant={"contained"} chevronPosition={"left"}>
            <Accordion.Item value={"test"}>
                <Accordion.Control>
                    <Text weight={"bold"}>test</Text>
                </Accordion.Control>
            </Accordion.Item>
        </Accordion>
    );
}
