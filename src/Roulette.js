import { useState } from 'react';
import RouletteSvg from './RouletteSvg';

function App({ items }) {
  const [animating, setAnimating] = useState(false);
  const [randomItem, setRandomItem] = useState(null);

  const handleRollClick = () => {
    setAnimating(true);
  };

  const handleAnimationEnd = () => {
    setAnimating(false);
    setRandomItem(items[Math.floor(Math.random() * items.length)]);
  };

  return (
    <div className='flex flex-col flex-1'>
      <div className='flex-1 flex justify-center items-center'>
        <div className='h-[6rem]'>
          <RouletteSvg
            animating={animating}
            onAnimationEnd={handleAnimationEnd}
            className='w-full h-full'
          />
        </div>
      </div>
      <div
        className={`text-4xl py-2 px-6 text-center ${
          randomItem && !animating ? 'visible' : 'invisible'
        }`}
      >
        {(randomItem && randomItem.title) || 'Placeholder'}
      </div>
      <div className='flex justify-center'>
        <button
          disabled={animating || items.length <= 0}
          className='text-2xl py-2 px-6 rounded'
          onClick={handleRollClick}
        >
          {randomItem ? 'Roll again' : 'Roll'}
        </button>
      </div>
    </div>
  );
}

export default App;
