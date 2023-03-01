import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface ModalStateType {
  isOpen: boolean;
}

const initialState: ModalStateType = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalOpened: (state) => {
      state.isOpen = true;
    },

    modalClosed: (state) => {
      state.isOpen = false;
    },
  },
});

export const { modalOpened, modalClosed } = modalSlice.actions;

export const selectOpen = (state: RootState) => state.modal.isOpen;

export default modalSlice.reducer;
