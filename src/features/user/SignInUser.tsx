import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login, selectUser } from "./userSlice";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SignInUser() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/pokemonList");
    }
  }, [user]);

  const handleSignInWithGoogle = async () => {
    try {
      const userAuth = await signInWithPopup(auth, new GoogleAuthProvider());

      if (
        userAuth.user.displayName &&
        userAuth.user.email &&
        userAuth.user.uid
      ) {
        dispatch(
          login({
            displayName: userAuth.user.displayName,
            uid: userAuth.user.uid,
            email: userAuth.user.email,
          })
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Button
        startIcon={<GoogleIcon />}
        size="large"
        variant="outlined"
        onClick={handleSignInWithGoogle}
      >
        Sign In With Google
      </Button>
    </Box>
  );
}

export default SignInUser;
