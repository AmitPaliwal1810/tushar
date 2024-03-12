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
import { ButtonList, IData, dummyData } from "../Data/dashboard.data";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

export const Dashboard = () => {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "Mobile";
  const navigation = useNavigate();
  const [data, setData] = useState<IData[] | null>(null);
  const [wantToSell, setWantTOSell] = useState<boolean>(false);
  const [productTitle, setProductTitle] = useState<string>("");
  const [productDesc, setProductDesc] = useState<string>("");
  const [sellerAddress, setSellerAddress] = useState<string>("");
  const [sellerContact, setSellerContact] = useState<string>("");

  useEffect(() => {
    setData(dummyData[`${category}`]);
  }, [category, searchParams]);

  const handleButtonClick = useCallback(
    (button: string) => {
      setSearchParams((prev) => ({ ...prev, category: button }));
    },
    [setSearchParams]
  );

  const handleSubmitSellingForm = useCallback(() => {
    console.log("hi");
  }, []);

  return (
    <>
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
            <TextField
              label="Seller Contact"
              value={sellerContact}
              onChange={(e) => {
                setSellerContact(e.target.value);
              }}
            />
            <TextField
              label="Seller Address"
              value={sellerAddress}
              onChange={(e) => {
                setSellerAddress(e.target.value);
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
          <Typography variant="subtitle1" mb={2}>
            Category
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" spacing={1}>
              {ButtonList.map((button, index) => (
                <Button
                  key={index}
                  variant={category === button ? "contained" : "outlined"}
                  sx={{
                    textTransform: "none",
                  }}
                  onClick={() => handleButtonClick(button)}
                >
                  {button}
                </Button>
              ))}
            </Stack>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                textTransform: "none",
              }}
              onClick={() => navigation("/")}
            >
              Logout
            </Button>
          </Stack>
        </Card>

        <Stack spacing={2} mt={4} minHeight={580}>
          {data?.length ? (
            data?.map(({ title, desription }, index) => (
              <Card key={index}>
                <Stack spacing={1} p={2}>
                  <Typography>Title: {title}</Typography>
                  <Typography>Description: {desription}</Typography>
                  <Stack alignItems="flex-start">
                    <Button variant="contained">Buy</Button>
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
