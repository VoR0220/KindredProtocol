import SectionHeader from "@/components/section-header"
import Container from "@/components/ui/container"
import Navigation from "@/components/circles/navigation"
import { Section } from "@/components/ui/section"
import { MoreVertical } from 'lucide-react'
import Image from "next/image";
import { getMembersByCircleId } from "@/lib/users"
import Status from "@/components/circles/status"

export default async function Members({
  params: { id },
}: {
  params: { id: string }
}) {
  const members = await getMembersByCircleId(id);
  return (
    <Section>
      <Container>
        <SectionHeader title="Testing" hasMenu={false} />
        <Navigation id={id}/>
        <ul role="list" className="flex-1 divide-y divide-gray-200 overflow-y-auto">
          {members && members.map((member, index) => (
            <li key={index}>
              <div className="group relative flex items-center px-5 py-6">
                <a href="#" className="-m-1 block flex-1 p-1">
                  <div className="absolute inset-0 group-hover:bg-gray-50" aria-hidden="true"></div>
                  <div className="relative flex min-w-0 flex-1 items-center">
                    <span className="relative inline-block flex-shrink-0">
                      <Image 
                        className="w-10 h-10 rounded-full" 
                        src={member.profilePicture || '/images/placeholder-profile-picture.png'} 
                        alt=""
                        width={40}
                        height={40}
                      />
                      {/* Online: "bg-green-400", Offline: "bg-gray-300" */}
                      <span className="bg-green-400 absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white" aria-hidden="true"></span>
                    </span>
                    <div className="ml-4 truncate">
                      <p className="truncate text-sm font-medium text-gray-900">{member.name === null ? 'Unknown' : member.name}</p>
                    </div>
                    <div className="ml-4 truncate">
                      <Status status={member.status === null ? 'PENDING' : member.status}/>
                    </div>
                  </div>
                </a>
                <div className="relative ml-2 inline-block flex-shrink-0 text-left">
                  <button
                    type="button"
                    className="group relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    id={`options-menu-${index}-button`}
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open options menu</span>
                    <span className="flex h-full w-full items-center justify-center rounded-full">
                      <MoreVertical className="w-5 h-5 text-gray-400"/>
                    </span>
                  </button>
                </div>
              </div>
            </li>
            ))}
          </ul>
      </Container>
    </Section>
  )
} 



