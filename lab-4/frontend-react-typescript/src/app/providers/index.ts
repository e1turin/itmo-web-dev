import compose from "compose-function";
import { WithAuth } from "./with-auth";
import { WithRouter } from "./with-router";
import { WithStorage } from "./with-store";

export const WithProviders = compose(WithAuth, WithRouter, WithStorage);
