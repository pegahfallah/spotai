import { useEffect, useState, Key, ReactElement, JSXElementConstructor, ReactNode } from 'react';
import axios from 'axios';

interface DashboardProps {
  access_token: string;
}

interface Playlist {
  id: Key;
  name: string;
  images: { url: string }[];
}

const Dashboard: React.FC<DashboardProps> = ({ access_token }) => {
  const [query, setQuery] = useState('');
  const [playlists, setPlaylists] = useState<Playlist[] | null>(null);

  const renderPlaylists = () => {
    return playlists?.map((p) => (
      <div
        onClick={() => {
          // Handle playlist selection or other actions
        }}
        className="p-2 rounded-md hover:shadow-custom transition duration-150 ease-in-out relative cursor-pointer"
        key={p.id}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <span className="text-[#fefae0] text-center text-2xl">{p.name}</span>
        </div>
        {p.images.length ? (
          <img className="w-full h-full rounded-md" src={p.images[0].url} alt={p.name} />
        ) : (
          <div className="w-full h-full flex items-center justify-center rounded-md bg-gray-200">No Image</div>
        )}
      </div>
    ));
  };

  useEffect(() => {
    const getPlaylists = async () => {
      try {
        const response = await axios.get('/api/get-playlists', {
          params: { access_token },
        });
        setPlaylists(response.data.items); // Assuming response.data.items is an array of playlists
        console.log('Fetched playlists:', response.data.items);
      } catch (error) {
        console.error('Error getting playlists:', error);
      }
    };

    getPlaylists();
  }, [access_token]);

  const logout = async () => {
    try {
      await axios.get('/api/logout');
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1 className="text-6xl mb-8">SpotAI Dashboard</h1>
      {playlists ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderPlaylists()}
        </div>
      ) : (
        <p>Loading playlists...</p>
      )}
      <button onClick={logout} className="mt-8 p-2 bg-red-500 text-white">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
