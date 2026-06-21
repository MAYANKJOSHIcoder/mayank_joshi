# Mayank Joshi — Personal Website

> The personal website of Mayank Joshi — CS student, AI/ML enthusiast, and builder from New Delhi.

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.170-000000?logo=three.js)](https://threejs.org/)

## ✨ Features

- **3D Hero Scene** — Interactive Three.js/R3F dotted wave animation with viewport-aware rendering (pauses when off-screen to save GPU/CPU)
- **Animated Star Field** — Decorative canvas particle background with parallax mouse effect and viewport-aware animation pausing
- **Dark/Light Theme** — System-aware theme toggle with `next-themes`
- **Smooth Animations** — Framer Motion-powered transitions and scroll reveals
- **Splash Screen** — Intro animation on first visit
- **Scroll Progress** — Reading progress indicator at the top of the page
- **Projects Showcase** — Tech stack tags, live/demo links, and featured highlights with tilt effect cards
- **Skills Overview** — Categorized skill badges with proficiency levels (Languages, Frameworks, AI/ML, Databases, Tools)
- **Experience Timeline** — Chronological career/education timeline
- **GitHub Activity Graph** — Full contribution calendar with multi-year selector, GitHub's original green palette, and stats (repos, stars, contributions)
- **Last.fm Now Playing** — Live Spotify status via the Last.fm API (optional)
- **Contact Form** — Centered form with auto-expanding textarea, powered by Resend (optional)
- **SEO Optimized** — Open Graph images (dynamic OG route), Twitter cards, `sitemap.xml`, `robots.ts`
- **Vercel Analytics & Speed Insights** — Built-in performance monitoring
- **Cube Mascot** — Interactive 3D mascot in the About section that follows your cursor
- **Rate-Limited Contact Form** — 3 messages/hour and 10/day per IP via `rate-limiter-flexible`

## 🛠 Tech Stack

| Layer              | Technology                                      |
| ------------------ | ----------------------------------------------- |
| Framework          | [Next.js 15](https://nextjs.org/) (App Router)  |
| Language           | [TypeScript](https://www.typescriptlang.org/)   |
| Styling            | [Tailwind CSS](https://tailwindcss.com/)        |
| 3D Graphics        | [Three.js 0.170](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) + [Drei](https://github.com/pmndrs/drei) |
| Animation          | [Framer Motion](https://www.framer.com/motion/) |
| Icons              | [React Icons](https://react-icons.github.io/react-icons/) |
| Theme Management   | [next-themes](https://github.com/pacocoursey/next-themes) |
| Email              | [Resend](https://resend.com/)                   |
| Analytics          | [Vercel Analytics](https://vercel.com/analytics) + [Speed Insights](https://vercel.com/docs/speed-insights) |
| Deployment         | [Vercel](https://vercel.com/)                   |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18.17+
- npm / pnpm / yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/MAYANKJOSHIcoder/portfolio.git
cd portfolio

# Install dependencies
npm install

# Copy the environment template
cp .env.example .env.local
```

### Environment Variables

The site works out of the box without any env vars. The following are **optional** integrations:

| Variable               | Purpose                            |
| ---------------------- | ---------------------------------- |
| `LASTFM_API_KEY`       | Last.fm Now Playing (Spotify)      |
| `LASTFM_USERNAME`      | Last.fm Now Playing (Spotify)      |
| `GITHUB_TOKEN`         | GitHub Stats / Contribution Graph  |
| `RESEND_API_KEY`       | Contact Form email delivery        |
| `CONTACT_EMAIL`        | Contact Form recipient address     |

See `.env.example` for the full list.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Production

```bash
npm run build   # Production build
npm start       # Serve the build
```

### Lint

```bash
npm run lint
```

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, providers, metadata)
│   ├── page.tsx                  # Home page (section composition)
│   ├── globals.css               # Global styles + CSS variables
│   ├── loading.tsx               # Loading state
│   ├── not-found.tsx             # 404 page
│   ├── og/route.tsx              # Dynamic Open Graph image generation
│   ├── robots.ts                 # Robots.txt generator
│   ├── sitemap.ts                # Sitemap generator
│   └── api/
│       ├── github/route.ts       # GitHub GraphQL API (multi-year contributions)
│       ├── spotify/route.ts      # Last.fm now-playing endpoint
│       └── contact/route.ts      # Contact form email via Resend
├── components/
│   ├── layout/
│   │   └── Providers.tsx         # Global layout wrappers (theme, analytics)
│   ├── sections/                 # Page sections
│   │   ├── Hero.tsx              # Hero with 3D scene
│   │   ├── About.tsx             # About / bio
│   │   ├── Projects.tsx          # Projects grid
│   │   ├── Skills.tsx            # Skills categorized list + GitHub graph
│   │   ├── Experience.tsx        # Experience timeline
│   │   └── Contact.tsx           # Contact form with auto-expanding textarea
│   ├── three/                    # Three.js / R3F scenes
│   │   ├── Scene.tsx             # R3F canvas wrapper with viewport-aware frameloop
│   │   └── DottedWave.tsx        # Dotted wave mesh
│   └── ui/                       # Reusable UI components
│       ├── Navbar.tsx            # Navigation bar
│       ├── Footer.tsx            # Footer
│       ├── StarField.tsx         # Animated star particles (viewport-aware)
│       ├── SplashScreen.tsx      # Intro splash screen
│       ├── ThemeToggle.tsx       # Dark/light toggle
│       ├── ScrollProgress.tsx    # Reading progress bar
│       ├── Button.tsx            # Reusable button
│       ├── SectionHeading.tsx    # Section title component
│       ├── ProjectCard.tsx       # Project card with tilt effect
│       ├── SkillBadge.tsx        # Skill pill/badge
│       ├── TimelineItem.tsx      # Timeline entry
│       ├── GitHubGraph.tsx       # GitHub contribution graph with year selector
│       └── SpotifyNowPlaying.tsx # Current Spotify track (via Last.fm)
├── data/
│   ├── site.config.ts            # Site-wide metadata (name, tagline, college, etc.)
│   ├── socials.ts                # Social media links (GitHub, LinkedIn, Twitter)
│   ├── skills.ts                 # Skills data (5 categories, 24 skills)
│   ├── projects.ts               # Projects data (5 projects, 3 featured)
│   └── experience.ts             # Experience / education data (3 entries)
├── lib/
│   ├── cn.ts                     # Tailwind merge utility (clsx + tailwind-merge)
│   └── hooks/
│       └── useIntersectionObserver.ts  # Shared viewport visibility hook
├── tailwind.config.ts            # Tailwind configuration
├── next.config.mjs               # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
└── postcss.config.mjs            # PostCSS configuration
```

## 🎨 Sections

1. **Hero** — Greeting, tagline, and CTA buttons with an interactive 3D dotted wave background
2. **About** — Bio with interactive 3D cube mascot, interests, quick facts, and Spotify Now Playing widget
3. **Projects** — Featured and non-featured project cards with tech stack badges and tilt effect
4. **Skills** — Skills grouped by category (Languages, Frameworks, AI/ML, Databases, Tools) with an inline GitHub contribution graph
5. **Experience** — Education, open-source contributions, hackathon participation
6. **Contact** — Centered contact form with auto-expanding message textarea + social links (GitHub, LinkedIn, Twitter)

## ⚡ Performance Optimizations

- **Viewport-aware 3D rendering** — The Three.js canvas (`frameloop`) switches to `"demand"` when the hero scrolls off-screen, eliminating unnecessary GPU work
- **Viewport-aware star field** — The canvas-based `StarField` animation cancels its `requestAnimationFrame` loop when not visible, saving CPU cycles
- **Shared `useIntersectionObserver` hook** — A reusable `lib/hooks/useIntersectionObserver.ts` powers both optimizations with a single `IntersectionObserver` per component
- **Responsive DPR** — Canvas device pixel ratio is capped at 2x to balance quality and performance

## 📊 GitHub Integration

The GitHub contribution graph uses the **GitHub GraphQL API** (`contributionsCollection`) to fetch data for any year from 2008 to the current year. The calendar renders 52–53 weeks depending on the year.

- **Multi-year selector** — Buttons let you switch between the last 5 years
- **Contribution cells** — GitHub's original green palette (`#006d32` → `#56d364`) for both dark and light modes
- **Stats row** — Shows total repositories, stars, and contributions for the selected year
- **Responsive** — Scrollable on smaller screens via `overflow-x-auto`

### Required Token Scope

`GITHUB_TOKEN` only needs **public read access** — no special OAuth scopes required for public repos and contributions.

## 🎵 Spotify / Last.fm Integration

The `SpotifyNowPlaying` component shows your currently playing track by connecting to the **Last.fm API** (which scrobbles from Spotify).

1. Connect your Spotify account to [Last.fm](https://www.last.fm/settings/applications)
2. Get a Last.fm API key from [last.fm/api](https://www.last.fm/api/account/create)
3. Set `LASTFM_API_KEY` and `LASTFM_USERNAME` in `.env.local`

The endpoint revalidates every 15 seconds for near real-time updates.

## 📝 Customization

- **Content**: Edit the files in `data/` to update site info, projects, skills, and experience.
- **Colors & Theme**: Adjust CSS variables in `app/globals.css` and Tailwind theme in `tailwind.config.ts`.
- **Fonts**: Change the font in `app/layout.tsx` (currently [Outfit](https://fonts.google.com/specimen/Outfit)).
- **3D Scene**: Modify `components/three/DottedWave.tsx` or swap the scene entirely.
- **GitHub username**: Update the username in `app/api/github/route.ts`.

## 📄 License

No license file is included — feel free to fork and build your own personal website with this as a starting point.

## 🔗 Links

- **Live**: [mayank-joshi-07](https://mayank-joshi-07.vercel.app)
- **GitHub**: [@MAYANKJOSHIcoder](https://github.com/MAYANKJOSHIcoder)
- **LinkedIn**: [Mayank Joshi](https://www.linkedin.com/in/mayank-joshi-a70591271)
- **Twitter**: [@MayankJoshi200](https://x.com/MayankJoshi200)
