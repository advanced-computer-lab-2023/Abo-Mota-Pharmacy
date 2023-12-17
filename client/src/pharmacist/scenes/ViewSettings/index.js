import { useGetPharmacistQuery } from "../../../store";
import "./styles.css";
import LoadingIndicator from "../../../shared/components/LoadingIndicator";
import { Box, Card, Typography, Divider, Button, Avatar } from "@mui/joy";
import { useNavigate } from "react-router";
import ChangePassword from "../../../shared/components/ChangePassword";

const ViewSettings = () => {
  const { data, isFetching, error } = useGetPharmacistQuery();
  // const data = {
  //   wallet: 1000,
  // };
  const navigate = useNavigate();
  console.log(data);
  if (isFetching) {
    return <LoadingIndicator />;
  }
  console.log(data);
  return (
    <Box className="mx-20 my-10">
      <Typography level="h1" fontWeight={700}>
        Account Settings
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Card className="mb-5">
        <Box className="">
          <Typography level="title-md">Wallet</Typography>
          <Typography level="h1" fontWeight={500}>
            {data.wallet} USD
          </Typography>
        </Box>

        <Divider />

        <Box className="flex justify-center"></Box>
      </Card>

      <Typography level="h2" fontWeight={400}>
        Manage My Account
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Card
        className="mb-5 transition-transform hover:scale-105 bg-white text-black cursor-pointer"
        // onClick={() => navigate("/pharmacist/changePassword")}
      >
        <Box className="p-4">
          <Typography level="h3" component="div" fontWeight={500}>
            Change Password
          </Typography>
          <Divider />
          <Typography variant="h3" component="div" fontWeight={500}>
            {" "}
          </Typography>
          <ChangePassword isPharmacist/>
        </Box>
      </Card>
    </Box>
  );
};

export default ViewSettings;
