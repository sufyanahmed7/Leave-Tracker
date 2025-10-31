"use client";

// LeaveCounter.tsx - Main component
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Box, Typography, Grid } from "@mui/material";
import { useLeaveManager } from "../../lib/hooks/useLeaveManager";
import { LeaveSummaryCard } from "./LeaveSummaryCard";
import { LeaveTypeCard } from "./LeaveTypeCard";
import { LeaveHistoryModal } from "./LeaveHistoryModal";
import { ResetConfirmDialog } from "./ResetConfirmDialog";
import { calculateTotalUsed } from "../../lib/utils/leave.utils";
import { LeaveType } from "../../lib/types/leave.types";

export default function LeaveCounter() {
  const { user } = useUser();
  const { doc, leaves, loading, takeLeave, resetCounts } = useLeaveManager(
    user?.id
  );
  const [openModal, setOpenModal] = useState<LeaveType | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  if (loading || !leaves || !doc) {
    return <Typography>Loading...</Typography>;
  }

  const totalUsed = calculateTotalUsed(leaves);
  const leaveTypes: LeaveType[] = ["casual", "medical", "annual"];

  const handleResetConfirm = async () => {
    await resetCounts();
    setConfirmReset(false);
  };

  return (
    <Box sx={{ py: 7, px: 3, maxWidth: 1100, mx: "auto" }}>
      <LeaveSummaryCard
        totalUsed={totalUsed}
        onResetClick={() => setConfirmReset(true)}
      />

      <Grid container spacing={3} justifyContent="center">
        {leaveTypes.map((type) => (
          <Grid item xs={12} sm={6} md={4} key={type}>
            <LeaveTypeCard
              type={type}
              data={leaves[type]}
              onTakeLeave={takeLeave}
              onShowHistory={setOpenModal}
            />
          </Grid>
        ))}
      </Grid>

      <LeaveHistoryModal
        open={!!openModal}
        leaveType={openModal}
        history={openModal ? leaves[openModal].history : []}
        onClose={() => setOpenModal(null)}
      />

      <ResetConfirmDialog
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        onConfirm={handleResetConfirm}
      />
    </Box>
  );
}