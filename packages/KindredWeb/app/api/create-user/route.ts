import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export default async function GET(request: NextRequest, response: NextResponse) {
  const { id, email, phone } = await request.json()


  console.log({id})

  try {
    const getUserResult = await prisma.$transaction(async (prisma) => {
      // Step 1: Get the current user
      /*************************************************/
      /* Temporarily get a known user to get a user id */
      /*************************************************/
      let user
      if (id) {
        user = await prisma.user.findUnique({ where: { id: String(id) } })
      } else if (email) {
        user = await prisma.user.findUnique({ where: { email } })
      } else if (phone) {
        user = await prisma.user.findUnique({ where: { phoneNumber: phone } })
      }

      if (!user) {
        throw new Error('User not found!');
      }

      return { user };
    });

    console.log({getUserResult})
    // If the transaction was successful, send the results back
    return NextResponse.json(getUserResult);
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
