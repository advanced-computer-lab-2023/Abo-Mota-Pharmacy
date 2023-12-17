import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({cancelOrder, open, setOpen}) {

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAgree = () => {
    cancelOrder();
    setOpen(false);
  };
  

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"CANCEL ORDER"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to cancel your order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAgree} color="error">Cancel My Order</Button>
          <Button onClick={handleClose} color="primary">Exit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}