import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const query = searchParams.get('query') || '';
  const access_token = searchParams.get('access_token') || '';

  // Search for tracks based on the query
  const searchResponse = await axios.get('https://api.spotify.com/v1/search', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    params: {
      q: query,
      type: 'track',
    },
  });

  const tracks = searchResponse.data.tracks.items;

  // Create a playlist
  const userResponse = await axios.get('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const userId = userResponse.data.id;

  const playlistResponse = await axios.post(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    { name: `Playlist for ${query}`, description: `Playlist created with theme: ${query}`, public: true },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const playlistId = playlistResponse.data.id;

  // Add tracks to the playlist
  await axios.post(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    { uris: tracks.map((track: any) => track.uri) },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const finalPlaylist = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return NextResponse.json(finalPlaylist.data);
}
