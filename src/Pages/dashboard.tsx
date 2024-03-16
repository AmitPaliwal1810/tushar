import {
  Stack,
  Card,
  Button,
  useTheme,
  Typography,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import { dataDummy } from "../Data/dashboard.data";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

export const Dashboard = () => {
  const theme = useTheme();
  const navigation = useNavigate();
  const [feedbackState, setFeedbackState] = useState<any>({
    open: false,
  });
  const [feedbackDesc, setFeedbackDesc] = useState<string>("");
  const [wantToSell, setWantTOSell] = useState<boolean>(false);
  const [productTitle, setProductTitle] = useState<string>("");
  const [productDesc, setProductDesc] = useState<string>("");
  const [products, setProducts] = useState<any>(null);
  const [newPassword, setNewPassword] = useState<string>("");
  const [isUpdatePassword, setIsUpdatePassword] = useState<boolean>(false);

  const handleSubmitSellingForm = useCallback(
    async (e: any) => {
      e.preventDefault();
      try {
        await fetch(`http://localhost:8080/v2/auth/sell-product`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: productTitle,
            description: productDesc,
          }),
        });
      } catch (error) {
        console.log(error);
      }
      console.log("hi");
    },
    [productDesc, productTitle]
  );

  const handleFeedbackSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      try {
        const { response }: any = await fetch(
          `http://localhost:8080/v1/auth/feedback`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              description: feedbackDesc,
            }),
          }
        );
        localStorage.setItem("token", response?.token);
        setFeedbackDesc("");
        setFeedbackState({
          open: false,
        });
      } catch (error) {
        console.log(error);
      }
    },
    [feedbackDesc]
  );

  const handleBuyProduct = useCallback(async (e: any, id: string) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:8080/v1/auth/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getProductDetails = useCallback(async () => {
    try {
      const { response }: any = await fetch(
        `http://localhost:8080/v1/auth/products`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: feedbackDesc,
          }),
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [feedbackDesc]);

  useEffect(() => {
    getProductDetails();
  }, [getProductDetails]);

  const handleChangePassword = useCallback(
    async (e: any) => {
      e.preventDefault();
      try {
        const { response }: any = await fetch(
          `http://localhost:8080/v1/auth/update-password`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password: newPassword,
            }),
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    [newPassword]
  );

  return (
    <>
      <Dialog
        open={isUpdatePassword}
        onClose={() => {
          setIsUpdatePassword(false);
        }}
      >
        <DialogTitle>Update Password</DialogTitle>
        <Stack
          component={"form"}
          spacing={2}
          onSubmit={handleChangePassword}
          p={2}
        >
          <TextField
            fullWidth
            label="Update Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </Dialog>
      <Dialog
        open={feedbackState.open}
        onClose={() => {
          setFeedbackDesc("");
          setFeedbackState({
            open: false,
          });
        }}
      >
        <DialogTitle textAlign="center">Feedback</DialogTitle>
        <Stack
          component="form"
          onSubmit={handleFeedbackSubmit}
          spacing={2}
          mt={2}
          width={400}
          p={4}
        >
          <TextField
            fullWidth
            label="Feedback"
            value={feedbackDesc}
            onChange={(e) => {
              setFeedbackDesc(e.target.value);
            }}
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </Dialog>
      <Dialog open={wantToSell} onClose={() => setWantTOSell(false)}>
        <DialogTitle textAlign="center">Selling Form</DialogTitle>
        <DialogContent>
          <Stack
            component={"form"}
            onSubmit={handleSubmitSellingForm}
            spacing={2}
            mt={2}
            width={400}
          >
            <TextField
              fullWidth
              label="Product Title"
              value={productTitle}
              onChange={(e) => {
                setProductTitle(e.target.value);
              }}
            />
            <TextField
              label="Product Description"
              value={productDesc}
              onChange={(e) => {
                setProductDesc(e.target.value);
              }}
            />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
      <Stack
        sx={{
          width: "100%",
        }}
      >
        <Card
          elevation={2}
          sx={{
            padding: theme.spacing(2, 1),
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" spacing={1}>
              <Typography variant="h4">Products List</Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                onClick={() => {
                  setIsUpdatePassword(true);
                }}
                sx={{
                  textTransform: "none",
                }}
              >
                Update Password
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  textTransform: "none",
                }}
                onClick={() => {
                  localStorage.setItem("token", "");
                  navigation("/");
                }}
              >
                Logout
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  setFeedbackState({
                    open: true,
                  })
                }
              >
                Feedback
              </Button>
            </Stack>
          </Stack>
        </Card>

        <Stack spacing={2} mt={4} minHeight={580}>
          {dataDummy?.length ? (
            dataDummy?.map(({ title, desription }, index) => (
              <Card elevation={4} key={index}>
                <Stack spacing={1} p={2}>
                  <Typography>Title: {title}</Typography>
                  <Typography>Description: {desription}</Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Button
                      variant="contained"
                      onClick={(e) => handleBuyProduct(e, title)}
                    >
                      Buy
                    </Button>
                  </Stack>
                </Stack>
              </Card>
            ))
          ) : (
            <Typography>No Data Found</Typography>
          )}
        </Stack>
      </Stack>
      <Stack
        direction="row"
        justifyContent="flex-end"
        sx={{
          position: "sticky",
          bottom: 40,
          padding: 1,
        }}
        onClick={() => setWantTOSell(true)}
      >
        <Fab variant="extended">Sell</Fab>
      </Stack>
    </>
  );
};
