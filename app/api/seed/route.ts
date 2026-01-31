import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const defaultProducts = [
  { name: 'Bananas (1 kg)', price: 1.99 },
  { name: 'Apples (1 kg)', price: 2.49 },
  { name: 'Tomatoes (1 kg)', price: 2.99 },
  { name: 'Potatoes (2.5 kg)', price: 3.99 },
  { name: 'Onions (1 kg)', price: 1.49 },
  { name: 'Carrots (1 kg)', price: 1.59 },
  { name: 'Milk (1 L)', price: 1.19 },
  { name: 'Eggs (12 pack)', price: 3.49 },
  { name: 'Bread (White)', price: 2.29 },
  { name: 'Butter (250g)', price: 3.79 },
  { name: 'Cheese (Cheddar 400g)', price: 4.99 },
  { name: 'Chicken Breast (500g)', price: 5.99 },
  { name: 'Rice (1 kg)', price: 2.19 },
  { name: 'Pasta (500g)', price: 1.29 },
  { name: 'Orange Juice (1 L)', price: 2.99 },
  { name: 'Coffee (250g)', price: 5.49 },
  { name: 'Sugar (1 kg)', price: 1.89 },
  { name: 'Olive Oil (500ml)', price: 6.99 },
  { name: 'Yogurt (500g)', price: 2.49 },
  { name: 'Cereal (375g)', price: 3.99 }
];

export async function POST() {
  try {
    // Check if products already exist
    const existingCount = await prisma.product.count();
    
    if (existingCount > 0) {
      return NextResponse.json({
        message: 'Database already seeded',
        count: existingCount
      });
    }

    // Seed the products
    const results = await Promise.all(
      defaultProducts.map(product =>
        prisma.product.create({
          data: {
            name: product.name,
            price: product.price,
            sku: `SKU-${product.name.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 1000)}`
          }
        })
      )
    );

    return NextResponse.json({
      message: 'Database seeded successfully',
      count: results.length
    });
  } catch (error) {
    console.error('[v0] Seed error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
