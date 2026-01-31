import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Default supermarket catalog - 20 essential products
const defaultProducts = [
  { name: 'Bananas (1 kg)', price: 1.99 },
  { name: 'Apples (1 kg)', price: 2.49 },
  { name: 'Tomatoes (1 kg)', price: 2.99 },
  { name: 'Potatoes (2.5 kg)', price: 3.99 },
  { name: 'Onions (1 kg)', price: 1.49 },
  { name: 'Carrots (1 kg)', price: 1.59 },
  { name: 'Milk (1 L)', price: 1.19 },
  { name: 'Eggs (12 pack)', price: 3.49 },
  { name: 'Bread (White)', price: 1.99 },
  { name: 'Butter (250g)', price: 2.79 },
  { name: 'Cheese (Cheddar)', price: 4.99 },
  { name: 'Chicken Breast (500g)', price: 6.99 },
  { name: 'Rice (1 kg)', price: 2.49 },
  { name: 'Pasta (500g)', price: 1.29 },
  { name: 'Olive Oil (500ml)', price: 5.99 },
  { name: 'Orange Juice (1 L)', price: 2.99 },
  { name: 'Coffee (Ground 250g)', price: 7.49 },
  { name: 'Sugar (1 kg)', price: 1.79 },
  { name: 'Salt (500g)', price: 0.99 },
  { name: 'Yogurt (4-pack)', price: 3.29 }
];

async function main() {
  console.log('🌱 Seeding database with default supermarket catalog...');

  for (const product of defaultProducts) {
    // Check if product already exists by name (idempotent)
    const existing = await prisma.product.findFirst({
      where: { name: product.name }
    });

    if (!existing) {
      await prisma.product.create({
        data: product
      });
      console.log(`✓ Created: ${product.name}`);
    } else {
      console.log(`- Skipped (already exists): ${product.name}`);
    }
  }

  const totalCount = await prisma.product.count();
  console.log(`\n✅ Seeding complete! Total products in database: ${totalCount}`);
}

main()
  .catch((error) => {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
