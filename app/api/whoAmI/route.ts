// API GET request as a JSON object 
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET() {
    const session = await getServerSession(authOptions)
    console.log(session)
    return NextResponse.json({name:session?.user?.name ?? 'not logged in'})
}