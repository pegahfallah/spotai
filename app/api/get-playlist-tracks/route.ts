import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getToken } from 'next-auth/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET ?? '' });
  const { playlistId } = req.query;

  if (!playlistId || !token) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  const accessToken = token.accessToken;

  try {
    const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const trackIds = response.data.items.map((item: { track: { id: any; }; }) => item.track.id).join(',');
    return res.status(200).json(trackIds);
  } catch (error) {
    console.error("Error fetching playlist tracks:", error);
    return res.status(500).json({ message: 'Error fetching playlist tracks' });
  }
}
