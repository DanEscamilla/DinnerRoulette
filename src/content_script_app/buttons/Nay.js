import { Close } from '@mui/icons-material';
import { Fab, Tooltip } from '@mui/material';

function Nay({ onClick, className }) {
  return (
    <Tooltip title='Roll again...' className={className}>
      <div className='min-w-0 sm:w-[2.5rem] w-0 sm:w-auto sm:shrink-0 z-10'>
        <Fab
          aria-label='Roll again'
          color='primary'
          className='!bg-warning'
          size='small'
          onClick={onClick}
        >
          <Close />
        </Fab>
      </div>
    </Tooltip>
  );
}
export default Nay;
