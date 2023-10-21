import prisma from '@/lib/prisma';

export interface User {
	id: string;
	name: string | null;
	email: string | null;
	phoneNumber: string;
	createdAt: Date;
	updatedAt: Date;
	role?: 'ADMIN' | 'MEMBER';
	profilePicture: string | null;
  }

/********************/
/*   User Queries   */
/********************/

/*   Create User(s)  */
export async function createUser(name: string, phoneNumber: string) {
	const newUser = await prisma.user.create({
		data: {
			name: name,
			phoneNumber: phoneNumber,
		},
	});
	return newUser;
}

/*   Get User(s)  */
export async function getUsers() {
	const users = await prisma.user.findMany();
	return users;
}
export async function getUserById(id: string) {
	const user = await prisma.user.findUnique({
		where: { id: id },
	});
	return user;
}
export async function getUserByName(name: string) {
	const user = await prisma.user.findFirst({
		where: { name: name },
	});
	return user;
}
export async function getUserByPhoneNumber(phoneNumber: string) {
	const user = await prisma.user.findFirst({
		where: { phoneNumber: phoneNumber },
	});
	return user;
}

// Get user members by circle id
export async function getMembersByCircleId(circleId: string) {
	let members;

	const circleWithMembers = await prisma.circle.findUnique({
		where: {
		  id: circleId,
		},
		include: {
		  members: {
			select: {
			  user: true, // Selects all user fields
			},
		  },
		},
	});
  
	  if (circleWithMembers) {
		members = circleWithMembers.members.map(member => member.user);
	  }
	  return members;
}