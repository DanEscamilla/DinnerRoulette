import { useEffect, useRef, useState } from 'react';
import Roulette from './Roulette';
import {
  getCategories,
  getCategoryFromPath,
  getRestaurants,
  validateCategory,
} from '../helpers/ubereats';
import { CircularProgress } from '@mui/material';
import { CSSTransition } from 'react-transition-group';
import {
  blacklistCategory,
  blacklistRestaurant,
} from '../helpers/localstorage';

function App() {
  const category = useRef(getCategoryFromPath());
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [type, setType] = useState('');

  useEffect(() => {
    if (!category.current) {
      setType('category');
      getCategories()
        .then((loadedCategories) => {
          setItems(loadedCategories);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setType('restaurant');
      getRestaurants(category.current)
        .then((loadedCategories) => {
          setItems(loadedCategories);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const handleYay = (item) => {
    if (type === 'category') {
      category.current = item.title;
      setLoading(true);
      getRestaurants(category.current)
        .then((loadedRestaurants) => {
          if (loadedRestaurants) setType('restaurant');
          setItems(loadedRestaurants);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (type === 'restaurant') {
      window.location.href = item.actionUrl;
    }
  };

  const onBlock = (item) => {
    console.log(item);
    if (type === 'restaurant') {
      blacklistRestaurant(item);
    } else {
      blacklistCategory(item);
    }
  };

  const validate = async (item) => {
    if (type === 'category') {
      return validateCategory(item.title);
    }
    return true;
  };

  const content =
    loading === true ? (
      <div className='w-full h-full flex flex-col justify-center items-center gap-4'>
        <CircularProgress className='text-primary' />
        <span className='text-lg block'>Polishing the roulette...</span>
      </div>
    ) : (
      <>
        <div className='text-2xl text-center'>
          <span>Pick a </span>
          <span className='relative text-primary-200'>
            <span className='invisible'>{type}</span>
            <CSSTransition
              in={'category' === type}
              timeout={1000}
              classNames='fade ease-up transition'
              appear
            >
              <span className='hidden absolute left-0'>category</span>
            </CSSTransition>
            <CSSTransition
              in={'restaurant' === type}
              timeout={1000}
              classNames='fade ease-down transition'
              appear
            >
              <span className='hidden absolute left-0'>restaurant</span>
            </CSSTransition>
          </span>
        </div>
        <Roulette
          items={items}
          onYay={handleYay}
          onBlock={onBlock}
          validateItem={validate}
        />
      </>
    );

  return (
    <div className='w-full h-full py-8 sm:py-0 flex flex-col text-white'>
      {content}
    </div>
  );
}

export default App;
