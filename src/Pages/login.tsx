import { useCallback, useState } from "react";
import {
  Button,
  TextField,
  Paper,
  Typography,
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigation = useNavigate();
  const [userRole, setUserRole] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  const handleLogin = useCallback(
    async (e: any) => {
      e.preventDefault();
      try {
        const { response }: any = await fetch("http://localhost:8080/log-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        localStorage.setItem("token", response?.token);
        navigation("/dashboard");
      } catch (error) {
        console.log(error);
      }
    },
    [navigation, password, email]
  );

  const handleSignUp = useCallback(
    async (e: any) => {
      e.preventDefault();
      try {
        const { response }: any = await fetch(
          "http://localhost:8080/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
              name: username,
              phoneNo: phone,
            }),
          }
        );
        localStorage.setItem("token", response?.token);
        navigation("/dashboard");
      } catch (error) {
        console.log(error);
      }
    },
    [email, navigation, password, phone, username]
  );

  const handleUserRole = useCallback((event: SelectChangeEvent) => {
    setUserRole(event.target.value as string);
  }, []);

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
          onSubmit={isSignUp ? handleSignUp : handleLogin}
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
                label="Phone Number"
                variant="outlined"
                fullWidth
                type="number"
                value={phone}
                onChange={(e) => {
                  const value = Math.max(0, parseInt(e?.target?.value))
                    .toString()
                    .slice(0, 10);
                  setPhone(value);
                }}
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
          {!isSignUp && (
            <FormControl fullWidth>
              <InputLabel id="userRole">User Role</InputLabel>
              <Select
                labelId="userRole"
                id="userRole"
                value={userRole}
                label="User Role"
                onChange={handleUserRole}
              >
                <MenuItem value={"student"}>Student</MenuItem>
                <MenuItem value={"buyer"}>Buyer</MenuItem>
                <MenuItem value={"seller"}>Seller</MenuItem>
              </Select>
            </FormControl>
          )}
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
