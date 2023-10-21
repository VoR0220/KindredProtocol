import Navbar from "@/components/navbar"
export default function Template({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			{children}
			<Navbar />
		</>
	)
}
