"use client";

import { ReactNode, useEffect } from "react";
import { User, useUserStore } from "@/stores/userStore";

interface Props {
  user: User | null,
  children: ReactNode;
}

export default function UserProvider({ user, children }: Props) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (user) setUser(user);
  }, [user, setUser]);

  return <>{children}</>;
}
