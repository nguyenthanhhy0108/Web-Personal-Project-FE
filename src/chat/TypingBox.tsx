import { getChatBotResponse } from '@/utils/ChatServices';
import { ArrowUp } from 'lucide-react';
import React, { useContext, useRef, useState } from 'react';
import { ChatPageContext } from './ChatPage';

export default function TypingBox() {
  const [message, setMessage] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const chatPageProps = useContext(ChatPageContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
    autoResizeTextarea();
  };

  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      chatPageProps?.setUserInputs([
        ...chatPageProps.userInputs,
        {
          text: message,
          avt: '/images/default-avt.png',
        },
      ]);
      chatPageProps?.setIsWaiting(true);

      let newInputs;

      if (chatPageProps?.userInputs != undefined) {
        newInputs = [
          ...chatPageProps?.userInputs,
          {
            text: message,
            avt: '/images/default-avt.png',
          },
        ];
      } else {
        newInputs = [
          {
            text: message,
            avt: '/images/default-avt.png',
          },
        ];
      }

      getChatBotResponse(newInputs[newInputs.length - 1].text)
        .then((response) => {
          console.log(response);
          chatPageProps?.setChatBotResponses([
            ...chatPageProps.chatBotResponses,
            {
              text: response.message,
              avt: '/images/chatbot-avt.jpg',
            },
          ]);
          chatPageProps?.setIsWaiting(false);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

      setMessage('');

      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  return (
    <div className='flex justify-center items-center pl-14 pr-3 py-3 lg:w-[1200px] w-full mx-auto lg:bottom-0 md:bottom-0 top-[95%] lg:top-auto md:top-auto bg-gray-300 dark:bg-gray-950 rounded-full absolute -translate-x-[50%] left-1/2'>
      <textarea
        ref={textareaRef}
        value={message}
        onChange={handleInputChange}
        placeholder='Type a message...'
        className='flex-grow dark:text-white text-black resize-none border-none focus:outline-none bg-transparent text-xl rounded-3xl p-2 overflow-y-hidden'
        style={{ maxHeight: '200px' }}
        rows={1}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
      />
      <button
        onClick={handleSendMessage}
        disabled={chatPageProps?.isWaiting}
        title='Send Message'
        type='button'
        className={`ml-2 p-3 dark:bg-blue-700 bg-blue-500 ${chatPageProps?.isWaiting ? 'dark:bg-blue-800 bg-blue-600' : ''} text-white rounded-full dark:hover:bg-blue-800 hover:bg-blue-600`}
      >
        <ArrowUp />
      </button>
    </div>
  );
}
