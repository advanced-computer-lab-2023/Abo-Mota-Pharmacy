import { useLocation } from "react-router";
import { Box, Card, Typography, Divider, Button, Avatar } from "@mui/joy";
import { FaCartPlus } from "react-icons/fa";
import { useAddToCartMutation } from "../../../store";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Toast from "../../Toast";
const AlternativesScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("kimo", location.state.filteredArray);
  const [addToCart] = useAddToCartMutation();
  const [toast, setToast] = useState({
    open: false,
    duration: 2000,
  });
  const onToastClose = (event, reason) => {
    if (reason === "clickaway") return;

    setToast({
      ...toast,
      open: false,
    });
  };
  if (location.state.filteredArray.length === 0)
    return (
      <div className="flex justify-center items-center">
        <Typography variant="h5" component="div" fontWeight={500}>
          No alternatives found
        </Typography>
      </div>
    );
  const handleAddToCart = async (name) => {
    await addToCart({
      name,
    });
    setToast({
      ...toast,
      open: true,
      color: "success",
      message: "Added to cart!",
    });
    setTimeout(() => {
      navigate("/patient/medicine");
    }, 1500);
  };

  const mappedArray = location.state.filteredArray.map((item) => {
    // console.log(item);
    let urlImage =
      "https://www.shutterstock.com/image-vector/vector-illustration-medicine-jar-on-260nw-1352994935.jpg";
    const bytesImage = new Uint8Array(item.medicineImage.data.data);
    const blobImage = new Blob([bytesImage], {
      type: item.medicineImage.contentType,
    });
    urlImage = URL.createObjectURL(blobImage);
    return (
      <Card className="mb-5 bg-white text-black">
        <Box className="p-4">
          {/* Flex container to hold both parts of the text */}
          <div className="flex items-end">
            {/* First part of the text */}
            <Typography
              component="span" // 'span' to keep it inline
              level="h2" // Made larger
              fontWeight={700} // Make it bolder
              className="mr-2" // Add some margin to the right
            >
              {item.name}
            </Typography>
            {/* Second part of the text */}
            <Typography
              component="span" // 'span' to keep it inline
              level="h4" // Made larger
              fontWeight={500} // Slightly less bold
            >
              ({item.medicinalUse})
            </Typography>
          </div>
          <Divider />
          <br />
          <div className="prescription-container">
            <img className="prescription-image" src={urlImage} alt="Aspirin Logo" />
            <div>
              <Typography variant="h5" component="div" fontWeight={500}>
                Medicinal Use: {item.medicinalUse}
              </Typography>
              <Typography variant="h5" component="div" fontWeight={500}>
                Description: {item.description}
              </Typography>
              <Typography variant="h5" component="div" fontWeight={500}>
                Price: {item.price} EGP
              </Typography>
            </div>
          </div>
          <div className="blue-imp-button-container">
            {item.quantity === 0 ? (
              <Typography variant="h5" component="div" fontWeight={500}>
                Out of Stock
              </Typography>
            ) : (
              <Button
                variant="contained"
                className="absolute bottom-0 left-0 m-4 bg-blue-1000 hover:bg-black text-white w-22 blue-imp-button" // w-10 is 40px in Tailwind CSS
                onClick={() => handleAddToCart(item.name)}
              >
                <FaCartPlus className="mr-2" />
                Add to Cart
              </Button>
            )}
          </div>
        </Box>
      </Card>
    );
  });
  return (
    <Box className="mx-20 my-10">
      <Typography level="h1" fontWeight={700}>
        Alternatives
      </Typography>
      <Divider sx={{ my: 2 }} />
      {mappedArray}
      <Toast {...toast} onClose={onToastClose} />
    </Box>
  );
};

export default AlternativesScreen;
