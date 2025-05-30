"use client"

import { ClerkLoaded, SignedIn, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import React from 'react';
import Link from 'next/link';
import Form from 'next/form';
import { PackageIcon, TrolleyIcon } from '@sanity/icons';
import useBasketStore from '@/store/store';

const Header = () => {

    const { user } = useUser();
    console.log(user)
    const itemCount = useBasketStore((state) =>
        state.items.reduce((total, item) => total + item.quantity, 0)
    );


    return (
        <header className='flex flex-wrap justify-baseline items-center px-4 py-2 border-b-2 bg-gray-300'>
            {/* Top row */}
            <div className='flex w-full flex-wrap justify-between items-center'>


                <Link href="/"
                    className='text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0'>
                    shoper
                </Link>
                <Form action="/search" className='w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0'>
                    <input type='text' name='query' placeholder='search for prodcuts '
                        className='bg-gray-100 focus:outline-none focus:ring-2 text-gray-800 px-4 py-2 rounded focus:ring-blue-500 focus:ring-opacity-50 border w-full max-w-4xl' />
                </Form>

                <div className='flex items-center space-x-4 mt-4 sm:mt-0 mr-10 '>
                    <Link href="/basket" className='flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center   space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded '>
                        <TrolleyIcon className='w-6 h-6' />
                        {/* span item count */}
                        <span className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>{itemCount}</span>
                        <span>My basket</span>
                    </Link>


                    {/* user area */}

                    <ClerkLoaded>
                        <SignedIn >
                            <Link href="/orders"
                                className='flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center   space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' >
                                <PackageIcon className='w-6 h-6' />
                                {/* span item count */}
                                <span>My Orders</span>
                            </Link>
                        </SignedIn>

                        {user ? (
                            <div className='flex items-center space-x-2'>
                                <UserButton />
                                <div className='hidden sm:block text-xs'>
                                    <p className='text-gray-400'>Welcome back</p>
                                    <p className='font-bold'>{user.fullName}</p>
                                </div>
                            </div>
                        ) : (
                            <SignInButton mode='modal' >
                                <button
                                    className="px-4 py-2 rounded-full bg-blue-400 text-black text-sm font-semibold hover:bg-blue-600 transition-colors border-blue-900 border-2"
                                >
                                    SIGN IN
                                </button>
                            </SignInButton>
                        )}
                    </ClerkLoaded>

                    {/* {user?.passkeys.length === 0 && (
                        <button
                            onClick={createClerkPasskey}
                            className='bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border'> create passkey </button>
                    )} */}
                </div>
            </div>

        </header>
    )
}

export default Header; 