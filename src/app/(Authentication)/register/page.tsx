"use client";

import { useSearchParams } from "next/navigation";
import { RegisterForm } from "../components/RegisterForm";

const Page = () => {
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("r") || undefined;

  return (
    <div>
      <RegisterForm referralCode={referralCode} />
    </div>
  );
};

export default Page;
