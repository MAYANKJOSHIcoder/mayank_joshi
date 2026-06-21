"use client";

import { useEffect, useState } from "react";
import { FaSpotify } from "react-icons/fa";

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumArt?: string;
  songUrl?: string;
}

export function SpotifyNowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpotify = async () => {
      try {
        const res = await fetch("/api/spotify");
        if (res.ok) {
          setData(await res.json());
        }
      } catch {
        // Spotify not configured — fail silently
      } finally {
        setLoading(false);
      }
    };

    fetchSpotify();
    const interval = setInterval(fetchSpotify, 15000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !data) return null;

  const isNowPlaying = data.isPlaying && data.title;

  return (
    <div className="mt-6 flex items-center gap-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
      {data.albumArt ? (
        <img
          src={data.albumArt}
          alt="Album art"
          className="h-12 w-12 rounded-md"
        />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white/10 light:bg-black/10">
          <FaSpotify className="h-6 w-6 text-[var(--foreground)]" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-[var(--muted)]">
          {isNowPlaying ? "Now Playing on Spotify" : "Last Played on Spotify"}
        </p>
        <a
          href={data.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate text-sm font-medium hover:underline block"
        >
          {data.title}
        </a>
        <p className="truncate text-xs text-[var(--muted)]">{data.artist}</p>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <div
          className={`spotify-equalizer ${
            isNowPlaying ? "playing" : "paused"
          }`}
        >
          <span />
          <span />
          <span />
        </div>

        <FaSpotify className="h-5 w-5 text-[var(--muted)]" />
      </div>
    </div>
  );
}
