import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getRandomImageUrl } from '@/lib/utils';

export async function POST(request: NextRequest, response: NextResponse) {
  const requestData = await request.json();

  // Destructure your request data as needed
  const {
    agreeToTerms,
    name,
    payPeriod,
    currency,
    contributionAmount,
    inflationMode,
    vaultOption,
    yieldPercentage,
    invited
  } = requestData;

  try {
    const circleCreationResult = await prisma.$transaction(async (prisma) => {
      // Step 1: Get the current user
      /*************************************************/
      /* Temporarily get a known user to get a user id */
      /*************************************************/
      const creator = await prisma.user.findUnique({
        where: {
          id: "clnzviu8g00011erazooeaslh",
        },
      });

      // const creator = await prisma.user.create({
      //   data: {
      //     name: "Meta Monk",
      //     email: "metamonk@ratlabs.xyz",
      //     phoneNumber: "13122787863",
      //     profilePicture: "https://utfs.io/f/2fdb45ed-06f0-4685-9ea4-93de8ae21751-7fr4bg.png",
      //     // other relevant user fields can be set here
      //   },
      // });

      if (!creator) {
        throw new Error('Creator not found!');
      }

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
            connect: { id: creator.id }, // Connect the circle to the creator
          },
        },
      });

      // Add the creator to the circle's members through CircleToUser model
      await prisma.circleToUser.create({
        data: {
          userId: creator.id,
          circleId: newCircle.id,
        },
      });

      // Step 3: Create the invited users and add them to the circle's members
      const circleToUserRelations = [];

      for (const phoneNumber of invited) {
        // We might want to check if a user with the current
        // phoneNumber exists before creating a new one FYI
        // Check if a user with the current phoneNumber exists before creating a new one
        let user = await prisma.user.findUnique({
          where: { phoneNumber: phoneNumber },
        });

        // Generate a random avatar for the user
        const profilePicture = await getRandomImageUrl();

        // If the user doesn't exist, create a new user
        if (!user) {
          user = await prisma.user.create({
            data: {
              phoneNumber: phoneNumber,
              profilePicture: profilePicture,
              // other relevant user fields can be set here
            },
          });
        }

        // Check if the user is already a member of the circle
        const alreadyMember = await prisma.circleToUser.findUnique({
          where: {
            userId_circleId: {
              userId: user.id,
              circleId: newCircle.id,
            },
          },
        });

        // If not, add the user to the circle's members through CircleToUser model
        if (!alreadyMember) {
          const newRelation = await prisma.circleToUser.create({
            data: {
              userId: user.id,
              circleId: newCircle.id,
            },
          });

          circleToUserRelations.push(newRelation);
        }
      }

      return { newCircle, circleToUserRelations };
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

