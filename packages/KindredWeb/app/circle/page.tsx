import SectionHeader from "@/components/section-header"

export default function Dashboard() {
  return (
    <main className="flex flex-col min-h-screen items-center p-24">
      <section className="w-full max-w-sm mb-8">
        <SectionHeader title="Silva Family Savings" hasMenu={false} />
      </section>
    </main>
  )
}
