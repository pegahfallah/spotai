import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const playlist_id = searchParams.get("playlist_id");
    const session = await getServerSession(authOptions);
    
    console.log("API Route - Playlist ID:", playlist_id);
    console.log("API Route - Session:", session);

    if (!session?.user?.accessToken) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!playlist_id) {
      return new NextResponse("Playlist ID is required", { status: 400 });
    }

    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        params: {
          limit: 5,
        },
      }
    );

    console.log(response.data)
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Detailed error:", error);
    if (axios.isAxiosError(error)) {
      console.error("Spotify API error:", error.response?.data);
    }
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error", details: error.message }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}