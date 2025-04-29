"use client"

import React from 'react';
import Link from 'next/link';


const HeaderBottom = () => {

    return (
        <header className='flex flex-wrap  justify-baseline items-center border-b-2 bg-gray-200'>
            {/* Top row */}
            <header className=" sm:justify-start sm:flex-nowrap w-full  text-sm py-3 dark:bg-neutral-800">
                <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-center">

                    <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
                        <Link className="font-medium text-gray-400 hover:text-gray-400 focus:outline-hidden focus:text-gray-600 dark:text-neutral-600 dark:hover:text-neutral-500 dark:focus:text-neutral-500" href="/" aria-current="page"
                        >Home
                        </Link >
                        <Link className="font-medium text-gray-400 hover:text-gray-400 focus:outline-hidden focus:text-gray-600 dark:text-neutral-600 dark:hover:text-neutral-500 dark:focus:text-neutral-500" href="/contactUs"
                        >Contact Us
                        </Link >

                    </div>
                </nav>
            </header>


        </header>
    )
}

export default HeaderBottom; 