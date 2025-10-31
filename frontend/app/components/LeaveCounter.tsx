"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Grid,
  Modal,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Plus, History, X, RotateCcw } from "lucide-react";

type LeaveType = "casual" | "medical" | "annual";

interface LeaveHistory {
  type: LeaveType;
  date: string;
  time: string;
  day: string;
}

interface LeaveDoc {
  userId: string;
  casual: number;
  medical: number;
  annual: number;
  history: LeaveHistory[];
  _id?: string;
}

interface LeaveData {
  used: number;
  total: number;
  history: LeaveHistory[];
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export default function LeaveCounter() {
  const { user } = useUser();
  const [doc, setDoc] = useState<LeaveDoc | null>(null);
  const [leaves, setLeaves] = useState<Record<LeaveType, LeaveData> | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState<LeaveType | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const LIMITS: Record<LeaveType, number> = {
    casual: 6,
    medical: 6,
    annual: 14,
  };
  const TOTAL_LEAVE_COUNT = 24;

  const colors: Record<LeaveType, string> = {
    casual: "#42a5f5",
    medical: "#66bb6a",
    annual: "#ffb74d",
  };

  // Fetch the leave doc for the current Clerk user
  const fetchForUser = async (userId: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}/api/leaves/${encodeURIComponent(userId)}`
      );
      const data: LeaveDoc = await res.json();
      setDoc(data);
      setLeaves({
        casual: {
          used: data.casual,
          total: LIMITS.casual,
          history: data.history.filter((h) => h.type === "casual"),
        },
        medical: {
          used: data.medical,
          total: LIMITS.medical,
          history: data.history.filter((h) => h.type === "medical"),
        },
        annual: {
          used: data.annual,
          total: LIMITS.annual,
          history: data.history.filter((h) => h.type === "annual"),
        },
      });
    } catch (err) {
      console.error("fetchForUser failed", err);
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch for the logged-in Clerk user
  useEffect(() => {
    if (user?.id) {
      fetchForUser(user.id);
    }
  }, [user?.id]);

  // Helper to persist doc updates to backend
  const persistDoc = async (updatedDoc: LeaveDoc) => {
    try {
      await fetch(
        `${API_BASE}/api/leaves/${encodeURIComponent(updatedDoc.userId)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            casual: updatedDoc.casual,
            medical: updatedDoc.medical,
            annual: updatedDoc.annual,
            history: updatedDoc.history,
          }),
        }
      );
    } catch (err) {
      console.error("persistDoc failed", err);
    }
  };

  // Take a leave (add to history & increment counter)
  const takeLeave = (type: LeaveType) => {
    if (!leaves || !doc) return;
    const category = leaves[type];
    if (category.used >= category.total) return;

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const day = now.toLocaleDateString(undefined, { weekday: "long" });

    const entry: LeaveHistory = { type, date, time, day };

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

  // Reset counts (keep history)
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
    setLeaves({
      casual: {
        used: 0,
        total: LIMITS.casual,
        history: updatedDoc.history.filter((h) => h.type === "casual"),
      },
      medical: {
        used: 0,
        total: LIMITS.medical,
        history: updatedDoc.history.filter((h) => h.type === "medical"),
      },
      annual: {
        used: 0,
        total: LIMITS.annual,
        history: updatedDoc.history.filter((h) => h.type === "annual"),
      },
    });

    await persistDoc(updatedDoc);
    setConfirmReset(false);
  };

  if (loading || !leaves || !doc)
    return <Typography>Loading...</Typography>;

  const totalUsed =
    leaves.casual.used + leaves.medical.used + leaves.annual.used;
  const totalRemaining = TOTAL_LEAVE_COUNT - totalUsed;

  return (
    <Box sx={{ p: 3, maxWidth: 1100, mx: "auto" }}>
      {/* Summary card */}
      <Card
        sx={{
          maxWidth: 520,
          mx: "auto",
          mb: 4,
          p: 2,
          textAlign: "center",
          boxShadow: 6,
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
          value={(totalUsed / TOTAL_LEAVE_COUNT) * 100}
          sx={{ mt: 2, height: 10, borderRadius: 6 }}
        />

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="outlined"
            startIcon={<RotateCcw size={18} />}
            onClick={() => setConfirmReset(true)}
          >
            Reset Counts
          </Button>
        </Box>
      </Card>

      {/* Leave type cards */}
      <Grid container spacing={3} justifyContent="center">
        {(["casual", "medical", "annual"] as LeaveType[]).map((type) => {
          const data = leaves[type];
          const pct = (data.used / data.total) * 100;
          return (
            <Grid size={{xs:12, sm: 6, md: 4}} key={type}>
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
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ color: colors[type], mb: 1 }}
                  >
                    {type.toUpperCase()}
                  </Typography>

                  <Typography fontWeight={500}>
                    {data.used} Used / {data.total} Total
                  </Typography>

                  <LinearProgress
                    variant="determinate"
                    value={pct}
                    sx={{
                      mt: 2,
                      height: 10,
                      borderRadius: 5,
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: colors[type],
                      },
                    }}
                  />

                  <Typography sx={{ mt: 1 }}>
                    Remaining:{" "}
                    <b style={{ color: colors[type] }}>
                      {data.total - data.used}
                    </b>
                  </Typography>
                </CardContent>

                <Box sx={{ display: "flex", gap: 1.5 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Plus size={18} />}
                    onClick={() => takeLeave(type)}
                    sx={{
                      backgroundColor: colors[type],
                      "&:hover": { backgroundColor: colors[type] },
                    }}
                  >
                    Take
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<History size={18} />}
                    onClick={() => setOpenModal(type)}
                  >
                    History
                  </Button>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* History modal */}
      <Modal open={!!openModal} onClose={() => setOpenModal(null)}>
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
              {openModal && `${openModal.toUpperCase()} - History`}
            </Typography>
            <IconButton onClick={() => setOpenModal(null)}>
              <X size={20} />
            </IconButton>
          </Box>

          <Divider sx={{ my: 2 }} />

          <List>
            {openModal && leaves[openModal].history.length === 0 && (
              <Typography color="text.secondary">No records yet.</Typography>
            )}
            {openModal &&
              leaves[openModal].history.map((h, i) => (
                <ListItem key={i} divider>
                  <ListItemText
                    primary={`${h.day} — ${h.date}`}
                    secondary={h.time}
                  />
                  <Chip label={h.type} size="small" sx={{ ml: 1 }} />
                </ListItem>
              ))}
          </List>
        </Box>
      </Modal>

      {/* Confirm reset dialog */}
      <Dialog open={confirmReset} onClose={() => setConfirmReset(false)}>
        <DialogTitle>Confirm Reset Counts</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will reset your leave counts to zero but keep your history.
            Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmReset(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={resetCounts}>
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
