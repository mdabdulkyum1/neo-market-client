# 🚀 Neo Market - Referral Platform

A modern, responsive referral platform built with Next.js 15, where users can earn credits by referring friends and tracking their referral success.

![Neo Market](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-4.24-000000?style=for-the-badge&logo=nextauth)

## ✨ Features

### 🔐 Authentication & Security
- **Multi-provider authentication** with NextAuth.js
- **Email/Password** login with form validation
- **Google OAuth** integration
- **OTP verification** for email confirmation
- **Password reset** functionality
- **Secure session management**

### 💰 Referral System
- **Unique referral codes** for each user
- **Credit earning system** (2 credits per successful referral)
- **Referral link sharing** with copy functionality
- **Referral tracking** and analytics
- **Real-time referral statistics**

### 📊 Dashboard & Analytics
- **Personal dashboard** with referral overview
- **Credit balance** tracking
- **Referral history** table
- **User profile** management
- **Purchase tracking**

### 🎨 Modern UI/UX
- **Fully responsive** design for all devices
- **Smooth animations** with Framer Motion
- **Professional color scheme** with consistent branding
- **Mobile-first** approach
- **Accessible** components

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Lucide React** - Beautiful icons

### State Management
- **Zustand** - Lightweight state management
- **NextAuth.js** - Authentication state

### Backend Integration
- **Axios** - HTTP client
- **Custom API services** - Backend communication

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/neo-market-client.git
   cd neo-market-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   
   # Backend API
   NEXT_PUBLIC_BACKEND_URL=https://neo-market-server.onrender.com/api/v1
   
   # Google OAuth (Optional)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
neo-market-client/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (Authentication)/   # Auth pages group
│   │   │   ├── components/     # Login/Register forms
│   │   │   ├── login/         # Login page
│   │   │   └── register/      # Register page
│   │   ├── api/               # API routes
│   │   │   └── auth/          # NextAuth configuration
│   │   ├── dashboard/         # Dashboard pages
│   │   │   ├── components/    # Dashboard components
│   │   │   ├── credits/       # Credits page
│   │   │   ├── profile/       # Profile page
│   │   │   └── referrals/     # Referrals page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # Shared components
│   │   ├── Navbar.tsx         # Navigation bar
│   │   └── Footer.tsx         # Footer component
│   ├── hooks/                 # Custom hooks
│   │   ├── AxiosPublic/       # Public API hooks
│   │   └── AxiosSecure/       # Authenticated API hooks
│   ├── lib/                   # Utility libraries
│   │   ├── authOptions.ts     # NextAuth configuration
│   │   └── utils.ts           # Helper functions
│   ├── providers/             # Context providers
│   ├── stores/                # Zustand stores
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 🎯 Key Features Implementation

### Authentication Flow
```typescript
// Login with credentials
const response = await signIn("credentials", {
  email: data.email,
  password: data.password,
  callbackUrl: "/",
  redirect: false,
});
```

### Referral System
```typescript
// Generate referral link
const referralLink = `https://neo-market-client.vercel.app/register?r=${user?.referralCode}`;

// Copy to clipboard
await navigator.clipboard.writeText(referralLink);
```

### State Management
```typescript
// Zustand store for auth state
export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  email: null,
  password: null,
  setAuthData: (userId, email, password) => set({ userId, email, password }),
  clearAuth: () => set({ userId: null, email: null, password: null }),
}));
```

## 🎨 Design System

### Color Palette
- **Primary**: Indigo (#4F46E5)
- **Secondary**: Purple (#7C3AED)
- **Accent**: Pink (#EC4899)
- **Background**: Gray (#F9FAFB)
- **Text**: Gray (#1F2937)

### Typography
- **Font Family**: Geist Sans (Primary), Geist Mono (Code)
- **Headings**: Bold, responsive sizing
- **Body**: Regular weight, optimized for readability

### Components
- **Cards**: Rounded corners, subtle shadows
- **Buttons**: Consistent padding, hover states
- **Forms**: Clean inputs with validation states
- **Navigation**: Responsive, accessible menu

## 📱 Responsive Design

The application is fully responsive across all device sizes:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Breakpoints
```css
/* Mobile First Approach */
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# With Turbopack (faster builds)
npm run dev --turbopack
npm run build --turbopack
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Compatible with Next.js
- **Railway**: Easy deployment with environment setup
- **DigitalOcean**: VPS deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Md Abdul Kyum**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Tailwind CSS for the utility-first approach
- All contributors and users of this project

---

⭐ **Star this repository** if you found it helpful!

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact: support@neo-market.com
- Check the documentation in the `/docs` folder

---

**Built with ❤️ by Md Abdul Kyum**