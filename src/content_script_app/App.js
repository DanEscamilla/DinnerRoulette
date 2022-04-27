import { useEffect, useRef, useState } from 'react';
import Roulette from './Roulette';
import {
  getCategories,
  getCategoryFromPath,
  getRestaurants,
  validateCategory,
} from '../helpers/ubereats';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import { CSSTransition } from 'react-transition-group';
import {
  blacklistCategory,
  markCategory,
  blacklistRestaurant,
  markRestaurant,
  getBlacklistedCategories,
  getBlacklistedRestaurants,
} from '../helpers/storage';

function App() {
  const category = useRef(getCategoryFromPath());
  const blacklistedCategoryMap = useRef({});
  const blacklistedRestaurantMap = useRef({});
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [type, setType] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const blacklistPromises = [
      getBlacklistedCategories(),
      getBlacklistedRestaurants(),
    ];
    Promise.all(blacklistPromises).then(([blCategories, blRestaurants]) => {
      blCategories.forEach((blCategory) => {
        blacklistedCategoryMap.current[blCategory.title] = blCategory;
      });
      blRestaurants.forEach((blRestaurant) => {
        blacklistedRestaurantMap.current[blRestaurant.id] = blRestaurant;
      });
    });

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
      window.location.href = item.url;
    }
  };

  const onBlock = (item) => {
    if (type === 'restaurant') {
      blacklistRestaurant(item)
        .then(() => {
          blacklistedRestaurantMap.current[item.id] = item;
          setSnackbarOpen(true);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      blacklistCategory(item)
        .then(() => {
          blacklistedCategoryMap.current[item.title] = item;
          setSnackbarOpen(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const onRandomItem = (item) => {
    if (type === 'restaurant') {
      markRestaurant(item).catch((err) => {
        console.error(err);
      });
    } else {
      markCategory(item).catch((err) => {
        console.error(err);
      });
    }
  };

  const validate = async (item) => {
    if (type === 'category') {
      return (
        !blacklistedCategoryMap.current[item.title] &&
        (await validateCategory(item.title))
      );
    } else {
      return !blacklistedRestaurantMap.current[item.id];
    }
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
          onRandomItem={onRandomItem}
          validateItem={validate}
        />
        <Snackbar
          open={snackbarOpen}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          autoHideDuration={3500}
          onClose={() => {
            setSnackbarOpen(false);
          }}
        >
          <Alert severity='success'>
            {type === 'category'
              ? 'Category has been blacklisted'
              : 'Restaurant has been blacklisted'}
          </Alert>
        </Snackbar>
      </>
    );

  return (
    <div className='w-full h-full py-8 sm:py-0 flex flex-col text-white'>
      {content}
    </div>
  );
}

export default App;
