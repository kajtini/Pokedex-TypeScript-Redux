import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { Pokemon } from "../../types/types";

export const fetchPokemon = createAsyncThunk(
  "pokemons/fetchPokemon",
  async (currentPage: number) => {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=9&offset=${
        (currentPage - 1) * 9
      }`
    );
    const pokemonInfo = await Promise.all(
      res.data.results.map(
        async (result: { name: string; url: string }) =>
          await axios.get(result.url)
      )
    );
    const pokemons = pokemonInfo.map((pokemon) => pokemon.data);

    return pokemons;
  }
);

export const filterPokemon = createAsyncThunk(
  "pokemons/filterPokemon",
  async (search: string) => {
    const data = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
    );

    return data.data;
  }
);

interface PokemonState {
  pokemons: Array<Pokemon>;
  selectedPokemon: Pokemon | null;
  status: "idle" | "loading" | "succedded" | "failed";
  error: string | null;
}

const initialState: PokemonState = {
  pokemons: [],
  selectedPokemon: null,
  status: "idle",
  error: null,
};

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    pokemonSelected: (state, action: PayloadAction<Pokemon>) => {
      const selected = state.pokemons?.find(
        (pokemon) => pokemon.id === action.payload.id
      );

      if (selected) {
        state.selectedPokemon = selected;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.status = "succedded";
        state.pokemons = action.payload;
      })
      .addCase(filterPokemon.rejected, (state, action) => {
        state.status = "failed";
        if (action.error.message) {
          state.error = action.error.message;
        }
      })
      .addCase(filterPokemon.pending, (state) => {
        state.status = "loading";
      })
      .addCase(filterPokemon.fulfilled, (state, action) => {
        state.status = "succedded";
        state.pokemons = [action.payload];
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.status = "failed";
        if (action.error.message) {
          state.error = action.error.message;
        }
      });
  },
});

export const { pokemonSelected } = pokemonsSlice.actions;

export const selectAllPokemon = (state: RootState) => state.pokemons.pokemons;

export default pokemonsSlice.reducer;
