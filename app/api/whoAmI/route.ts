// API GET request as a JSON object 
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import { getToken } from 'next-auth/jwt'

export async function GET(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET ?? '',
    })

    console.log('token.accessToken: ', token?.accessToken)

    return NextResponse.json({})
}