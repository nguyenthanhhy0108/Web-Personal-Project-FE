import ChatMessage from '@/components/ChatMessage';
import { Avatar } from '@mui/material';
import Image from 'next/image';
import { useContext, useEffect, useRef } from 'react';
import { ChatPageContext } from './ChatPage';
import ResetChat from './ResetChat';
import TypingIndicator from './TypingIndicator';

export default function ChatDisplay() {
  const chatPageProps = useContext(ChatPageContext);

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatPageProps?.userInputs, chatPageProps?.chatBotResponses]);

  return (
    <div className='h-full w-full space-y-9 overflow-y-scroll pb-24 lg:p-24 md:p-24 pt-0 top-0 lg:-mt-14'>
      <div className='flex flex-col mx-auto dark:text-white text-black'>
        <h1 className='text-3xl font-bold flex mx-auto'>AI ASSISTANT</h1>
        <p className='text-sm italic text-gray-600 flex mx-auto'>
          AI can make mistakes. Check important info.
        </p>
      </div>

      {/* USER */}
      {chatPageProps?.userInputs.map((input, _) => {
        return (
          <div key={_}>
            <ChatMessage
              className='lg:mr-5 md:mr-5 flex gap-3'
              messageProps={chatPageProps?.userInputs[_]}
            >
              <div className='ml-auto flex max-w-[50%] gap-3'>
                <ResetChat className='ml-auto flex mt-2' />
                <ChatMessage.Text className='dark:text-white dark:bg-gray-800 bg-gray-300 text-black font-normal text-lg p-4 rounded-3xl  break-words' />
                <ChatMessage.Avatar className='justify-center items-start flex mt-2' />
              </div>
            </ChatMessage>
            {chatPageProps?.chatBotResponses[_] ? (
              <ChatMessage
                className='lg:ml-5 md:ml-5 flex gap-3 mt-9'
                messageProps={chatPageProps?.chatBotResponses[_]}
              >
                <ChatMessage.Avatar className='justify-center items-start flex mt-2' />
                <ChatMessage.Text className='dark:text-white dark:bg-gray-600 bg-gray-100 text-black font-normal text-lg p-4 rounded-3xl max-w-[50%] break-words' />
                <ResetChat className='mt-2' />
              </ChatMessage>
            ) : (
              <div className='flex mr-auto gap-6 ml-5'>
                <Avatar sx={{ width: 42, height: 42 }}>
                  <Image
                    src='/images/chatbot-avt.jpg'
                    alt='avt'
                    width={300}
                    height={300}
                  />
                </Avatar>
                <TypingIndicator />
              </div>
            )}
          </div>
        );
      })}
      <div ref={chatEndRef} />
    </div>
  );
}
