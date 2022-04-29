import { useEffect, useReducer } from 'react';
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
} from '../helpers/storage';

import {
  initialState,
  reducer,
  setItems,
  setSnackbarOpen,
  setLoading,
} from '../helpers/reducer';
import { useBlacklists } from '../helpers/storage';

function App() {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
  });
  const { blacklistedCategoryMap, blacklistedRestaurantMap } = useBlacklists();

  const loadRestaurants = (category) => {
    getRestaurants(category).then((loadedRestaurants) => {
      setItems(dispatch, 'restaurant', loadedRestaurants);
    });
  };

  useEffect(() => {
    const category = getCategoryFromPath();
    if (!category) {
      getCategories().then((loadedCategories) => {
        setItems(dispatch, 'category', loadedCategories);
      });
    } else {
      loadRestaurants(category);
    }
  }, []);

  const handleYay = (item) => {
    setLoading(dispatch, true);
    if (state.type === 'category') {
      loadRestaurants(item.title);
    } else if (state.type === 'restaurant') {
      window.location.href = item.url;
    }
  };

  const onBlock = (item) => {
    if (state.type === 'restaurant') {
      blacklistRestaurant(item).then(() => {
        blacklistedRestaurantMap.current[item.id] = item;
        setSnackbarOpen(dispatch, true);
      });
    } else {
      blacklistCategory(item).then(() => {
        blacklistedCategoryMap.current[item.title] = item;
        setSnackbarOpen(dispatch, true);
      });
    }
  };

  const onRandomItem = (item) => {
    if (state.type === 'restaurant') {
      markRestaurant(item);
    } else {
      markCategory(item);
    }
  };

  const validate = async (item) => {
    if (state.type === 'category') {
      return (
        !blacklistedCategoryMap.current[item.title] &&
        (await validateCategory(item.title))
      );
    } else {
      return !blacklistedRestaurantMap.current[item.id];
    }
  };

  const content =
    state.loading === true ? (
      <div className='w-full h-full flex flex-col justify-center items-center gap-4'>
        <CircularProgress className='text-primary' />
        <span className='text-lg block'>Polishing the roulette...</span>
      </div>
    ) : (
      <>
        <div className='text-2xl text-center'>
          <span>Pick a </span>
          <span className='relative text-primary-200'>
            <span className='invisible'>{state.type}</span>
            <CSSTransition
              in={'category' === state.type}
              timeout={1000}
              classNames='fade ease-up transition'
              appear
            >
              <span className='hidden absolute left-0'>category</span>
            </CSSTransition>
            <CSSTransition
              in={'restaurant' === state.type}
              timeout={1000}
              classNames='fade ease-down transition'
              appear
            >
              <span className='hidden absolute left-0'>restaurant</span>
            </CSSTransition>
          </span>
        </div>
        <Roulette
          items={state.items}
          onYay={handleYay}
          onBlock={onBlock}
          onRandomItem={onRandomItem}
          validateItem={validate}
        />
        <Snackbar
          open={state.snackbarOpen}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          autoHideDuration={3500}
          onClose={() => {
            setSnackbarOpen(dispatch, false);
          }}
        >
          <Alert severity='success'>
            {state.type === 'category'
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
