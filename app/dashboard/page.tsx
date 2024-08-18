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
            // Handle playlist selection or other actions
          }}
          className="p-2 rounded-md relative hover:cursor-pointer" 
          key={p.id}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out z-10">
            <span className="text-[#fefae0] text-center text-2xl">{p.name}</span>
          </div>
          {p.images?.length ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="w-full h-full rounded-md" src={p.images[0].url} alt={p.name} />
          ) : (
            <div className="w-full h-full flex items-center justify-center rounded-md bg-gray-200">No Image</div>
          )}
        </div>
      ));
    }
    return <p>No playlists found.</p>;
  };

  if (loading) {
    return <div>Loading playlists...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-24">
        <h1 className="text-6xl mb-8">SpotAI Dashboard</h1>
        <p className="text-2xl mb-4">You need to be signed in to view your playlists.</p>
        <button className="btn-primary" onClick={() => signIn('spotify')}>Sign in with Spotify</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1 className="text-6xl mb-8">SpotAI Dashboard</h1>
      {playlists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderPlaylists()}
        </div>
      ) : (
        <p>No playlists available.</p>
      )}
    </div>
  );
};

export default Dashboard;
