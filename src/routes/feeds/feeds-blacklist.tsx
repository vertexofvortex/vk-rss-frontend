import { Grid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { PaginationBlock, PostCard } from "../../components";
import { IPost } from "../../models";
import { paginatePosts } from "../../reusables";

export function FeedsBlacklist() {
  const { data } = useLoaderData() as AxiosResponse<IPost[]>;
  const [activePage, setActivePage] = useState<number>(1);
  const mobileWidth = useMediaQuery("(max-width: 851px)");

  return (
    <>
      <PaginationBlock
        itemsTotal={data.length}
        pageLength={36}
        actions={[activePage, setActivePage]}
        mb={"md"}
        grow
      />
      <Grid mb={"md"}>
        {paginatePosts(data, activePage).map((item) => (
          <Grid.Col key={item.id} span={mobileWidth ? 12 : 4}>
            <PostCard {...item} />
          </Grid.Col>
        ))}
      </Grid>
      <PaginationBlock
        itemsTotal={data.length}
        pageLength={36}
        actions={[activePage, setActivePage]}
        mb={"md"}
        grow
      />
    </>
  );
}

export default FeedsBlacklist;
