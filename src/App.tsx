import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Navbar from "./components/Navbar";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  fetchPokemon,
  selectAllPokemon,
} from "./features/pokemons/pokemonsSlice";
import PokemonList from "./features/pokemons/PokemonList";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const dispatch = useAppDispatch();
  const allPokemon = useAppSelector(selectAllPokemon);

  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 5,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemonList" element={<PokemonList />} />
          </Routes>
        </Box>
      </Container>
    </>
  );
}

export default App;
