import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Simply redirect to the home page
    return NextResponse.redirect('/');
  } catch (error) {
    console.error('Logout error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
