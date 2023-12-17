import { Button, Modal, ModalDialog, ModalClose, DialogTitle, DialogContent, Stack, FormControl, FormLabel, Input, Select, DatePicker, LocalizationProvider, Typography } from '@mui/joy';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from 'react';
import {
    useLinkWithClinicMutation
  } from "../store";
  import Toast from "../patient/Toast";

function LinkAccount() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkWithClinic, results] = useLinkWithClinicMutation();

  const [formState, setFormState] = useState({
    username: null,
    password: null,
  });

  const [toast, setToast] = useState({
    open: false,
    duration: 4000,
  });

  const onToastClose = (event, reason) => {
    if (reason === "clickaway") return;

    setToast({
      ...toast,
      open: false,
    });
  };

  const onFormChange = (e) => {

    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const onFormSubmit =  (e) => {
    e.preventDefault();
    const { username, password } = formState;

    linkWithClinic({ username, password })
    .unwrap()
    .then(() => {
        setToast({
        ...toast,
        open: true,
        message: "Account Linked Successfully",
        color: "success",
        });
        setIsModalOpen(false);
    })
        .catch((err) => {
            setToast({
            ...toast,
            open: true,
            message: "Incorrect Username or Password",
            color: "danger",
            });
        });

  };


  return (

    <>
    
        <div className='cursor-pointer' onClick={() => setIsModalOpen(true)}>
            <Typography variant='h4' component='div' fontWeight={500}>
                Press here to connect to your clinic account to access your medical
                records & discounts !
            </Typography>
        </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalDialog sx={{ overflowY: "auto", maxHeight: "90vh", p: 3 }}>
          <ModalClose onClick={() => setIsModalOpen(false)} />
          <DialogTitle>Link your Account</DialogTitle>
          <DialogContent>Fill in your clinic account's username and password below</DialogContent>
          <form onChange={onFormChange} onSubmit={onFormSubmit}>
            <Stack
              spacing={2}
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
                gap: 1.5,
              }}
            >

              <FormControl sx={{ gridColumn: "1/-1" }}>
                <FormLabel>Username</FormLabel>
                <Input
                  value={formState.username}
                  type="username"
                  name="username"
                  placeholder="Enter Username"
                />
              </FormControl>

              <FormControl sx={{ gridColumn: "1/-1" }}>
                <FormLabel>Password</FormLabel>
                <Input
                  value={formState.password}
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                />
              </FormControl>


              <Button sx={{ gridColumn: "1/-1" }} type="submit">
                Submit
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>

      <div>
        <Toast {...toast} onClose={onToastClose} />
      </div>

    </>
  )
}

export default LinkAccount;
