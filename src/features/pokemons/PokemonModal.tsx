import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Pokemon } from "../../types/types";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import PokemonBaseInfo from "./PokemonBaseInfo";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { modalClosed, selectOpen } from "../modal/modalSlice";

interface PokemonModalProps {
  pokemon: Pokemon;
}

function PokemonModal({ pokemon }: PokemonModalProps) {
  const isOpen = useAppSelector(selectOpen);
  const dispatch = useAppDispatch();

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
          }}
        >
          <Stack spacing={3}>
            <PokemonBaseInfo pokemon={pokemon} />
          </Stack>

          <Button sx={{ width: "100%" }} variant="outlined" size="large">
            Add To Favourites!
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default PokemonModal;
