import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { moodDescription, playlistName } = req.body;

  if (!moodDescription || !playlistName) {
    return res.status(400).json({ message: 'Missing moodDescription or playlistName' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt: `image with this mood: ${moodDescription}. ${playlistName} creative.`,
        n: 1,
        size: "1024x1024",
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const imageUrl = response.data.data[0].url;
    return res.status(200).json({ imageUrl });

  } catch (error) {
    console.error("Error generating image:", error);
    return res.status(500).json({ message: 'Error generating image'});
  }
}
