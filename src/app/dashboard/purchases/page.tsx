
export default async function DashboardPurchases() {

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Purchases</h1>
      <table className="w-full border rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Product ID</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">First Purchase</th>
            <th className="p-2 border">Referral Code</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          
            <tr className="text-center">
              <td className="p-2 border"></td>
              <td className="p-2 border"></td>
              <td className="p-2 border"></td>
              <td className="p-2 border"></td>
              <td className="p-2 border"></td>
            </tr>
       
        </tbody>
      </table>
    </div>
  );
}
