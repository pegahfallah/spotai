import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import NotLoggedIn from './components/NotLoggedIn/NotLoggedIn'
export default async function Home() {
  const session = await getServerSession();
  if (session?.user?.name) {
    redirect('/dashboard');
  }
  return <NotLoggedIn />;
}
