"use client";

import Image from "next/image";

export default function DashboardProfile() {


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
          src={"/default-avatar.png"}
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
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email:</label>
          <input className="border rounded p-2 w-full bg-gray-100"  disabled />
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
