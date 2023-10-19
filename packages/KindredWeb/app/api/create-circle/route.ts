import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest, response: NextResponse) {
  const requestData = await request.json();

  // Destructure your request data as needed
  const { agreeToTerms, name, payPeriod, currency, contributionAmount, inflationMode, vaultOption, yieldPercentage, invited} = requestData;

  try {
    const circleCreationResult = await prisma.$transaction(async (prisma) => {
      // Step 1: Get the current user
      //

      // Step 2: Create the circle with the user's id as the creatorId
      const newCircle = await prisma.circle.create({
        data: {
          agreeToTerms,
          name,
          payPeriod,
          currency,
          contributionAmount,
          inflationMode,
          vaultOption,
          yieldPercentage,
          creator: {
            connect: {
              id: 'clnx38rco00011e052tx7vgkh', // update to dynamic user id once auth is implemented
            },
          },
        },
      });

      // Step 3: Create invitations with the circle's id
      const invitationData = await prisma.invitation.createMany({
        data: invited.map((phone: string) => ({
          phoneNumber: phone,
          status: 'PENDING', // Assuming you have a status field
          circleId: newCircle.id, // connecting invitation to the circle
          invitedById: 'clnx38rco00011e052tx7vgkh', // update to dynamic user id once auth is implemented
        })),
      });

      return { newCircle, invitationData };
    });

    // If the transaction was successful, send the results back
    return NextResponse.json(circleCreationResult);
  } catch (error) {
    // Handle or log any errors
    console.error("Transaction failed: ", error);

    // Send an appropriate error response
    return NextResponse.json({
      error: "Transaction failed",
      message: (error as Error).message
    }, { 
      status: 500
    });
  }
}

