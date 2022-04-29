import { CSSTransition } from 'react-transition-group';

function RouletteHeader({ type }) {
  return (
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
  );
}

export default RouletteHeader;
