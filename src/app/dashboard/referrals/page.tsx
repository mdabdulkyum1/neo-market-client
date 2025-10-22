

export default async function DashboardReferrals() {

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Referrals</h1>
      <table className="w-full border rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Converted At</th>
          </tr>
        </thead>
        <tbody>
       
            <tr className="text-center">
              <td className="p-2 border">x</td>
              <td className="p-2 border">x</td>
              <td className="p-2 border">x</td>
              <td className="p-2 border">x</td>
            </tr>
          
        </tbody>
      </table>
    </div>
  );
}
