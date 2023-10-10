import { Card } from '@/components/ui/card'
import React, { FC, ReactNode } from 'react'
import GlowingCircle from '@/components/ui/glowing-circle';
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
  circleName: string;
  contribution: Contribution;
  members: Member[];
  vault: number;
  children?: ReactNode;
  [key: string]: any;  // For ...props spread to support any additional props
}

const CircleCard: FC<CircleCardProps> = ({ circleName, contribution, members, progress, vault, ...props }) => {
  return (
    <div>
      <Card className="flex flex-col justify-between h-36 rounded-md bg-gradient-to-r from-purple-500 to-indigo-400 text-primary-foreground p-4 border-0 drop-shadow-md backdrop-blur-xl" {...props}>
        <div className="flex flex-row items-center justify-between">
          <h3>{circleName}</h3>
          <GlowingCircle />
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex -space-x-2">
            {members.map((member, index) => (
              <Avatar key={index} className="inline-block h-6 w-6 rounded-full ring-1 ring-white dark:ring-gray-800">
                <AvatarImage src={member.avatarUrl} alt={member.name} />
                <AvatarFallback />
              </Avatar>
            ))}
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