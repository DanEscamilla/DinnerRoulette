import { useEffect, useState } from 'react';
import RouletteSvg from './RouletteSvg';
import { CSSTransition } from 'react-transition-group';
import { Fab, Tooltip } from '@mui/material';
import { Done, Close, ErrorOutline } from '@mui/icons-material';
import { shuffleArray } from './helpers/utils';
import RollBtn from './RollBtn';

function App({ items, onYay, validateItem }) {
  const [error, setError] = useState();
  const [animating, setAnimating] = useState(false);
  const [rolling, setRolling] = useState(false);
  const [randomItem, setRandomItem] = useState(null);

  useEffect(() => {
    setRandomItem(null);
  }, [items]);

  const handleRollClick = () => {
    setRolling(true);
    setAnimating(true);
  };

  const isInvalid = async (item) => {
    return !validateItem || !(await validateItem(item));
  };

  const getRandomItem = async () => {
    let shuffledItems = shuffleArray(items);
    let item = shuffledItems.pop();
    while (shuffledItems.length > 0 && (await isInvalid(item))) {
      item = shuffledItems.pop();
    }
    if ((shuffledItems.length === 0 && (await isInvalid(item))) || !item) {
      setError('No more items left');
    } else {
      setRandomItem(item);
    }
  };

  const handleAnimationEnd = () => {
    setRolling(false);
  };

  const handleRollingBegun = async () => {
    await getRandomItem();
    setAnimating(false);
  };

  return (
    <div className='flex flex-col flex-1'>
      <div className='flex-1 flex justify-center items-center'>
        <div className='h-[8rem]'>
          <RouletteSvg
            animating={animating}
            onAnimationEnd={handleAnimationEnd}
            onRollingBegun={handleRollingBegun}
            className='w-full h-full'
          />
        </div>
      </div>
      <div className='h-48 text-4xl flex justify-center items-center gap-2 w-full'>
        <CSSTransition
          in={!error && !rolling && !!randomItem}
          timeout={1000}
          classNames='fade ease-left transition'
          appear
        >
          <Tooltip title='Roll again...' className='!hidden'>
            <div className='min-w-0 sm:w-[2.5rem] w-0 sm:w-auto sm:shrink-0 z-10'>
              <Fab
                color='warning'
                className='!bg-warning'
                size='small'
                onClick={handleRollClick}
              >
                <Close />
              </Fab>
            </div>
          </Tooltip>
        </CSSTransition>

        <CSSTransition
          in={!error && !rolling && !!randomItem}
          timeout={1000}
          classNames='fade ease-down transition'
          appear
        >
          <div className='px-2 w-full sm:w-auto !hidden text-center text-2xl sm:min-w-0'>
            <div className='truncate mb-4'>
              {randomItem && randomItem.title}
            </div>
            {randomItem && randomItem.imgUrl && (
              <div
                className='flex-1 bg-cover w-full sm:w-48 h-32 bg-no-repeat bg-center rounded-lg mx-auto'
                style={{
                  backgroundImage: `url('${randomItem.imgUrl}')`,
                }}
              />
            )}
          </div>
        </CSSTransition>

        <CSSTransition
          in={!error && !rolling && !randomItem}
          timeout={1000}
          classNames='fade ease-down transition'
          appear
        >
          <RollBtn className='hidden' onClick={handleRollClick}>
            Roll
          </RollBtn>
        </CSSTransition>

        <CSSTransition
          in={error && !rolling}
          timeout={1000}
          classNames='fade ease-down transition'
          appear
        >
          <div className='hidden'>
            <div className='items-center gap-4 flex flex-col'>
              <div className='text-2xl'>{error}</div>
              <ErrorOutline className='text-warning !w-12 !h-12' />
            </div>
          </div>
        </CSSTransition>

        <CSSTransition
          in={!error && !rolling && !!randomItem}
          timeout={1000}
          classNames='fade ease-right transition'
          appear
        >
          <Tooltip title='Pick a restaurant!' className='!hidden'>
            <div className='min-w-0 w-0 sm:w-[2.5rem] sm:w-auto sm:shrink-0 z-10'>
              <Fab
                color='primary'
                className='!bg-primary -translate-x-full sm:translate-x-0'
                size='small'
                onClick={onYay.bind(null, randomItem)}
              >
                <Done />
              </Fab>
            </div>
          </Tooltip>
        </CSSTransition>
      </div>
    </div>
  );
}

export default App;
