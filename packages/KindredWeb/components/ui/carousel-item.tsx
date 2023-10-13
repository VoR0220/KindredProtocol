import React from 'react';

type CarouselItemProps = {
  children: React.ReactNode;
};

const CarouselItem: React.FC<CarouselItemProps> = ({ children }) => {
  return (
    <div className="carousel-item">
      {children}
    </div>
  );
};

export default CarouselItem;