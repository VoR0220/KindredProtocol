import React from "react";
import { Button } from "@/components/ui/button";

interface CreateCircleFooterProps {
  handleNextStep: () => void;
  isStepValid: boolean;
  step: number;
  submissionStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
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

const CreateCircleFooter: React.FC<CreateCircleFooterProps> = ({ handleNextStep, isStepValid, step, submissionStatus }) => {
  let buttonContent;

  if (submissionStatus === 'loading') {
    buttonContent = 'Submitting...'; // Here you can also render a spinner or any other loading indicator
  } else if (submissionStatus === 'failed') {
    buttonContent = 'Retry Submission';
  } else {
    buttonContent = buttonTexts[step] || 'Continue';
  }

  return (
    <div className="fixed bottom-8 left-0 right-0 w-full px-6">
      <Button
        className="w-full"
        size="lg"
        onClick={handleNextStep}
        disabled={!isStepValid || submissionStatus === 'loading'} // prevent clicking while loading
      >
        {buttonContent}
      </Button>
    </div>
  );
};


export default CreateCircleFooter;
