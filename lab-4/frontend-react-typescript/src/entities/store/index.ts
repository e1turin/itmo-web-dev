import { configureStore } from "@reduxjs/toolkit";

import { attemptReducer } from "entities/attempt";

export const store = configureStore({
  reducer: {
    attempts: attemptReducer,
  },
});
