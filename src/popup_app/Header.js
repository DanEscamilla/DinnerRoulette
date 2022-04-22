import Logo from '../assets/logo.png';

function Header() {
  return (
    <header className='flex items-center gap-2 mb-4'>
      <img src={Logo} alt='DinnerRoulette logo' className='h-12 w-12' />
      <div className=''>Dinner Roulette Config</div>
      <div className='flex-auto' />
    </header>
  );
}

export default Header;
