import { useEffect, useState, useRef } from 'react';
import RouletteSvg from './RouletteSvg';
import { CSSTransition } from 'react-transition-group';
import { Button, Fab, Tooltip } from '@mui/material';
import { Block, Done, Close, ErrorOutline } from '@mui/icons-material';
import { shuffleArray } from '../helpers/utils';
import RollBtn from './RollBtn';

const minimalAnimationTime = 500; //in milliseconds

function App({ items, onYay, validateItem, onBlock, onRandomItem }) {
  const mutableItems = useRef([...items]);
  const [error, setError] = useState();
  const [rolling, setRolling] = useState(false);
  const [randomItem, setRandomItem] = useState(null);

  useEffect(() => {
    mutableItems.current = [...items];
    setRandomItem(null);
  }, [items]);

  const handleRollClick = () => {
    setRolling(true);
    setTimeout(async () => {
      await getRandomItem();
      setRolling(false);
    }, minimalAnimationTime);
  };

  const isInvalid = async (item) => {
    return !item || !validateItem || !(await validateItem(item));
  };

  const getRandomItem = async () => {
    let shuffledItems = shuffleArray(mutableItems.current);
    let item = shuffledItems.pop();
    while (shuffledItems.length > 0 && (await isInvalid(item))) {
      item = shuffledItems.pop();
    }
    if (shuffledItems.length === 0 && (await isInvalid(item))) {
      setError('No more items left');
    } else {
      if (onRandomItem) {
        onRandomItem(item);
      }
      setRandomItem(item);
    }
  };

  const handleBlock = () => {
    if (onBlock) {
      onBlock(randomItem);
    }
    handleRollClick();
  };

  const handleReset = () => {
    mutableItems.current = [...items];
    setRandomItem(null);
    setError(null);
  };

  return (
    <div className='flex flex-col flex-1'>
      <div className='flex-1 flex justify-center items-center'>
        <div className='h-[8rem]'>
          <RouletteSvg animating={rolling} className='w-full h-full' />
        </div>
      </div>
      <div className='h-48 text-4xl flex justify-center items-center gap-2 w-full overflow-hidden'>
        <CSSTransition
          in={!error && !rolling && !!randomItem}
          timeout={{ appear: 1000, enter: 1000, exit: 500 }}
          classNames='fade ease-left transition'
          appear
        >
          <Tooltip title='Roll again...' className='!hidden'>
            <div className='min-w-0 sm:w-[2.5rem] w-0 sm:w-auto sm:shrink-0 z-10'>
              <Fab
                aria-label='Roll again'
                color='primary'
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
          timeout={{ appear: 1000, enter: 1000, exit: 500 }}
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
          timeout={{ appear: 1000, enter: 1000, exit: 500 }}
          classNames='fade ease-down transition'
          appear
        >
          <RollBtn className='hidden' onClick={handleRollClick}>
            Roll
          </RollBtn>
        </CSSTransition>

        <CSSTransition
          in={error && !rolling}
          timeout={{ appear: 1000, enter: 1000, exit: 0 }}
          classNames='fade ease-down transition'
          appear
        >
          <div className='hidden'>
            <div className='items-center gap-4 flex flex-col'>
              <div className='text-2xl'>{error}</div>
              <ErrorOutline className='text-warning !w-12 !h-12' />
              <Button color='primary' onClick={handleReset} variant='contained'>
                Reset
              </Button>
            </div>
          </div>
        </CSSTransition>

        <CSSTransition
          in={!error && !rolling && !!randomItem}
          timeout={{ appear: 1000, enter: 1000, exit: 500 }}
          classNames='fade ease-down transition'
          appear
        >
          <Tooltip placement='top' title='Blacklist!' className='!hidden'>
            <div className='absolute min-w-0 w-[2.5rem] z-10 bottom-12 sm:bottom-4'>
              <Fab
                aria-label='Blacklist'
                color='primary'
                className='!bg-warning'
                size='small'
                onClick={handleBlock}
              >
                <Block />
              </Fab>
            </div>
          </Tooltip>
        </CSSTransition>

        <CSSTransition
          in={rolling}
          classNames='delayed-enter transition'
          appear
          timeout={{ appear: 6000, enter: 6000, exit: 0 }}
        >
          <div className='!hidden absolute text-white text-center text-lg'>
            This is taking longer than usual... hold on!
          </div>
        </CSSTransition>

        <CSSTransition
          in={!error && !rolling && !!randomItem}
          timeout={{ appear: 1000, enter: 1000, exit: 500 }}
          classNames='fade ease-right transition'
          appear
        >
          <Tooltip title='Choose!' className='!hidden'>
            <div className='min-w-0 w-0 sm:w-[2.5rem] sm:w-auto sm:shrink-0 z-10'>
              <Fab
                aria-label='Choose'
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
