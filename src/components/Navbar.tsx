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
        <Toolbar>
          <Link
            style={{ all: "unset", marginRight: "auto", cursor: "pointer" }}
            to="/"
          >
            <Typography variant="h6" noWrap component="div">
              Pokedex
            </Typography>
          </Link>

          {user ? (
            <Stack direction="row" spacing={4} alignItems="center">
              <Typography>{user.displayName}</Typography>
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
