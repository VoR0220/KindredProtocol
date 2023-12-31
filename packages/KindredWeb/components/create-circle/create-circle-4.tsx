import {useState} from 'react'
import Container from "@/components/ui/container"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CreateCircleStepProps } from "@/components/create-circle/create-circle"

// Static data connecting vault selection to yield value.
const yieldMapping: { [key: number]: number } = {
  1: 8,  
  2: 9, 
  3: 7,
};

const CreateCircle4: React.FC<CreateCircleStepProps> = ({ circleData, handleChangeInput }) => {
  // State to hold the error message
  const [errorMessage, setErrorMessage] = useState("");

  const validateSelection = () => {
    if (!circleData.vaultOption || !yieldMapping[circleData.vaultOption]) {
      setErrorMessage("Please select a valid vault option.");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };

  // The input change handler with validation
  const handleSelectChange = (vaultOption: string) => {
    validateSelection();
    const option = Number(vaultOption);

    handleChangeInput?.({
      name: 'vaultOption',
      value: option,
    });

    if (yieldMapping[option]) {
        handleChangeInput?.({
          name: 'yieldPercentage',
          value: yieldMapping[option],
        });
        setErrorMessage("");
    }
  };

  

  return (
    <Container>
      <div className="flex justify-center">
        <div className="mt-4 w-96">
          <h1 className='text-2xl font-bold mb-1'>
            Yield strategy
          </h1>
          <p>Select a Vault to attach to your circle.</p>
          <div className="flex flex-row mt-4">
            <Select
              name="vaultOption"
              onValueChange={handleSelectChange}
              value={`${circleData.vaultOption}`}
            >
              <SelectTrigger>
                <SelectValue placeholder="0"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">
                  <Badge className="bg-primary-400">8%</Badge> Vault 1 
                </SelectItem>
                <SelectItem value="2">
                  <Badge className="bg-green-500">9%</Badge> Vault 2 
                </SelectItem>
                <SelectItem value="3">
                  <Badge className="bg-primary-400">7%</Badge> Vault 3 
                </SelectItem>
              </SelectContent>
            </Select>
            <div className="text-red-500 mt-2">
              {errorMessage}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CreateCircle4;
