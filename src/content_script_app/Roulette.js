import { useEffect, useState, useRef } from 'react';
import RouletteSvg from './RouletteSvg';
import { CSSTransition } from 'react-transition-group';
import { Button } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { shuffleArray } from '../helpers/utils';
import RollBtn from './RollBtn';
import Nay from './buttons/Nay';
import Yay from './buttons/Yay';
import BlockBtn from './buttons/BlockBtn';

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
          <Nay onClick={handleRollClick} className='!hidden' />
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
          <BlockBtn onClick={handleBlock} className='!hidden' />
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
          <Yay onClick={onYay.bind(null, randomItem)} className='!hidden' />
        </CSSTransition>
      </div>
    </div>
  );
}

export default App;
