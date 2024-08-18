'use client';
import { useEffect, useState, Key, ReactElement, JSXElementConstructor, ReactNode } from 'react';
import axios from 'axios';
import { useSession, signIn, signOut } from 'next-auth/react';
import { getServerSession } from 'next-auth';

interface DashboardProps {
  access_token?: string;
}

interface Playlist {
  id: Key;
  name: string;
  images: { url: string }[];
}

const Dashboard: React.FC<DashboardProps> = () => {
 const [name, setName] = useState<string>()

  useEffect(() => {
      fetch('/api/whoAmI')
      .then((res) => res.json())
          .then((data) => setName(data.name));
  },[])

  const [query, setQuery] = useState('');
  const [playlists, setPlaylists] = useState<Playlist[] | null>(null);

const renderPlaylists = () => {
  return playlists?.map((p) => (
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
      {p.images.length ? (
        // eslint-disable-next-line @next/next/no-img-element
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
          params: {
            
          },
        });
        setPlaylists(response.data.items); // Assuming response.data.items is an array of playlists
        console.log('Fetched playlists:', response.data.items);
      } catch (error) {
        console.error('Error getting playlists:', error);
      }
    };

    getPlaylists();
  }, []);

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
      {name}
     
      <button onClick={logout} className="mt-8 p-2 bg-red-500 text-white">
        Logout
      </button>
    </div>
  );
};

  // return (
  //   <>
  //     Not signed in
  //     <button className='bg-red'>hiiiiii</button>
  //     hi
  //     <button className='btn-primary' onClick={() => signIn('spotify')}>Sign in with Spotify</button>
  //   </>
  // );

  //  {playlists ? (
  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //         {/* {renderPlaylists()}
          
  //         */}
  //       </div>
  //     ) : (
  //       <p>Loading playlists...</p>
  //     )}


export default Dashboard;
