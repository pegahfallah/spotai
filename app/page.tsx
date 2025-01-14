import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Lightbulb, BookOpen, History, Music, MessageCircle, Album } from "lucide-react";

export default async function Home() {
  const session = await getServerSession();
  if (session?.user?.name) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <Album className="h-12 w-12 text-green-400 mr-3" />
            <h1 className="text-5xl font-bold">SpotAI</h1>
          </div>
          <p className="text-2xl text-gray-300 mt-4 max-w-3xl mx-auto">
            Discover the untold stories behind your favorite music. Let AI uncover the cultural impact, 
            hidden meanings, and creative journeys that made your most-loved tracks legendary.
          </p>
          <div className="mt-8">
            <a
              href="/api/auth/signin"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-black bg-green-400 hover:bg-green-500 transition-colors duration-200"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Uncover Your Music&lsquo;s Story
            </a>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors duration-200">
            <Lightbulb className="h-10 w-10 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Song Stories</h3>
            <p className="text-gray-400">
              Learn what inspired your favorite artists, the meaning behind their lyrics, and how these 
              songs came to life. Every track has a story waiting to be told.
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors duration-200">
            <History className="h-10 w-10 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Cultural Impact</h3>
            <p className="text-gray-400">
              Explore how your music shaped generations, influenced movements, and became the soundtrack 
              to pivotal moments in history.
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors duration-200">
            <MessageCircle className="h-10 w-10 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Behind the Music</h3>
            <p className="text-gray-400">
              Dive deep into the creative process, studio sessions, and personal experiences that shaped 
              your favorite artists and their music.
            </p>
          </div>
        </div>
      </div>

      {/* Example Stories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Stories You&apos;ll Discover</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-colors duration-200">
            <Music className="h-8 w-8 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">The Story Behind the Songs</h3>
            <p className="text-gray-300 mb-4">
              &quot;Did you know your favorite track was written in just 30 minutes? Or that the iconic guitar 
              riff came from a dream? Get fascinating insights about how the music you love came to be.&quot;
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-colors duration-200">
            <Album className="h-8 w-8 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Artist&lsquo;s Journey</h3>
            <p className="text-gray-300 mb-4">
              &quot;From garage band practices to sold-out stadiums, understand the journey your favorite artists 
              took and the experiences that shaped their music.&quot;
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Start Your Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-400">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Connect</h3>
            <p className="text-gray-400">Link your Spotify account</p>
          </div>
          
          <div className="text-center">
            <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-400">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Choose</h3>
            <p className="text-gray-400">Select any song from your library</p>
          </div>
          
          <div className="text-center">
            <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-400">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Discover</h3>
            <p className="text-gray-400">Explore its unique story</p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gray-800 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Cultured?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Connect with Spotify and start discovering the fascinating stories behind your music.
          </p>
          <a
            href="/api/auth/signin"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-black bg-green-400 hover:bg-green-500 transition-colors duration-200"
          >
            Start Exploring
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 SpotAI. Making you an expert in the music you love.</p>
        </div>
      </footer>
    </div>
  );
}