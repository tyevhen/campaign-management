import { findAll } from "../controllers/payout";
import express from "express";

const router = express.Router();

router.get("/", findAll);

export { router as payoutRouter };
