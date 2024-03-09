import { useCallback, useState } from "react";
import {
  Button,
  TextField,
  Paper,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigation = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  const handleLogin = useCallback(() => {
    console.log({
      username,
      password,
    });
    navigation("/dashboard");
  }, [navigation, password, username]);

  const handleSignUp = useCallback(() => {
    console.log({
      username,
      password,
    });
    navigation("/dashboard");
  }, [navigation, password, username]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: 300 }}>
        <Typography variant="h5" mb={2} textAlign="center">
          {!isSignUp ? "Login" : "Sign-Up"}
        </Typography>
        <Stack
          component={"form"}
          spacing={2}
          onSubmit={!isSignUp ? handleSignUp : handleLogin}
        >
          {isSignUp && (
            <>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </>
          )}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            {!isSignUp ? "Login" : "SignUp"}
          </Button>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Button
            variant="text"
            sx={{
              textAlign: "flex-end",
            }}
            onClick={() => navigation("/forget-password")}
          >
            Forget Pasword
          </Button>
          <Button
            variant="text"
            sx={{
              textAlign: "flex-end",
            }}
            onClick={() => setIsSignUp((prev) => !prev)}
          >
            {isSignUp ? "Login" : "SignUp"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};
