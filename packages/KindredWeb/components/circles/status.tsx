import React from 'react';

type MemberStatus = 'PENDING' | 'GOOD' | 'BLACKLISTED' | 'LATE';

interface StatusProps {
  status: MemberStatus;
}
  
const statusVariantMap: Record<MemberStatus, string> = {
	PENDING: 'bg-gray-50 text-gray-600 ring-gray-500/10',
	GOOD: 'bg-green-50 text-green-700 ring-green-600/20',
	BLACKLISTED: 'bg-red-50 text-red-700 ring-red-600/10',
	LATE: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
};

const Status: React.FC<StatusProps> = ({ status }) => {
	const variant = statusVariantMap[status];
	if (!variant) {
		throw new Error(`Unknown status: ${status}`);
	}

  	return (
		<span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${variant}`}>
			{status}
		</span>
	)
};

export default Status;