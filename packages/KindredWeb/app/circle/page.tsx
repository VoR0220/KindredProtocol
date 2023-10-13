import SectionHeader from "@/components/section-header"
import Container from "@/components/ui/container"

export default function Dashboard() {
  return (
    <>
      <section className="w-full max-w-sm mb-8">
        <Container>
          <SectionHeader title="Silva Family Savings" hasMenu={false} />
        </Container>
      </section>
    </>
  )
}
