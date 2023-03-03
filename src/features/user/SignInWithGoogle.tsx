import React from "react";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../app/hooks";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../config/firebase";
import { login } from "./userSlice";
import GoogleIcon from "@mui/icons-material/Google";

function SignInWithGoogle() {
  const dispatch = useAppDispatch();

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
    <Button
      startIcon={<GoogleIcon />}
      size="large"
      variant="outlined"
      onClick={handleSignInWithGoogle}
      sx={{ width: "100%" }}
    >
      Sign In With Google
    </Button>
  );
}

export default SignInWithGoogle;
