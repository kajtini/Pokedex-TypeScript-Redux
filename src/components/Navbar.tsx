import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout, selectUser } from "../features/user/userSlice";
import Stack from "@mui/material/Stack";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

function Navbar() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleSignOut = async () => {
    dispatch(logout());

    signOut(auth);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack direction="row" alignItems="center">
            <Link
              style={{ all: "unset", marginRight: "24px", cursor: "pointer" }}
              to="/"
            >
              <Typography variant="h6" noWrap component="p">
                Pokedex
              </Typography>
            </Link>

            <Link
              to="/favourites"
              style={{
                all: "unset",
                display: "block",
                cursor: "pointer",
              }}
            >
              <Typography variant="body1" noWrap component="p">
                Favourites
              </Typography>
            </Link>
          </Stack>

          {user ? (
            <Stack
              direction="row"
              spacing={{ xs: 0, sm: 4 }}
              alignItems="center"
            >
              <Typography sx={{ display: { xs: "none", sm: "block" } }}>
                {user.displayName}
              </Typography>
              <Button variant="outlined" onClick={handleSignOut}>
                Sign Out
              </Button>
            </Stack>
          ) : (
            <Link to="/signIn" style={{ all: "unset" }}>
              <Button variant="outlined">Sign In</Button>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
