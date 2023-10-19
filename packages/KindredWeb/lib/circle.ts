// import prisma from '@/lib/prisma';
// interface Circle {
// 	id: number;
// 	name: string;
// 	description: string;
// }

// const circles: Circle[] = [];


/********************/
/*   Circle Queries   */
/********************/

/*   Create Circle(s)  */
// export async function createCircle() {
// 	const newCircle = await prisma.circle.create({
// 		data: {
// 			name: name,
// 			phoneNumber: phoneNumber,
// 		},
// 	});
// 	return newUser;
// }


/*   Get Circle(s)  */

// Create a new circle
// function createCircle(circle: Circle): Circle {
// 	circles.push(circle);
// 	return circle;
// }

// Read all circles
// function getAllCircles(): Circle[] {
// 	return circles;
// }

// Read a circle by ID
// function getCircleById(id: number): Circle | undefined {
// 	return circles.find(circle => circle.id === id);
// }

// Update a circle by ID
// function updateCircleById(id: number, updatedCircle: Circle): Circle | undefined {
// 	const index = circles.findIndex(circle => circle.id === id);
// 	if (index !== -1) {
// 		circles[index] = { ...circles[index], ...updatedCircle };
// 		return circles[index];
// 	}
// 	return undefined;
// }

// Delete a circle by ID
// function deleteCircleById(id: number): Circle | undefined {
// 	const index = circles.findIndex(circle => circle.id === id);
// 	if (index !== -1) {
// 		return circles.splice(index, 1)[0];
// 	}
// 	return undefined;
// }
