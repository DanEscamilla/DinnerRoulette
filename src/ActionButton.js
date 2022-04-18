import { Button, DialogContent, Fab } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
import { Dialog } from '@mui/material';
import { useState } from 'react';
import App from './App';

import Logo from './assets/logo.png';
import CloseIcon from '@mui/icons-material/Close';

function ActionButton() {
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Fab
        className='overflow-auto !fixed bottom-4 right-4 !bg-[#192a30]'
        onClick={openDialog}
      >
        <img src={Logo} className='w-10 h-10' alt='dinner roulette logo' />
      </Fab>
      <Dialog
        open={open}
        onClose={closeDialog}
        classes={{
          paper: '!m-0 !max-h-full w-full h-full sm:w-auto sm:h-auto',
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
}

export default ActionButton;
