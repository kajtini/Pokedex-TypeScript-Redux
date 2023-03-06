import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Navbar from "./components/Navbar";
import PokemonList from "./features/pokemons/PokemonList";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./features/user/Auth";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  fetchFavouritePokemons,
  login,
  logout,
  selectUser,
} from "./features/user/userSlice";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import Favourites from "./pages/Favourites";

function App() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        if (userAuth.displayName && userAuth.email && userAuth.uid) {
          dispatch(
            login({
              displayName: userAuth.displayName,
              uid: userAuth.uid,
              email: userAuth.uid,
            })
          );
        }
        dispatch(fetchFavouritePokemons(userAuth.uid));
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Navbar />
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            width: "100%",
            flexGrow: 1,
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
            <Route path="/signIn" element={<Auth />} />
            <Route path="/favourites" element={<Favourites />} />
          </Routes>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
