'use-client';

import Link from 'next/link';

interface NavBarItemProps {
  title: string;
  toLink: string;
}

export default function NavBarItem({ title, toLink }: NavBarItemProps) {
  return (
    <button title={title} className='p-3 hover:text-blue-900 w-full'>
      <Link href={toLink}>{title}</Link>
    </button>
  );
}
