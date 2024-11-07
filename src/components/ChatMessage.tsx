import { Avatar } from '@mui/material';
import Image from 'next/image';
import { createContext, PropsWithChildren, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export interface IChatMessage {
  text: string;
  avt: string;
}

interface ChatMessageProps extends PropsWithChildren {
  messageProps: IChatMessage | undefined;
  className?: string;
}

const ChatMessageContext = createContext<IChatMessage | undefined>(undefined);

function useMessage() {
  const message = useContext(ChatMessageContext);

  return message;
}

export default function ChatMessage({
  children,
  messageProps,
  className,
}: ChatMessageProps) {
  return (
    <ChatMessageContext.Provider value={messageProps}>
      <div className={`flex ${className ? className : ''}`}>{children}</div>
    </ChatMessageContext.Provider>
  );
}

ChatMessage.Text = function MessageText({ className }: { className: string }) {
  const message = useMessage();

  return (
    <div className={className}>
      <ReactMarkdown children={message?.text} remarkPlugins={[remarkGfm]} />
    </div>
  );
};

ChatMessage.Avatar = function MessageAvatar({
  className,
}: {
  className: string;
}) {
  const message = useMessage();

  return (
    <div className={`${className}`}>
      <Avatar
        className='flex justify-center mx-auto left-1/2 -translate-x-1/2'
        sx={{ width: 42, height: 42 }}
      >
        <Image
          src={
            message?.avt ? message.avt.toString() : '/images/default-avt.png'
          }
          alt='avt'
          width={300}
          height={300}
        />
      </Avatar>
    </div>
  );
};
