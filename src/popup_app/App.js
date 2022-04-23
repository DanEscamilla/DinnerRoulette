import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import ConfigContent from './ConfigContent';
import Header from './Header';

function App() {
  const [url, setUrl] = useState();

  const isInUberEats = /^https:\/\/www\.ubereats\.com/.test(url);
  console.log(url);

  useEffect(() => {
    if (!chrome.tabs) return;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setUrl(tabs[0].url);
    });

    const handleActivated = (activeInfo) => {
      chrome.tabs.get(activeInfo.tabId, (tab) => {
        setUrl(tab.url);
      });
    };

    const handleUpdated = (wut, change, tab) => {
      if (tab.active && tab.url) {
        setUrl(tab.url);
      }
    };

    chrome.tabs.onActivated.addListener(handleActivated);
    chrome.tabs.onUpdated.addListener(handleUpdated);

    return () => {
      chrome.tabs.onActivated.removeListener(handleActivated);
      chrome.tabs.onUpdated.removeListener(handleUpdated);
    };
  }, []);

  let content;

  if (!url) {
    content = (
      <div className='w-full h-full flex justify-center items-center text-center text-2xl'>
        <CircularProgress />
      </div>
    );
  } else if (!isInUberEats) {
    content = (
      <div className='w-full h-full flex justify-center items-center text-center text-2xl'>
        <div>
          Navigate to{' '}
          <a className='text-primary' href='https://www.ubereats.com'>
            Ubereats.com
          </a>{' '}
          in order to use this extension.
        </div>
      </div>
    );
  } else {
    content = (
      <>
        <Header />
        <ConfigContent />
      </>
    );
  }

  return (
    <div className='h-[28rem] w-[28rem] bg-[#192a30] p-4 text-white'>
      {content}
    </div>
  );
}

export default App;
