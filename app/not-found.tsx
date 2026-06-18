import Link from "next/link";
import { FaHome, FaMeteor } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <FaMeteor className="h-16 w-16 text-[var(--muted)] animate-pulse" />
        </div>
        <h1 className="text-8xl font-bold gradient-text">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Lost in Space</h2>
        <p className="mt-2 text-[var(--muted)] max-w-md mx-auto">
          Oops! The page you&apos;re looking for has drifted off into the cosmos.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-black text-white px-6 py-3 mt-8 text-sm font-medium transition-all hover:bg-gray-800 light:bg-white light:text-black light:hover:bg-gray-200"
        >
          <FaHome className="h-4 w-4" />
          Return Home
        </Link>
      </div>
    </div>
  );
}
