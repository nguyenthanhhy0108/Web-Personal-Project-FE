import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

export default function AlertDialog({setIsAgree} : {setIsAgree: (status : boolean) => void}) {

  const [isOpen, setIsOpen] = React.useState(true)

  const clickAgreement = () => {
    setIsOpen(false);
    setIsAgree(true);
  }

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => { setIsOpen(false); setIsAgree(false) }}
          >Disagree</Button>
          <Button 
            autoFocus
            onClick={clickAgreement}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}