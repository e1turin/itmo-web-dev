import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "shared/api";
import { Point } from "shared/api/types";

export const fetchPoints = createAsyncThunk("points/fetchPoints", async () => {
  const response = await client.get("/points");
  return response.data;
});

export const addNewPoint = createAsyncThunk(
  "points/addNewPoint",
  async (initialPoint: Point) => {
    const response = await client.post("/points/add", initialPoint);
    return response.data;
  }
);

export const pointsSlice = createSlice({
  name: "points",
  initialState: {
    points: [] as Point[],
    status: "idle" as "idle" | "loading" | "succeeded" | "failed",
    error: "",
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPoints.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPoints.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.points = state.points.concat(action.payload);
      })
      .addCase(fetchPoints.rejected, (state, action) => {
        state.status = "failed";
        if (action.error.message) {
          state.error = action.error.message;
        }
      })
      .addCase(addNewPoint.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.points.push(action.payload);
      });
  },
});

export const {} = pointsSlice.actions;

export const reducer = pointsSlice.reducer;

export const selectAllPoints = (state: any) => state.points.points;
