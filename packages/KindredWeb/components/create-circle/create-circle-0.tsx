import { Checkbox } from "@/components/ui/checkbox"
import CircleSymbol from "../ui/circle-symbol"
import Container from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { CreateCircleStepProps } from "@/components/create-circle/create-circle"
import { Info } from 'lucide-react';
import Link from "next/link"

const CreateCircle0: React.FC<CreateCircleStepProps> = ({ circleData, handleChangeInput}) => {

  const handleAgreeToTerms = (checked: boolean) => {
    handleChangeInput?.({
      name: 'agreeToTerms',
      value: checked,
    });
  };

  return (
    <Container>
      <div className="flex items-center justify-center">
        <div className="mt-20 w-96">
          <div className="flex justify-center m-4">
            <CircleSymbol color="#2400FF" size="w-16 h-16"/>
          </div>
          <h1 className='text-2xl font-bold mb-1'>
            Create a Circle
          </h1>
          <p>Discover the power of group savings. Each member contributes during the pay period with the first going towards the yield pool. Invite friends and family to get started.</p>
          <div className="flex flex-row bg-gray-100 rounded-lg p-4 mt-4 justify-between border">
            <div className="flex items-center space-x-2">
              <Checkbox 
                checked={circleData.agreeToTerms}
                onCheckedChange={handleAgreeToTerms}
              />
              <label
                  htmlFor="terms"
                  className="text-sm font-medium text-primary-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
            </div>
            <Button 
              variant="ghost"
            >
              <Link href="/terms">
                <Info
                  size={16}
                  color="#98A2B3"
                />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CreateCircle0;
