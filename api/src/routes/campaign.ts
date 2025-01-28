import express from "express";
import {
  validateCampaign,
  validateCampaignStatusChange,
} from "../middleware/validateCampaign";
import {
  changeCampaignStatus,
  createCampaign,
  getAll,
  searchCampaigns,
} from "../controllers/campaign";

const router = express.Router();

router.post("/", validateCampaign, createCampaign);
router.patch("/:id", validateCampaignStatusChange, changeCampaignStatus);
router.get("/", searchCampaigns);
router.get("/", getAll);

export { router as campaignRouter };
