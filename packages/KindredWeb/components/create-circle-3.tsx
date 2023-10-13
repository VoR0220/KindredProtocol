import { useState } from 'react';
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CreateCircleStepProps } from "@/components/create-circle";

const CreateCircle3: React.FC<CreateCircleStepProps> = ({ circleData, handleChangeInput }) => {
  const [selectedPayPeriod, setSelectedPayPeriod] = useState(circleData.payPeriod);

  const handleContributionAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = Number(e.target.value);
    handleChangeInput?.({
      name: 'contributionAmount',
      value: amount,
    });
  };

  const handleCurrencyChange = (selectedCurrency: string) => {
    handleChangeInput?.({
      name: 'currency',
      value: selectedCurrency,
    });
  };

  const handleInflationModeChange = (isOn: boolean) => {
    handleChangeInput?.({
      name: 'inflationMode',
      value: isOn,
    });
  };

  return (
    <Container>
      <div className="flex justify-center">
        <div className="mt-4 w-96">
          <h1 className='text-2xl font-bold mb-1'>
            Contribution amount
          </h1>
          <p>This is how much each member contributes to the circle every pay period.</p>
          <div className="mt-4">
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <Input
                type="number"
                name="contributionAmount"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="0.00"
                onChange={handleContributionAmountChange}
                value={circleData.contributionAmount}
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <Label htmlFor="currency" className="sr-only">
                  Currency
                </Label>
                <Select
                  name="currency"
                  onValueChange={handleCurrencyChange}
                >
                  <SelectTrigger className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-4 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-s">
                    <SelectValue placeholder="USD" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="usd">USD</SelectItem>
                      <SelectItem value="ars">ARS</SelectItem>
                      <SelectItem value="eur">EUR</SelectItem>
                      <SelectItem value="gbp">GBP</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between rounded-lg border p-4 bg-gray-100 mt-4">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">
                Inflation Mode
              </Label>
              <p className="text-xs">Uses historical prices for currency conversions.</p>
            </div>
            <Switch
              name="inflationMode"
              checked={circleData.inflationMode}
              onCheckedChange={handleInflationModeChange}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CreateCircle3;
