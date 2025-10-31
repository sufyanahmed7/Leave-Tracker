"use client";

import dynamic from "next/dynamic";

const LeaveCounter = dynamic(() => import("./components/ui/LeaveCounter"), {
  ssr: false,
});

export default function Page() {
  return (
    <div>
      <LeaveCounter />
    </div>
  );
}
