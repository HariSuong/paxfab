# Product Requirements Document (PRD) — Paxfab Website Redesign

**Project Name:** Paxfab Industrial Web Platform  
**Target Market:** North America (United States & Canada B2B EPC Market)  
**Target Audience:** EPC Contractors (Bechtel, Fluor, etc.), Industrial Owners, Energy/LNG Projects  
**Version:** 1.0 (MVP)  
**Language:** English (100% Client-facing UI & Content)

---

## 1. Executive Summary & Brand Identity

### 1.1 Brand Background & Positioning
- **Company Name:** PAX, LLC (Paxfab) — Structural Steel Fabricators.
- **Core Business:** Heavy structural steel fabrication, CNC processing, high-capacity welding, and modular components for petrochemical, LNG, and industrial energy plants.
- **Real Company Locations (To be integrated into Contact & About):**
  - **Main Office / Facility 1:** 39386 Babin Road, Gonzales, LA 70737 | Phone: (225) 644-6885 | Capacity: 1,500 Tons/Month (120,000 sq. ft shop).
  - **Facility 2:** 522 Mayeaux Dr / Bolivar Bishop Dr, DeRidder, LA 70634 | Phone: (337) 462-4950 | Capacity: 1,250 Tons/Month (70,000 sq. ft shop).
  - **Combined Capacity:** ~2,750 Tons/Month with full Peddinghaus CNC structural fabrication systems and on-site rail spurs.

### 1.2 Design Language & Theme Tokens
- **Style:** Industrial Premium — Clean, robust, modern B2B standard (benchmarking `trinityproducts.com` and `ctiw.com`).
- **Primary Color:** Deep Purple (`#6535b1`)
- **Secondary Industrial Base:** Charcoal / Dark Metal (`#1E1F24` / `#121316`)
- **Surface & Cards:** Dark Slate (`#2A2B32`)
- **Accent & Status:** Vibrant Safety Red (`#DC2626` / `#EF4444`) for Map Pins and CTA highlights
- **Text & Contrast:** Silver Gray (`#E5E7EB` / `#D1D5DB`) and Pure White (`#FFFFFF`)

---

## 2. Core Architecture & Tech Stack

- **Framework:** Next.js 14+ (App Router, TypeScript)
- **Styling:** Tailwind CSS + PostCSS
- **Component Primitives:** Radix UI / Shadcn UI patterns
- **Icons:** `lucide-react`
- **Mapping Engine:** `leaflet` + `react-leaflet` (Client-side dynamic import, SSR disabled)
- **Deployment & Hosting:** Vercel (Edge Network with automated HTTPS/SSL certificate)
- **Storage Strategy for Client Portal:** Cloudflare R2 / AWS S3 S3-compatible API or Supabase Storage

---

## 3. Site Navigation & Information Architecture

```
/ (Root Layout: Sticky Header + Main Content + Footer)
├── / (Home)
├── /about (Mission, Facility Specs, Peddinghaus CNC Systems, Capacity)
├── /capabilities (Structural Steel, CNC Cutting, Certified Welding, Logistics)
├── /work-history (Interactive North America Map + Project Detail Drawer)
├── /contact (Gonzales & DeRidder facilities, Phone, Email, RFQ Form)
└── /portal
    ├── /login (Secure Authentication Form for EPC Clients)
    └── /dashboard (Client-specific CAD/PDF file download & upload manager)
```

---

## 4. Detailed Feature Specifications (MVP)

### Feature 01: Layout & Global Navigation
- **Sticky Header:**
  - Logo: "PAXFAB" (Deep Purple badge with industrial font).
  - Nav Links: `Home`, `About`, `Capabilities`, `Work History`, `Contact`.
  - Primary Action Button: `Client Portal (FTP Login)` with lock icon.
  - Secondary CTA: `Request a Quote` linking to `/contact`.
- **Global Footer:**
  - Address details for Gonzales, LA and DeRidder, LA shops.
  - Phone numbers, fax, official email (`info@paxfab.com`).
  - Legal disclaimer & SSL secure verification badge.

### Feature 02: Interactive Work History Map (`/work-history`)
- **Interactive Component:** Render interactive map of North America (US & Canada).
- **Markers:** Custom Red Map Pins (`#DC2626`) placed at verified project coordinates.
- **Drawer Behavior:**
  - Clicking any pin smoothly opens a left-hand Drawer / Sidebar (`z-index: 50`).
  - Dark/Red accented header with Project Name and Close button (`Esc` or `X`).
  - Detail Fields:
    - **Name:** Project Title (e.g., Shell Upgrader)
    - **Customer:** General Contractor / Client (e.g., Bechtel, Cheniere Energy)
    - **Location:** City, State/Province (e.g., Ft. Saskatchewan, Alberta)
    - **Tonnage:** Total fabricated steel (e.g., 33,400 Tons)
    - **Category:** Petrochemical, LNG, Refining, or Structural
    - **Image/Description:** Placeholder for real fabrication photograph.
