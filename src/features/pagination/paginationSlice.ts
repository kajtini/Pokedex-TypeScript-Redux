import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Pagination {
  currentPage: number;
  allPages: number;
}

const initialState: Pagination = {
  currentPage: 1,
  allPages: 10,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    pageSelected: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const selectCurrentPage = (state: RootState) =>
  state.pagination.currentPage;

export const { pageSelected } = paginationSlice.actions;

export default paginationSlice.reducer;
