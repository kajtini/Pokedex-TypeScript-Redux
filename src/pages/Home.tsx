import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/user/userSlice";

function Home() {
  const user = useAppSelector(selectUser);

  return (
    <Box>
      <Typography
        variant="h2"
        component="h1"
        sx={{ textAlign: "center", mb: 2 }}
      >
        Welcome to Pokedex
      </Typography>
      {user ? (
        <Link to="/pokemonList" style={{ all: "unset" }}>
          <Button
            size="large"
            variant="contained"
            sx={{ display: "block", marginInline: "auto" }}
          >
            Explore Pokemon
          </Button>
        </Link>
      ) : (
        <Link to="/signIn" style={{ all: "unset" }}>
          <Button
            size="large"
            variant="contained"
            sx={{ display: "block", marginInline: "auto" }}
          >
            Sign In
          </Button>
        </Link>
      )}
    </Box>
  );
}

export default Home;
