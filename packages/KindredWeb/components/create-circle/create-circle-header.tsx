import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

interface CreateCircleHeaderProps {
  step: number;
  handlePrevStep: () => void;
}

const CreateCircleHeader: React.FC<CreateCircleHeaderProps> = ({ step, handlePrevStep }) => {
  if (step < 1) return null;

  return (
    <div className="header-container">
      <Button
        onClick={handlePrevStep}
        variant="ghost"
      >
        <ArrowLeft />
      </Button>
      {/* add */}
    </div>
  );
};

export default CreateCircleHeader;
