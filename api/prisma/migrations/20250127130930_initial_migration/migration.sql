-- CreateTable
CREATE TABLE "campaign" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "landingPageUrl" TEXT NOT NULL,
    "isRunning" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payout" (
    "id" UUID NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_payout" (
    "id" UUID NOT NULL,
    "campaignId" UUID NOT NULL,
    "payoutId" UUID NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "campaign_payout_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payout_country_key" ON "payout"("country");

-- CreateIndex
CREATE UNIQUE INDEX "campaign_payout_campaignId_payoutId_key" ON "campaign_payout"("campaignId", "payoutId");

-- AddForeignKey
ALTER TABLE "campaign_payout" ADD CONSTRAINT "campaign_payout_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_payout" ADD CONSTRAINT "campaign_payout_payoutId_fkey" FOREIGN KEY ("payoutId") REFERENCES "payout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
