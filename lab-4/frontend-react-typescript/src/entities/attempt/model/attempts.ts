import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { getToken } from "entities/auth/lib";
import { api, client } from "shared/api";
import { defaultPoint } from "shared/api/types";
import type { Attempt, ErrorResponse, Point } from "shared/api/types";

export const fetchAttempts = createAsyncThunk(
  "points/fetchPoints",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await client.get(api.getAllAttempts, {
        headers: {
          Authorization: getToken(),
        },
      });
      console.log("[fetchAttempts] response", response);
      return response.data;
    } catch (e) {
      let error = e as AxiosError<ErrorResponse>;
      console.log("[fetchAttempts] error=", error);
      if (!error.response) {
        throw e;
      }
      return rejectWithValue({
        status: error.response.status,
        error: error.response.data,
      });
    }
  }
);

export const addNewAttempt = createAsyncThunk(
  "points/addNewPoint",
  async (point: Point, { rejectWithValue }) => {
    try {
      const response = await client.post(api.createAttempt, point, {
        headers: {
          Authorization: getToken(),
        },
      });
      console.log("[addNewAttempt] response=", response);
      return response.data;
    } catch (e) {
      let error = e as AxiosError<ErrorResponse>;
      console.log("[addNewAttempt] error=", error);
      if (!error.response) {
        throw e;
      }
      return rejectWithValue({
        status: error.response.status,
        error: error.response.data,
      });
    }
  }
);

export const attemptsSlice = createSlice({
  name: "attempts",
  initialState: {
    currentR: defaultPoint.r,
    attempts: [] as Attempt<Point>[],
    status: "idle" as "idle" | "loading" | "succeeded" | "failed",
    error: "",
    authFailed: false,
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
        state.authFailed = false;
        // state.status = "idle";
      })
      .addCase(fetchAttempts.rejected, (state, action) => {
        state.status = "failed";
        const payload = action.payload as {
          status: number;
          error: ErrorResponse;
        };
        if (payload) {
          state.error = payload.error.error;
          state.authFailed = payload.status == 403 || payload.status == 401;
          if (state.authFailed) {
            console.error("Auth failed");
          }
        }
      })
      .addCase(addNewAttempt.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.attempts.push(action.payload);
        state.authFailed = false;
        // state.status = "idle";
      })
      .addCase(addNewAttempt.rejected, (state, action) => {
        state.status = "failed";
        const payload = action.payload as {
          status: number;
          error: ErrorResponse;
        };
        if (payload) {
          state.error = payload.error.error;
          state.authFailed = payload.status == 403 || payload.status == 401;
          if (state.authFailed) {
            console.error("Auth failed");
          }
        }
      });
  },
});

export const { selectR } = attemptsSlice.actions;

export const attemptReducer = attemptsSlice.reducer;

export const selectAllAttempts = (state: any): Attempt<Point>[] =>
  state.attempts.attempts;
