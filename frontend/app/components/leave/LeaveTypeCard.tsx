// components/leave/LeaveTypeCard.tsx
"use client";

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Button,
  Box,
} from "@mui/material";
import { Plus, History } from "lucide-react";
import { LeaveType, LeaveData } from "../../lib/types/leave.types";
import { LEAVE_COLORS } from "../../lib/constants/leave.constants";

interface LeaveTypeCardProps {
  type: LeaveType;
  data: LeaveData;
  onTakeLeave: (type: LeaveType) => void;
  onShowHistory: (type: LeaveType) => void;
}

export const LeaveTypeCard: React.FC<LeaveTypeCardProps> = ({
  type,
  data,
  onTakeLeave,
  onShowHistory,
}) => {
  const color = LEAVE_COLORS[type];
  const percentage = (data.used / data.total) * 100;
  const remaining = data.total - data.used;

  return (
    <Card
      sx={{
        borderRadius: 4,
        p: 2,
        minHeight: 220,
        boxShadow: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight={600} sx={{ color, mb: 1 }}>
          {type.toUpperCase()}
        </Typography>
        <Typography fontWeight={500}>
          {data.used} Used / {data.total} Total
        </Typography>
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            mt: 2,
            height: 10,
            borderRadius: 5,
            "& .MuiLinearProgress-bar": {
              backgroundColor: color,
            },
          }}
        />
        <Typography sx={{ mt: 1 }}>
          Remaining: <b style={{ color }}>{remaining}</b>
        </Typography>
      </CardContent>
      <Box sx={{ display: "flex", gap: 1.5 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={() => onTakeLeave(type)}
          sx={{
            backgroundColor: color,
            "&:hover": { backgroundColor: color },
          }}
        >
          Take
        </Button>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<History size={18} />}
          onClick={() => onShowHistory(type)}
        >
          History
        </Button>
      </Box>
    </Card>
  );
};