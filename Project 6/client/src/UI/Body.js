import React from 'react'
import { Kavod } from '../Assets'
import { ReviewProjects } from '../Components'

export default function Body() {
  return (
    <main>
      {/* About Me */}
      <section className="px-4 py-16 mx-auto max-w-screen-[1443px] md:px-24 lg:px-8 lg:py-20">
        <div className="grid gap-10 justify-center items-center lg:grid-cols-2">
          <div className='flex flex-col justify-center lg:items-start items-center'>
            <h5 className="mb-4 text-4xl font-extrabold leading-none text-center lg:hidden w-full pb-10">
              About Me
            </h5>
            <div className='bg-primaryColor rounded-full h-full p-10'>
              <img
                className="object-center w-auto h-56 sm:h-80"
                src={Kavod}
                alt=""
              />
            </div>
          </div>
          <div className="">

            <h5 className="mb-4 text-4xl font-extrabold leading-none lg:block hidden">
              About Me
            </h5>
            <p className="text-base text-black lg:text-2xl text-lg flex flex-col gap-3 text-justify">
              <span>
                I am a software engineer with 2 years experience, I have a 4 years experience in cryptocurrency trading and blockchain product management. I possess a deep understanding of technology and innovation, which allows me to drive growth.
              </span>

              <span>
                My passion for the decentralized web and its potential to revolutionize the technology industry motivates me to stay up-to-date with the latest Web3 technologies such as Ethereum, Polkadot, and IPFS.
              </span>

              <span>
                I have a talent for identifying emerging trends and opportunities and staying ahead of the curve in technology and innovation. As a team player, I enjoy working collaboratively with other engineers, data scientists, and product managers to drive innovation and growth for my organization.
              </span>
            </p>
          </div>

        </div>
      </section>

      {/* What I am Doing */}
      <main className='p-8'>
        <div className="mb-16 bg-black rounded-xl p-8">
          <div className="bg-black">
            <div className="px-4 py-16 mx-auto max-w-screen-[1443px] md:px-24 lg:px-8 lg:py-20">
              <div className="mb-10 md:mx-auto justify-center text-center max-w-[1443px] md:mb-12">
                <p className="text-base text-white text-xl lg:w-[800px] mx-auto uppercase mb-20">
                  What I'm Doing
                </p>
                <h2 className="max-w-[1443px] mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-white lg:text-[50px] md:mx-auto uppercase">

                  Web Development
                </h2>
                <h2 className="max-w-[1443px] mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-white lg:text-[50px] md:mx-auto uppercase">

                  Web3
                </h2>
                <h2 className="max-w-[1443px] mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-white lg:text-[50px] md:mx-auto uppercase">

                  UIUX Design
                </h2>
                <h2 className="max-w-[1443px] mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-white lg:text-[50px] md:mx-auto uppercase">

                  Forex Trading
                </h2>
              </div>
              <div>
                <ReviewProjects />
              </div>
            </div>
          </div>
        </div>
      </main>

    </main>
  )
}