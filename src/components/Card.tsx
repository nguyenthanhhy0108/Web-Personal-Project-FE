import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useState } from 'react';
import CardSpanDialog from './CardSpanDialog';

interface CardProps{
  "title": string,
  "description": string,
  "imageLink": string
}

const minimizeContent = (content: string) => {
  return content.split(" ").slice(0, 11).join(" ") + "..."
}

export default function ImgMediaCard(
  {title, description, imageLink} : CardProps
) {

  const [openCardLearnMore, setOpenCardLearnMore] = useState(false);

  const handleClickLearnMore = () => {
    setOpenCardLearnMore(!openCardLearnMore);
  }

  return (
    <Card className='w-auto flex-grow dark:bg-black dark:text-white rounded-md border-2 border-gray-200 dark:border-black hover:scale-[1.03] ease-in-out transition-all'>
      <CardSpanDialog
        title={title}
        content={description}
        img={imageLink}
        status={openCardLearnMore}
        setOpenCardLearnMore={setOpenCardLearnMore}
      />
      <div className='flex flex-col'>
        <Image
          src={imageLink}
          alt='IMG'
          width={900}
          height={900}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} className='dark:text-white'>
            {
              minimizeContent(description)
            }
          </Typography>
        </CardContent>
        <CardActions>
          {/* <Button size="small">Share</Button> */}
          <Button 
            className='flex ml-auto hover:bg-gray-300 dark:hover:bg-gray-800 hover:scale-[1.05] duration-75'
            onClick={handleClickLearnMore}
            size="small">Learn More</Button>
        </CardActions>
      </div>
    </Card>
  );
}