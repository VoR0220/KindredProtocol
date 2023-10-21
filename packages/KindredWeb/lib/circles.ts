import prisma from '@/lib/prisma';
import { User } from '@/lib/users';

export interface Circle {
	id: number;
	name: string;
	description: string;
}

/********************/
/*   Circle Queries   */
/********************/

/*   Get Circle(s)  */
// Get circles by user id
export async function getCreatedCirclesByUserId(userId: string) {
	const circles = await prisma.circle.findMany({
		where: {
			creatorId: userId,
		},
	});
	return circles;
}

// Get circle by circle id
export async function getCircleById(circleId: string) {
	const circle = await prisma.circle.findUnique({
		where: {
			id: circleId,
		},
		include: {
			members: {
				include: {
					user: true,
				},
			},
		},
	});
	return circle;
}

export async function getCirclesByUserId(userId: string) {
	const circles = await prisma.circleToUser.findMany({
		where: { userId: userId },
		include: {
			circle: {
				include: {
					members: {
						include: {
							user: true,
						},
					},
				},
			},
		},
	});
    return circles.map(relation => relation.circle)
}

export interface PayoutProps {
	contributionAmount: number;
	members: User[];
	vault: number;
	yieldPercentage: number;
	payPeriod: string;
}

// Calculate payout amount
export const payoutAmount = ({contributionAmount, members, yieldPercentage, payPeriod, vault}: PayoutProps) => {
    // Total contributions
    const totalContributions = contributionAmount * members.length;
  
    // Annual interest
    const annualInterest = yieldPercentage / 100;
  
    // Convert payPeriod to a fraction of year
    let periodFractionOfYear: number;
    switch (payPeriod) {
	  case 'LUDICROUS':
		periodFractionOfYear = 1 / 525600;
		break;
	  case 'WEEKLY':
        periodFractionOfYear = 1 / 52;
        break;
      case 'BIWEEKLY':
        periodFractionOfYear = 1 / 26;
        break;
      case 'MONTHLY':
        periodFractionOfYear = 1 / 12;
        break;
      default:
        throw new Error('Invalid payPeriod value');
    }
  
    // Interest for the payPeriod
    const periodInterest = annualInterest * periodFractionOfYear;
  
    // Payout calculation
    const payout = totalContributions + (totalContributions * periodInterest);
  
    return payout;
  }


// Format Pay Period values
export const formatPayPeriod = (payPeriod: string) => {
	switch(payPeriod) {
		case "LUDICROUS":
		return "ludicrous";
		case "WEEKLY":
		return "weekly";
		case "BIWEEKLY":
		return "bi-weekly";
		case "MONTHLY":
		return "monthly";
		default:
		return "Invalid period";
	}
}