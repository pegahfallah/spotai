/* eslint-disable @next/next/no-img-element */
"use client";

interface Playlist {
  id: string;
  name: string;
  images: { url: string }[]; // Explicit type for better type safety
}

export default function ClientDashboard({ playlists }: { playlists: Playlist[] }) {
  console.log(playlists);
  return (
    <div>
      <h1>Your Playlists</h1>
      {playlists && playlists.length > 0 ? (
        playlists.map((playlist) => (
          <div key={playlist.id}>
            {playlist.images && playlist.images.length > 0 ? (
              <img src={playlist.images[0].url} alt={playlist.name} />
            ) : (
              <div>No image available</div> // Optional: handle cases with no images
            )}
            <div>{playlist.name}</div>
          </div>
        ))
      ) : (
        <div>No playlists found.</div>
      )}
    </div>
  );
}
