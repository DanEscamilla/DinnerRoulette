import { Done } from '@mui/icons-material';
import { Fab, Tooltip } from '@mui/material';

function Yay({ onClick, className }) {
  return (
    <Tooltip title='Choose!' className={className}>
      <div className='min-w-0 w-0 sm:w-[2.5rem] sm:w-auto sm:shrink-0 z-10'>
        <Fab
          aria-label='Choose'
          color='primary'
          className='!bg-primary -translate-x-full sm:translate-x-0'
          size='small'
          onClick={onClick}
        >
          <Done />
        </Fab>
      </div>
    </Tooltip>
  );
}
export default Yay;
