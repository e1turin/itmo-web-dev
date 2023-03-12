import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken } from "entities/auth/lib";
import { api, client } from "shared/api";
import type { Attempt, Point } from "shared/api/types";
import { defaultPoint } from "shared/api/types";

export const fetchAttempts = createAsyncThunk(
  "points/fetchPoints",
  async () => {
    const response = await client.get(api.getAllAttempts, {
      headers: {
        Authorization: getToken(),
      },
    });
    console.log("[fetchAttempts]", response.data);
    return response.data;
  }
);

export const addNewAttempt = createAsyncThunk(
  "points/addNewPoint",
  async (point: Point) => {
    const response = await client.post(api.createAttempt, point, {
      headers: {
        Authorization: getToken(),
      },
    });
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

export const attemptReducer = attemptsSlice.reducer;

export const selectAllAttempts = (state: any): Attempt<Point>[] =>
  state.attempts.attempts;
