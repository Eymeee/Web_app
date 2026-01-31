-- Seed default supermarket products (idempotent - won't create duplicates)

INSERT OR IGNORE INTO Product (id, name, price, sku, createdAt, updatedAt)
VALUES 
  ('prod-001', 'Bananas (1 kg)', 1.99, 'FRUIT-001', datetime('now'), datetime('now')),
  ('prod-002', 'Apples (1 kg)', 2.49, 'FRUIT-002', datetime('now'), datetime('now')),
  ('prod-003', 'Tomatoes (1 kg)', 2.99, 'VEG-001', datetime('now'), datetime('now')),
  ('prod-004', 'Potatoes (2.5 kg)', 3.99, 'VEG-002', datetime('now'), datetime('now')),
  ('prod-005', 'Onions (1 kg)', 1.49, 'VEG-003', datetime('now'), datetime('now')),
  ('prod-006', 'Carrots (1 kg)', 1.59, 'VEG-004', datetime('now'), datetime('now')),
  ('prod-007', 'Milk (1 L)', 1.19, 'DAIRY-001', datetime('now'), datetime('now')),
  ('prod-008', 'Eggs (12 pack)', 3.49, 'DAIRY-002', datetime('now'), datetime('now')),
  ('prod-009', 'Butter (250g)', 2.99, 'DAIRY-003', datetime('now'), datetime('now')),
  ('prod-010', 'Yogurt (500g)', 1.89, 'DAIRY-004', datetime('now'), datetime('now')),
  ('prod-011', 'Bread (500g)', 1.29, 'BAKERY-001', datetime('now'), datetime('now')),
  ('prod-012', 'Croissants (6 pack)', 2.99, 'BAKERY-002', datetime('now'), datetime('now')),
  ('prod-013', 'Orange Juice (1 L)', 2.49, 'BEV-001', datetime('now'), datetime('now')),
  ('prod-014', 'Coffee (250g)', 4.99, 'PANTRY-001', datetime('now'), datetime('now')),
  ('prod-015', 'Pasta (500g)', 1.49, 'PANTRY-002', datetime('now'), datetime('now')),
  ('prod-016', 'Rice (1 kg)', 2.29, 'PANTRY-003', datetime('now'), datetime('now')),
  ('prod-017', 'Olive Oil (500ml)', 5.99, 'PANTRY-004', datetime('now'), datetime('now')),
  ('prod-018', 'Chicken Breast (500g)', 5.49, 'MEAT-001', datetime('now'), datetime('now')),
  ('prod-019', 'Ground Beef (500g)', 4.99, 'MEAT-002', datetime('now'), datetime('now')),
  ('prod-020', 'Cheese (200g)', 3.79, 'DAIRY-005', datetime('now'), datetime('now'));
