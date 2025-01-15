import { NextAuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization:
        'https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private',
    }),
  ],
    secret: process.env.NEXTAUTH_SECRET,
    debug: true, // Enable debug mode
    callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      session.user.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, account }: { token: any; account?: any }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};