- **Initial Dataset (`src/data/projects.json`):**
```json
[
  {
    "id": "shell-upgrader",
    "name": "Shell Upgrader",
    "client": "Bechtel",
    "location": "Ft. Saskatchewan, Alberta, Canada",
    "lat": 53.7128,
    "lng": -113.2133,
    "tons": 33400,
    "category": "Energy & Petrochemical"
  },
  {
    "id": "sabine-pass-lng",
    "name": "Sabine Pass LNG Liquefaction",
    "client": "Cheniere Energy / Bechtel",
    "location": "Cameron Parish, Louisiana, USA",
    "lat": 29.7499,
    "lng": -93.8741,
    "tons": 18500,
    "category": "LNG Export Terminal"
  },
  {
    "id": "t3-project-la",
    "name": "T3 Industrial Expansion",
    "client": "Industrial Partner",
    "location": "Geismar, Louisiana, USA",
    "lat": 30.2274,
    "lng": -90.9529,
    "tons": 14200,
    "category": "Chemical Processing"
  },
  {
    "id": "valero-refinery",
    "name": "Refinery Modernization",
    "client": "Valero",
    "location": "St. Charles, Louisiana, USA",
    "lat": 29.9702,
    "lng": -90.4131,
    "tons": 9800,
    "category": "Refinery Structural"
  }
]
```

### Feature 03: Client Portal / FTP Login Replacement (`/portal`)
- **Login View (`/portal/login`):**
  - Modern enterprise login card for EPC partners.
  - Username/Email + Password input with "Remember Project Credentials".
  - Help note: *"Need project access? Contact your Paxfab Project Coordinator."*
- **Client Project Dashboard (`/portal/dashboard`):**
  - Authenticated session simulator (ready for Supabase/NextAuth integration).
  - Displays assigned client project (e.g., "Active Project: Bechtel - Sabine Pass Phase 2").
  - **Drawing Explorer:**
    - List of available files: `.dwg`, `.dxf`, `.pdf`, `.ifc` (3D Model).
    - Metadata: File Name, Version, Size, Upload Date, Hash/Checksum.
    - Action: Single-click `Download File` via secure signed URL.
  - **Drawing Upload Area:**
    - Drag-and-drop zone for client engineers to submit revision packages.
    - Upload progress bar, status feedback (`Queued`, `Uploading`, `Complete`).

### Feature 04: Industrial Homepage (`/`)
- **Hero Section:**
  - High-impact headline: *"Precision Structural Steel Fabrication for North America's Demanding Projects."*
  - Subhead: *"Over 2,750 tons/month fabrication capacity across two advanced facilities in Louisiana. Serving global EPC contractors with AISC quality standards."*
  - Dual CTA: `Explore Project Map` (links to `/work-history`) and `Contact Engineering Team` (links to `/contact`).
- **Metrics Bar:**
  - `2,750+ Tons` Monthly Output
  - `190,000 Sq. Ft` Shop Floor
  - `100% On-Time` Delivery Commitment
  - `AISC & AWS` Certified Standards
- **Equipment & Capability Highlights:**
  - Peddinghaus CNC Drilling & Saw Systems
  - Automated Angle & Plate Processing Lines
  - Dedicated Heavy Rail Spur On-site
- **Featured Projects Grid:** Teaser linking directly into the interactive map.

---

## 5. Technical Constraints & Non-Functional Requirements

1. **Leaflet SSR Safeguard:** Map components must be encapsulated with `next/dynamic` (`ssr: false`) to prevent `window is not defined` hydration errors.
2. **Page Performance & SEO:** 
   - All static assets and Unsplash placeholders must use `next/image` with WebP optimization.
   - Core Web Vitals target: Google PageSpeed / GTmetrix Grade A (>90 score).
3. **Responsive Viewport:** 
   - Desktop-first layout, fully fluid down to iPad and iPhone screens.
   - On mobile screens (< 768px), the Work History Drawer transforms into a bottom sliding sheet.
4. **Security:** Zero plaintext credentials. Pre-configured environment variables for storage endpoints (`STORAGE_ACCESS_KEY`, `STORAGE_SECRET_KEY`, `NEXT_PUBLIC_MAP_KEY`).

---

## 6. Phased Implementation Roadmap for Cursor AI

- [x] **Phase 1: Foundation Setup:** Next.js 14 App Router, Tailwind configuration with brand palette, layout with sticky header and footer.
- [ ] **Phase 2: Work History Map:** Integration of Leaflet, geo-dataset loading, red pin rendering, and interactive left drawer.
- [ ] **Phase 3: Marketing Pages:** Homepage, Facilities/About page with Gonzales & DeRidder specs, Contact form.
- [ ] **Phase 4: Client Portal UI:** Mock login flow, project file browser, download/upload interactive state.
- [ ] **Phase 5: Production Polish:** Image compression, metadata for SEO, deployment to Vercel with custom domain mapping.