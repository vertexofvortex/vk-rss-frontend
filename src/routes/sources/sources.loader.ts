import { AxiosResponse } from "axios";
import { ISource } from "../../models";
import { getSources } from "../../network/sources";

export const sourcesLoader = async (): Promise<AxiosResponse<ISource[]>> => {
  return await getSources();
};
