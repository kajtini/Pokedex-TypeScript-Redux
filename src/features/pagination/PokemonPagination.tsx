import Pagination from "@mui/material/Pagination";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { pageSelected, selectCurrentPage } from "./paginationSlice";

function PokemonPagination() {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(selectCurrentPage);

  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    dispatch(pageSelected(value));
  };

  return (
    <Pagination
      count={10}
      page={currentPage}
      onChange={handleChange}
      sx={{
        mt: 3,
        ml: { sm: "auto" },
      }}
      size="large"
      color="primary"
    />
  );
}

export default PokemonPagination;
