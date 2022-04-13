import { DialogContent, Fab } from '@mui/material';
import { Dialog } from '@mui/material';
import { useState } from 'react';
import App from './App';

import Logo from './assets/logo.png';

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
      <Dialog open={open} onClose={closeDialog}>
        <DialogContent className='bg-[#192a30]'>
          <App />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ActionButton;
