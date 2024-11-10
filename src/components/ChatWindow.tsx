'use client';

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { useEffect, useState } from 'react';

export default function ChatWindow() {
  const [isDisplay, setIsDisplay] = useState<boolean>(true);

  useEffect(() => {
    const urlString = window.location.toString();

    const url = new URL(urlString);

    const pathName = url.pathname;

    if (pathName == '/chat') {
      setIsDisplay(false);
    }
  }, []);

  const handleChatClick = () => {
    window.location.href = '/chat';
  };

  return (
    isDisplay && (
      <button
        className='fixed lg:flex hidden bottom-4 right-4 z-10 bg-blue-800 text-white rounded-full hover:scale-[1.09] hover:opacity-100 p-6'
        title='Chat with AI assistant'
        onClick={handleChatClick}
      >
        <QuestionMarkIcon className='bg-transparent' />
      </button>
    )
  );
}
