'use client'

import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { Music, LogOut, LogIn } from 'lucide-react'

function AuthButton() {
    const { data: session } = useSession()
    
    if (session) {
        return (
            <div className="flex items-center gap-4">
                <div className="text-gray-400 text-sm">{session?.user?.name}</div>
                <button 
                    onClick={() => signOut()}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors duration-200"
                >
                    <LogOut className="w-4 h-4" />
                    Sign out
                </button>
            </div>
        )
    }
    
    return (
        <button 
            onClick={() => signIn()}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-400 hover:bg-green-500 text-black font-medium transition-colors duration-200"
        >
            <LogIn className="w-4 h-4" />
            Sign In
        </button>
    )
}

export default function Nav() {
    const pathname = usePathname()
    
    const navItems = [
        { path: '/', label: 'Home' },
    ]

    return (
        <nav className="bg-black border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-2">
                        <Music className="h-6 w-8 text-green-400" />
                        <span className="text-white text-xl">SpotAI</span>
                    </div>

                    <div className="hidden md:block">
                        <ul className="flex items-center space-x-4">
                            {navItems.map((item) => (
                                <Link key={item.path} href={item.path}>
                                    <li className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                        pathname === item.path
                                            ? 'bg-gray-800 text-white'
                                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`}>
                                        {item.label}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>

                    <div className="flex items-center">
                        <AuthButton />
                    </div>
                </div>
            </div>

            <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navItems.map((item) => (
                        <Link key={item.path} href={item.path}>
                            <div className={`block px-3 py-2 rounded-md text-base font-medium ${
                                pathname === item.path
                                    ? 'bg-gray-800 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}>
                                {item.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}