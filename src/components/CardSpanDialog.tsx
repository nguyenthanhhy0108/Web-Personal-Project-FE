import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';

interface CardSpanProps {
    title: string,
    description: string,
    price: string,
    img: string,
    status: boolean,
    setOpenCardLearnMore?: (status: boolean) => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CardSpanDialog(
  {title, description, price, img, status, setOpenCardLearnMore}: CardSpanProps
) {

  const handleClose = () => {
    if(setOpenCardLearnMore)
      setOpenCardLearnMore(false);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={status}
        className='backdrop-blur-lg'
      >
        <div className='border-2 dark:border-gray-900 rounded-none'>
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" className='dark:bg-gray-800 dark:text-white font-bold text-3xl'>
            {title}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon className='hover:text-blue-600'/>
          </IconButton>
          <DialogContent dividers className='dark:bg-gray-800 dark:text-white'>
            <img
              src={img}
              alt='IMG'
              width={900}
              height={900}
            />
          </DialogContent>
          <DialogContent dividers className='dark:bg-gray-800 dark:text-white text-lg'>
            <Typography gutterBottom className='text-violet-600 text-xl'>
              {price}
            </Typography>
          </DialogContent>
          <DialogContent dividers className='dark:bg-gray-800 dark:text-white'>
            <Typography gutterBottom>
              {description}
            </Typography>
          </DialogContent>
          <DialogActions className='dark:bg-gray-800 dark:text-white'>
            <Button className='font-bold text-xl lg:text-3xl hover:bg-gray-300 dark:hover:bg-gray-800 hover:scale-[1.05] text-blue-600' autoFocus onClick={handleClose}>
              Visit
            </Button>
          </DialogActions>
        </div>
      </BootstrapDialog>
    </React.Fragment>
  );
}