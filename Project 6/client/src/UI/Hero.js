import React from 'react'
import { Software, Web3 } from '../Assets'

export default function Hero() {
    return (
        <main className='px-2'>
            <div className="mb-16 bg-black rounded-xl px-2 lg:px-8">
                <div className="bg-black">
                    <div className="px-2 py-16 mx-auto max-w-[1443px] md:px-5 lg:px-8 lg:py-20">
                        <div className="mb-10 md:mx-auto justify-center text-center max-w-[1443px] md:mb-12">
                            <h2 className="max-w-[1443px] mb-6 font-sans text-2xl font-bold leading-none tracking-tight text-white lg:text-[100px] md:mx-auto">
                                Software Engineer
                            </h2>
                            <p className="text-base text-white lg:text-xl md:text-md text-sm lg:w-[800px] mx-auto">
                                I have a talent for identifying emerging trends and opportunities and staying ahead of the curve in technology and innovation.
                            </p>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className='flex items-center justify-center bg-primaryColor rounded-full w-[200px]'>
                                <a href='/contact'
                                    className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md text-center"
                                >
                                    <p className='text-black font-bold'>Contact Me</p>
                                    <div>

                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative lg:px-4">
                    <div className="relative grid mx-auto overflow-hidden rounded lg:grid-cols-2 max-w-screen-[1443px]">
                        <div className="relative inline-block lg:p-8 lg:mb-0 mb-4 text-center">
                            <img src={Software} alt='Software' className='rounded-xl lg:w-[1000px] lg:h-[500px]'/>
                            <div className='bg-black absolute h-full w-full top-0 opacity-50 transition-all duration-300s'></div>
                            <div className='flex justify-between items-center absolute bottom-10 px-5'>
                                <p className='text-white font-bold lg:text-xl md:text-md text-sm'>Software Development</p>
                                
                            </div>
                        </div>
                        <div className="relative inline-block lg:p-8 text-center">
                            <img src={Web3} alt='Software' className='rounded-xl lg:w-[1000px] lg:h-[500px]'/>
                            <div className='bg-black absolute h-full w-full top-0 opacity-50 transition-all duration-300s'></div>
                            <div className='flex justify-between items-center absolute bottom-10 px-5'>
                                <p className='text-white font-bold lg:text-xl md:text-md text-sm'>Web3 || Decentralization</p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
