import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "shared/api";
import type { Attempt, Point } from "shared/api/types";
import { defaultPoint } from "shared/api/types";

export const fetchAttempts = createAsyncThunk(
  "points/fetchPoints",
  async () => {
    const response = await client.get("/points");
    return response.data;
  }
);

export const addNewAttempt = createAsyncThunk(
  "points/addNewPoint",
  async (initialPoint: Point) => {
    const response = await client.post("/points/add", initialPoint);
    return response.data;
  }
);

export const attemptsSlice = createSlice({
  name: "attempts",
  initialState: {
    currentR: defaultPoint.r,
    attempts: [] as Attempt<Point>[],
    status: "idle" as "idle" | "loading" | "succeeded" | "failed",
    error: "",
  },
  reducers: {
    selectR: (state, action) => {
      state.currentR = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAttempts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAttempts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.attempts = action.payload.slice();
      })
      .addCase(fetchAttempts.rejected, (state, action) => {
        state.status = "failed";
        if (action.error.message) {
          state.error = action.error.message;
        }
      })
      .addCase(addNewAttempt.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.attempts.push(action.payload);
      });
  },
});

export const { selectR } = attemptsSlice.actions;

export const reducer = attemptsSlice.reducer;

export const selectAllAttempts = (state: any): Attempt<Point>[] =>
  state.attemps.attempts;
