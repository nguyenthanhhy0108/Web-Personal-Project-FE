interface SnackbarProps {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  mainText: string;
  buttonColor?: string;
  handleUndo: () => void;
}

import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';

export default function CustomableSnackbar({
  isOpened,
  setIsOpened,
  mainText,
  buttonColor,
  handleUndo,
}: SnackbarProps) {
  const action = (
    <React.Fragment>
      <Button
        color='secondary'
        className={`${buttonColor}`}
        size='small'
        onClick={handleUndo}
      >
        UNDO
      </Button>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleUndo}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={isOpened}
        autoHideDuration={6000}
        message={mainText}
        action={action}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#62656D',
            color: 'white',
          },
        }}
      />
    </div>
  );
}
