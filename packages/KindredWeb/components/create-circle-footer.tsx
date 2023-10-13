import React from "react";
import { Button } from "@/components/ui/button";

interface CreateCircleFooterProps {
  handleNextStep: () => void;
  isStepValid: boolean;
  step: number;
}

const buttonTexts = [
  "Continue",
  "Next",
  "Next",
  "Next",
  "Next",
  "Finish",
  "Continue",
];

const CreateCircleFooter: React.FC<CreateCircleFooterProps> = ({ handleNextStep, isStepValid, step }) => {
  return (
    <div className="fixed bottom-8 left-0 right-0 w-full px-6">
      <Button
        className="w-full"
        size="lg"
        onClick={handleNextStep}
        disabled={!isStepValid}
      >
        {buttonTexts[step] || "Continue"}
      </Button>
    </div>
  );
};

export default CreateCircleFooter;
