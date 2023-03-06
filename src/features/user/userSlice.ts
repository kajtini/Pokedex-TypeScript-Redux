import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { RootState } from "../../app/store";
import { auth, db } from "../../config/firebase";
import { Pokemon } from "../../types/types";

interface UserInfo {
  displayName: string;
  email: string;
  uid: string;
}

interface UserSliceState {
  user: UserInfo | null;
  favouritePokemons: {
    pokemons: Array<Pokemon>;
    status: "idle" | "loading" | "succedded" | "failed";
    error: string | null;
  };
}

const initialState: UserSliceState = {
  user: null,
  favouritePokemons: { pokemons: [], status: "idle", error: null },
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserInfo>) => {
      state.user = { ...action.payload };
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavouritePokemons.pending, (state) => {
        state.favouritePokemons.status = "loading";
      })
      .addCase(fetchFavouritePokemons.fulfilled, (state, action) => {
        state.favouritePokemons.status = "succedded";
        if (action.payload) {
          state.favouritePokemons.pokemons = action.payload;
        }
      })
      .addCase(fetchFavouritePokemons.rejected, (state, action) => {
        state.favouritePokemons.status = "failed";
        if (action.error.message) {
          state.favouritePokemons.error = action.error.message;
        }
      })
      .addCase(addFavouritePokemon.pending, (state) => {
        state.favouritePokemons.status = "loading";
      })
      .addCase(addFavouritePokemon.fulfilled, (state, action) => {
        state.favouritePokemons.status = "succedded";

        console.log(action.payload);

        if (action.payload) {
          console.log(action.payload);
          state.favouritePokemons.pokemons?.push(action.payload);
        }
      })
      .addCase(addFavouritePokemon.rejected, (state, action) => {
        state.favouritePokemons.status = "failed";
        if (action.error.message) {
          state.favouritePokemons.error = action.error.message;
        }
      })
      .addCase(removeFavouritePokemon.pending, (state) => {
        state.favouritePokemons.status = "loading";
      })
      .addCase(removeFavouritePokemon.fulfilled, (state, action) => {
        state.favouritePokemons.status = "succedded";

        console.log(action.payload);

        if (action.payload) {
          console.log(action.payload);
          state.favouritePokemons.pokemons =
            state.favouritePokemons.pokemons.filter(
              (pokemon) => pokemon.id !== action.payload
            );
        }
      })
      .addCase(removeFavouritePokemon.rejected, (state, action) => {
        state.favouritePokemons.status = "failed";
        if (action.error.message) {
          state.favouritePokemons.error = action.error.message;
        }
      });
  },
});

export const fetchFavouritePokemons = createAsyncThunk(
  "user/fetchFavouritePokemons",
  async (uid: string) => {
    const favouritesRef = collection(db, "users", uid, "favouritePokemon");
    const data = await getDocs(favouritesRef);
    const filteredData = data.docs.map((doc) => {
      return { ...doc.data() } as Pokemon;
    });

    return filteredData;
  }
);

export const addFavouritePokemon = createAsyncThunk(
  "user/addFavouritePokemon",
  async ({ pokemon, uid }: { pokemon: Pokemon; uid: string }) => {
    const favouritesRef = collection(db, "users", uid, "favouritePokemon");
    await setDoc(doc(favouritesRef, pokemon.name.toLowerCase()), pokemon);

    return { ...pokemon };
  }
);

export const removeFavouritePokemon = createAsyncThunk(
  "user/removeFavouritePokemon",
  async ({ pokemon, uid }: { pokemon: Pokemon; uid: string }) => {
    const favouriteDocRef = doc(
      db,
      "users",
      uid,
      "favouritePokemon",
      pokemon.name.toLowerCase()
    );

    await deleteDoc(favouriteDocRef);

    return pokemon.id;
  }
);

export const { login, logout } = userSlice.actions;

export const selectFavouritePokemons = (state: RootState) =>
  state.user.favouritePokemons.pokemons;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
