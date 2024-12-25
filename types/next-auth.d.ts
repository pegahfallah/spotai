import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      /** Add any extra properties here **/
      accessToken?: string;
    } & DefaultSession['user'];
  }

  interface JWT {
    /** Add your token properties here **/
    accessToken?: string;
  }
}
