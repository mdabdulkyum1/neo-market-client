"use client";

import { useUserStore } from "@/stores/userStore";
import Image from "next/image";

export default function DashboardProfile() {
  const user = useUserStore((state) => state.user);


//   const handleImageUpload = async (e: any) => {
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await axios.post("/api/upload", formData); 
//     setImage(res.data.url);
//   };

//   const handleSave = async () => {
//     await axios.put("/api/user/update", { name, image }); 
//     alert("Profile updated!");
//   };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>

      <div className="flex items-center space-x-6">
        <Image
          src={user?.image || "https://ui-avatars.com/api/?name=User+Name&background=0073B1&color=fff"}
          alt="Profile"
          width={100}
          height={100}
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <label className="block mb-2 font-medium">Change Image:</label>
          <input type="file" />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name:</label>
          <input
            className="border rounded p-2 w-full"
            defaultValue={user?.name || "N/A"}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email:</label>
          <input className="border rounded p-2 w-full bg-gray-100" value={user?.email || "N/A"}  disabled />
        </div>
      </div>

      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Save Changes
      </button>
    </div>
  );
}
