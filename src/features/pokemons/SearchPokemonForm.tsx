import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { fetchPokemon, filterPokemon } from "./pokemonsSlice";
import HomeIcon from "@mui/icons-material/Home";
import Home from "@mui/icons-material/Home";
import { pageSelected } from "../pagination/paginationSlice";

function SearchPokemonForm() {
  const [filter, setFilter] = useState("");
  const dispatch = useAppDispatch();

  const canSearch = Boolean(filter);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (canSearch) {
      dispatch(filterPokemon(filter));
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilter(e.target.value);

  const handleHomeClick = () => {
    dispatch(fetchPokemon(1));
    dispatch(pageSelected(1));
  };

  return (
    <Box component="form" sx={{ mr: "auto", mb: 3 }} onSubmit={handleSubmit}>
      <Stack direction="row" spacing={2}>
        <TextField
          id="outlined-basic"
          label="Search Pokemon"
          variant="outlined"
          value={filter}
          onChange={handleFilterChange}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!canSearch ? true : false}
        >
          <SearchIcon />
        </Button>
        <Button type="submit" variant="contained" onClick={handleHomeClick}>
          <HomeIcon />
        </Button>
      </Stack>
    </Box>
  );
}

export default SearchPokemonForm;
