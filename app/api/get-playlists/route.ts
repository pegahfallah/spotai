import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const access_token = searchParams.get('access_token') || '';

  if (!access_token) {
    return new NextResponse('Access token is missing', { status: 400 });
  }

  try {
    const userResponse = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const userId = userResponse.data.id;

    const playlistsResponse = await axios.get(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    console.log('hi')
   console.log(NextResponse.json(playlistsResponse.data))

    return NextResponse.json(playlistsResponse.data);
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
