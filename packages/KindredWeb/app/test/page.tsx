import { getUsers } from "@/lib/users";


export default async function Test(){
	const users = await getUsers();
	console.log({users});
	// const fetchData = async () => {
	// 	const response = await fetch('/api/users', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({ name: 'John'}),
	// 	});
	// 	const data = await response.json();
	// 	// Do something with the data
	// };

	return (
		<>
			<h1>Test</h1>
			{/* <button onClick={fetchData}>Test</button> */}
		</>
	)
}