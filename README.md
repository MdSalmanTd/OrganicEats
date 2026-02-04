# Organic Eats

A modern organic food ordering platform built with Next.js, tRPC, Prisma, and NextAuth. Users can browse organic meals, customize orders with add-ons, and track their order history.

## Features

- 🔐 **Google OAuth Authentication** - Secure sign-in with Google
- 🍽️ **Food Menu** - Browse organic meals with nutritional information
- ⚡ **Real-time Customization** - Add ingredients and see nutrition updates
- 📊 **Order Tracking** - View order history with status updates
- 📱 **Responsive Design** - Optimized for mobile, tablet, and desktop
- 🎨 **Animated UI** - Smooth animations with Framer Motion
- 🔒 **Type-safe API** - End-to-end type safety with tRPC

## Tech Stack

This is a [T3 Stack](https://create.t3.gg/) project with the following technologies:

- **Framework:** Next.js 15.2.3 (App Router)
- **Authentication:** NextAuth 5.0.0-beta.25
- **Database:** PostgreSQL (Neon) with Prisma 6.6.0
- **API:** tRPC 11.0.0
- **Styling:** Tailwind CSS 4.0.15
- **Animations:** Framer Motion 12.31.0
- **Language:** TypeScript 5.8.2

## Installation

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (Neon recommended)
- Google OAuth credentials

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd OrganicEats
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your credentials:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# NextAuth
AUTH_SECRET="your-secret-key-here"
AUTH_URL="http://localhost:3000"

# Google OAuth
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
```

#### Getting Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env`

#### Setting Up Neon Database

1. Go to [Neon Console](https://console.neon.tech/)
2. Create a new project
3. Copy the connection string
4. Update `DATABASE_URL` in `.env`

### Step 4: Set Up Database

Push the Prisma schema to your database:

```bash
npx prisma db push
```

Generate Prisma Client:

```bash
npx prisma generate
```

### Step 5: Seed the Database (Optional)

Populate the database with sample food items and add-ons:

```bash
npm run db:seed
```

This will create:
- 5 food items (Acai Bowl, Quinoa Bowl, etc.)
- 12 add-ons (Strawberries, Chia Seeds, etc.)

### Step 6: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

### Step 1: Build the Application

```bash
npm run build
```

This will:
- Compile TypeScript
- Build Next.js application
- Generate optimized production bundle

### Step 2: Run Production Server

```bash
npm start
```

### Step 3: Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

Update `AUTH_URL` in Vercel environment variables to your production URL.

## Project Structure

```
OrganicEats/
├── prisma/
│   ├── schema.prisma              # Database models (User, Food, Order, AddOn)
│   └── seed.ts                    # Database seed script
├── generated/
│   └── prisma/                    # Generated Prisma Client
├── src/
│   ├── app/
│   │   ├── _components/
│   │   │   ├── auth-button.tsx    # Sign in/out button with session
│   │   │   ├── navbar.tsx         # Responsive navbar with menu
│   │   │   ├── menu-cards.tsx     # Infinite carousel for food items
│   │   │   └── providers.tsx      # SessionProvider wrapper
│   │   ├── customize/[id]/
│   │   │   └── page.tsx           # Food customization page
│   │   ├── review/
│   │   │   └── page.tsx           # Order review & confirmation
│   │   ├── orders/
│   │   │   └── page.tsx           # Order history page
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/
│   │   │   │   └── route.ts       # NextAuth API route
│   │   │   └── trpc/[trpc]/
│   │   │       └── route.ts       # tRPC API route
│   │   ├── layout.tsx             # Root layout with providers
│   │   └── page.tsx               # Home page with food carousel
│   ├── server/
│   │   ├── api/
│   │   │   ├── routers/
│   │   │   │   ├── food.ts        # Food queries (getAll, getById)
│   │   │   │   ├── addOn.ts       # Add-on queries (getAll)
│   │   │   │   └── order.ts       # Order mutations & queries
│   │   │   ├── root.ts            # Root API router
│   │   │   └── trpc.ts            # tRPC context & procedures
│   │   ├── auth/
│   │   │   ├── config.ts          # Google OAuth configuration
│   │   │   └── index.ts           # Auth exports
│   │   └── db.ts                  # Prisma database client
│   ├── trpc/
│   │   ├── query-client.ts        # React Query configuration
│   │   ├── react.tsx              # tRPC React hooks
│   │   └── server.ts              # tRPC server-side caller
│   └── env.js                     # Environment variable validation
├── package.json                   # Dependencies & scripts
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # This file
```

## Database Schema

### Models

- **User** - Authentication (NextAuth)
- **Food** - Menu items with base nutrition
- **AddOn** - Customizable ingredients
- **Order** - User orders with nutrition totals
- **OrderAddOn** - Junction table for order add-ons

### Key Fields

**Food:**
- name, description, image
- defaultIngredients (string array)
- baseCalories, baseProtein, baseCarbs, baseFat
- isAvailable (boolean)

**AddOn:**
- name, category
- calories, protein, carbs, fat
- isAvailable (boolean)

**Order:**
- userId, foodId
- status (pending, confirmed, preparing, completed, cancelled)
- totalCalories, totalProtein, totalCarbs, totalFat, totalFiber

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Run production server
npm run db:seed      # Seed database with sample data
npx prisma studio    # Open Prisma Studio (database GUI)
npx prisma db push   # Push schema changes to database
npx prisma generate  # Generate Prisma Client
```

## Application Flow

1. **Home Page** - Browse food items in animated carousel
2. **Customize** - Select food item, add/remove ingredients
3. **Review** - Confirm order with nutrition summary
4. **Orders** - View order history with status tracking

## API Routes

### tRPC Endpoints

**Food:**
- `food.getAll` - Get all available foods
- `food.getById` - Get single food by ID

**Add-ons:**
- `addOn.getAll` - Get all available add-ons

**Orders (Protected):**
- `order.create` - Create new order
- `order.getMyOrders` - Get user's orders
- `order.getById` - Get single order

## Future Tasks

### High Priority

- [ ] **Payment Integration**
  - Integrate Stripe/PayPal for payment processing
  - Add order total calculation with pricing
  - Create checkout page with payment form
  - Handle payment success/failure callbacks

- [ ] **Order Status Management**
  - Admin dashboard for order management
  - Update order status (confirmed → preparing → completed)
  - Real-time order status updates (WebSocket/Polling)
  - Email notifications for status changes

- [ ] **User Profile**
  - User profile page with personal information
  - Delivery addresses management
  - Payment methods storage
  - Order preferences

### Medium Priority

- [ ] **Enhanced Food Management**
  - Admin panel for CRUD operations on foods
  - Image upload for food items
  - Category/tags for food filtering
  - Dietary restrictions labels (vegan, gluten-free, etc.)

- [ ] **Search & Filters**
  - Search bar for food items
  - Filter by calories, protein, dietary restrictions
  - Sort by popularity, rating, price

- [ ] **Reviews & Ratings**
  - User reviews for food items
  - Star rating system
  - Review moderation

- [ ] **Cart System**
  - Add multiple items to cart
  - Modify cart before checkout
  - Save cart for later
  - Bulk order discount

### Low Priority

- [ ] **Analytics Dashboard**
  - User order statistics
  - Popular items tracking
  - Revenue reports
  - User engagement metrics

- [ ] **Social Features**
  - Share favorite meals
  - Follow other users
  - Recipe recommendations
  - Meal planning

- [ ] **Mobile App**
  - React Native mobile application
  - Push notifications for order updates
  - Camera integration for meal photos

- [ ] **Subscription Plans**
  - Weekly meal plans
  - Recurring orders
  - Subscription discounts

### Technical Improvements

- [ ] **Testing**
  - Unit tests with Jest
  - E2E tests with Playwright
  - API endpoint testing

- [ ] **Performance**
  - Image optimization with Next.js Image
  - Caching strategies (React Query, Redis)
  - Database query optimization

- [ ] **Security**
  - Rate limiting on API endpoints
  - CSRF protection
  - Input sanitization
  - SQL injection prevention

- [ ] **Accessibility**
  - WCAG 2.1 AA compliance
  - Screen reader support
  - Keyboard navigation
  - Color contrast improvements

- [ ] **SEO**
  - Meta tags optimization
  - Open Graph tags
  - Sitemap generation
  - Structured data (JSON-LD)

## Learn More

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Prisma Documentation](https://prisma.io/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

### T3 Stack Resources

- [T3 Stack Documentation](https://create.t3.gg/)
- [T3 Stack Discord](https://t3.gg/discord)
- [Create T3 App GitHub](https://github.com/t3-oss/create-t3-app)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.


