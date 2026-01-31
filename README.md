# Smart Grocery Box

A modern web application for managing grocery products, shopping carts, and transactions. Built with Next.js 14, Prisma, and TypeScript.

## Features

### Core Functionality
- **Product Management (CRUD)**: Create, read, update, and delete products with full validation
- **Shopping Cart**: Add items, update quantities, and manage your cart in real-time
- **Transactions**: Complete checkout and view transaction history with detailed line items
- **Dashboard**: Quick navigation and overview of all features

### Innovation Feature: Kiosk Mode
The Kiosk mode provides:
- **QR Code Access**: Generate a QR code for easy mobile device access
- **Fullscreen Display**: Toggle fullscreen mode for public displays or kiosks
- **Link Sharing**: Copy and share the application URL

This feature enables self-service scenarios and public-facing displays for Smart Grocery Box systems.

## Prerequisites

- **Node.js** >= 18.17
- **npm** or **yarn**

## Quick Start

### 1. Installation

```bash
npm install
```

### 2. Database Setup

The project uses SQLite with Prisma ORM. Set up the database with:

```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database with default catalog
npm run db:seed
```

**Note:** Default supermarket catalog is preloaded. The seed includes 20 essential products (bananas, apples, milk, eggs, bread, etc.). The seed is idempotent - running it multiple times won't create duplicates.

The database file is stored at `prisma/dev.db` (automatically gitignored).

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Build for Production

```bash
npm run build
npm start
```

## Manual Testing Scenario

Follow these steps to test the complete application flow:

### Step 1: Products Page
1. Navigate to `/products`
2. Click "Add Product" to create a new product
3. Fill in:
   - Name: e.g., "Apple"
   - Price: e.g., 1.50
   - SKU (optional): e.g., "FRUIT-001"
4. Click "Create" to save
5. Test Edit and Delete operations on existing products

### Step 2: Shopping Cart
1. Navigate to `/cart`
2. Select a product from the dropdown
3. Enter quantity (must be >= 1)
4. Click "Add to Cart"
5. Update quantities directly in the cart table
6. Remove items using the "Remove" button
7. Verify the cart total updates correctly

### Step 3: Checkout
1. With items in your cart, click "Checkout"
2. Verify success message appears
3. Cart should now be empty

### Step 4: Transactions
1. Navigate to `/transactions`
2. Find your completed transaction in the list
3. Click "View Details" to see transaction breakdown
4. Verify:
   - Transaction ID, date, and total
   - All line items with correct quantities and prices

### Step 5: Kiosk Mode
1. Navigate to `/kiosk`
2. View the generated QR code
3. Test "Toggle Fullscreen" button
4. Test "Copy Link" button

## API Endpoints

### Products
- `GET /api/products` — List all products
- `POST /api/products` — Create new product (validated)
- `GET /api/products/:id` — Get product details
- `PUT /api/products/:id` — Update product (validated)
- `DELETE /api/products/:id` — Delete product

### Cart
- `GET /api/cart` — Get current cart (items + total)
- `POST /api/cart` — Add item to cart (auto-increments if exists)
- `PUT /api/cart/:id` — Update item quantity
- `DELETE /api/cart/:id` — Remove item from cart

### Checkout & Transactions
- `POST /api/checkout` — Create transaction from cart and clear cart
- `GET /api/transactions` — List all transactions
- `GET /api/transactions/:id` — Get transaction details with line items

### Detection (Kiosk Integration)
- `POST /api/detections` — Add to cart via product name or SKU

Example:
```bash
curl -X POST http://localhost:3000/api/detections \
  -H "Content-Type: application/json" \
  -d '{"label":"FRUIT-001","quantity":2}'
```

## Architecture & Code Quality

### Project Structure
```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── products/          # Products page
│   ├── cart/              # Cart page
│   ├── transactions/      # Transactions pages
│   └── kiosk/             # Kiosk mode
├── components/            # React components
│   ├── ui/                # Reusable UI components
│   ├── products/          # Product-specific components
│   ├── cart/              # Cart-specific components
│   └── transactions/      # Transaction components
├── lib/                   # Utilities and helpers
│   ├── validation/        # Zod schemas
│   ├── db.ts              # Prisma client
│   ├── errors.ts          # Error handling
│   └── rate-limit.ts      # Rate limiting
└── prisma/                # Database schema and migrations
```

### Key Patterns
- **Validation**: Client-side (React Hook Form + Zod) and server-side (Zod)
- **Error Handling**: Consistent API error format with user-friendly messages
- **Loading States**: Skeleton loaders for better UX
- **Empty States**: Helpful messages with calls-to-action
- **Accessibility**: ARIA labels, keyboard navigation, focus management
- **Rate Limiting**: Protection on mutation endpoints

## Security Best Practices

- ✅ Strict server-side validation on all write operations
- ✅ Rate limiting on mutation endpoints
- ✅ Input sanitization (trim, lowercase where appropriate)
- ✅ User-friendly error messages (no stack traces exposed)
- ✅ No secrets in code (use `.env.local` for environment variables)
- ✅ Parameterized queries via Prisma (SQL injection prevention)

## Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm start` — Start production server
- `npm run lint` — Run ESLint
- `npm run lint:fix` — Fix ESLint issues
- `npm run format` — Format code with Prettier
- `npm run test` — Run tests
- `npm run db:generate` — Generate Prisma client
- `npm run db:migrate` — Run database migrations
- `npm run db:seed` — Seed database with sample data

## Screenshots

### Products Management
*[Screenshot placeholder: Products page showing the CRUD interface with product list, search, and action buttons]*

### Shopping Cart
*[Screenshot placeholder: Cart page with items, quantities, and checkout button]*

### Kiosk Mode
*[Screenshot placeholder: Kiosk page displaying QR code and fullscreen controls]*

## Development Notes

### Database
- The SQLite database file (`prisma/dev.db`) is gitignored
- Migrations are version-controlled in `prisma/migrations/`
- Use `npm run db:seed` to add the default catalog (idempotent)
- Use `npm run db:reset` to completely reset the database and re-seed

### Environment Variables
Create a `.env.local` file (gitignored) for any environment-specific configuration:
```env
DATABASE_URL="file:./dev.db"
```

### Git Workflow
- Do not commit `prisma/dev.db`
- Commit source code, migrations, and `package-lock.json`
- Run `npm run lint && npm run test` before pushing

## Technologies Used

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: SQLite + Prisma ORM
- **Validation**: Zod
- **Forms**: React Hook Form
- **UI**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React (via shadcn/ui)
- **QR Codes**: qrcode.react

## License

MIT
