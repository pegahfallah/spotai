
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Lightbulb, BookOpen, History, Music, MessageCircle, Album } from "lucide-react";

// Example of Tailwind-based animations:
// 1. Add `animate-bounce`, `hover:scale-105`, or `animate-pulse` to elements.
// 2. Optionally, install additional plugins or use libraries like Framer Motion for more control.

export default async function Home() {
  const session = await getServerSession();
  if (session?.user?.name) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Hero / Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        {/* Animated Title */}
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-5xl font-bold">SpotAI</h1>
        </div>
        
        {/* Simplified subheading */}
        <p className="text-xl text-gray-300 mt-4 max-w-3xl mx-auto">
          Let AI reveal hidden insights and stories behind your favorite tracks.
        </p>
        
        {/* CTA Button */}
        <div className="mt-8 animate-pulse">
          <a
            href="/api/auth/signin"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-black bg-green-400 hover:bg-green-500 transition-transform duration-200 hover:scale-105"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Uncover Your Music&apos;s Story
          </a>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Feature Card */}
        <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors duration-200 hover:scale-105">
          <Lightbulb className="h-10 w-10 text-green-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Song Inspiration</h3>
          <p className="text-gray-400">
            Discover the inspiration behind your favorite songs and what drove artists to create them.
          </p>
        </div>

        {/* Feature Card */}
        <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors duration-200 hover:scale-105">
          <History className="h-10 w-10 text-green-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Music History</h3>
          <p className="text-gray-400">
            Explore your tracks’ cultural footprint and how they shaped the music scene.
          </p>
        </div>

        {/* Feature Card */}
        <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors duration-200 hover:scale-105">
          <MessageCircle className="h-10 w-10 text-green-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Behind the Scenes</h3>
          <p className="text-gray-400">
            Go inside the studio and see the process behind those iconic moments in your playlist.
          </p>
        </div>
      </div>

      {/* Stories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">What You&apos;ll Discover</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-xl p-8 transition-transform duration-200 hover:scale-105">
            <Music className="h-8 w-8 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">The Story Behind the Songs</h3>
            <p className="text-gray-300 mb-4">
              Get surprising facts about how music is composed, recorded, and remembered.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 transition-transform duration-200 hover:scale-105">
            <Album className="h-8 w-8 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Artist Journeys</h3>
            <p className="text-gray-300 mb-4">
              From humble beginnings to world tours, see the growth and grit behind your favorite bands.
            </p>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Start Your Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="hover:scale-105 bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-400">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Connect</h3>
            <p className="text-gray-400">Link your Spotify account</p>
          </div>

          <div className="text-center">
            <div className="hover:scale-105 bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-400">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Select</h3>
            <p className="text-gray-400">Pick a song from your library</p>
          </div>

          <div className="text-center">
            <div className="hover:scale-105 bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-400">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Discover</h3>
            <p className="text-gray-400">Uncover its unique story</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Explore?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Connect with Spotify and unveil the stories behind your playlists.
          </p>
          <a
            href="/api/auth/signin"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-black bg-green-400 hover:bg-green-500 transition-transform duration-200 hover:scale-105"
          >
            Start Now
          </a>
        </div>
      </div>
    </div>
  );
}
