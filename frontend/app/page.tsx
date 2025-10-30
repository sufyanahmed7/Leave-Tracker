"use client";

import dynamic from "next/dynamic";

const LeaveCounter = dynamic(() => import("./components/LeaveCounter"), {
  ssr: false,
});

export default function Page() {
  return (
    <div>
      <LeaveCounter />
    </div>
  );
}
