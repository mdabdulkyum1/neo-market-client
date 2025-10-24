"use client";
import { Settings, LogOut, User } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-white shadow-sm flex justify-end items-center p-4 relative">
      <div
        className="cursor-pointer p-2 rounded-full hover:bg-gray-100"
        onClick={() => setOpen(!open)}
      >
        <User className="w-6 h-6" />
      </div>
      {open && (
        <div className="absolute top-14 right-4 w-48 bg-white border rounded-lg shadow-md">
          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full text-left">
            <Settings className="w-4 h-4" /> Settings
          </button>
          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full text-left text-red-500">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      )}
    </header>
  );
}
