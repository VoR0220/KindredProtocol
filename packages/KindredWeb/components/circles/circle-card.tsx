import { Card } from '@/components/ui/card'
import React, { FC, ReactNode } from 'react'
import CircleSymbol from '@/components/ui/circle-symbol';
import { Progress } from '@/components/ui/progress';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

interface Contribution {
  amount: number;
  period: string;
}

interface Member {
  name: string;
  avatarUrl: string;
}

interface CircleCardProps {
  name: string;
  contribution: Contribution;
  members: Member[];
  vault: number;
  children?: ReactNode;
  [key: string]: any;  // For ...props spread to support any additional props
}

const CircleCard: FC<CircleCardProps> = ({ name, contribution, members, progress, vault, ...props }) => {
  const displayedMembers = members.slice(0, 4);
  const remainingMembers = members.length - 4;

  return (
    <div>
      <Card className="flex flex-col justify-between h-36 rounded-md bg-gradient-to-r from-purple-500 to-indigo-400 text-primary-foreground p-4 border-0 drop-shadow-md backdrop-blur-xl" {...props}>
        <div className="flex flex-row items-center justify-between">
          <h3>{name}</h3>
          <CircleSymbol />
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex -space-x-2">
            {displayedMembers.map((member, index) => (
              <Avatar key={index} className="h-6 w-6 rounded-full ring-1 ring-white dark:ring-gray-800">
                <AvatarImage src={member.avatarUrl} alt={member.name} />
                <AvatarFallback />
              </Avatar>
            ))}
            {remainingMembers > 0 && (
              <span className="h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-800 flex items-center justify-center bg-gray-100 text-xs text-gray-400 z-10">
                +{remainingMembers}
              </span>
            )}
          </div>
          <div className="text-xs">${contribution.amount} / {contribution.period}</div>
        </div>
      </Card>
      <div className="mb-4">
        <div className="flex flex-row justify-between items-center mt-4 mb-2"><h5 className="text-white text-sm">This {contribution.period}</h5><span className="text-primary-100 text-sm">${vault}</span></div>
        <Progress value={progress} className="bg-primary-100 h-3"/>
      </div>
    </div>
  );
};

export default CircleCard;