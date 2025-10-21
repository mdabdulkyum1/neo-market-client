"use client";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log("Full session:", session);

  return (
    <div>
      <h1>Welcome {session?.user?.name}</h1>
      <p>Email: {session?.user?.email}</p>
      <p>AccessToken: {session?.accessToken}</p>
    </div>
  );
}
