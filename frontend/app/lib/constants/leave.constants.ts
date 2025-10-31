// lib/constants/leave.constants.ts
import { LeaveType } from "../types/leave.types";

export const LEAVE_LIMITS: Record<LeaveType, number> = {
  casual: 6,
  medical: 6,
  annual: 14,
};

export const TOTAL_LEAVE_COUNT = 24;

export const LEAVE_COLORS: Record<LeaveType, string> = {
  casual: "#42a5f5",
  medical: "#66bb6a",
  annual: "#ffb74d",
};