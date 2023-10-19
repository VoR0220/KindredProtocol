import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet"
import { Plus } from 'lucide-react'
import CreateCircleHeader from "@/components/create-circle/create-circle-header"
import CreateCircleFooter from "@/components/create-circle/create-circle-footer"
import CreateCircle0 from '@/components/create-circle/create-circle-0'
import CreateCircle1 from '@/components/create-circle/create-circle-1'
import CreateCircle2 from '@/components/create-circle/create-circle-2'
import CreateCircle3 from '@/components/create-circle/create-circle-3'
import CreateCircle4 from '@/components/create-circle/create-circle-4'
import CreateCircle5 from '@/components/create-circle/create-circle-5'
import CreateCircle6 from '@/components/create-circle/create-circle-6'
import { KindredCore__factory } from '../../../hardhat/typechain-types'
import {ethers} from 'ethers'

export interface CircleData {
  agreeToTerms: boolean;
  circleName: string;
  payPeriod: string;
  currency: string;
  contributionAmount: number;
  inflationMode: boolean;
  vaultOption: number;
  yield: number;
  invited: string[];
  members: string[];
}

const vaultOptionMap: {[ key: number]: string} = {
  0: "0x83F20F44975D03b1b09e64809B757c47f942BEeA" // fucking shit this address isn't available on mumbai
}

const initialCircleData = {
  agreeToTerms: false,
  circleName: "",
  payPeriod: "monthly",
  currency: "usd",
  contributionAmount: 0,
  inflationMode: false,
  vaultOption: 0,
  yield: 0,
  invited: [],
  members: [],
}

export interface InputChange {
  name: string;
  value: string | number | boolean | string[];
}

export interface CreateCircleStepProps {
  circleData: {
      agreeToTerms: boolean;
      circleName: string;
      payPeriod: string;
      currency: string;
      inflationMode: boolean;
      contributionAmount: number;
      vaultOption: number;
      members: string[];
  };
  handleChangeInput?: (change: InputChange) => void;
}

export default function CreateCircle() {
  const [step, setStep] = useState<number>(0);
  const [circleData, setCircleData] = useState<CircleData>(initialCircleData);
  const [isStepValid, setIsStepValid] = useState<boolean>(false);
  
  // Pre-submission validations
  const stepValidations = [
    () => circleData.agreeToTerms,  // Validation for step 0
    () => circleData.circleName.length >= 5, // Validation for step 1
    () => !!circleData.payPeriod,  // Validation for step 2
    () => circleData.contributionAmount > 0 && !!circleData.currency,  // Validation for step 3
    () => circleData.vaultOption >= 1 && !!circleData.yield,  // Validation for step 4
    () => circleData.members.length > 0,  // Validation for step 5
  ];
  
  // Method for handling all changes to inputs. Updates parent state.
  const handleChangeInput = (change: InputChange) => {
    const { name, value } = change;
    setCircleData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const circleConfiguration = [
    { component: CreateCircle0, handleChange: handleChangeInput },
    { component: CreateCircle1, handleChange: handleChangeInput },
    { component: CreateCircle2, handleChange: handleChangeInput },
    { component: CreateCircle3, handleChange: handleChangeInput },
    { component: CreateCircle4, handleChange: handleChangeInput },
    { component: CreateCircle5, handleChange: handleChangeInput },
    { component: CreateCircle6, handleChange: handleChangeInput },
  ];

  // Dynamically set the total steps.
  const MAX_STEP = circleConfiguration.length - 1;

  //Handle navigation - increments the step state to control which Component to render
  const handleNextStep = () => step < MAX_STEP && setStep(prevStep => prevStep + 1);
  const handlePrevStep = () => step > 0 && setStep(prevStep => prevStep - 1);

  // Config for the current step
  const currentConfig = circleConfiguration[step];
  const CurrentCircleComponent = currentConfig.component;

  // We need a method to do final operation
  const handleSubmitCreateCircleData = async () => {
    // Validation and submit form data here
    const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/polygon_mumbai');
    const kindred = KindredCore__factory.connect('kindredCoreAddressHere', provider)
    // todo: create a function to get this according to selected duration
    let dueDates: number[] = [
        new Date().getTime() + 60,
        new Date().getTime() + 60 * 2,
        new Date().getTime() + 60 * 3,
        new Date().getTime() + 60 * 4
    ]
    // todo: Julio, I need you to take a look at this and make sure this works with whatever
    // wagmi hooks it needs to
    await kindred.register({
      participants: circleData.members,
      dueDates,
      payAmount: circleData.contributionAmount,
      currentPot: 0, // this is always 0
      expectedTermPot: circleData.contributionAmount * circleData.members.length,
      latefee: 0, // this can be set but for now leave it at 0
      shares: 0, // this is always 0
      currentDueDate: 0, // this is always 0
      stage: 0, // this is always 0
      vault: vaultOptionMap[circleData.vaultOption],
      token: 'StablecoinAddressHere' // fill this in 
    }) 
  };

  // Hook that updates the validity of the current step
  useEffect(() => {      
      const isValid = stepValidations[step] ? stepValidations[step]() : true;
      setIsStepValid(isValid);
  }, [circleData, step]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default">
          <Plus />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-screen">
        <CreateCircleHeader step={step} handlePrevStep={handlePrevStep} />
        <CurrentCircleComponent 
          circleData={circleData}
          handleChangeInput={currentConfig.handleChange || (() => {})}
        />
        <CreateCircleFooter 
          handleNextStep={handleNextStep} 
          isStepValid={isStepValid}
          step={step}
        />
      </SheetContent>
    </Sheet>
  )
}
