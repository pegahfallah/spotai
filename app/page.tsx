import Image from "next/image";
import Dashboard from './components/Dashboard';
import Album from './components/album'
import { SessionProvider } from "next-auth/react";
import { getServerSession } from 'next-auth'


export default async function Home({ searchParams }: { searchParams: { access_token?: string } }) {
  const session = await getServerSession();

  return (
    <>
      getServerSession result
      {session?.user?.name ? (
        <div>here:{session?.user?.name}</div>
    ) : (<div>Not logged in</div>)}
      {/* <div className="h-[100vh] w-[100vw] flex flex-col items-center justify-center gap-10 overflow-hidden">
        <div className='flex flex-col items-center justify-end align-center gap-y-8 h-full w-full'>
          <h1 className="text-6xl">
            SpotAI
          </h1>
          <p className="text-xl">
            Generate a playlist cover based on your Spotify playlist vibes
          </p> */}
      
 
{/*           
          <div className='flex gap-x-8 mt-12'>
            <Image
              width={180}
              height={80}
              priority
              src='/powered-by-openai.svg'
              alt="Powered by OpenAI"
            />
            <Image
              width={150}
              height={80}
              priority
              src='/spotify_logo.png'
              alt="Spotify Logo"
            />
          </div>
          <div className='relative flex overflow-x-hidden w-full mt-12'>
            <div className="py-12 animate-marquee whitespace-nowrap ">
              <Album urls={['https://media.npr.org/assets/img/2019/12/05/tyler-the-creator-igor_custom-967b87cf7029273e8d6975883b44a31a1d43a26e-s1100-c50.jpg', 'https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg', 'https://www.sleek-mag.com/wp-content/uploads/2016/08/AlbumCovers_Blonde-1200x1200.jpg', 'https://www.highsnobiety.com/static-assets/dato/1682339833-best-album-covers-time-04.jpg', 'https://i.scdn.co/image/ab67616d0000b2734c79d5ec52a6d0302f3add25',]} />
            </div>
            <div className="absolute top-0 py-12 animate-marquee2 whitespace-nowrap">
              <Album urls={['https://media.npr.org/assets/img/2019/12/05/tyler-the-creator-igor_custom-967b87cf7029273e8d6975883b44a31a1d43a26e-s1100-c50.jpg', 'https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg', 'https://www.sleek-mag.com/wp-content/uploads/2016/08/AlbumCovers_Blonde-1200x1200.jpg', 'https://www.highsnobiety.com/static-assets/dato/1682339833-best-album-covers-time-04.jpg', 'https://i.scdn.co/image/ab67616d0000b2734c79d5ec52a6d0302f3add25',]} />
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}