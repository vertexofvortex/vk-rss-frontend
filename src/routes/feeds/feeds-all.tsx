import { Grid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import {
  FeedCategoriesBlock,
  PaginationBlock,
  PostCard,
} from "../../components";
import { IPost } from "../../models/Post";
import { filterPosts, paginatePosts } from "../../reusables";

export function FeedsAll() {
  const { data } = useLoaderData() as AxiosResponse<IPost[]>;
  const [activePage, setActivePage] = useState<number>(1);
  const [activeCategory, setActiveCategory] = useState<string>();
  const mobileWidth = useMediaQuery("(max-width: 851px)");
  const postsCart = useAppSelector((state) => state.postsCart.posts);

  return (
    <>
      <FeedCategoriesBlock
        data={data}
        actions={[activeCategory, setActiveCategory]}
      />
      <PaginationBlock
        itemsTotal={filterPosts(data, activeCategory).length}
        pageLength={36}
        actions={[activePage, setActivePage]}
        mb={"md"}
        grow
      />
      <Grid mb={"md"}>
        {paginatePosts(filterPosts(data, activeCategory), activePage).map(
          (item) => (
            <Grid.Col key={item.id} span={mobileWidth ? 12 : 4}>
              <PostCard {...item} isInCart={item.id in postsCart} />
            </Grid.Col>
          )
        )}
      </Grid>
      <PaginationBlock
        itemsTotal={filterPosts(data, activeCategory).length}
        pageLength={36}
        actions={[activePage, setActivePage]}
        mb={"md"}
        grow
      />
    </>
  );
}

export default FeedsAll;
