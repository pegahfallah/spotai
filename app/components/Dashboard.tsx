// components/Dashboard.tsx
import { useState } from 'react';
import axios from 'axios';

interface DashboardProps {
  access_token: string;
}

const Dashboard: React.FC<DashboardProps> = ({ access_token }) => {
  const [query, setQuery] = useState('');
  const [playlist, setPlaylist] = useState<any>(null);

  const createPlaylist = async () => {
    try {
      const response = await axios.get('/api/create-playlist', {
        params: { query, access_token },
      });
      setPlaylist(response.data);
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

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
      <h1 className="text-6xl">SpotAI Dashboard</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter theme"
        className="mt-4 p-2 border"
      />
      <button onClick={createPlaylist} className="mt-4 p-2 bg-blue-500 text-white">
        Create Playlist
      </button>
      {playlist && (
        <div className="mt-8">
          <h2>{playlist.name}</h2>
          <ul>
            {playlist.tracks.items.map((item: any) => (
              <li key={item.track.id}>{item.track.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
