import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getToken } from 'next-auth/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET ?? '' });
  const { trackIds } = req.query;

  if (!trackIds || !token) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  const accessToken = token.accessToken;

  try {
    const response = await axios.get(`https://api.spotify.com/v1/audio-features?ids=${trackIds}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.status(200).json(response.data.audio_features);
  } catch (error) {
    console.error("Error fetching tracks' audio features:", error);
    return res.status(500).json({ message: 'Error fetching tracks\' audio features' });
  }
}
