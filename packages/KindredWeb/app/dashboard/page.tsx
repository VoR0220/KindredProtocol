import SectionHeader from "@/components/section-header"
import CirclesList from "@/components/circles/circles-list"
import ActivityList from "@/components/circles/activity-list"
import Container from "@/components/ui/container"
import { PkpWalletProvider, usePkpWallet } from "@/components/pkp-wallet-context"
import Test from "@/components/test"


export default function Dashboard() {
  return (
    <>
      <section className="w-full max-w-sm mb-8">
        <Container>
          <SectionHeader title="Your Circles" hasMenu={true} />
          <CirclesList />
          <PkpWalletProvider>
            <Test />
          </PkpWalletProvider>
        </Container>
      </section>
      <section className="w-full max-w-sm mb-8">
        <Container>
          <SectionHeader title="Recent activity" hasMenu={false} />
          <ActivityList></ActivityList>
        </Container>
      </section>
    </>
  )
}
