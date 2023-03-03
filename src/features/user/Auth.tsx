import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login, selectUser } from "./userSlice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SignInWithGoogle from "./SignInWithGoogle";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const canProceed = isLoggingIn
    ? email && password
    : email && password && name;

  useEffect(() => {
    if (user) {
      navigate("/pokemonList");
    }
  }, [user]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handleSwitchActionButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    isLoggingIn ? setIsLoggingIn(false) : setIsLoggingIn(true);
  };

  const dispatchUserInfo = (
    displayName: string | null,
    email: string | null,
    uid: string | null
  ) => {
    if (displayName && email && uid) {
      dispatch(login({ displayName, email, uid }));
    }
  };

  const handleLogin = async () => {
    try {
      const userAuth = await signInWithEmailAndPassword(auth, email, password);

      dispatchUserInfo(
        userAuth.user.displayName,
        userAuth.user.email,
        userAuth.user.uid
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async () => {
    try {
      const userAuth = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userAuth.user, {
        displayName: name,
      });

      dispatchUserInfo(
        userAuth.user.displayName,
        userAuth.user.email,
        userAuth.user.uid
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 400 }}>
      <Typography variant="h3" component="p" mb={4}>
        Get Started!
      </Typography>
      <Box component="form">
        <Stack spacing={2}>
          {!isLoggingIn && (
            <TextField
              type="text"
              variant="outlined"
              label="Name"
              value={name}
              onChange={handleNameChange}
            />
          )}
          <TextField
            type="text"
            variant="outlined"
            label="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            type="password"
            variant="outlined"
            label="Password"
            value={password}
            onChange={handlePasswordChange}
          />

          <Button
            size="large"
            variant="contained"
            sx={{ width: "100%" }}
            disabled={!canProceed ? true : false}
            onClick={isLoggingIn ? handleLogin : handleRegister}
          >
            {isLoggingIn ? "Login" : "Register"}
          </Button>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="body1">
              {isLoggingIn
                ? "Don't have an account?"
                : "Already have an account?"}
            </Typography>
            <Button variant="text" onClick={handleSwitchActionButton}>
              {isLoggingIn ? "Register" : "Log In"}
            </Button>
          </Stack>

          <SignInWithGoogle />
        </Stack>
      </Box>
    </Box>
  );
}

export default Auth;
