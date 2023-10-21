import { Card } from '@/components/ui/card'
import React, { FC, ReactNode } from 'react'
import CircleSymbol from '@/components/ui/circle-symbol';
import { Progress } from '../ui/progress';
import { User } from '@/lib/users';
import { payoutAmount } from '@/lib/circles';


interface DistributionCardProps {
  contributionAmount: number;
  members: User[];
  vault: number;
  yieldPercentage: number;
  payPeriod: string;
}
const DistributionCard: FC<DistributionCardProps> = ({contributionAmount, members, vault, yieldPercentage, payPeriod}) => {
  const payout = payoutAmount({
    contributionAmount,
    yieldPercentage,
    members,
    vault,
    payPeriod
  })

  return (
    <>
      <Card className="flex flex-col justify-between h-36 rounded-md bg-gradient-to-r from-purple-500 to-indigo-400 text-primary-foreground p-4 border-0 drop-shadow-md backdrop-blur-xl">
        <div className="flex flex-row items-start justify-between">
          <div>
            <h3>Payout</h3>
            <h4 className="text-2xl font-semibold">${payout.toFixed(2)}</h4>
          </div>
          <CircleSymbol />
        </div>
        <div className="flex flex-col">
          <Progress value={ 1 / members.length * 100} className="bg-primary-100 h-3"/>
          <div className="text-xs text-right mt-1">{Number(1 / members.length * 100).toFixed(0)}%</div>
        </div>
      </Card>
    </>
  );
};

export default DistributionCard;