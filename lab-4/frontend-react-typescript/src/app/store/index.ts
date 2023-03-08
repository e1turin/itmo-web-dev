import { configureStore } from "@reduxjs/toolkit";

import { reducer } from "entities/point";

export const store = configureStore({
  reducer: {
    tasks: reducer,
  },
});
