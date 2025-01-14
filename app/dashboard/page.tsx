// app/dashboard/page.tsx (Server Component)
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ClientDashboard from "../ClientDashboard/page";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    redirect('/');
  }

  const accessToken = session.user.accessToken;

  const response = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const playlists = await response.json();

  return <ClientDashboard playlists={playlists.items} />;
}
