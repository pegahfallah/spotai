'use client';

import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import axios from 'axios';
interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];
}

const Dashboard: React.FC = () => {
  
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>()
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist>();

  useEffect(() => {
    if (session) {
      console.log("Session exists, fetching playlists...");
      axios.get('/api/get-playlists')
        .then((response) => {
          console.log("API response:", response.data);
          const fetchedPlaylists = response.data.playlists.items || [];
          setPlaylists(fetchedPlaylists);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching playlists:', error);
          setError('Failed to load playlists.');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [session]);

  const renderPlaylists = () => {
    if (Array.isArray(playlists) && playlists.length > 0) {
      return playlists.map((p) => (
        <div
          onClick={() => {
            setIsModalOpen(true)
            setSelectedPlaylist(p)
          }}
          className="p-4 bg-gray-900 rounded-md relative hover:cursor-pointer shadow-lg transition-transform transform hover:scale-105"
          key={p.id}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out z-10">
            <span className="text-[#fefae0] text-center text-2xl">{p.name}</span>
          </div>
          {p.images?.length ? (
            <img className="w-64 h-64 object-cover rounded-md" src={p.images[0].url} alt={p.name} />
          ) : (
            <div className="w-full h-64 flex items-center justify-center rounded-md bg-gray-200 text-gray-700 font-bold">
              {p.name}
            </div>
          )}
        </div>
      ));
    }
    return <p className="text-gray-500">No playlists found.</p>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <span className="ml-4 text-xl text-gray-600">Loading playlists...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-red-500 text-white p-4 rounded-md shadow-md">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <p className="text-xl text-gray-600 mb-6">You need to be signed in to view your playlists.</p>
        <button
          className="btn-primary"
          onClick={() => signIn('spotify')}
        >
          Sign in with Spotify
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-5xl mb-8 text-gray-800">Select a Playlist to Analyze</h1>
      {playlists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {renderPlaylists()}
        </div>
      ) : (
        <p className="text-gray-500 text-lg">No playlists available.</p>
      )}
      </div>
    </>
  );
};

export default Dashboard;
