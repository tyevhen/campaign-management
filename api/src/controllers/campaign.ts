import { Request, Response } from "express";
import prisma from "../db/client";
import { CampaignRequest } from "middleware/validateCampaign";
import { Prisma } from "@prisma/client";

export const createCampaign = async (req: Request, res: Response) => {
  try {
    const { title, landingPageUrl, payouts } = req.body;

    const createdCampaign = await prisma.$transaction(async (prisma) => {
      const newCampaign = await prisma.campaign.create({
        data: {
          title,
          landingPageUrl,
          isRunning: false,
        },
      });

      const campaignPayouts: Prisma.CampaignPayoutCreateManyInput[] =
        payouts.map((payoutId: string) => ({
          campaignId: newCampaign.id,
          payoutId: payoutId,
          amount: 0.0,
        }));

      const res = await prisma.campaignPayout.createMany({
        data: campaignPayouts,
      });

      const result = await prisma.campaign.findUnique({
        where: { id: newCampaign.id },
        include: {
          campaignPayouts: {
            include: {
              payout: true,
            },
          },
        },
      });

      return result;
    });

    res.status(201).json(createdCampaign);
  } catch (error) {
    res.status(500).json({ error: "Error creating campaign" });
  }
};

export const changeCampaignStatus = async (
  req: CampaignRequest,
  res: Response
) => {
  try {
    const { campaign, requestedStatus } = req;
    const updatedCampaign = await prisma.campaign.update({
      where: { id: campaign!.id },
      data: {
        isRunning: requestedStatus,
      },
    });
    res.status(200).json(updatedCampaign);
  } catch (error) {
    res.status(500).json({ error: "Error changing campaign status" });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const campaigns = await prisma.campaign.findMany({
      include: {
        campaignPayouts: {
          include: {
            payout: true,
          },
        },
      },
    });
    res.status(200).json(campaigns);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching campaigns" });
  }
};

export const searchCampaigns = async (req: Request, res: Response) => {
  try {
    const { title, landingPageUrl, showStoppedCampaigns } = req.query;
    const campaigns = await prisma.campaign.findMany({
      where: {
        title: title
          ? { contains: title as string, mode: "insensitive" }
          : undefined,
        landingPageUrl: landingPageUrl
          ? { contains: landingPageUrl as string, mode: "insensitive" }
          : undefined,
        isRunning: showStoppedCampaigns === "true" ? undefined : true,
      },
      include: {
        campaignPayouts: {
          include: {
            payout: true,
          },
        },
      },
    });

    res.status(200).json(campaigns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error searching campaigns" });
  }
};
