import { Card } from '@/components/ui/card'
import React, { FC, ReactNode } from 'react'
import CircleSymbol from '@/components/ui/circle-symbol';
import { Progress } from '../ui/progress';
// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@/components/ui/avatar"

// interface Contribution {
//   amount: number;
//   period: string;
// }

// interface Member {
//   name: string;
//   avatarUrl: string;
// }

interface DistributionCardProps {
  // circleName: string;
  // contribution: Contribution;
  // members: Member[];
  // vault: number;
  // children?: ReactNode;
  // [key: string]: any;  // For ...props spread to support any additional props
}

// const DistributionCard: FC<DistributionCardProps> = ({ circleName, contribution, members, progress, vault, ...props }) => {
const DistributionCard: FC<DistributionCardProps> = ({...props}) => {
  return (
    <>
      <Card className="flex flex-col justify-between h-36 rounded-md bg-gradient-to-r from-purple-500 to-indigo-400 text-primary-foreground p-4 border-0 drop-shadow-md backdrop-blur-xl" {...props}>
        <div className="flex flex-row items-start justify-between">
          <div>
            <h3>Circle Name</h3>
            <h4 className="text-2xl font-semibold">$604.85</h4>
          </div>
          <CircleSymbol />
        </div>
        <div className="flex flex-col">
          <Progress value={60} className="bg-primary-100 h-3"/>
          <div className="text-xs text-right mt-1">$</div>
        </div>
      </Card>
    </>
  );
};

export default DistributionCard;