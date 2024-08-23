'use client'

import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'


const ACTIVE = ' py-1 px-2 text-blue'
const INACTIVE = ' py-1 px-2'

function AuthButton() {
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
            <button className='btn-primary' onClick={()=> signIn()}>Sign In</button>
        </>
    )
}

export default function Nav() {
    const pathname = usePathname()
    return (
        <div className='absolute top-0 right-0'>
            <AuthButton />
            <ul>
                <Link href='/'>
                    <li className={pathname === '/' ? ACTIVE : INACTIVE}>
                        Home
                    </li>
                </Link>
                 <Link href='/protected'>
                    <li className={pathname === '/' ? ACTIVE : INACTIVE}>
                        Protected route
                    </li>
                </Link>  
                <Link href='/serverAction'>
                    <li className={pathname === '/' ? ACTIVE : INACTIVE}>
                        serverAction
                    </li>
                </Link>
                <Link href='/apiFromClient'>
                    <li className={pathname === '/' ? ACTIVE : INACTIVE}>
                        apiFromClient
                    </li>
                </Link>
                <Link href='/apiFromServer'>
                    <li className={pathname === '/' ? ACTIVE : INACTIVE}>
                        apifromserver
                    </li>
                </Link>
            </ul>
        </div>
    )
}