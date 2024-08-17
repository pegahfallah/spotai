import { NextRequest, NextResponse } from 'next/server';
import querystring from 'querystring';

export async function GET(req: NextRequest) {
  const scope = 'user-read-private user-read-email playlist-modify-public';
  const redirectUrl = 'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: scope,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    });
  return NextResponse.redirect(redirectUrl);
}
