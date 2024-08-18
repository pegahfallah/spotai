import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { getServerSession } from "next-auth";
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
  // Retrieve the user's session
  const session = await getServerSession(authOptions);

  if (!session) {
    // If there's no session, return an unauthorized response
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = req.nextUrl;
  const query = searchParams.get('query') || '';

  // Extract the access token from the session
  const access_token = session.accessToken as string;

  try {
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

    // Get the user's Spotify ID
    const userResponse = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const userId = userResponse.data.id;

    // Create a new playlist for the user
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

    // Add tracks to the newly created playlist
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

    // Fetch and return the final playlist details
    const finalPlaylist = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return NextResponse.json(finalPlaylist.data);
  } catch (error) {
    console.error('Error creating playlist:', error);
    return NextResponse.json({ error: 'Failed to create playlist' }, { status: 500 });
  }
}
