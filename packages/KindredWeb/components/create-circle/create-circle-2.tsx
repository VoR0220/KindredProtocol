import { useState } from 'react';
import Container from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreateCircleStepProps } from "@/components/create-circle/create-circle";
import { Info } from 'lucide-react';

const CreateCircle2: React.FC<CreateCircleStepProps> = ({ circleData, handleChangeInput }) => {
  const [selectedPayPeriod, setSelectedPayPeriod] = useState(circleData.payPeriod);

  const handleRadioChange = (newValue: string) => {
    setSelectedPayPeriod(newValue);
    handleChangeInput?.({
      name: 'payPeriod',
      value: newValue
    });
  };

  return (
    <Container>
      <div className="flex justify-center">
        <div className="mt-4 w-96">
          <h1 className='text-2xl font-bold mb-1'>
            Pay period
          </h1>
          <p>This is how often everyone contributes.</p>
          <div className="flex flex-row mt-4">
            <RadioGroup value={selectedPayPeriod} onValueChange={handleRadioChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="WEEKLY" id="option-1" />
                <Label htmlFor="option-1">Weekly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="BIWEEKLY" id="option-2" />
                <Label htmlFor="option-2">Bi-weekly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="MONTHLY" id="option-3" />
                <Label htmlFor="option-3">Monthly</Label>
              </div>
            </RadioGroup>
            
          </div>
          <div className="flex flex-row bg-gray-100 rounded-lg p-4 mt-4 justify-between border">
            <div className="flex items-center space-x-2">
              <Info 
                size={16}
                color="#98A2B3"
              />
              <p className="text-sm text-gray-400">Default is monthly</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CreateCircle2;
