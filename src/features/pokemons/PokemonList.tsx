import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPokemon, selectAllPokemon } from "./pokemonsSlice";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import PokemonExcerpt from "./PokemonExcerpt";
import { Pagination, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import ClipLoader from "react-spinners/ClipLoader";
import PokemonModal from "./PokemonModal";
import { selectOpen } from "../modal/modalSlice";
import TextField from "@mui/material/TextField";
import SearchPokemonForm from "./SearchPokemonForm";
import PokemonPagination from "../pagination/PokemonPagination";
import { selectCurrentPage } from "../pagination/paginationSlice";

function PokemonList() {
  const pokemonStatus = useAppSelector((state) => state.pokemons.status);
  const pokemon = useAppSelector(selectAllPokemon);
  const dispatch = useAppDispatch();
  const selectedPokemon = useAppSelector(
    (state) => state.pokemons.selectedPokemon
  );
  const currentPage = useAppSelector(selectCurrentPage);
  const isOpen = useAppSelector(selectOpen);

  useEffect(() => {
    if (pokemonStatus === "idle") {
      dispatch(fetchPokemon(1));
    }
  }, [pokemonStatus, dispatch]);

  useEffect(() => {
    dispatch(fetchPokemon(currentPage));
  }, [currentPage]);

  let content;

  if (pokemonStatus === "loading") {
    content = (
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginInline: "auto",
        }}
      >
        <ClipLoader
          color="white"
          loading={true}
          size={200}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </Box>
    );
  } else if (pokemonStatus === "succedded") {
    content = (
      <>
        <SearchPokemonForm />
        <Grid
          container
          spacing={3}
          justifyContent="flex-start"
          alignItems="stretch"
        >
          {pokemon.length > 1 ? (
            <>
              {pokemon.map((pokemon) => (
                <PokemonExcerpt key={pokemon.id} pokemon={pokemon} />
              ))}
              <PokemonPagination />
            </>
          ) : (
            <PokemonExcerpt key={pokemon[0].id} pokemon={pokemon[0]} />
          )}
        </Grid>
      </>
    );
  } else if (pokemonStatus === "failed") {
    content = (
      <Box>
        <SearchPokemonForm />
        <Typography variant="h2" component="p">
          No Pokemon Found
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        flexGrow: 1,
      }}
    >
      {content}
      {isOpen && selectedPokemon && <PokemonModal pokemon={selectedPokemon} />}
    </Box>
  );
}

export default PokemonList;
