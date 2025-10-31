// lib/types/leave.types.ts

export type LeaveType = "casual" | "medical" | "annual";

export interface LeaveHistory {
  type: LeaveType;
  date: string;
  time: string;
  day: string;
}

export interface LeaveDoc {
  userId: string;
  casual: number;
  medical: number;
  annual: number;
  history: LeaveHistory[];
  _id?: string;
}

export interface LeaveData {
  used: number;
  total: number;
  history: LeaveHistory[];
}