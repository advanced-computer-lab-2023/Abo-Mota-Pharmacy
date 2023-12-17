import React from 'react';
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";
import shampooImage from "../shared/assets/shampoo1.png";

const PatientHome = () => {
    const imageAlt = 'Shampoo Image';
    const imageWidth = 5568;
    const imageHeight = 2088;
    const navigate = useNavigate();
    const handleClickShop = () => {
        navigate("/patient/medicine");
    };
    return (
        <div className="relative body-xs">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 ml-5">
          <div className="bg-transparent p-2">
            <div className="text-white text-4xl font-normal">Good hair days ahead!</div>
            <div className="text-white text-xl font-light">Tap now to uncover our favorite picks.</div>
            <div className="mt-3">
              <Button variant="soft" size="lg" style={{ color: 'black' }} onClick={handleClickShop}>
                Shop Now!
              </Button>
            </div>
          </div>
        </div>
            <img
                src={shampooImage}
                alt={imageAlt}
                width={imageWidth}
                height={imageHeight}
                loading="lazy"
                className="slideshow__image"
            />

        </div>
    );
};
export default PatientHome;