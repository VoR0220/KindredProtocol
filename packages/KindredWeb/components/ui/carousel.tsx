import React from 'react';

type CarouselProps = {
  children: React.ReactNode;
};

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  return (
    <div className="max-w-md p-4 space-x-4 rounded-box">
      {children}
    </div>
  );
};

export default Carousel;