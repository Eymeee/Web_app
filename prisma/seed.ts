import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = [
    { name: 'Barre protéinée', price: 2.9, sku: 'SNACK-001' },
    { name: 'Eau pétillante', price: 1.8, sku: 'DRINK-002' },
    { name: 'Sandwich poulet', price: 5.5, sku: 'FOOD-003' },
    { name: 'Jus d’orange', price: 3.2, sku: 'DRINK-004' },
    { name: 'Chips sel', price: 1.4, sku: 'SNACK-005' }
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: { name: product.name, price: product.price },
      create: product
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
