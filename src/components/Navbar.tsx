import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link
            style={{ all: "unset", flexGrow: 1, cursor: "pointer" }}
            to="/pokemonList"
          >
            <Typography variant="h6" noWrap component="div">
              Pokedex
            </Typography>
          </Link>

          <Button variant="outlined">Sign In</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
