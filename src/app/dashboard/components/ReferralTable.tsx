interface Referral {
  name: string;
  status: string;
  signedUp: string;
  converted: string | null;
}

const referrals: Referral[] = [
  { name: "Ryan", status: "Converted", signedUp: "2024-01-15", converted: "2024-01-16" },
  { name: "Sarah", status: "Pending", signedUp: "—", converted: null },
];

export default function ReferralTable() {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'converted':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
            {status}
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-1.5"></div>
            {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-1.5"></div>
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Referral Activity</h3>
          <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
            View all
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Signed Up
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Converted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Credits
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {referrals.map((r, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-indigo-600">
                        {r.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{r.name}</div>
                      <div className="text-sm text-gray-500">Referral #{i + 1}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(r.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {r.signedUp}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {r.converted || "—"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {r.status === 'Converted' ? (
                    <span className="text-green-600 font-medium">+2</span>
                  ) : (
                    <span className="text-gray-400">0</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {referrals.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No referrals yet</h3>
          <p className="text-gray-500 mb-4">Start sharing your referral link to earn credits!</p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors duration-200">
            Share Your Link
          </button>
        </div>
      )}
    </div>
  );
}
