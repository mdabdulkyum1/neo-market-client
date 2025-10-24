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
  return (
    <div className="bg-white rounded-lg shadow p-4 mt-6">
      <h3 className="font-semibold mb-4">Recent Referral Activity</h3>
      <table className="w-full text-sm">
        <thead className="text-left text-gray-500 border-b">
          <tr>
            <th className="p-2">User Name</th>
            <th className="p-2">Status</th>
            <th className="p-2">Signed Up</th>
            <th className="p-2">Converted</th>
          </tr>
        </thead>
        <tbody>
          {referrals.map((r, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="p-2">{r.name}</td>
              <td className="p-2">{r.status}</td>
              <td className="p-2">{r.signedUp}</td>
              <td className="p-2">{r.converted || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
