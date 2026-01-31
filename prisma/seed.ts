import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const supermarketProducts = [
  // Fruits & Vegetables
  { name: 'Bananas', price: 1.49, sku: 'FRUIT-001' },
  { name: 'Apples (Red)', price: 2.99, sku: 'FRUIT-002' },
  { name: 'Oranges', price: 3.49, sku: 'FRUIT-003' },
  { name: 'Strawberries', price: 4.99, sku: 'FRUIT-004' },
  { name: 'Grapes (Green)', price: 3.99, sku: 'FRUIT-005' },
  { name: 'Tomatoes', price: 2.79, sku: 'VEG-001' },
  { name: 'Lettuce', price: 1.99, sku: 'VEG-002' },
  { name: 'Carrots (1kg)', price: 1.29, sku: 'VEG-003' },
  { name: 'Potatoes (2kg)', price: 2.49, sku: 'VEG-004' },
  { name: 'Onions (1kg)', price: 1.79, sku: 'VEG-005' },
  { name: 'Bell Peppers', price: 2.99, sku: 'VEG-006' },
  { name: 'Cucumbers', price: 1.49, sku: 'VEG-007' },

  // Dairy & Eggs
  { name: 'Milk (1L)', price: 1.19, sku: 'DAIRY-001' },
  { name: 'Yogurt (4-pack)', price: 3.49, sku: 'DAIRY-002' },
  { name: 'Butter (250g)', price: 2.99, sku: 'DAIRY-003' },
  { name: 'Cheddar Cheese', price: 4.99, sku: 'DAIRY-004' },
  { name: 'Eggs (12-pack)', price: 3.99, sku: 'DAIRY-005' },
  { name: 'Cream Cheese', price: 2.49, sku: 'DAIRY-006' },
  { name: 'Sour Cream', price: 2.29, sku: 'DAIRY-007' },

  // Bakery
  { name: 'White Bread', price: 1.99, sku: 'BAKERY-001' },
  { name: 'Whole Wheat Bread', price: 2.49, sku: 'BAKERY-002' },
  { name: 'Croissants (6-pack)', price: 4.49, sku: 'BAKERY-003' },
  { name: 'Baguette', price: 1.79, sku: 'BAKERY-004' },
  { name: 'Bagels (6-pack)', price: 3.29, sku: 'BAKERY-005' },

  // Pantry Staples
  { name: 'Rice (1kg)', price: 2.99, sku: 'PANTRY-001' },
  { name: 'Pasta (500g)', price: 1.49, sku: 'PANTRY-002' },
  { name: 'Flour (1kg)', price: 1.99, sku: 'PANTRY-003' },
  { name: 'Sugar (1kg)', price: 1.79, sku: 'PANTRY-004' },
  { name: 'Salt', price: 0.99, sku: 'PANTRY-005' },
  { name: 'Olive Oil (500ml)', price: 6.99, sku: 'PANTRY-006' },
  { name: 'Vegetable Oil (1L)', price: 3.49, sku: 'PANTRY-007' },
  { name: 'Honey', price: 4.99, sku: 'PANTRY-008' },
  { name: 'Peanut Butter', price: 3.99, sku: 'PANTRY-009' },
  { name: 'Jam (Strawberry)', price: 2.99, sku: 'PANTRY-010' },

  // Canned & Preserved
  { name: 'Canned Tomatoes', price: 1.49, sku: 'CANNED-001' },
  { name: 'Canned Beans', price: 1.29, sku: 'CANNED-002' },
  { name: 'Canned Tuna', price: 2.49, sku: 'CANNED-003' },
  { name: 'Canned Corn', price: 1.39, sku: 'CANNED-004' },

  // Beverages
  { name: 'Water (6-pack)', price: 3.99, sku: 'DRINK-001' },
  { name: 'Sparkling Water', price: 1.79, sku: 'DRINK-002' },
  { name: 'Orange Juice (1L)', price: 3.49, sku: 'DRINK-003' },
  { name: 'Apple Juice (1L)', price: 2.99, sku: 'DRINK-004' },
  { name: 'Cola (2L)', price: 2.49, sku: 'DRINK-005' },
  { name: 'Coffee (Ground)', price: 7.99, sku: 'DRINK-006' },
  { name: 'Tea Bags (100-pack)', price: 4.49, sku: 'DRINK-007' },

  // Snacks
  { name: 'Potato Chips', price: 2.99, sku: 'SNACK-001' },
  { name: 'Chocolate Bar', price: 1.79, sku: 'SNACK-002' },
  { name: 'Cookies', price: 3.49, sku: 'SNACK-003' },
  { name: 'Crackers', price: 2.79, sku: 'SNACK-004' },
  { name: 'Protein Bar', price: 2.49, sku: 'SNACK-005' },
  { name: 'Mixed Nuts', price: 5.99, sku: 'SNACK-006' },
  { name: 'Popcorn', price: 2.29, sku: 'SNACK-007' },

  // Meat & Fish (refrigerated/frozen)
  { name: 'Chicken Breast (500g)', price: 6.99, sku: 'MEAT-001' },
  { name: 'Ground Beef (500g)', price: 7.49, sku: 'MEAT-002' },
  { name: 'Pork Chops', price: 8.99, sku: 'MEAT-003' },
  { name: 'Salmon Fillet', price: 12.99, sku: 'FISH-001' },
  { name: 'Shrimp (Frozen)', price: 9.99, sku: 'FISH-002' },

  // Frozen Foods
  { name: 'Frozen Pizza', price: 4.99, sku: 'FROZEN-001' },
  { name: 'Ice Cream', price: 5.49, sku: 'FROZEN-002' },
  { name: 'Frozen Vegetables', price: 2.99, sku: 'FROZEN-003' },

  // Household
  { name: 'Dish Soap', price: 2.99, sku: 'HOUSE-001' },
  { name: 'Laundry Detergent', price: 8.99, sku: 'HOUSE-002' },
  { name: 'Toilet Paper (12-pack)', price: 12.99, sku: 'HOUSE-003' },
  { name: 'Paper Towels', price: 4.49, sku: 'HOUSE-004' },
  { name: 'Trash Bags', price: 5.99, sku: 'HOUSE-005' },
  { name: 'Sponges', price: 2.49, sku: 'HOUSE-006' }
];

async function main() {
  console.log('🌱 Seeding database with supermarket products...');

  for (const product of supermarketProducts) {
    const existing = await prisma.product.findFirst({
      where: {
        OR: [
          { sku: product.sku },
          { name: product.name }
        ]
      }
    });

    if (existing) {
      await prisma.product.update({
        where: { id: existing.id },
        data: { name: product.name, price: product.price, sku: product.sku }
      });
      console.log(`✓ Updated: ${product.name}`);
    } else {
      await prisma.product.create({ data: product });
      console.log(`✓ Created: ${product.name}`);
    }
  }

  console.log(`\n✅ Successfully seeded ${supermarketProducts.length} products!`);
}

main()
  .catch((error) => {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
