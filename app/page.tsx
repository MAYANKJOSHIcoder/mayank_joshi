import { lazy, Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";

const LazySkills = lazy(() =>
  import("@/components/sections/Skills").then((m) => ({ default: m.Skills }))
);
const LazyExperience = lazy(() =>
  import("@/components/sections/Experience").then((m) => ({ default: m.Experience }))
);
const LazyContact = lazy(() =>
  import("@/components/sections/Contact").then((m) => ({ default: m.Contact }))
);

function SectionFallback() {
  return <div className="min-h-[200px]" />;
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Suspense fallback={<SectionFallback />}>
        <LazySkills />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <LazyExperience />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <LazyContact />
      </Suspense>
    </>
  );
}
