const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const seedData = require('./seed-data');

async function main() {
  const count = await prisma.recipes.count();
  if (count === 0) {
    await prisma.recipes.createMany({ data: seedData });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
