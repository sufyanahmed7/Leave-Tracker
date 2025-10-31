// lib/hooks/useLeaveManager.ts
"use client";

import { useState, useEffect } from "react";
import { LeaveType, LeaveDoc, LeaveData } from "../types/leave.types";
import { leaveService } from "../../services/leave.service";
import { createLeaveHistory, transformDocToLeaves } from "../utils/leave.utils";

export const useLeaveManager = (userId: string | undefined) => {
  const [doc, setDoc] = useState<LeaveDoc | null>(null);
  const [leaves, setLeaves] = useState<Record<LeaveType, LeaveData> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async (id: string) => {
    setLoading(true);
    try {
      const data = await leaveService.fetchLeaveDoc(id);
      setDoc(data);
      setLeaves(transformDocToLeaves(data));
    } catch (err) {
      console.error("fetchLeaves failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchLeaves(userId);
    }
  }, [userId]);

  const persistDoc = async (updatedDoc: LeaveDoc) => {
    try {
      await leaveService.updateLeaveDoc(updatedDoc);
    } catch (err) {
      console.error("persistDoc failed", err);
    }
  };

  const takeLeave = (type: LeaveType) => {
    if (!leaves || !doc) return;
    
    const category = leaves[type];
    if (category.used >= category.total) return;

    const entry = createLeaveHistory(type);
    const updatedDoc: LeaveDoc = {
      ...doc,
      casual: type === "casual" ? doc.casual + 1 : doc.casual,
      medical: type === "medical" ? doc.medical + 1 : doc.medical,
      annual: type === "annual" ? doc.annual + 1 : doc.annual,
      history: [...(doc.history || []), entry],
    };

    setDoc(updatedDoc);
    setLeaves({
      ...leaves,
      [type]: {
        ...category,
        used: category.used + 1,
        history: [...category.history, entry],
      },
    });

    persistDoc(updatedDoc);
  };

  const resetCounts = async () => {
    if (!doc) return;

    const updatedDoc: LeaveDoc = {
      ...doc,
      casual: 0,
      medical: 0,
      annual: 0,
      history: doc.history || [],
    };

    setDoc(updatedDoc);
    setLeaves(transformDocToLeaves(updatedDoc));
    await persistDoc(updatedDoc);
  };

  return {
    doc,
    leaves,
    loading,
    takeLeave,
    resetCounts,
  };
};