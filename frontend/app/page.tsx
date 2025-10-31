"use client";

import dynamic from "next/dynamic";
import { Typography } from "@mui/material";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
} from "@clerk/nextjs";

// Dynamically import the LeaveCounter component (client-side only)
const LeaveCounter = dynamic(() => import("./components/ui/LeaveCounter"), {
  ssr: false,
});

export default function Page() {
  return (
    <div>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <div className="flex justify-between p-3 w-full bg-emerald-100/50 backdrop-blur-md z-50 border-b-gray-50 shadow-md">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              textAlign: "center",
              background: "linear-gradient(to right, #1976d2, #42a5f5)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            LeaveTry
          </Typography>
          <UserButton afterSignOutUrl="/signin" />
        </div>
        <LeaveCounter />
      </SignedIn>
    </div>
  );
}
