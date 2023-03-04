import compose from "compose-function";
import { WithAuth } from "./with-auth";
import { WithRouter } from "./with-router";

export const WithProviders = compose(WithRouter, WithAuth);
