import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';

export default function ScreenAlert({
  isOpened,
  setIsOpened,
  title,
  content,
  status,
}: {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  content: string;
  status: string;
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setIsOpened(false);
  };

  return (
    <React.Fragment>
      <Dialog
        onClick={handleClose}
        fullScreen={fullScreen}
        open={isOpened}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle
          id='responsive-dialog-title'
          className={`justify-center mx-auto flex ${status == 'error' ? 'text-red-600' : ''} font-bold text-3xl`}
        >
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className='justify-center mx-auto flex text-xl'>
            {content}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
