import { useEffect, useState } from 'react';
import Roulette from './Roulette';
import {
  getCategories,
  getRestaurants,
  isCategoryLocation,
} from './helpers/ubereats';
import { CircularProgress } from '@mui/material';

function App() {
  const [items, setItems] = useState([]);
  const [type, setType] = useState('');

  useEffect(() => {
    if (!isCategoryLocation()) {
      setType('category');
      getCategories().then((loadedCategories) => {
        setItems(loadedCategories);
      });
    } else {
      setType('restaurants');
    }
  }, []);

  const handleYay = (item) => {
    console.log('Selected ', item);
    window.location.href = item.title;
  };

  const content =
    items.length === 0 ? (
      <div className='w-full h-full flex flex-col justify-center items-center gap-4'>
        <CircularProgress className='text-primary' />
        <span className='text-lg block'>Polishing the roulette...</span>
      </div>
    ) : (
      <>
        <div className='text-2xl text-center my-4'>Pick a {type}</div>
        <Roulette items={items} onYay={handleYay} />
      </>
    );

  return (
    <div className='w-full h-[28rem] md:w-[28rem] flex flex-col text-white'>
      {content}
    </div>
  );
}

export default App;
