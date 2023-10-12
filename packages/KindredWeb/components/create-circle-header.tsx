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
      {/* You can add more header content here if needed */}
    </div>
  );
};

export default CreateCircleHeader;
