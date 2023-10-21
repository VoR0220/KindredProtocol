import CircleCard from '@/components/circles/circle-card'
import { getUserById } from "@/lib/users"
import { getCirclesByUserId } from "@/lib/circles"
import Decimal from 'decimal.js';


export default async function CirclesList(){
  /***************************************/
  /* Retrieve logged in user dynamically */
  /***************************************/
  const user = await getUserById("clnzviu8g00011erazooeaslh");

  // Grab all circles that the user is a member of
  const circles = await getCirclesByUserId(user!.id);


  //console.log("members", members);
  return (
    <div className="bg-primary-700 rounded-lg">
      <div className="p-4 rounded-box">
        <div className="snap-mandatory snap-x flex flex-row gap-x-6 overflow-x-scroll whitespace-nowrap no-scrollbar">
          {circles.map((circle) => (
            <div key={circle.id} className="snap-center carousel-item min-w-full">
              <CircleCard
                id={circle.id}
                name={circle.name}
                contributionAmount={new Decimal(circle.contributionAmount).toNumber()}
                payPeriod={circle.payPeriod}
                members={circle.members.map(member => member.user)}
                progress={ 1 / circle.members.length * 100}
                vault={circle.vaultOption}
                yieldPercentage={circle.yieldPercentage}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};