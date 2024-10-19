import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CardSpanDialog from './CardSpanDialog';

interface CardProps {
  title: string;
  description: string;
  price: string;
  imageLink: string;
}

const minimizeContent = (content: string) => {
  return content.split(' ').slice(0, 11).join(' ') + '...';
};

export default function CarCard({
  title,
  description,
  imageLink,
  price,
}: CardProps) {
  const [openCardLearnMore, setOpenCardLearnMore] = useState(false);

  const router = useRouter();
  
  const handleClickLearnMore = () => {
    setOpenCardLearnMore(!openCardLearnMore);
  };

  const handleCardClick = () => {
    router.push("/car");
  }

  return (
    <Card className='w-auto flex-grow dark:bg-gray-800 dark:text-white rounded-lg border-2 border-gray-200 dark:border-gray-900 hover:scale-[1.03] ease-in-out transition-all'>
      <CardSpanDialog
        title={title}
        description={description}
        price={price}
        img={imageLink}
        status={openCardLearnMore}
        setOpenCardLearnMore={setOpenCardLearnMore}
        handleCardClick={handleCardClick}
      />
      <div className='flex flex-col'>
        <Image
          onClick={handleCardClick}
          className='object-contain w-[500px] h-[500px] hover:cursor-pointer'
          alt='IMG'
          src={imageLink}
          width={900}
          height={900}
        />
        <CardContent>
          <div className='grid grid-rows-2'>
            <Typography
              gutterBottom
              variant='h6'
              component='div'
              className='text-3xl'
            >
              {title}
            </Typography>
            <Typography
              gutterBottom
              variant='h6'
              component='div'
              className='text-lg text-violet-400'
            >
              {price}
            </Typography>
          </div>
          <Typography
            variant='body2'
            sx={{ color: 'text.secondary' }}
            className='dark:text-white'
          >
            {minimizeContent(description)}
          </Typography>
        </CardContent>
        <CardActions>
          {/* <Button size="small">Share</Button> */}
          <Button
            className='flex ml-auto hover:bg-gray-300 dark:hover:bg-gray-800 hover:scale-[1.05] duration-75'
            onClick={handleClickLearnMore}
            size='small'
          >
            Learn More
          </Button>
        </CardActions>
      </div>
    </Card>
  );
}
