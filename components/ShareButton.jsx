import React from 'react';
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  TelegramShareButton,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  EmailIcon,
  TelegramIcon,
  WhatsappIcon,
  TwitterIcon,
} from 'react-share';

const ShareButton = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
  return (
    <>
      <h3 className='text-xl font-bold text-center pt-2'>
        Share this propety:
      </h3>
      <div className='flex justify-center gap-4 pb-5'>
        <FacebookShareButton
          url={shareUrl}
          quote={property.name}
          hashtag={[`${property.type.replace(/\s/g, '')}ForRent`]}
          className='w-10'
        >
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
      
        <WhatsappShareButton
          url={shareUrl}
          quote={property.name}
          separator=':: '
          className='w-10'
        >
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
        <TwitterShareButton
          url={shareUrl}
          quote={property.name}
          hashtag={[`${property.type.replace(/\s/g, '')}ForRent`]}
          className='w-10'
        >
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
       
        <EmailShareButton
          url={shareUrl}
          quote={property.name}
          body={`Check out this property listing: ${shareUrl}`}
          className='w-10'
        >
          <EmailIcon size={32} round={true} />
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareButton;
