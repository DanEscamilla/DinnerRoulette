import ConfigContent from './ConfigContent';
import Header from './Header';

function App() {
  const isInUberEats =
    window.location.hostname === 'www.ubereats.com' ||
    process.env.NODE_ENV === 'development';

  const content = !isInUberEats ? (
    <div className='w-full h-full flex justify-center items-center text-center text-2xl'>
      <div>
        Navigate to{' '}
        <a className='text-primary' href='https://www.ubereats.com'>
          Ubereats.com
        </a>{' '}
        in order to use this extension.
      </div>
    </div>
  ) : (
    <>
      <Header />
      <ConfigContent />
    </>
  );

  return (
    <div className='h-[28rem] w-[28rem] bg-[#192a30] p-4 text-white'>
      {content}
    </div>
  );
}

export default App;
