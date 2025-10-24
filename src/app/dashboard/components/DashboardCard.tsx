interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

export default function DashboardCard({ title, value, subtitle }: DashboardCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center text-center">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-3xl font-bold mt-1">{value}</p>
      {subtitle && <p className="text-gray-400 text-xs mt-1">{subtitle}</p>}
    </div>
  );
}
