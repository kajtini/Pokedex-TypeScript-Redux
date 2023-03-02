import { Pokemon } from "../../types/types";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useAppDispatch } from "../../app/hooks";
import { pokemonSelected } from "./pokemonsSlice";
import PokemonBaseInfo from "./PokemonBaseInfo";
import { modalOpened } from "../modal/modalSlice";

interface PokemonExcerptProps {
  pokemon: Pokemon;
}

function PokemonExcerpt({ pokemon }: PokemonExcerptProps) {
  const dispatch = useAppDispatch();

  const handleLearnMore = () => {
    dispatch(pokemonSelected(pokemon));
    dispatch(modalOpened());
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper
        elevation={2}
        sx={{
          p: 3,
        }}
      >
        <Stack spacing={3}>
          <PokemonBaseInfo pokemon={pokemon} />
          <Button
            sx={{ width: "50%", alignSelf: "center" }}
            variant="contained"
            size="large"
            onClick={handleLearnMore}
          >
            Learn More
          </Button>
        </Stack>
      </Paper>
    </Grid>
  );
}

export default PokemonExcerpt;
