import ResetChat from './ResetChat';

const TypingIndicator = () => {
  return (
    <div className='flex'>
      <div className='flex space-x-2 items-center'>
        <div className='w-2.5 h-2.5 rounded-full bg-gray-600 animate-bounce delay-200'></div>
        <div className='w-2.5 h-2.5 rounded-full bg-gray-600 animate-bounce delay-100'></div>
        <div className='w-2.5 h-2.5 rounded-full bg-gray-600 animate-bounce'></div>
      </div>
      <ResetChat />
    </div>
  );
};

export default TypingIndicator;
