import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface Member {
  name: string;
  avatarUrl: string;
}

interface MemberTransaction {
  member: Member;
  amount: number;  // Changed from string to number
  date: string;
}

const memberTransactions: MemberTransaction[] = [
  {
    member: {
      name: 'Olivia Silva',
      avatarUrl: 'https://randomuser.me/api/portraits/thumb/women/30.jpg',
    },
    amount: -100,
    date: '10/1/2023'
  },
  {
    member: {
      name: 'Demi Wilkinson',
      avatarUrl: 'https://randomuser.me/api/portraits/thumb/women/14.jpg',
    },
    amount: -20,
    date: '9/30/2023'
  },
  {
    member: {
      name: 'Pippa Silva',
      avatarUrl: 'https://randomuser.me/api/portraits/thumb/women/7.jpg',
    },
    amount: 600.00,
    date: '9/14/2023'
  },
  {
    member: {
      name: 'Drew Silva',
      avatarUrl: 'https://randomuser.me/api/portraits/thumb/men/8.jpg',
    },
    amount: -100.00,
    date: '9/14/2023'
  },
  {
    member: {
      name: 'Phoenix Silva',
      avatarUrl: 'https://randomuser.me/api/portraits/thumb/men/3.jpg',
    },
    amount: -100.00,
    date: '9/14/2023'
  },
  {
    member: {
      name: 'Lana Steiner',
      avatarUrl: 'https://randomuser.me/api/portraits/thumb/women/20.jpg',
    },
    amount: -20,
    date: '9/12/2023'
  },
  {
    member: {
      name: 'Alissa Hester',
      avatarUrl: 'https://randomuser.me/api/portraits/thumb/women/6.jpg',
    },
    amount: 80,
    date: '9/12/2023'
  }
];

const ActivityList: React.FC = () => {
  return (
    <Table className="border-t">
      <TableBody>
        {memberTransactions.map((transaction, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
              <div className="flex flex-row">
                <Avatar className="h-6 w-6 rounded-full ring-1 ring-white dark:ring-gray-800 mr-2">
                  <AvatarImage src={transaction.member.avatarUrl} alt={transaction.member.name} />
                  <AvatarFallback />
                </Avatar>
                <p className="font-semibold">{transaction.member.name}</p>
              </div>
            </TableCell>
            <TableCell className={`text-center ${transaction.amount > 0 ? 'text-green-500' : 'text-gray-400'}`}>
              ${transaction.amount.toFixed(2)}
            </TableCell>
            <TableCell className="text-right">{transaction.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ActivityList;
