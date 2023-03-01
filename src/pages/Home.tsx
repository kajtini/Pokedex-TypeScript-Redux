import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Box>
      <Typography
        variant="h2"
        component="h1"
        sx={{ textAlign: "center", mb: 2 }}
      >
        Welcome to Pokedex
      </Typography>
      <Link to="/pokemonList" style={{ all: "unset" }}>
        <Button
          size="large"
          variant="contained"
          sx={{ display: "block", marginInline: "auto" }}
        >
          Explore Pokemon
        </Button>
      </Link>
    </Box>
  );
}

export default Home;
