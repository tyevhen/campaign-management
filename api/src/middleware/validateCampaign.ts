import { Campaign } from "@prisma/client";
import prisma from "../db/client";
import { Request, Response, NextFunction } from "express";

const { body, param, query, validationResult } = require("express-validator");

export interface CampaignRequest extends Request {
  campaign?: Campaign;
  requestedStatus?: boolean;
}

export const validateCampaign = [
  body("title").notEmpty().withMessage("Title is required"),
  body("landingPageUrl").notEmpty().withMessage("Landing page URL is required"),
  body("payouts")
    .isArray({ mid: 1 })
    .withMessage("At least one payout country must be selected"),
  body("payouts.*").isUUID().withMessage("Invalid payout ID"),

  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { payouts } = req.body;

    try {
      const validPayouts = await prisma.payout.findMany({
        where: { id: { in: payouts } },
        select: { id: true },
      });

      const validPayoutIds = validPayouts.map((payout) => payout.id);
      const invalidPayouts = payouts.filter(
        (id: string) => !validPayoutIds.includes(id)
      );
      if (invalidPayouts.length > 0) {
        return res.status(400).json({ error: "Some payouts are invalid." });
      }

      next();
    } catch (error) {
      return res.status(500).json({ error: "Internal server error." });
    }
  },
];

export const validateCampaignStatusChange = [
  param("id").custom(
    async (
      value: string,
      { req, res }: { req: CampaignRequest; res: Response }
    ) => {
      const campaign = await prisma.campaign.findUnique({
        where: { id: value },
      });

      if (!campaign) {
        return res.status(400).json({ error: "Campaign not found" });
      }

      req.campaign = campaign;

      return true;
    }
  ),
  query("enable")
    .isIn(["true", "false"])
    .withMessage("Invalid query parameter.")
    .customSanitizer((value: string, { req }: { req: CampaignRequest }) => {
      req.requestedStatus = value == "true";
      return value;
    }),

  (req: CampaignRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { requestedStatus } = req;
    const { campaign } = req;

    if (campaign && campaign.isRunning === requestedStatus) {
      return res
        .status(400)
        .json({ error: `Status is already ${requestedStatus}` });
    }

    next();
  },
];
