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
  handleClick,
}: {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  content: string | undefined;
  status: string;
  handleClick: () => void;
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <React.Fragment>
      <Dialog
        onClick={handleClick}
        fullScreen={fullScreen}
        open={isOpened}
        aria-labelledby='responsive-dialog-title'
        className='w-[1000px] h-auto mx-auto my-auto gap-12'
      >
        <DialogTitle id='responsive-dialog-title'>
          <div
            className={`justify-center text-5xl mx-auto flex ${status == 'error' ? 'text-red-600' : ''} ${status == 'success' ? 'text-green-600' : ''} font-bold text-3xl`}
          >
            {title}
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className='justify-center mx-auto flex text-3xl'>
              {content}
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
