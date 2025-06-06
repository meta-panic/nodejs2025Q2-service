import { PrismaClient } from '@prisma/client'; // <-- USE THIS LINE

const prisma = new PrismaClient();

const FAVORITES_SINGLETON_ID = 'global';

async function main() {
  console.log(`Starting seed...`);

  const favorites = await prisma.favorites.upsert({
    where: { id: FAVORITES_SINGLETON_ID },
    update: {},
    create: {
      id: FAVORITES_SINGLETON_ID,
    },
  });

  console.log(`Created/Ensured Favorites singleton with ID: ${favorites.id}`);
  console.log(`Seed finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
