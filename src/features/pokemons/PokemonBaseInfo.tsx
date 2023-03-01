import { Pokemon } from "../../types/types";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

interface PokemonBaseInfoProps {
  pokemon: Pokemon;
}

function PokemonBaseInfo({ pokemon }: PokemonBaseInfoProps) {
  return (
    <>
      <img
        src={pokemon.sprites.other.dream_world.front_default}
        style={{
          maxHeight: "180px",
          display: "block",
          marginInline: "auto",
        }}
        alt="pokemon image"
      />
      <Box>
        <Typography variant="h4" textAlign="center">
          {pokemon.id}
          {". "}
          {pokemon.name}
        </Typography>
      </Box>

      <Stack direction="row" spacing={3} justifyContent="center">
        {pokemon.types.map((type) => (
          <Paper key={type.slot} sx={{ py: 1, px: 3 }}>
            <Box>{type.type.name}</Box>
          </Paper>
        ))}
      </Stack>
    </>
  );
}

export default PokemonBaseInfo;
