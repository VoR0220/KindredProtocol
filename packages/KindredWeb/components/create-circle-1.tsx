import {useState} from 'react'
import Container from "@/components/ui/container"
import { Input } from "@/components/ui/input"
import { CreateCircleStepProps } from "@/components/create-circle"

const CreateCircle1: React.FC<CreateCircleStepProps> = ({ circleData, handleChangeInput }) => {
  // State to hold the error message
  const [errorMessage, setErrorMessage] = useState("");

  // The input change handler with validation
  const handleInputChangeWithValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Validation logic
    if (!e.target.value || e.target.value.length < 5) {
      setErrorMessage("The name should be at least 5 characters.");
    } else {
      setErrorMessage(""); // Clear the error message if input is valid
    }
    handleChangeInput?.({ name: 'circleName', value: e.target.value});
  };

  return (
    <Container>
      <div className="flex justify-center">
        <div className="mt-4 w-96">
          <h1 className='text-2xl font-bold mb-1'>
            Circle name
          </h1>
          <p>This is what will be displayed for everyone.</p>
          <div className="flex flex-row mt-4">
            <Input
              name="circleName"
              type="text"
              placeholder='i.e. "Super Tanda"'
              onChange={handleInputChangeWithValidation}
              value={circleData.circleName}
            />
          </div>
          <div className="w-full">
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}  
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CreateCircle1;
