'use client';

import { IChatMessage } from '@/components/ChatMessage';
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import ChatDisplay from './ChatDisplay';
import TypingBox from './TypingBox';

interface ChatPageProps {
  userInputs: IChatMessage[];
  chatBotResponses: IChatMessage[];
  setUserInputs: Dispatch<SetStateAction<IChatMessage[]>>;
  setChatBotResponses: Dispatch<SetStateAction<IChatMessage[]>>;
  isWaiting: boolean;
  setIsWaiting: Dispatch<SetStateAction<boolean>>;
}

export const ChatPageContext = createContext<ChatPageProps | undefined>(
  undefined,
);

export default function ChatPage() {
  const [userInputs, setUserInputs] = useState<IChatMessage[]>([]);
  const [chatBotResponses, setChatBotResponses] = useState<IChatMessage[]>([]);
  const [isWaiting, setIsWaiting] = useState<boolean>(true);

  const chatPageProps = {
    userInputs,
    chatBotResponses,
    setUserInputs,
    setChatBotResponses,
    isWaiting,
    setIsWaiting,
  };

  return (
    <ChatPageContext.Provider value={chatPageProps}>
      <div className='h-[750px] w-full space-y-9 overflow-hidden'>
        <ChatDisplay />
        <TypingBox />
      </div>
    </ChatPageContext.Provider>
  );
}
