import Logo from './assets/logo.png';
import { FaCog } from 'react-icons/fa';
function Header() {
  return (
    <header className='flex p-2 items-center gap-2'>
      <img src={Logo} alt='DinnerRoulette logo' className='h-12 w-12' />
      <div className=''>Dinner Roulette</div>
      <div className='flex-auto' />
      <button className='w-12 h-12 text-center'>
        <FaCog className='text-2xl w-full' />
      </button>
    </header>
  );
}

export default Header;
