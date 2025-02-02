import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from 'next-auth'
import SessionProvider from "./components/SessionProvider/SessionProvider"
import Nav from "./components/Nav/Nav";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotai",
  description: "Discover more about the music you love",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <main>
            <Nav />
            {children}
          </main>
          <footer className="bg-black py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-400">
              © 2024 SpotAI. Discover more about the music you love.
            </p>
          </div>
        </footer>
        </SessionProvider>
      </body>
    </html>
  );
}
