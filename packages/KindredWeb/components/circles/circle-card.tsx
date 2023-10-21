import { Card } from '@/components/ui/card'
import React, { FC, ReactNode } from 'react'
import CircleSymbol from '@/components/ui/circle-symbol';
import { Progress } from '@/components/ui/progress';
import { User } from '@/lib/users';
import Link from 'next/link';
import { payoutAmount } from '@/lib/circles';
import { formatPayPeriod } from '@/lib/circles';

interface CircleCardProps {
  name: string;
  contributionAmount: number;
  payPeriod: string;
  members: User[];
  vault: number;
  children?: ReactNode;
  yieldPercentage: number;
  [key: string]: any;  // For ...props spread to support any additional props
}

const CircleCard: FC<CircleCardProps> = ({ id, name, contributionAmount, payPeriod, members, progress, yieldPercentage, vault, ...props }) => {
  const displayedMembers = members.slice(0, 4);
  const remainingMembers = members.length - 4;

  const payout = payoutAmount({
    contributionAmount,
    yieldPercentage,
    members,
    vault,
    payPeriod
  })

  const getPeriodDescriptor = (payPeriod: string) => {
    switch(payPeriod) {
      case "LUDICROUS":
        return "ludicrous";
      case "WEEKLY":
        return "week";
      case "BIWEEKLY":
        return "period";
      case "MONTHLY":
        return "month";
      default:
        return "Invalid period";
    }
  }

  return (
    <>
      <Link href={`/circle/${id}/`}>
        <Card className="flex flex-col justify-between h-36 rounded-md bg-gradient-to-r from-purple-500 to-indigo-400 text-primary-foreground p-4 border-0 drop-shadow-md backdrop-blur-xl" {...props}>
          <div className="flex flex-row items-center justify-between">
            <h3>{name}</h3>
            <CircleSymbol />
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex -space-x-2">
              {displayedMembers.map((member: User, index: number) => (
                <img
                  key={index}
                  className="inline-block h-6 w-6 rounded-full"
                  src={member.profilePicture || '/images/placeholder-profile-picture.png'}
                  alt={member.name || 'Placeholder profile picture'}
                />
              ))}
              {remainingMembers > 0 && (
                <span className="h-6 w-6 rounded-full flex items-center justify-center bg-gray-100 text-xs text-gray-400 z-10">
                  +{remainingMembers}
                </span>
              )}
            </div>
            <div className="text-xs">${contributionAmount} / {formatPayPeriod(payPeriod)}</div>
          </div>
        </Card>
        <div className="mb-4">
          <div className="flex flex-row justify-between items-center mt-4 mb-2"><h5 className="text-white text-sm">This {getPeriodDescriptor(payPeriod)}</h5><span className="text-primary-100 text-sm">${payout.toFixed(2)}</span></div>
          <Progress value={progress} className="bg-primary-100 h-3"/>
        </div>
      </Link>
    </>
    
  );
};

export default CircleCard;