import { CircularProgress } from '@mui/material';

function LoadingPage() {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center gap-4'>
      <CircularProgress className='text-primary' />
      <span className='text-lg block'>Polishing the roulette...</span>
    </div>
  );
}

export default LoadingPage;
