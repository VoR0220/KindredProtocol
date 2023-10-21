import React, { useState } from 'react';
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { X } from 'lucide-react';
import { User2 } from 'lucide-react';
import { CreateCircleStepProps } from "@/components/create-circle/create-circle";
import isMobilePhone from 'validator/lib/isMobilePhone';

const CreateCircle5: React.FC<CreateCircleStepProps> = ({ circleData, handleChangeInput }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>(circleData.invited || []);
  const [error, setError] = useState('');

  const handleAddPhoneNumber = () => {
    if (isValidPhoneNumber(phoneNumber)) {
      setPhoneNumbers(prevNumbers => [...prevNumbers, phoneNumber]);
      handleChangeInput?.({
          name: 'invited',
          value: [...phoneNumbers, phoneNumber],
      });
      setPhoneNumber('');
      setError('');
    } else {
      setError('Invalid phone number.');
    }
  };

  const handleRemovePhoneNumber = (indexToRemove: number) => {
    const newPhoneNumbers = phoneNumbers.filter((_, index) => index !== indexToRemove);
    setPhoneNumbers(newPhoneNumbers);
    handleChangeInput?.({
        name: 'invited',
        value: newPhoneNumbers,
    });
  };

  const isValidPhoneNumber = (number: string) => {
    const isValidPhoneNumber = isMobilePhone(number);
    return isValidPhoneNumber;
  }

  return (
    <Container>
      <div className="flex justify-center">
        <div className="mt-4 w-96 flex flex-col">
          <div>
            <h1 className='text-2xl font-bold mb-1'>
              Invite members
            </h1>
            <p>Invite members to your circle by their phone number.</p>
            <div className="flex w-full max-w-sm items-center space-x-2 mt-4">
              <Input 
                type="text"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Button onClick={handleAddPhoneNumber}>
                Add
              </Button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <div className="mt-4 border rounded-md bg-gray-100 p-2">
            {phoneNumbers.length === 0 
              ? <div className="text-center p-16"><p className="text-gray-400 text-sm">Add users by their phone number to invite them.</p></div>
              : phoneNumbers.map((number, index) => (
                <Badge key={index} className="m-1 bg-primary-400">
                  <Avatar className="h-4 w-4 rounded-full ring-1 ring-white dark:ring-gray-800 mr-2 my-2">
                    <User2 size={16}/>
                  </Avatar>
                  <span>{number}</span>
                  <button className="" onClick={() => handleRemovePhoneNumber(index)}>
                    <X size={14} className="ml-1" />
                  </button>
                </Badge>
              ))
            }
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CreateCircle5;
