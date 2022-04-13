import { useEffect, useState } from 'react';
import Roulette from './Roulette';
import Header from './Header';
import { getCategories } from './helpers/ubereats';

function App() {
  const [categories, setCategories] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [randomCategory, setRandomCategory] = useState(null);
  const [state, setState] = useState('loading-categories');

  useEffect(() => {
    getCategories().then((loadedCategories) => {
      setCategories(loadedCategories);
    });
  }, []);

  const handleRollClick = () => {
    setAnimating(true);
  };

  const handleAnimationEnd = () => {
    setAnimating(false);
    setRandomCategory(categories[0]);
    setCategories(categories.slice(1, categories.length));
  };

  return (
    <div className='h-[28rem] w-[28rem] bg-[#192a30] flex flex-col text-white'>
      <Header />
      <div className='text-2xl text-center mt-2 mb-4'>Pick a category</div>
      <div className='flex-1 flex justify-center items-center'>
        <div className='h-[6rem]'>
          <Roulette
            items={categories}
            animating={animating}
            onAnimationEnd={handleAnimationEnd}
          />
        </div>
      </div>
      <div
        className={`text-4xl py-2 px-6 text-center ${
          randomCategory && !animating ? 'visible' : 'invisible'
        }`}
      >
        {(randomCategory && randomCategory.title) || 'Placeholder'}
      </div>
      <div className='flex justify-center mb-12'>
        <button
          disabled={animating || categories.length <= 0}
          className='text-2xl py-2 px-6 rounded'
          onClick={handleRollClick}
        >
          {randomCategory ? 'Roll' : 'Roll again'}
        </button>
      </div>
    </div>
  );
}

export default App;
