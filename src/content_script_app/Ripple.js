import { useMemo } from 'react';

function Ripple({ show, size, className, numOfRipples, animationDuration }) {
  animationDuration ||= 3000;
  const rootStyles = {
    display: show ? 'block' : 'none',
    width: `${size}px`,
    height: `${size}px`,
  };

  const circles = useMemo(() => {
    const halfSize = size / 2;

    return [...Array(numOfRipples).keys()].map((_, idx) => (
      <circle
        key={idx}
        cx={halfSize}
        cy={halfSize}
        r={halfSize}
        style={{
          animationDelay: `${(animationDuration / numOfRipples) * idx}ms`,
          animationDuration: `${animationDuration}ms`,
        }}
        className={`animate-dr-pulse opacity-0 origin-center fill-white`}
      />
    ));
  }, [numOfRipples, size, animationDuration]);

  return (
    <svg style={rootStyles} className={className}>
      {circles}
    </svg>
  );
}

export default Ripple;
