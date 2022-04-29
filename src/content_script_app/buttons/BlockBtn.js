import { Block } from '@mui/icons-material';
import { Fab, Tooltip } from '@mui/material';

function BlockBtn({ onClick, className }) {
  return (
    <Tooltip placement='top' title='Blacklist!' className={className}>
      <div className='absolute min-w-0 w-[2.5rem] z-10 bottom-12 sm:bottom-4'>
        <Fab
          aria-label='Blacklist'
          color='primary'
          className='!bg-warning'
          size='small'
          onClick={onClick}
        >
          <Block />
        </Fab>
      </div>
    </Tooltip>
  );
}
export default BlockBtn;
