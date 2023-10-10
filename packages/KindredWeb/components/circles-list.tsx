
import Carousel from "@/components/ui/carousel"
import CarouselItem from "@/components/ui/carousel-item"
import CircleCard from '@/components/circle-card'

const CirclesList = () => {
  /* * * * * * */
  /* Test Data */
  /* * * * * * */
  const circles = [
    {
      circleName: "Silva Family Savings",
      contribution: {
        amount: 100,
        period: "month",
      },
      members: [
        {
          name: "Olivia Silva",
          avatarUrl:"https://randomuser.me/api/portraits/thumb/women/10.jpg",
        },{
          name: "Pippa Silva",
          avatarUrl:"https://randomuser.me/api/portraits/thumb/women/12.jpg",
        },{
          name: "Drew Silva",
          avatarUrl:"https://randomuser.me/api/portraits/thumb/men/8.jpg",
        },
      ],
      progress: 10,
      vault: 600,
    },
  ];

  return (
    <div className="bg-primary-700 rounded-lg">
      <Carousel>
        {circles.map((circle, index) => (
          <CarouselItem key={index}>
            <CircleCard
              circleName={circle.circleName}
              contribution={circle.contribution}
              members={circle.members}
              progress={circle.progress}
              vault={circle.vault}
            />
          </CarouselItem>
        ))}
        <div className="flex flex-row space-x-4">
          <div className="rounded-full bg-white h-3 w-3"/>
          <div className="rounded-full bg-primary-100 h-3 w-3"/>
          <div className="rounded-full bg-primary-100 h-3 w-3"/>
        </div>
      </Carousel>
    </div>
  );
};

export default CirclesList;