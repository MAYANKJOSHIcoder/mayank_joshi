import { NextResponse } from "next/server";

const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
const LASTFM_USERNAME = process.env.LASTFM_USERNAME;

export async function GET() {
  if (!LASTFM_API_KEY || !LASTFM_USERNAME) {
    return NextResponse.json({ isPlaying: false });
  }

  try {
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`,
      { next: { revalidate: 15 } }
    );

    if (!res.ok) {
      return NextResponse.json({ isPlaying: false });
    }

    const data = await res.json();

    if (data.error || !data.recenttracks?.track?.length) {
      return NextResponse.json({ isPlaying: false });
    }

    const track = data.recenttracks.track[0];

    // Last.fm returns "@attr": { "nowplaying": "true" } when currently playing
    const isNowPlaying = track["@attr"]?.nowplaying === "true";

    // Album art: Last.fm returns images in sizes: small, medium, large, extralarge
    const albumArt =
      track.image?.find(
        (img: { size: string; "#text": string }) => img.size === "extralarge"
      )?.["#text"] ||
      track.image?.find(
        (img: { size: string; "#text": string }) => img.size === "large"
      )?.["#text"] ||
      undefined;

    const artistName = track.artist?.["#text"] || "Unknown Artist";
    const spotifySearchUrl = `https://open.spotify.com/search/${encodeURIComponent(`${track.name} ${artistName}`)}`;

    return NextResponse.json({
      isPlaying: isNowPlaying,
      title: track.name,
      artist: artistName,
      albumArt,
      songUrl: spotifySearchUrl,
    });
  } catch {
    return NextResponse.json({ isPlaying: false });
  }
}
