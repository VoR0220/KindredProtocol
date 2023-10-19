import prisma from '@/lib/prisma';
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

/*   Update User(s)  */
export async function updateUserById(id: string, name: string, phoneNumber: string) {
	const updatedUser = await prisma.user.update({
		where: { id: id },
		data: {
			name: name,
			phoneNumber: phoneNumber,
		},
	});
	return updatedUser;
}
// export async function updateUserByName(name: string, newName: string, newPhoneNumber: string) {
// 	const updatedUser = await prisma.user.update({
// 		where: { name: name },
// 		data: {
// 			name: newName,
// 			phoneNumber: newPhoneNumber,
// 		},
// 	});
// 	return updatedUser;
// }

/*   Delete User(s)  */
export async function deleteUserById(id: string) {
	const deletedUser = await prisma.user.delete({
		where: { id: id },
	});
	return deletedUser;
}
// export async function deleteUserByName(name: string) {
// 	const deletedUser = await prisma.user.delete({
// 		where: { name: name },
// 	});
// 	return deletedUser;
// }
export async function deleteUserByPhoneNumber(phoneNumber: string) {
	const deletedUser = await prisma.user.delete({
		where: { phoneNumber: phoneNumber },
	});
	return deletedUser;
}