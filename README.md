# Mayank Joshi — Portfolio Website

> The personal portfolio of Mayank Joshi — CS student, AI/ML enthusiast, and builder from New Delhi.

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.184-000000?logo=three.js)](https://threejs.org/)

## ✨ Features

- **3D Hero Scene** — Interactive Three.js/R3F dotted wave animation
- **Dark/Light Theme** — System-aware theme toggle with `next-themes`
- **Animated Star Field** — Decorative particle background
- **Smooth Animations** — Framer Motion-powered transitions and scroll reveals
- **Blog** — MDX-based blog with syntax highlighting
- **Projects Showcase** — Tech stack tags, live/demo links, and featured highlights
- **Skills Overview** — Categorized skill badges with proficiency levels
- **Experience Timeline** — Chronological career/education timeline
- **Contact Form** — Powered by Resend (optional)
- **Spotify Now Playing** — Live Spotify status via the Spotify API (optional)
- **GitHub Activity Graph** — Contributions visualization (optional)
- **SEO Optimized** — Open Graph, Twitter cards, `sitemap.xml`, `robots.ts`
- **Vercel Analytics & Speed Insights** — Built-in performance monitoring

## 🛠 Tech Stack

| Layer              | Technology                                      |
| ------------------ | ----------------------------------------------- |
| Framework          | [Next.js 14](https://nextjs.org/) (App Router)  |
| Language           | [TypeScript](https://www.typescriptlang.org/)   |
| Styling            | [Tailwind CSS](https://tailwindcss.com/)        |
| 3D Graphics        | [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) + [Drei](https://github.com/pmndrs/drei) |
| Animation          | [Framer Motion](https://www.framer.com/motion/) |
| Icons              | [React Icons](https://react-icons.github.io/react-icons/) |
| Blog               | [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) |
| Theme Management   | [next-themes](https://github.com/pacocoursey/next-themes) |
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

Most features work out of the box. The following are **optional** integrations:

| Variable               | Purpose                  |
| ---------------------- | ------------------------ |
| `SPOTIFY_CLIENT_ID`    | Spotify Now Playing      |
| `SPOTIFY_CLIENT_SECRET` | Spotify Now Playing      |
| `SPOTIFY_REFRESH_TOKEN` | Spotify Now Playing      |
| `GITHUB_TOKEN`         | GitHub Stats / Graph     |
| `RESEND_API_KEY`       | Contact Form             |
| `CONTACT_EMAIL`        | Contact Form recipient   |

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
├── app/                       # Next.js App Router
│   ├── layout.tsx             # Root layout (fonts, providers, metadata)
│   ├── page.tsx               # Home page (section composition)
│   ├── globals.css            # Global styles + CSS variables
│   ├── loading.tsx            # Loading state
│   ├── not-found.tsx          # 404 page
│   ├── og/                    # Open Graph image generation
│   ├── blog/                  # Blog pages (MDX)
│   ├── robots.ts              # Robots.txt generator
│   └── sitemap.ts             # Sitemap generator
├── components/
│   ├── layout/                # Global layout wrappers (Providers)
│   ├── sections/              # Page sections
│   │   ├── Hero.tsx           # Hero with 3D scene
│   │   ├── About.tsx          # About / bio
│   │   ├── Projects.tsx       # Projects grid
│   │   ├── Skills.tsx         # Skills categorized list
│   │   ├── Experience.tsx     # Experience timeline
│   │   └── Contact.tsx        # Contact form
│   ├── three/                 # Three.js / R3F scenes
│   │   ├── Scene.tsx          # R3F canvas wrapper
│   │   └── DottedWave.tsx     # Dotted wave mesh
│   └── ui/                    # Reusable UI components
│       ├── Navbar.tsx         # Navigation bar
│       ├── Footer.tsx         # Footer
│       ├── StarField.tsx      # Animated star particles
│       ├── SplashScreen.tsx   # Intro splash screen
│       ├── ThemeToggle.tsx    # Dark/light toggle
│       ├── ScrollProgress.tsx # Reading progress bar
│       ├── Button.tsx         # Reusable button
│       ├── SectionHeading.tsx # Section title component
│       ├── ProjectCard.tsx    # Project card with tilt
│       ├── SkillBadge.tsx     # Skill pill/badge
│       ├── TimelineItem.tsx   # Timeline entry
│       ├── GitHubGraph.tsx    # GitHub contribution graph
│       └── SpotifyNowPlaying.tsx # Current Spotify track
├── data/
│   ├── site.config.ts         # Site-wide metadata
│   ├── socials.ts             # Social media links
│   ├── skills.ts              # Skills data
│   ├── projects.ts            # Projects data
│   └── experience.ts          # Experience / education data
├── lib/
│   └── cn.ts                  # Tailwind merge utility
├── public/
│   └── images/                # Static assets
├── tailwind.config.ts         # Tailwind configuration
├── next.config.mjs            # Next.js configuration
├── tsconfig.json              # TypeScript configuration
└── postcss.config.mjs         # PostCSS configuration
```

## 🎨 Sections

1. **Hero** — Greeting, tagline, and CTA buttons with an interactive 3D dotted wave background
2. **About** — Bio, interests (AI/ML, Gaming, Photography/Art), quick facts
3. **Projects** — Featured and non-featured project cards with tech stack badges
4. **Skills** — Skills grouped by category (Languages, Frameworks, AI/ML, Databases, Tools)
5. **Experience** — Education, open-source contributions, hackathon participation
6. **Contact** — Contact form + social links (GitHub, LinkedIn, Twitter)

## 📝 Customization

- **Content**: Edit the files in `data/` to update site info, projects, skills, and experience.
- **Colors & Theme**: Adjust CSS variables in `app/globals.css` and Tailwind theme in `tailwind.config.ts`.
- **Fonts**: Change the font in `app/layout.tsx` (currently [Outfit](https://fonts.google.com/specimen/Outfit)).
- **3D Scene**: Modify `components/three/DottedWave.tsx` or swap the scene entirely.

## 📄 License

[MIT](LICENSE) — feel free to fork and build your own portfolio with this as a starting point.

## 🔗 Links

- **Live**: [mayank.vercel.app](https://mayank.vercel.app)
- **GitHub**: [@MAYANKJOSHIcoder](https://github.com/MAYANKJOSHIcoder)
- **LinkedIn**: [Mayank Joshi](https://www.linkedin.com/in/mayank-joshi-a70591271)
- **Twitter**: [@MayankJoshi200](https://x.com/MayankJoshi200)
