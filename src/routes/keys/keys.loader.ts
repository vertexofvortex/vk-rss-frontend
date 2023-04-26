import { AxiosResponse } from "axios";
import { IKey } from "../../models";
import { getKeys } from "../../network/keys";

export const loadKeys = async (): Promise<AxiosResponse<IKey[]>> => {
  return await getKeys();
};
