import { Grid, Pagination } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { PostCard } from "../../components";
import { IPost } from "../../models";

export function FeedsBlacklist() {
  const { data } = useLoaderData() as AxiosResponse<IPost[]>;
  const [activePage, setActivePage] = useState<number>(1);
  const mobileWidth = useMediaQuery("(max-width: 851px)");

  return (
    <>
      <Pagination
        value={activePage}
        onChange={setActivePage}
        total={Math.floor(data.length / 36) + 1}
        mb={"md"}
        grow
      />
      <Grid mb={"md"}>
        {data.slice((activePage - 1) * 36, activePage * 36).map((item) => (
          <Grid.Col key={item.id} span={mobileWidth ? 12 : 4}>
            <PostCard {...item} />
          </Grid.Col>
        ))}
      </Grid>
      <Pagination
        value={activePage}
        onChange={setActivePage}
        total={Math.floor(data.length / 36) + 1}
        mb={"md"}
        grow
      />
    </>
  );
}

export default FeedsBlacklist;
