/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

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

interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];
  tracks: Track[];
}

export default function ClientDashboard({ playlists: initialPlaylists = [] }: { playlists: Playlist[] }) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>(initialPlaylists);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tracksLoaded, setTracksLoaded] = useState<boolean>(false);
  // Keep track of which playlists have had their tracks fetched using an array
  const [fetchedPlaylistIds, setFetchedPlaylistIds] = useState<string[]>([]);

  const fetchPlaylistTracks = async (playlistId: string) => {
    try {
      setIsLoading(true);
      setTracksLoaded(false);
      
      const response = await fetch(`/api/get-tracks?playlist_id=${playlistId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tracks');
      }
      const tracks: Track[] = await response.json();
      setPlaylists(currentPlaylists => 
        currentPlaylists.map(playlist => 
          playlist.id === playlistId 
            ? { ...playlist, tracks }
            : playlist
        )
      );
      
      setSelectedPlaylist(currentSelected => 
        currentSelected?.id === playlistId 
          ? { ...currentSelected, tracks }
          : currentSelected
      );
      
      setFetchedPlaylistIds(prev => [...prev, playlistId]);
      setTracksLoaded(true);
    } catch (error) {
      console.error('Error fetching tracks:', error);
      setTracksLoaded(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnClickPlaylist = async (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    setShowModal(true);

    if (!fetchedPlaylistIds.includes(playlist.id)) {
      await fetchPlaylistTracks(playlist.id);
    } else {
      setTracksLoaded(true);
    }
  };

  const renderTracksList = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    if (!tracksLoaded) {
      return (
        <div className="flex justify-center items-center h-32 text-gray-500">
          Loading playlist tracks...
        </div>
      );
    }

    if (!selectedPlaylist?.tracks?.length) {
      return (
        <div className="flex justify-center items-center h-32 text-gray-500">
          No tracks found in this playlist
        </div>
      );
    }

    return (
      <ul className="space-y-2">
        {selectedPlaylist.tracks.map((track) => (
          <li 
            key={track.id} 
            className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded"
          >
            {track.album.images?.[2]?.url && (
              <img 
                src={track.album.images[2].url} 
                alt={track.name} 
                className="w-10 h-10 object-cover rounded"
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
    );
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

      {showModal && selectedPlaylist && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-4xl relative flex flex-col h-[90vh]">
            <div className="p-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  setTracksLoaded(false);
                }}
                className="absolute top-4 right-4 bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-full p-2 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h2 className="text-2xl font-semibold mb-4">Playlist Details</h2>
              <div className="flex items-start space-x-4">
                {selectedPlaylist.images && selectedPlaylist.images.length > 0 ? (
                  <img
                    className="w-48 h-48 object-cover rounded"
                    src={selectedPlaylist.images[0].url}
                    alt={selectedPlaylist.name}
                  />
                ) : (
                  <div className="w-48 h-48 bg-gray-200 rounded flex items-center justify-center">
                    No image available
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-xl font-medium mb-4">{selectedPlaylist.name}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <h3 className="text-lg font-semibold mb-3 sticky top-0 bg-white py-2">
                {isLoading ? (
                  "Loading tracks..."
                ) : tracksLoaded ? (
                  `Tracks (${selectedPlaylist.tracks?.length || 0})`
                ) : (
                  "Loading playlist details..."
                )}
              </h3>
              {renderTracksList()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}