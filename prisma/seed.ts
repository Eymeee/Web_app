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
    const existing = await prisma.product.findFirst({
      where: {
        OR: [
          { sku: product.sku ?? undefined },
          { name: product.name }
        ]
      }
    });

    if (existing) {
      await prisma.product.update({
        where: { id: existing.id },
        data: { name: product.name, price: product.price, sku: product.sku }
      });
    } else {
      await prisma.product.create({ data: product });
    }
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
