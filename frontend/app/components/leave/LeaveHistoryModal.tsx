// components/leave/LeaveHistoryModal.tsx
"use client";

import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import { X } from "lucide-react";
import { LeaveType, LeaveHistory } from "../../lib/types/leave.types";

interface LeaveHistoryModalProps {
  open: boolean;
  leaveType: LeaveType | null;
  history: LeaveHistory[];
  onClose: () => void;
}

export const LeaveHistoryModal: React.FC<LeaveHistoryModalProps> = ({
  open,
  leaveType,
  history,
  onClose,
}) => {
  if (!leaveType) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: "90%",
          maxWidth: 520,
          mx: "auto",
          mt: 8,
          p: 3,
          borderRadius: 3,
          background: "white",
          boxShadow: 8,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            {leaveType.toUpperCase()} - History
          </Typography>
          <IconButton onClick={onClose}>
            <X size={20} />
          </IconButton>
        </Box>
        <Divider sx={{ my: 2 }} />
        <List>
          {history.length === 0 ? (
            <Typography color="text.secondary">No records yet.</Typography>
          ) : (
            history.map((h, i) => (
              <ListItem key={i} divider>
                <ListItemText
                  primary={`${h.day} — ${h.date}`}
                  secondary={h.time}
                />
                <Chip label={h.type} size="small" sx={{ ml: 1 }} />
              </ListItem>
            ))
          )}
        </List>
      </Box>
    </Modal>
  );
};