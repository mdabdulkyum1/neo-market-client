"use client";

export default function DashboardSettings() {

//   const handlePasswordChange = async () => {
//     await axios.put("/api/user/change-password", { password }); // API route
//     alert("Password updated!");
//   };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div>
        <label className="block mb-1 font-medium">Change Password</label>
        <input
          type="password"
          className="border rounded p-2 w-full"
        />
      </div>
      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Save Password
      </button>
    </div>
  );
}
