/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];
  generatedImageUrl?: string | null;
}

interface Track {
  id: string;
  name: string;
  artists: Array<{
    id: string;
    name: string;
    uri: string;
  }>;
  album: {
    name: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
  };
  duration_ms: number;
}

export default function ClientDashboard({ playlists = [] }: { playlists: Playlist[] }) {
  
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [tracks, setTracks] = useState<Track[]>([]);

  const handleOnClickPlaylist = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    setShowModal(true);
  };

  
const handleGeneratePlaylist = async () => {
  if (!selectedPlaylist) return;

  setIsGenerating(true);
  try {
    const response = await fetch(`/api/get-tracks?playlist_id=${selectedPlaylist.id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch tracks.");
    }

    const data = await response.json();
    const formattedTracks = data.items.map((item: any) => item.track);
    setTracks(formattedTracks);
  } catch (error) {
    console.error('Error fetching tracks:', error);
  } finally {
    setIsGenerating(false);
  }
};


  return (
    <div className="w-full h-full">
      <h1 className="text-4xl">Your Playlists</h1>
      <div className="grid grid-cols-3 grid-flow-row gap-4">
        {playlists && playlists.length > 0 ? (
          playlists.map((playlist) => (
            <div key={playlist.id} onClick={() => handleOnClickPlaylist(playlist)} className="cursor-pointer">
              {playlist.images && playlist.images.length > 0 ? (
                <img src={playlist.images[0].url} alt={playlist.name} />
              ) : (
                <div>No image available</div>
              )}
              <div>{playlist.name}</div>
            </div>
          ))
        ) : (
          <div>No playlists found.</div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-full p-2 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-semibold mb-4">Playlist Details</h2>
            {selectedPlaylist && (
              <div>
                <p className="mb-4 text-lg">{selectedPlaylist.name}</p>
                {selectedPlaylist.images && selectedPlaylist.images.length > 0 ? (
                  <img
                    className="w-48 h-48 object-cover mb-4"
                    src={selectedPlaylist.images[0].url}
                    alt={selectedPlaylist.name}
                  />
                ) : (
                  <p>No image available</p>
                )}
              </div>
            )}
            <button
              onClick={handleGeneratePlaylist}
              className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full ${
                isGenerating ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Get Tracks"}
            </button>
          </div>
        </div>
      )}

  {tracks && tracks.length > 0 && (
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Tracks:</h3>
        <ul className="space-y-2">
          {tracks.map((track) => (
            <li key={track.id} className="flex items-center space-x-2">
              {track.album.images?.[2]?.url && (
                <img 
                  src={track.album.images[2].url} 
                  alt={track.name} 
                  className="w-8 h-8 object-cover"
                />
              )}
              <div>
                <div className="font-medium">{track.name}</div>
                <div className="text-sm text-gray-600">
                  {track.artists.map(artist => artist.name).join(", ")}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )}
    </div>
  );
}
