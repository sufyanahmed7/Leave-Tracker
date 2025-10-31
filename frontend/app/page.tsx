"use client";

import dynamic from "next/dynamic";
import { Typography } from "@mui/material";
import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from "@clerk/nextjs";

const LeaveCounter = dynamic(() => import("./components/LeaveCounter"), { ssr: false });

export default function Page() {
  return (
    <div>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <div className="flex justify-between p-4">
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
            Pixako Leaves
          </Typography>
          <UserButton afterSignOutUrl="/signin" />
        </div>
        <LeaveCounter />
      </SignedIn>
    </div>
  );
}
