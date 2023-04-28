import { ActionFunctionArgs } from "react-router-dom";
import { blockPost, unblockPost } from "../../network/posts";

export const blockPostAction = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  return blockPost(parseInt(params.id!));
};

export const unblockPostAction = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  return unblockPost(parseInt(params.id!));
};
