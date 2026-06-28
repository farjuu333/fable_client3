 # 📚 Fable - Ebook Sharing Platform

A full-stack MERN application for sharing, discovering, and purchasing original ebooks.

## 🌐 Live Site
live(client): http://localhost:5000-client-three.vercel.app 
live(server): http://localhost:5000

## 🚀 Features

### 🔐 Authentication
- Email/Password Registration & Login
- Google OAuth Login
- JWT-based authentication
- Role-based access (User, Writer, Admin)

### 👤 User Dashboard
- Purchase History with status
- My Ebooks gallery view
- Bookmarks management

### ✍️ Writer Dashboard
- Add/Edit/Delete ebooks
- imgBB image upload for covers
- Sales history tracking
- Publish/Unpublish ebooks

### 🛡️ Admin Dashboard
- Manage users (role change, delete)
- Manage all ebooks (publish/unpublish, delete)
- View all transactions
- Analytics: Monthly sales chart, Genre pie chart

### 📚 Public Features
- Browse ebooks with search, filter, sort, pagination
- Ebook details with purchase via Stripe
- Bookmark ebooks for later
- Home page with featured ebooks, top writers, genres

### 💳 Payment
- Stripe Checkout integration
- Purchase history tracking

### 🎨 UI/UX
- Responsive design (mobile, tablet, desktop)
- Framer Motion animations
- DaisyUI + Tailwind CSS
- Skeleton loading states
- Custom 404 page

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | Next.js (App Router), React |
| Styling | Tailwind CSS, DaisyUI |
| Animation | Framer Motion |
| Icons | Lucide React |
| Auth | BetterAuth |
| Backend | Express.js, Node.js |
| Database | MongoDB (Mongoose) |
| Storage | imgBB |
| Payment | Stripe |

## 📦 NPM Packages

### Client
- next
- react, react-dom
- tailwindcss, daisyui
- framer-motion
- lucide-react
- better-auth
- stripe

### Server
- express
- cors
- dotenv
- mongoose
- stripe
- multer
- nodemon

## ⚙️ Environment Variables

### Client (.env.local)
