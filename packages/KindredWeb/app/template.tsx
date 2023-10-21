export default function Template({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="flex flex-col min-h-screen items-center">
        {children}
      </main>
    </>
  )
}