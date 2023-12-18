import React from 'react';
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";
import shampooImage from "../shared/assets/shampoo1.png";
import vichyImage from "../shared/assets/vichy1.png";
import vichy2 from "../shared/assets/vichy2.jpg";
import eucerin from "../shared/assets/eucerin.jpg";
import laroche from "../shared/assets/laroche.png";
import blue from "../shared/assets/blue.jpeg";
import medicine from "../shared/assets/medicine.jpeg";
import vaccine from "../shared/assets/vaccine.jpg";
import med from "../shared/assets/med.jpg";
import pharma from "../shared/assets/pharma.jpg";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Divider from '@mui/joy/Divider';
import Chip from '@mui/joy/Chip';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

const PatientHome = () => {
  const imageAlt = 'Shampoo Image';
  const imageWidth = 5568;
  const imageHeight = 2088;
  const navigate = useNavigate();

  

  const images = [
    {
      url: vichyImage,
      title: 'Shop Now!',
      width: '40%',


    },
  ];
  const images1 = [
    {
      url: vichy2,
      title: 'Shop Now!',
      width: '40%',

    },
  ];
  const images2 = [
    {
      url: eucerin,
      title: 'Shop Now!',
      width: '40%',

    },
  ];
  const images3 = [
    {
      url: laroche,
      title: 'Shop Now!',
      width: '40%',

    },
  ];
  const images4 = [
    {
      url: medicine,
      title: 'Shop Now!',
      width: '40%',

    },
  ];
  const images5 = [
    {
      url: vaccine,
      title: 'Shop Now!',
      width: '40%',

    },
  ];
  const images6 = [
    {
      url: med,
      title: 'Shop Now!',
      width: '40%',

    },
  ];
  const images7 = [
    {
      url: pharma,
      title: 'Shop Now!',
      width: '40%',

    },
  ];
  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
  }));

  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  });

  const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  }));

  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  }));

  const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  }));
  const handleClickShop = () => {
    navigate("/patient/medicine");
  };

  const content = (
    <Box sx={{ fontSize: 'sm', color: 'text.tertiary' }}>

    </Box>
  );
  const options = {
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    animateOut: 'slodeOutUp',
    nav: false,
    dots: false,
    margin: 0,
    responsive: {
      1100: {
        items: 2,
      },
      724: {
        items: 1,
      },
      500: {
        items: 1,
      },
      370: {
        items: 1,

      },
    },
  };

 
  return (
    

    <div className="relative body-xs">

      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 ml-5 ">
        <div className="bg-transparent p-2">
          <div className="text-white text-4xl font-normal">Good days ahead!</div>
          <div className="text-white text-xl font-light">Tap to uncover our favorite picks</div>
          <div className="mt-3">
            <Button variant="soft" size="lg" style={{ color: 'black' }} onClick={handleClickShop}>
              Shop Now!
            </Button>
          </div>
        </div>
      </div>

      
      <img
        src={blue}
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
        loading="lazy"
        className="slideshow__image max-h-96"
      />
      

      <div className=" absolute mt-20 w-full ">
        <div className="w-screen mb-5">
          {/* <div className="text-black text-4xl font-normal">Featured Products</div>
          <Divider /> */}
          <Stack spacing={1} className="flex items-center justify-center">
            <Divider className="border-t-5 border-blue-500">
              <div className=" text-4xl font-normal text-black">Featured Cosmetics</div>
            </Divider>
            {content}
          </Stack>
        </div>

        <OwlCarousel className='owl-theme ml-5' {...options}>
          <div class='item mx-0'>
            <h4>
              <div className="group relative cursor-pointer overflow-hidden w-11/12 ">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }} className=" w-fit">
                  {images.map((image) => (
                    <ImageButton
                      focusRipple
                      key={image.title}
                      style={{
                        width: '100%',
                      }}
                      onClick={handleClickShop}
                    >
                      <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                      <ImageBackdrop className="MuiImageBackdrop-root" />
                      <Image>
                        <Typography
                          component="span"
                          variant="subtitle1"
                          color="inherit"
                          sx={{
                            position: 'relative',
                            p: 4,
                            pt: 2,
                            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                          }}
                        >
                          {image.title}
                          <ImageMarked className="MuiImageMarked-root" />
                        </Typography>
                      </Image>
                    </ImageButton>
                  ))}
                </Box>
              </div>
            </h4>
          </div>
          <div class='item mx-0'>
            <h4>
              <div className="group relative cursor-pointer overflow-hidden w-11/12 ">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }} className=" w-fit">
                  {images1.map((image) => (
                    <ImageButton
                      focusRipple
                      key={image.title}
                      style={{
                        width: '100%',

                      }}
                      onClick={handleClickShop}
                    >
                      <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                      <ImageBackdrop className="MuiImageBackdrop-root" />
                      <Image>
                        <Typography
                          component="span"
                          variant="subtitle1"
                          color="inherit"
                          sx={{
                            position: 'relative',
                            p: 4,
                            pt: 2,
                            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                          }}
                        >
                          {image.title}
                          <ImageMarked className="MuiImageMarked-root" />
                        </Typography>
                      </Image>
                    </ImageButton>
                  ))}
                </Box>
              </div>
            </h4>
          </div>
          <div class='item mx-0'>
            <h4>
              <div className="group relative cursor-pointer overflow-hidden w-11/12 ">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }} className=" w-fit">
                  {images2.map((image) => (
                    <ImageButton
                      focusRipple
                      key={image.title}
                      style={{
                        width: '100%',
                      }}
                      onClick={handleClickShop}
                    >
                      <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                      <ImageBackdrop className="MuiImageBackdrop-root" />
                      <Image>
                        <Typography
                          component="span"
                          variant="subtitle1"
                          color="inherit"
                          sx={{
                            position: 'relative',
                            p: 4,
                            pt: 2,
                            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                          }}
                        >
                          {image.title}
                          <ImageMarked className="MuiImageMarked-root" />
                        </Typography>
                      </Image>
                    </ImageButton>
                  ))}
                </Box>
              </div>
            </h4>
          </div>
          <div class='item mx-0'>
            <h4>
              <div className="group relative cursor-pointer overflow-hidden w-11/12 ">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }} className=" w-fit">
                  {images3.map((image) => (
                    <ImageButton
                      focusRipple
                      key={image.title}
                      style={{
                        width: '100%',
                      }}
                      onClick={handleClickShop}
                    >
                      <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                      <ImageBackdrop className="MuiImageBackdrop-root" />
                      <Image>
                        <Typography
                          component="span"
                          variant="subtitle1"
                          color="inherit"
                          sx={{
                            position: 'relative',
                            p: 4,
                            pt: 2,
                            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                          }}
                        >
                          {image.title}
                          <ImageMarked className="MuiImageMarked-root" />
                        </Typography>
                      </Image>
                    </ImageButton>
                  ))}
                </Box>
              </div>
            </h4>
          </div>
        </OwlCarousel>
      </div>


      <div className="absolute mt-96 ml-0 mb-0" style={{ top: '100%',width: '100%', height: '100vh' }}>
        <div className="w-screen mb-5 mt-20">
          {/* <div className="text-black text-4xl font-normal">Featured Products</div>
          <Divider /> */}
          <Stack spacing={1} className="flex items-center justify-center">
            <Divider className="border-t-5 border-blue-500">
              <div className=" text-4xl font-normal text-black">Featured Medicines</div>
            </Divider>
            {content}
          </Stack>
        </div>

        <OwlCarousel className='owl-theme ml-5' {...options}>
          <div class='item mx-0'>
            <h4>
              <div className="group relative cursor-pointer overflow-hidden w-11/12 ">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }} className=" w-fit">
                  {images4.map((image) => (
                    <ImageButton
                      focusRipple
                      key={image.title}
                      style={{
                        width: '100%',
                      }}
                      onClick={handleClickShop}
                    >
                      <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                      <ImageBackdrop className="MuiImageBackdrop-root" />
                      <Image>
                        <Typography
                          component="span"
                          variant="subtitle1"
                          color="inherit"
                          sx={{
                            position: 'relative',
                            p: 4,
                            pt: 2,
                            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                          }}
                        >
                          {image.title}
                          <ImageMarked className="MuiImageMarked-root" />
                        </Typography>
                      </Image>
                    </ImageButton>
                  ))}
                </Box>
              </div>
            </h4>
          </div>
          <div class='item mx-0'>
            <h4>
              <div className="group relative cursor-pointer overflow-hidden w-11/12 ">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }} className=" w-fit">
                  {images5.map((image) => (
                    <ImageButton
                      focusRipple
                      key={image.title}
                      style={{
                        width: '100%',

                      }}
                      onClick={handleClickShop}
                    >
                      <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                      <ImageBackdrop className="MuiImageBackdrop-root" />
                      <Image>
                        <Typography
                          component="span"
                          variant="subtitle1"
                          color="inherit"
                          sx={{
                            position: 'relative',
                            p: 4,
                            pt: 2,
                            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                          }}
                        >
                          {image.title}
                          <ImageMarked className="MuiImageMarked-root" />
                        </Typography>
                      </Image>
                    </ImageButton>
                  ))}
                </Box>
              </div>
            </h4>
          </div>
          <div class='item mx-0'>
            <h4>
              <div className="group relative cursor-pointer overflow-hidden w-11/12 ">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }} className=" w-fit">
                  {images6.map((image) => (
                    <ImageButton
                      focusRipple
                      key={image.title}
                      style={{
                        width: '100%',
                      }}
                      onClick={handleClickShop}
                    >
                      <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                      <ImageBackdrop className="MuiImageBackdrop-root" />
                      <Image>
                        <Typography
                          component="span"
                          variant="subtitle1"
                          color="inherit"
                          sx={{
                            position: 'relative',
                            p: 4,
                            pt: 2,
                            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                          }}
                        >
                          {image.title}
                          <ImageMarked className="MuiImageMarked-root" />
                        </Typography>
                      </Image>
                    </ImageButton>
                  ))}
                </Box>
              </div>
            </h4>
          </div>
          <div class='item mx-0'>
            <h4>
              <div className="group relative cursor-pointer overflow-hidden w-11/12 ">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }} className=" w-fit">
                  {images7.map((image) => (
                    <ImageButton
                      focusRipple
                      key={image.title}
                      style={{
                        width: '100%',
                      }}
                      onClick={handleClickShop}
                    >
                      <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                      <ImageBackdrop className="MuiImageBackdrop-root" />
                      <Image>
                        <Typography
                          component="span"
                          variant="subtitle1"
                          color="inherit"
                          sx={{
                            position: 'relative',
                            p: 4,
                            pt: 2,
                            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                          }}
                        >
                          {image.title}
                          <ImageMarked className="MuiImageMarked-root" />
                        </Typography>
                      </Image>
                    </ImageButton>
                  ))}
                </Box>
              </div>
            </h4>
          </div>
        </OwlCarousel>
      </div>
    </div>
    
  );
};
export default PatientHome;