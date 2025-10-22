

export default async function DashboardHome() {
  // Fetch user dashboard data

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-sm font-medium text-gray-500">Referred Users</h2>
          <p className="mt-2 text-2xl font-bold text-gray-900">{ 0}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-sm font-medium text-gray-500">Converted Users</h2>
          <p className="mt-2 text-2xl font-bold text-gray-900">{0}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-sm font-medium text-gray-500">Total Credits</h2>
          <p className="mt-2 text-2xl font-bold text-gray-900">{0}</p>
        </div>
      </div>
    </div>
  );
}
