import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const trackName = searchParams.get('trackName');
  const artistName = searchParams.get('artistName');

  if (!trackName || !artistName) {
    return NextResponse.json({ error: 'Missing trackName or artistName' }, { status: 400 });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Give factual information about the artist (name, where they are from, genre) to help the user become more cultured about music and the history.',
        },
        {
          role: 'user',
          content: `Give me a information about the song "${trackName}" by "${artistName}".`,
        },
      ],
      temperature: 1.0,
    });

    const story = response.choices[0]?.message?.content || 'No story generated.';
    return NextResponse.json({ story }, { status: 200 });
  } catch (error) {
    console.error('Error fetching story from OpenAI:', error);
    return NextResponse.json({ error: 'Error fetching story from OpenAI' }, { status: 500 });
  }
}
