import RouletteSvg from './RouletteSvg';

function Roulette({ animating, onAnimationEnd }) {
  return (
    <RouletteSvg
      animating={animating}
      onAnimationEnd={onAnimationEnd}
      className='w-full h-full'
    />
  );
}

export default Roulette;
