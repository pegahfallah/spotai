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
      return NextResponse.json(
        { error: "Unauthorized - No access token found" }, 
        { status: 401 }
      );
    }

    if (!playlist_id) {
      return NextResponse.json(
        { error: "Playlist ID is required" }, 
        { status: 400 }
      );
    }

    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        }
      }
    );

    const tracks = response.data.items.map((item: any) => ({
      id: item.track.id,
      name: item.track.name,
      artists: item.track.artists,
      album: item.track.album,
      duration_ms: item.track.duration_ms
    }));

    return NextResponse.json(tracks);
  } catch (error: any) {
    console.error("Detailed error:", error);
    
    if (axios.isAxiosError(error)) {
      console.error("Spotify API error:", error.response?.data);
      
      if (error.response?.status === 401) {
        return NextResponse.json(
          { error: "Spotify access token expired or invalid" },
          { status: 401 }
        );
      }
      
      return NextResponse.json(
        { 
          error: "Spotify API Error", 
          details: error.response?.data?.error?.message || error.message 
        },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}