import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// TODO: use prisma's default seeding and remove from server startup

const runSeed = async () => {
  console.log("Seeding database...");

  const existingPayouts = await prisma.payout.findMany();
  if (existingPayouts.length > 0) {
    console.log("Payouts already seeded, skipping...");
    return;
  }

  await prisma.payout.createMany({
    data: [
      { country: "Estonia" },
      { country: "Latvia" },
      { country: "Lithuania" },
      { country: "Spain" },
      { country: "Italy" },
    ],
  });

  console.log("Database seeded successfully!");
};

export default runSeed;
