import Ripple from './Ripple';

function Tour({ show }) {
  return (
    <>
      <h2
        className={`${
          show ? '' : 'hidden'
        } top-1/2 w-full px-4 -translate-y-1/2 text-2xl sm:text-3xl text-white text-center`}
      >
        Look for the button at the bottom right of your screen to begin using{' '}
        <span className='text-primary-100'>DinnerRoulette</span>.
      </h2>
      <Ripple
        show={show}
        size={400}
        numOfRipples={2}
        className='fixed bottom-11 right-11 translate-x-1/2 translate-y-1/2'
      />
    </>
  );
}

export default Tour;
