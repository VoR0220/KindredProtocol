import Container from "@/components/ui/container"
import { CreateCircleStepProps } from "@/components/create-circle"
import { CheckCircle2 } from 'lucide-react';

const CreateCircle6: React.FC<CreateCircleStepProps> = ({ circleData, handleChangeInput }) => {
  return (
    <Container>
      <div className="flex items-center justify-center">
        <div className="mt-20 w-96">
          <div className="flex justify-center m-4">
            <CheckCircle2 size={120} color="#17B26A"/>
          </div>
          <h1 className='text-2xl font-bold mb-1 text-center'>
            Well done!
          </h1>
          <p className="text-center">Your circle has been created successfully.</p>
        </div>
      </div>
    </Container>
  );
};

export default CreateCircle6;
