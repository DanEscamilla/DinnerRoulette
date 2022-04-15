import { useEffect, useState } from 'react';

const DashedPath = ({ path, className, onAnimationEnd }) => (
  <path
    className={`stroke-gold ${className ? className : ''}`}
    strokeWidth='1'
    strokeLinejoin='round'
    strokeLinecap='round'
    strokeMiterlimit='100'
    strokeDasharray='4'
    strokeDashoffset='1000'
    fill='none'
    onAnimationEnd={onAnimationEnd}
    d={path}
  />
);

function RouletteSvg({ animating, onAnimationEnd, className, onRollingBegun }) {
  const [animationState, setAnimationState] = useState('');
  var tableAnimationClass, ballAnimationClass;

  useEffect(() => {
    if (animating) {
      setAnimationState('begin-rolling');
    } else if (animationState !== '') {
      setAnimationState('end-rolling');
    }
  }, [animating]);

  const handleAnimationEnd = (e) => {
    if (Array.from(e.target.classList).includes('table-bounce')) return;
    if (animationState === 'end-rolling') {
      if (typeof onAnimationEnd === 'function') onAnimationEnd(e);
      setAnimationState('');
    } else if (animationState === 'begin-rolling') {
      if (typeof onRollingBegun === 'function') onRollingBegun(e);
      setAnimationState('rolling');
    }
  };

  const handleAnimationIteration = () => {
    if (animationState === 'rolling' && !animating) {
      setAnimationState('end-rolling');
    }
  };

  switch (animationState) {
    case 'begin-rolling':
      tableAnimationClass = 'animate-begin-rolling';
      ballAnimationClass = 'animate-begin-table-bounce';
      break;
    case 'end-rolling':
      tableAnimationClass = 'animate-end-rolling';
      ballAnimationClass = 'animate-end-table-bounce';
      break;
    case 'rolling':
      tableAnimationClass = 'animate-rolling';
      ballAnimationClass = 'animate-table-bounce';
      break;
    default:
      tableAnimationClass = '';
      ballAnimationClass = '';
      break;
  }

  console.log(animationState, animating, tableAnimationClass);
  const ballClasses = `fill-white ${ballAnimationClass}`;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='-363.5 282 90 54'
      className={className}
    >
      <DashedPath
        className={tableAnimationClass}
        path='M -319.65 289.065 l 0.027 0 c 17.023 0.035 27.123 2.935 32.595 6.945 c 2.9 2.2 4.6 4.6 4.6 7.3 c 0 1.1 -0.3 2.1 -0.8 3.1 c -0.8 1.5 -2.1 2.9 -3.9 4.2 c -6.3 4.6 -18.4 7.7 -32.3 7.7 s -26 -3.1 -32.3 -7.7 c -1.8 -1.3 -3.1 -2.7 -3.9 -4.2 c -0.5 -1 -0.8 -2.1 -0.8 -3.1 c 0.028 -2.01 1.128 -4.01 3.028 -5.91 c 5 -4.8 15.9 -8.3 33.723 -8.335 z'
      />
      <DashedPath
        className={tableAnimationClass}
        path='M -274.911 305.239 c 0.111 -9.939 -17.389 -18.239 -44.725 -17.877 l 0 0 c -26.064 0.038 -42.864 8.138 -42.757 18.059 l 0 3.037 v 3.625 c 2.299 13.117 21.099 21.817 43.899 21.817 c 24.4 0 44.2 -9.9 43.637 -21.817 z'
      />
      <path
        onAnimationEnd={handleAnimationEnd}
        onAnimationIteration={handleAnimationIteration}
        className={ballClasses}
        d='M-289.3 301.2c-1.7 0-3.2 1.4-3.2 3.2 0 .9.3 1.6.9 2.2.6.6 1.4 1 2.3 1s1.7-.4 2.3-1c.6-.6.9-1.3.9-2.2 0-1.8-1.4-3.2-3.2-3.2z'
      />
      <path
        className='fill-gold'
        d='M -303.5 300.1 a 0.072 0.027 0 0 0 -31.248 -0.027 a 0.072 0.027 0 0 0 31.254 0.027 z'
      />
    </svg>
  );
}

export default RouletteSvg;
