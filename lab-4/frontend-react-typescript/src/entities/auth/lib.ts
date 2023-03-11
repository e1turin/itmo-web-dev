import { UserCredential } from "shared/api/types";
import { config } from "shared/conftg";
import { getStorageValue } from "shared/lib";

export const getToken = () => {
  return getStorageValue<UserCredential | null>(
    config.userLocalStorageKey,
    null
  )?.token;
};
