import { configureStore } from "@reduxjs/toolkit";

import { reducer } from "entities/attempt";

export const store = configureStore({
  reducer: {
    attempts: reducer,
  },
});
