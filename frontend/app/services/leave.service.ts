// services/leave.service.ts
import { LeaveDoc } from "../lib/types/leave.types";

// Get API base URL - defaults to empty string for same-origin requests
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

export const leaveService = {
  async fetchLeaveDoc(userId: string): Promise<LeaveDoc> {
    const res = await fetch(
      `${API_BASE}/api/leaves/${encodeURIComponent(userId)}`,
      {
        cache: "no-store", // Important for Next.js - always fetch fresh data
      }
    );
    
    if (!res.ok) {
      throw new Error("Failed to fetch leave doc");
    }
    
    return res.json();
  },

  async updateLeaveDoc(doc: LeaveDoc): Promise<void> {
    const res = await fetch(
      `${API_BASE}/api/leaves/${encodeURIComponent(doc.userId)}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          casual: doc.casual,
          medical: doc.medical,
          annual: doc.annual,
          history: doc.history,
        }),
      }
    );
    
    if (!res.ok) {
      throw new Error("Failed to update leave doc");
    }
  },
};