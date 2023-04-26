import { AxiosResponse } from "axios";
import { IGroup } from "../../models";
import { getGroups } from "../../network/groups";

export const loadGroups = async (): Promise<AxiosResponse<IGroup[]>> => {
  return await getGroups();
};
