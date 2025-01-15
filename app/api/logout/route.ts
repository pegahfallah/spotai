import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.redirect('https://spotai-delta.vercel.app/'); 
  } catch (error) {
    console.error('Logout error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
