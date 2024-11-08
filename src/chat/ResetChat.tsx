import CachedIcon from '@mui/icons-material/Cached';

const handleReload = () => {
  window.location.href = '/chat';
};

export default function ResetChat({ className }: { className?: string }) {
  return (
    <div>
      <button
        className={`items-center justify-center p-2 ${className}`}
        title='Reload Chat'
        type='button'
        onClick={handleReload}
      >
        <CachedIcon className='text-white' />
      </button>
    </div>
  );
}
