import { useState } from 'react';
import RouletteSvg from './RouletteSvg';
import { CSSTransition } from 'react-transition-group';
import { Fab, Tooltip } from '@mui/material';
import { Done, Close } from '@mui/icons-material';

function App({ items, onYay }) {
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
      <div className='min-h-[3.5rem] text-4xl mb-8 flex justify-center items-center gap-2'>
        <CSSTransition
          in={!animating && !!randomItem}
          timeout={1000}
          classNames='fade ease-left transition'
          appear
        >
          <Tooltip title='Roll again...' className='!hidden'>
            <Fab
              color='warning'
              className='!bg-warning shrink-0'
              size='small'
              onClick={handleRollClick}
            >
              <Close />
            </Fab>
          </Tooltip>
        </CSSTransition>

        <CSSTransition
          in={!animating && !!randomItem}
          timeout={1000}
          classNames='fade ease-down transition'
          appear
        >
          <div className='py-2 px-2 hidden text-center'>
            {randomItem && randomItem.title}
          </div>
        </CSSTransition>

        <CSSTransition
          in={!animating && !randomItem}
          timeout={1000}
          classNames='fade ease-down transition'
          appear
        >
          <button className='py-2 px-6 rounded' onClick={handleRollClick}>
            Roll
          </button>
        </CSSTransition>

        <CSSTransition
          in={!animating && !!randomItem}
          timeout={1000}
          classNames='fade ease-right transition'
          appear
        >
          <Tooltip title='Pick a restaurant!' className='!hidden'>
            <Fab
              color='primary'
              className='!bg-primary shrink-0'
              size='small'
              onClick={onYay.bind(null, randomItem)}
            >
              <Done />
            </Fab>
          </Tooltip>
        </CSSTransition>
      </div>
    </div>
  );
}

export default App;
