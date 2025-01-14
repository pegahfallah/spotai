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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
          </div>
        );
      }

      if (!tracksLoaded) {
        return (
          <div className="flex justify-center items-center h-32 text-gray-400">
            Loading playlist tracks...
          </div>
        );
      }

      if (!selectedPlaylist?.tracks?.length) {
        return (
          <div className="flex justify-center items-center h-32 text-gray-400">
            No tracks found in this playlist
          </div>
        );
      }

      return (
        <ul className="space-y-2">
          {selectedPlaylist.tracks.map((track) => (
            <li
              key={track.id}
              className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded transition-colors duration-200"
            >
              {track.album.images?.[2]?.url && (
                <img
                  src={track.album.images[2].url}
                  alt={track.name}
                  className="w-10 h-10 object-cover rounded shadow-sm"
                />
              )}
              <div className="flex-1">
                <div className="font-medium text-white">{track.name}</div>
                <div className="text-sm text-gray-400">
                  {track.artists.map(artist => artist.name).join(", ")}
                </div>
              </div>
            </li>
          ))}
        </ul>
      );
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white mb-8">Your Playlists</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {playlists && playlists.length > 0 ? (
              playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  onClick={() => handleOnClickPlaylist(playlist)}
                  className="group cursor-pointer bg-gray-800 rounded-lg hover:bg-gray-750 transition-all duration-200 overflow-hidden"
                >
                  <div className="aspect-square relative">
                    {playlist.images && playlist.images.length > 0 ? (
                      <img
                        src={playlist.images[0].url}
                        alt={playlist.name}
                        className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-200"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-400">No image available</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors duration-200 line-clamp-2">
                      {playlist.name}
                    </h3>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 py-12">
                No playlists found.
              </div>
            )}
          </div>

          {showModal && selectedPlaylist && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
              <div className="bg-gray-900 rounded-xl shadow-2xl w-11/12 max-w-4xl relative flex flex-col h-[90vh] border border-gray-800">
                <div className="p-6 border-b border-gray-800">
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setTracksLoaded(false);
                    }}
                    className="absolute top-4 right-4 text-gray-400 hover:text-green-400 rounded-full p-2 hover:bg-gray-800 transition-colors duration-200 focus:outline-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="flex items-start space-x-6">
                    {selectedPlaylist.images && selectedPlaylist.images.length > 0 ? (
                      <img
                        className="w-48 h-48 object-cover rounded-lg shadow-md"
                        src={selectedPlaylist.images[0].url}
                        alt={selectedPlaylist.name}
                      />
                    ) : (
                      <div className="w-48 h-48 bg-gray-800 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400">No image available</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-2">Playlist Details</h2>
                      <p className="text-xl text-gray-300">{selectedPlaylist.name}</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 pb-6">
                  <h3 className="text-lg font-semibold sticky top-0 bg-gray-900 py-4 mb-3 border-b border-gray-800 text-white">
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
      </div>
    );
  }
