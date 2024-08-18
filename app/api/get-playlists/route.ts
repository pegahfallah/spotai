import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { getToken } from 'next-auth/jwt';


export async function GET(req: NextRequest, res: NextResponse) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET ?? '',
    });

  const accessToken = token?.accessToken;

  console.log('accessToken: ', accessToken);
   if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Make the request to the Spotify API to get the user's playlists
    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch playlists' }, { status: response.status });
    }

    const playlists = await response.json();

    // Return the playlists as a JSON object
    console.log(playlists)
    return NextResponse.json({ playlists }, { status: 200 });
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}