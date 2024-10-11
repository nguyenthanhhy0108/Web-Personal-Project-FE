'use-client';

interface NavBarItemProps {
  title: string;
  toLink: string;
}

export default function NavBarItem({ title, toLink }: NavBarItemProps) {
  const handleClick = () => {
    window.location.href = toLink;
  };

  return (
    <button
      onClick={handleClick}
      title={title}
      className='p-3 hover:text-blue-900 w-full'
    >
      <div>{title}</div>
    </button>
  );
}
