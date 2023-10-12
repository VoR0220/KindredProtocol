import React from 'react';
import { Circle } from 'lucide-react';

interface CircleSymbolProps {
  color?: string;
  size?: string;
}

const CircleSymbol: React.FC<CircleSymbolProps> = ({ color = "currentColor", size = "w-8 h-8" }) => {
  return (
    <div className={`relative ${size}`}>
      <Circle className={`absolute top-0 left-0 blur-sm ${size}`} color={color} />
      <Circle className={`absolute top-0 left-0 ${size}`} color={color} />
    </div>
  );
};

export default CircleSymbol;
