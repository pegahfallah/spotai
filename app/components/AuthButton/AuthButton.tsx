
'use client'

import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

const ACTIVE = ' py-1 px-2 text-blue'
const INACTIVE = ' py-1 px-2'

export const AuthButton = () => {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                {session?.user?.name} <br></br>
                <button className='btn-primary' onClick={()=> signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            not signed in <br></br>
            <button className='btn-primary' onClick={()=> signIn()}>Sign In with Spotify</button>
        </>
    )
}