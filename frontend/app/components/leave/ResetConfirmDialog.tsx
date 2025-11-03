// components/leave/ResetConfirmDialog.tsx
"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface ResetConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetConfirmDialog: React.FC<ResetConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Reset Counts</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This will reset your leave counts to zero but keep your history. Are
          you sure?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" variant="contained" onClick={onConfirm}>
          Reset
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};