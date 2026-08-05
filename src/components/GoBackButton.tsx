"use client";

import { useRouter } from "next/navigation";

const GoBackButton = ({ className = "" }: { className?: string }) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={`rounded-lg bg-[#FFC627] px-8 py-2.5 font-lato text-base font-bold text-brand-raisin shadow-[0_6px_14px_rgba(0,0,0,0.15)] transition hover:brightness-95 ${className}`}
    >
      Go Back
    </button>
  );
};

export default GoBackButton;
