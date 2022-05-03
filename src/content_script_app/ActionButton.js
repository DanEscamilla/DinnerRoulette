import { Backdrop, Button, DialogContent, Fab } from '@mui/material';
import { Dialog } from '@mui/material';
import { useEffect, useState } from 'react';
import App from './App';

import Logo from '../assets/logo.png';
import CloseIcon from '@mui/icons-material/Close';
import { getTour, setTour } from '../helpers/storage';
import Ripple from './Ripple';

function ActionButton() {
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getTour().then((hasSeenTour) => {
      console.log('tour', hasSeenTour);
      setShowBackdrop(!hasSeenTour);
    });
  }, []);

  const openDialog = () => {
    setShowBackdrop(false);
    setTour();
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const actionButton = (
    <>
      <Fab
        className={`overflow-auto !fixed bottom-4 right-4 !bg-[#192a30]`}
        onClick={openDialog}
      >
        <img src={Logo} className='w-10 h-10' alt='dinner roulette logo' />
      </Fab>
      <Ripple
        show={showBackdrop}
        size={400}
        numOfRipples={2}
        className='fixed bottom-11 right-11 translate-x-1/2 translate-y-1/2'
      />
      <Dialog
        open={open}
        onClose={closeDialog}
        classes={{
          paper:
            '!m-0 !max-h-full w-full h-full sm:w-auto sm:h-auto !overflow-hidden',
        }}
      >
        <DialogContent className='bg-[#192a30] w-full h-[28rem] sm:w-[28rem] !p-6'>
          <Button
            className='sm:!hidden !absolute !min-w-0 !p-4 top-2 right-2 !rounded-full !overflow-hidden'
            onClick={closeDialog}
          >
            <CloseIcon className='text-white text-2xl w-full' />
          </Button>
          <App />
        </DialogContent>
      </Dialog>
    </>
  );

  return (
    <>
      <Backdrop
        classes={{ root: '!bg-black !bg-opacity-80 z-10' }}
        open={showBackdrop}
      >
        {actionButton}
      </Backdrop>
      {actionButton}
    </>
  );
}

export default ActionButton;
