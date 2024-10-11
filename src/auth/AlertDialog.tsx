import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

interface AlertProps {
  title: string;
  content: string;
  setIsAgree?: (status: boolean) => void;
}

export default function AlertDialog({
  title,
  content,
  setIsAgree,
}: AlertProps) {
  const [isOpen, setIsOpen] = React.useState(true);

  const clickAgreement = () => {
    setIsOpen(false);
    if (setIsAgree) setIsAgree(true);
  };

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsOpen(false);
              if (setIsAgree) setIsAgree(false);
            }}
          >
            Disagree
          </Button>
          <Button autoFocus onClick={clickAgreement}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
