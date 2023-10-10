import { Circle } from 'lucide-react';

const GlowingCircle = () => {
  return (
    <div className="relative w-8 h-8"> {/* Set width and height to match the size of the circles */}
      <Circle className="absolute top-0 left-0 blur-sm w-8 h-8" />
      <Circle className="absolute top-0 left-0 w-8 h-8" />
    </div>
  );
};

export default GlowingCircle;
