// components/leave/LeaveSummaryCard.tsx
"use client";

import React from "react";
import { Card, Typography, LinearProgress, Button, Box } from "@mui/material";
import { RotateCcw } from "lucide-react";
import { TOTAL_LEAVE_COUNT } from "../../lib/constants/leave.constants";

interface LeaveSummaryCardProps {
  totalUsed: number;
  onResetClick: () => void;
}

export const LeaveSummaryCard: React.FC<LeaveSummaryCardProps> = ({
  totalUsed,
  onResetClick,
}) => {
  const totalRemaining = TOTAL_LEAVE_COUNT - totalUsed;
  const progressValue = (totalUsed / TOTAL_LEAVE_COUNT) * 100;

  const isAllLeavesPresent = totalUsed === 0;

  return (
    <Card
      sx={{
        maxWidth: 520,
        mx: "auto",
        mb: 4,
        p: 3,
        textAlign: "center",
        boxShadow: 8,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" fontWeight={700}>
        Total Remaining
      </Typography>
      <Typography variant="h4" fontWeight={800} mt={1}>
        {totalRemaining} / {TOTAL_LEAVE_COUNT}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progressValue}
        sx={{ mt: 2, height: 10, borderRadius: 6 }}
      />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          variant="outlined"
          startIcon={<RotateCcw size={18} />}
          onClick={onResetClick}
          disabled={isAllLeavesPresent} 
        >
          Reset Counts
        </Button>
      </Box>
    </Card>
  );
};