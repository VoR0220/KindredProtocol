import SectionHeader from "@/components/section-header"
import CirclesList from "@/components/circles-list"

export default function Dashboard() {
  return (
    <main className="flex flex-col min-h-screen items-center p-24">
      <section className="w-full max-w-sm mb-8">
        <SectionHeader title="Your Circles" hasMenu={true} />
        <CirclesList />
      </section>
      <section className="w-full max-w-sm mb-8">
        <SectionHeader title="Recent activity" hasMenu={false} />
        {/* <ActivityList></ActivityList> */}
      </section>
    </main>
  )
}
