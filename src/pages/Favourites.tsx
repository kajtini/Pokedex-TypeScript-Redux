import { all } from "axios";
import { collection, doc, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { db } from "../config/firebase";
import PokemonExcerpt from "../features/pokemons/PokemonExcerpt";
import {
  fetchPokemon,
  pokemonSelected,
} from "../features/pokemons/pokemonsSlice";
import {
  fetchFavouritePokemons,
  selectFavouritePokemons,
  selectUser,
} from "../features/user/userSlice";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ClipLoader from "react-spinners/ClipLoader";
import PokemonModal from "../features/pokemons/PokemonModal";
import { selectOpen } from "../features/modal/modalSlice";

function Favourites() {
  const user = useAppSelector(selectUser);
  const isOpen = useAppSelector(selectOpen);
  const selectedPokemon = useAppSelector(
    (state) => state.pokemons.selectedPokemon
  );
  const dispatch = useAppDispatch();
  const favouritePokemons = useAppSelector(selectFavouritePokemons);
  const favouritePokemonStatus = useAppSelector(
    (state) => state.user.favouritePokemons.status
  );

  useEffect(() => {
    if (user) {
      dispatch(fetchFavouritePokemons(user.uid));
    }
  }, []);

  let content;

  if (favouritePokemonStatus === "loading") {
    content = (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
          width: "100%",
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
  } else if (favouritePokemonStatus === "succedded") {
    content = (
      <Grid container spacing={3} sx={{ flexGrow: 1 }}>
        {favouritePokemons.map((pokemon) => (
          <PokemonExcerpt key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid>
    );
  } else if (favouritePokemonStatus === "failed") {
    content = (
      <Box>
        <Typography variant="h2" component="p">
          Failed fetching favourite pokemon
        </Typography>
      </Box>
    );
  }

  console.log("Selected Pokemon :" + selectedPokemon?.name);

  return (
    <>
      {content}
      {isOpen && selectedPokemon && <PokemonModal pokemon={selectedPokemon} />}
    </>
  );
}

export default Favourites;
