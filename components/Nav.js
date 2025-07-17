'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'
import NextAuth from 'next-auth'
import { set } from 'mongoose'
import Provider from './Provider'

const Nav = () => {
    const { data: session } = useSession()


    const [providers, setProviders] = useState(null)
    const [toggleDropdown, setToggleDropdown] = useState(false)
    useEffect(() => {
        const setUpProviders = async () => {
          const response = await getProviders()
          
          setProviders(response)
        }

        setUpProviders()
    }, [])
    

  return (
    <nav className='w-full flex-between mb-16 pt-3'>
        <Link href='/' className='flex gap-2 flex-center'>
            <Image
                src='/assets/images/logo_t.png'
                alt=''
                width={45}
                height={45}
                className='object-contain'
            />
            <p className="logo_text">Thinkistry</p>
        </Link>

        {/* Desktop Navigation */}

        <div className="hidden sm:flex">
            {session?.user ? (
                <div className='flex gap-3 md:gap-5'>
                    <Link href='/create-prompt' className='black_btn'>
                    Create Post
                    </Link>
                    <button type='button' onClick={signOut} className='outline_btn'>
                        Sign Out
                    </button>

                    <Link href='/profile'>
                        <Image 
                            src={session?.user.image}
                            alt='Profile'
                            width={30}
                            height={30}
                            className='rounded-full'
                        />
                    </Link>
                </div>
            ):(
                <>
                    {providers &&
                        Object.values(providers).map((provider) => (
                            <button
                                type='button'
                                className='black_btn cursor-pointer'
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                >
                                Sign In
                            </button>
                        ))
                        }
                </>
            )}
        </div>

        {/* Mobile Navigation */}

        <div className='sm:hidden flex relative'>
            {
                session?.user ? (
                    <div className='flex'>
                        <Image 
                            src={session?.user.image}
                            alt='Profile'
                            width={30}
                            height={30}
                            className='rounded-full'
                            onClick={() => setToggleDropdown((prev) => !prev)}
                        />
                        {
                            toggleDropdown && (
                                <div className='dropdown'>
                                    <Link 
                                        href='/profile'
                                        className='dropdown_link'
                                        onClick={() => setToggleDropdown(false)}
                                    >
                                        My Profile
                                    </Link>
                                    <Link 
                                        href='/create-prompt'
                                        className='dropdown_link'
                                        onClick={() => setToggleDropdown(false)}
                                    >
                                        Create Prompt
                                    </Link>
                                    <button
                                        type='button'
                                        onClick={() => {
                                          setToggleDropdown(false)
                                          signOut()
                                        }
                                        }
                                        className='w-full black_btn mt-5'
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )
                        }
                    </div>
                ) : (
                    <>

                        {providers &&
                        Object.values(providers).map((provider) => (
                            <button
                                type='button'
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className='black_btn cursor-pointer'
                            >
                                Sign In
                            </button>
                        ))
                        }

                    </>
                )
            }
        </div>


    </nav>
  )
}

export default Nav
