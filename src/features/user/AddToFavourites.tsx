import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addFavouritePokemon,
  removeFavouritePokemon,
  selectUser,
} from "./userSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { Pokemon } from "../../types/types";

interface AddToFavouritesProps {
  pokemon: Pokemon;
  isInFavourites: boolean;
}

function AddToFavourites({ isInFavourites, pokemon }: AddToFavouritesProps) {
  const favouritePokemonStatus = useAppSelector(
    (state) => state.user.favouritePokemons.status
  );
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleAddToFavourites = () => {
    if (pokemon && user) {
      dispatch(addFavouritePokemon({ pokemon: pokemon, uid: user.uid }));
    }
  };

  const handleRemoveFromFavourites = () => {
    if (pokemon && user) {
      dispatch(removeFavouritePokemon({ pokemon: pokemon, uid: user.uid }));
    }
  };

  let content;

  if (favouritePokemonStatus === "loading") {
    content = <CircularProgress color="primary" />;
  }

  return (
    <Button
      sx={{ width: "100%" }}
      variant="outlined"
      size="large"
      onClick={
        isInFavourites ? handleRemoveFromFavourites : handleAddToFavourites
      }
    >
      {content ||
        (isInFavourites ? "Remove From Favourites" : "Add To Favourites")}
    </Button>
  );
}

export default AddToFavourites;
