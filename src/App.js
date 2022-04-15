import { useEffect, useRef, useState } from 'react';
import Roulette from './Roulette';
import { getCategories, getCategoryFromPath } from './helpers/ubereats';
import { CircularProgress } from '@mui/material';
import { CSSTransition } from 'react-transition-group';

function App() {
  const category = useRef(getCategoryFromPath());
  const [items, setItems] = useState([]);
  const [type, setType] = useState('');

  useEffect(() => {
    if (!category.current) {
      setType('category');
      getCategories().then((loadedCategories) => {
        setItems(loadedCategories);
      });
    } else {
      setType('restaurant');
      console.log('active catgegory ', category.current);
      getCategories().then((loadedCategories) => {
        setItems(loadedCategories);
      });
    }
  }, []);

  const handleYay = (item) => {
    if (type === 'category') {
      console.log('Selected ', item);
      category.current = item.title;
      setType('restaurant');
      setItems([{ title: 'R1' }, { title: 'R1' }]);
    }
  };

  const content =
    items.length === 0 ? (
      <div className='w-full h-full flex flex-col justify-center items-center gap-4'>
        <CircularProgress className='text-primary' />
        <span className='text-lg block'>Polishing the roulette...</span>
      </div>
    ) : (
      <>
        <div className='text-2xl text-center my-4'>
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
