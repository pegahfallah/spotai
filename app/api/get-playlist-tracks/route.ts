import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { getToken } from 'next-auth/jwt';

export async function GET(req: NextRequest) {
  // Retrieve the JWT token from the request
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET ?? '',
  });

  // Extract the playlistId from the URL query parameters
  const url = new URL(req.url);
  const playlistId = url.searchParams.get('playlistId');

  // If there is no token or playlistId, return an error response
  if (!token || !playlistId) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  const accessToken = token.accessToken;

  // Log the access token for debugging purposes
  console.log('accessToken: ', accessToken);

  // If no access token is available, return an unauthorized response
  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Make a request to the Spotify API to get playlist tracks
    const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Extract and map the track IDs from the response
      const trackIds = response.data.items.map((item: { track: { id: any } }) => item.track.id).join(',');
      console.log(trackIds)
    // Return the track IDs as a JSON response
    return NextResponse.json(trackIds, { status: 200 });
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error fetching playlists:', error);

    // Return a generic internal server error response
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
