import { configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from "../features/pokemons/pokemonsSlice";
import modalReducer from "../features/modal/modalSlice";
import paginationReducer from "../features/pagination/paginationSlice";

export const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    modal: modalReducer,
    pagination: paginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
