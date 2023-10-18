import SectionHeader from "@/components/section-header"
import Container from "@/components/ui/container"
import Navigation from "@/components/circles/navigation"
import DistributionCard from "@/components/circles/distribution-card"
import { Section } from "@/components/ui/section"
import { Users2 } from 'lucide-react'
import { CalendarCheck } from 'lucide-react'
import { Wallet2 } from 'lucide-react'
import { Calendar } from 'lucide-react'
import { PlusCircle } from 'lucide-react'
import { TrendingUp } from 'lucide-react'


import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


type CardProps = React.ComponentProps<typeof Card>

export default function Circle() {
  return (
    <>
      <Section>
        <Container>
          <SectionHeader title="Testing" hasMenu={false} />
        </Container>
        <Container>
          <Navigation />
          <div className="bg-primary-700 rounded-lg p-4 mt-6">
            <DistributionCard />
            <div>
              <div className="flex">
                <div className="flex w-0 flex-1">
                  <div className="relative inline-flex w-0 flex-1 items-center justify-start gap-x-3 rounded-bl-lg border border-transparent p-2 mt-4 text-sm font-semibold text-white">
                    <Users2 />
                    <div>
                      <h5>Members</h5>
                      <p className="font-light">6</p>
                    </div>
                  </div>
                </div>
                <div className="flex w-0 flex-1">
                  <div className="relative inline-flex w-0 flex-1 items-center justify-start gap-x-3 rounded-br-lg border border-transparent p-2 mt-4 text-sm font-semibold text-white">
                    <CalendarCheck />
                    <div>
                      <h5>Pay schedule</h5>
                      <p className="font-light">Monthly</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button className="w-full" variant="outline">
                <Wallet2 className="mr-2 h-4 w-4"/>
                Make payment
              </Button>
            </div>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <Card>
            <CardHeader>
              <CardTitle>Contribution Date</CardTitle>
              <CardDescription>Selected date for contributions and payout.</CardDescription>
            </CardHeader>
            <CardContent className="grid">
              <div className="flex items-center space-x-2 rounded-t-md border p-4 border-b-0">
                <div className="bg-primary-50 rounded-full p-1">
                  <div className="bg-primary-100 rounded-full p-2">
                    <Calendar size={16} className="text-primary-700"/>
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium leading-none">
                    November 16th
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 rounded-b-md border p-4">
                <div className="flex-1 space-y-1">
                  <p className="text-3xl font-medium leading-none">
                    $100
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" /> Add to calendar
              </Button>
            </CardFooter>
          </Card>
        </Container>
      </Section>
      <Section>
        <Container>
          <dl className="grid gap-6">
            <div className="relative overflow-hidden rounded-lg bg-white p-6 border shadow-sm">
              <dt>
                <p className="truncate text-sm font-medium text-gray-500">Group Interest</p>
              </dt>
              <dd className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">9.8%</p>
                <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  <TrendingUp className="h-5 w-5 flex-shrink-0 self-center text-green-500 mr-1"/>
                  <span className="sr-only"> Increased by </span>
                  0.1%
                  <span className="text-gray-400 ml-1 font-light">vs last month</span>
                </p>
              </dd>
            </div>
            <div className="relative overflow-hidden rounded-lg bg-white p-6 border shadow-sm">
              <dt>
                <p className="truncate text-sm font-medium text-gray-500">Earned to Date</p>
              </dt>
              <dd className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">$4.85</p>
                <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  <TrendingUp className="h-5 w-5 flex-shrink-0 self-center text-green-500 mr-1"/>
                  <span className="sr-only"> Increased by </span>
                  9.7%
                  <span className="text-gray-400 ml-1 font-light">vs last month</span>
                </p>
              </dd>
            </div>
          </dl>
        </Container>
      </Section>
    </>
  )
} 