import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import querystring from 'querystring';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const data = querystring.stringify({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token, refresh_token } = response.data;
    const baseUrl = req.nextUrl.origin;
    return NextResponse.redirect(`${baseUrl}/?access_token=${access_token}&refresh_token=${refresh_token}`);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
