# 🚗 SquareConnect - Premium Transport Solutions

**SquareConnect** (formerly AustraConnect) is a premium, family-friendly transport agency operating across Australia (including Sydney, Melbourne, and the Gold Coast). We specialize in providing reliable, comfortable, and safe transportation for everything from airport transfers to day tours, with a special focus on family transport and child safety seating.

## 🚀 Project Overview

The SquareConnect frontend is a modern, high-performance web application built to facilitate seamless online bookings and showcase our comprehensive fleet and service areas.

### Tech Stack
- **Framework:** [Next.js](https://nextjs.org/) (App Router format)
- **Styling:** Custom CSS with modern scroll-tied animations
- **Backend Architecture:** Full stack integration with Node.js/Express API and Firebase Firestore for secure data handling.
- **Icons:** Lucide React

## 🌟 Key Features

### 1. Comprehensive Suite of Transport Services
SquareConnect provides tailored, end-to-end transport services designed for every traveler's unique needs:
- **✈️ Airport Transfers:** Timely and reliable pickups and drop-offs to all major airports. Includes specialized luggage assistance and "meet and greet" options.
- **🚢 Cruise Terminal Transfers:** Direct transfers to and from cruise terminals, ensuring passengers catch their ships without the stress of parking or hauling luggage.
- **🏥 Hospital Transport:** Compassionate, comfortable, and punctual transport designed for medical appointments and visitations, with spacious vehicles for mobility aids.
- **🏨 Hotel & Tourist Transfers:** Premium point-to-point hotel transfers acting as your private transport network throughout your entire stay across Australia.
- **🏙️ Scenic Day Tours:** Custom, professional driver-mediated day tours across iconic Australian landscapes and cities.

### 2. Industry-Leading Family & Child Safety
We differentiate ourselves by prioritizing families. A major pain point in standard transport is the lack of proper child safety seats. We solve this by offering:
- **Rear Facing Seats (👶):** Hand-fitted and installed for maximum safety, ideal for newborns and infants under 12 months.
- **Forward Facing Seats (🧒):** Safely positioned, high-quality seats for toddlers aged 1-4 years old.
- **Booster Seats (💺):** Provided for older children (aged 4-7 years) who require safe seatbelt positioning.
*All baby seats meet strict Australian safety standards and are provided fully cleaned and ready at pickup.*

### 3. Diverse & Premium Fleet
Whether traveling solo or with a large group, our robust fleet has exactly what is needed for a comfortable journey:
- **Premium Sedans (🚗):** Sleek, modern sedans accommodating up to 4 passengers with standard luggage.
- **Premium SUVs (🚙):** High-capacity SUVs perfect for groups of up to 4 passengers traveling with heavy or oversized luggage (1-5 bags).
- **7-Seater Maxi Cabs (🚐):** Ideal for medium families, comfortably seating 7 passengers with room for 8 bags.
- **11-Seater Minibuses (🚍):** Extremely spacious transport designed for extended families and corporate groups, accommodating 11 passengers and up to 16 bags.
- **Transparent Pricing:** Every trip is quoted with a 100% upfront fixed fare. No hidden fees or meter shock—GST and road tolls are consistently included.

### 4. Seamless Booking & Backend Integration
- **Advanced Booking Engine:** A multi-step, dynamic form allowing users to directly input pickup/drop-off locations, times, and select specific child seat options.
- **Secure Processing:** Customer booking requests are safely routed through an Express.js backend and synchronized securely to a Firebase Firestore database.
- **Admin Dashboard Integration:** Built-in centralized tooling handles viewing, managing, and confirming all incoming transport requests remotely.

### 5. Highly Optimized & Dynamic User Interface (UI/UX)
- **Vibrant Custom CSS:** An immersive layout explicitly built utilizing pure CSS constraints without leaning heavily on massive frameworks, guaranteeing phenomenal load-time performance.
- **Scroll-Triggered Animations:** State-of-the-art `IntersectionObservers` natively handle staggered entry animations, card scaling, and floating layout graphics effortlessly as the user browses the page.
- **Fluid Responsiveness:** Deeply tailored viewport flexibility dynamically reorganizes sliders, grids, and hero sections perfectly from massive desktop displays all the way down to small mobile browsers.

## 💻 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine. 

### Installation & Running Locally

1. Install all required dependencies:
   ```bash
   npm install
   ```

2. Start the Next.js development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the pages within `app/` and the `app/components/` directory.

## 📁 Folder Structure

- `/app`: Contains all Next.js App Router endpoints, including `/services`, `/contact`, `/fleet`, `/refund-policy`, and more.
- `/app/components`: Reusable UI components including our Navigation (`Navbar.tsx`), dynamic services render (`Services.tsx`), and our comprehensive landing pages (`Main.tsx`). 
- `/app/styles`: Custom CSS stylesheets bridging dynamic React states and visual UI.
- `/public/assets`: Static images rendering vehicles and banners natively optimized using Next.js `<Image />`.
