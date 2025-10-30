// src/routes/leaveRoutes.js
import express from "express";
import Leave from "../models/Leave.js";

const router = express.Router();

// Helper: create default doc
const makeDefault = (userId) => ({
  userId,
  casual: 0,
  medical: 0,
  annual: 0,
  history: [],
});

// GET /api/leaves/:userId  -> returns the leave doc for that user (creates if missing)
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    let doc = await Leave.findOne({ userId });
    if (!doc) {
      doc = await Leave.create(makeDefault(userId));
    }
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/*
PUT /api/leaves/:userId
Body possible shape:
{
  casual: Number,
  medical: Number,
  annual: Number,
  history: [ ... ]    // optional: full history array to store (replace)
}
Behavior:
- If body.history provided -> replace doc.history with provided array (frontend sends full history).
- Update casual/medical/annual with provided numeric values (if present).
*/
router.put("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { casual, medical, annual, history } = req.body;

    let doc = await Leave.findOne({ userId });
    if (!doc) {
      doc = await Leave.create(makeDefault(userId));
    }

    if (typeof casual === "number") doc.casual = casual;
    if (typeof medical === "number") doc.medical = medical;
    if (typeof annual === "number") doc.annual = annual;
    if (Array.isArray(history)) doc.history = history;

    await doc.save();
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
