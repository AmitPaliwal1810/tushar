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

export const ForgotPassword = () => {
  const navigation = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChangePassword = useCallback(() => {
    console.log({
      password,
    });
    navigation("/dashboard");
  }, [navigation, password]);

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
          Forget
        </Typography>
        <Stack component={"form"} spacing={2} onSubmit={handleChangePassword}>
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
            Update Password
          </Button>
        </Stack>
        <Stack alignItems="flex-end">
          <Button
            variant="text"
            sx={{
              textAlign: "flex-end",
            }}
            onClick={() => navigation("/")}
          >
            Login/SignUp
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};
