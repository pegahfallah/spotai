import React from 'react';
import Image from 'next/image'

const Album = ({ urls }) => {
  if (!urls || urls.length === 0) {
    return null;
  }

  return (
    <div className="flex">
      {urls.map((url, index) => (
        <div key={index} className="w-full rounded-md mx-2">
          <Image
            width={280}
            height={280}
            priority
            className='rounded-md'
            src={url}
            alt={`Album Image ${index + 1}`} />

        </div>
      ))}
    </div>
  );
};

export default Album;
