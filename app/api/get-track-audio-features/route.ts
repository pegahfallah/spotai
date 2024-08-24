import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { getToken } from 'next-auth/jwt';

export default async function handler(req: NextRequest, res: NextResponse) {

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET ?? '',
  });
  const url = new URL(req.url);
  const trackIds = url.searchParams.get('trackIds');


  if (!trackIds || !token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const accessToken = token.accessToken;

  try {
    const response = await axios.get(`https://api.spotify.com/v1/audio-features?ids=${trackIds}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(trackIds, { status: 200 });
  } catch (error) {
    console.error("Error fetching tracks' audio features:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
