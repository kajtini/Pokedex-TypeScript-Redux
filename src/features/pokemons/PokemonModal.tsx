import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Pokemon } from "../../types/types";
import Stack from "@mui/material/Stack";
import PokemonBaseInfo from "./PokemonBaseInfo";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { modalClosed, selectOpen } from "../modal/modalSlice";
import { selectFavouritePokemons, selectUser } from "../user/userSlice";
import AddToFavourites from "../user/AddToFavourites";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface PokemonModalProps {
  pokemon: Pokemon;
}

function PokemonModal({ pokemon }: PokemonModalProps) {
  const [isInFavourites, setIsInFavourites] = useState(false);
  const user = useAppSelector(selectUser);
  const isOpen = useAppSelector(selectOpen);
  const favouritePokemons = useAppSelector(selectFavouritePokemons);
  const dispatch = useAppDispatch();
  const loadingSelectedPokemon = useAppSelector(
    (state) => state.pokemons.loadingSelectedPokemon
  );

  const checkIfInFavourites = (pokemon: Pokemon) => {
    const foundPokemon = favouritePokemons?.find(
      (favPokemon) => favPokemon.id === pokemon.id
    );

    console.log(`Found Pokemon ${foundPokemon?.name}`);

    foundPokemon ? setIsInFavourites(true) : setIsInFavourites(false);
  };

  // console.log(pokemon.name);
  // console.log(favouritePokemons);

  useEffect(() => {
    if (loadingSelectedPokemon === false) {
      checkIfInFavourites(pokemon);
    }
  }, [favouritePokemons, loadingSelectedPokemon]);

  const handleClose = () => dispatch(modalClosed());

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 3,
            maxWidth: "375px",
            width: "100%",
          }}
        >
          {!loadingSelectedPokemon ? (
            <>
              <Stack spacing={3} mb={3}>
                <PokemonBaseInfo pokemon={pokemon} />
              </Stack>

              {user && (
                <AddToFavourites
                  isInFavourites={isInFavourites}
                  pokemon={pokemon}
                />
              )}
            </>
          ) : (
            <Box
              sx={{
                marginInline: "auto",
                width: "100%",
                display: "flex",
                justifyContent: "center",
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
          )}
        </Box>
      </Modal>
    </>
  );
}

export default PokemonModal;
