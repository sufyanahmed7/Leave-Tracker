// utils/leave.utils.ts
import { LeaveType, LeaveDoc, LeaveData, LeaveHistory } from "../types/leave.types";
import { LEAVE_LIMITS } from "../constants/leave.constants";

export const createLeaveHistory = (type: LeaveType): LeaveHistory => {
  const now = new Date();
  return {
    type,
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString(),
    day: now.toLocaleDateString(undefined, { weekday: "long" }),
  };
};

export const transformDocToLeaves = (doc: LeaveDoc): Record<LeaveType, LeaveData> => {
  return {
    casual: {
      used: doc.casual,
      total: LEAVE_LIMITS.casual,
      history: doc.history.filter((h) => h.type === "casual"),
    },
    medical: {
      used: doc.medical,
      total: LEAVE_LIMITS.medical,
      history: doc.history.filter((h) => h.type === "medical"),
    },
    annual: {
      used: doc.annual,
      total: LEAVE_LIMITS.annual,
      history: doc.history.filter((h) => h.type === "annual"),
    },
  };
};

export const calculateTotalUsed = (leaves: Record<LeaveType, LeaveData>): number => {
  return leaves.casual.used + leaves.medical.used + leaves.annual.used;
};