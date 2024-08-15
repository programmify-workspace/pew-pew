import React from 'react'
import { Kavod } from '../Assets'
import { Footer, Nav } from '../UI'
import { ReviewProjects } from '../Components'
import Skills from '../Components/Skills'

export default function About() {
  return (
    <main>
      <Nav />
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
      <section className='lg:p-8 px-2'>
        <div className="mb-16 bg-black rounded-xl lg:p-8 px-1">
          <div className="bg-black">
            <div className="px-4 py-16 mx-auto max-w-screen-[1443px] md:px-24 lg:px-8 lg:py-20">
              <div className="mb-10 md:mx-auto justify-center text-center max-w-[1443px] md:mb-12">
                <p className="text-base text-white text-md lg:w-[800px] mx-auto uppercase mb-20">
                  What I'm Doing
                </p>
                <h2 className="max-w-[1443px] mb-6 font-sans text-xl font-bold leading-none tracking-tight text-white lg:text-[50px] md:mx-auto uppercase">
                  Web Development
                </h2>
                <h2 className="max-w-[1443px] mb-6 font-sans text-xl font-bold leading-none tracking-tight text-white lg:text-[50px] md:mx-auto uppercase">
                  Web3
                </h2>
                <h2 className="max-w-[1443px] mb-6 font-sans text-xl font-bold leading-none tracking-tight text-white lg:text-[50px] md:mx-auto uppercase">
                  UIUX Design
                </h2>
                <h2 className="max-w-[1443px] mb-6 font-sans text-xl font-bold leading-none tracking-tight text-white lg:text-[50px] md:mx-auto uppercase">
                  Forex Trading
                </h2>
              </div>
              <div>
                <ReviewProjects />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section className="px-4 py-16 mx-auto max-w-screen-[1443px] md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center max-w-[1443px] md:mb-12">
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            Experiences
          </h2>
        </div>
        <div className="grid gap-8 row-gap-5 md:row-gap-8 lg:grid-cols-3">
          <div className="p-5 duration-300 transform bg-white border-2 border-dashed rounded shadow-sm border-deep-purple-accent-100 hover:-translate-y-2">
            <div className="flex items-center mb-2">
              <p className="flex items-center justify-center w-10 h-10 mr-2 text-lg font-bold text-white rounded-full bg-primaryColor">
                ⚫
              </p>
              <p className="text-lg font-bold leading-5">2022 - Present :  GataProtocol</p>
            </div>
            <p className="text-sm text-gray-900 capitalize">
              d-commerce blockchain company
            </p>
          </div>
          <div className="p-5 duration-300 transform bg-white border-2 border-dashed rounded shadow-sm border-deep-purple-accent-200 hover:-translate-y-2">
            <div className="flex items-center mb-2">
              <p className="flex items-center justify-center w-10 h-10 mr-2 text-lg font-bold text-white rounded-full bg-primaryColor">
                ⚫
              </p>
              <p className="text-lg font-bold leading-5">2023 - Present : Yiieldy</p>
            </div>
            <p className="text-sm text-gray-900">
              Agrictech Company
            </p>
          </div>
          <div className="relative p-5 duration-300 transform bg-white border-2 rounded shadow-sm border-deep-purple-accent-700 hover:-translate-y-2">
            <div className="flex items-center mb-2">
              <p className="flex items-center justify-center w-10 h-10 mr-2 text-lg font-bold text-white rounded-full bg-primaryColor">
                ⚫
              </p>
              <p className="text-lg font-bold leading-5">2024 - Present : Programmify</p>
            </div>
            <p className="text-sm text-gray-900">
              Node JS intern and Lead Web3
            </p>
            <p className="absolute top-0 right-0 flex items-center justify-center w-8 h-8 -mt-4 -mr-4 font-bold rounded-full bg-primaryColor sm:-mt-5 sm:-mr-5 sm:w-10 sm:h-10">
              <svg
                className="text-white w-7"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <polyline
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  points="6,12 10,16 18,8"
                />
              </svg>
            </p>
          </div>
          <div className="p-5 duration-300 transform bg-white border-2 border-dashed rounded shadow-sm border-deep-purple-accent-100 hover:-translate-y-2">
            <div className="flex items-center mb-2">
              <p className="flex items-center justify-center w-10 h-10 mr-2 text-lg font-bold text-white rounded-full bg-primaryColor">
                ⚫
              </p>
              <p className="text-lg font-bold leading-5">2024 : Aviaport Consult</p>
            </div>
            <p className="text-sm text-gray-900 capitalize">
              Aero Company 
            </p>
          </div>
          <div className="p-5 duration-300 transform bg-white border-2 border-dashed rounded shadow-sm border-deep-purple-accent-200 hover:-translate-y-2">
            <div className="flex items-center mb-2">
              <p className="flex items-center justify-center w-10 h-10 mr-2 text-lg font-bold text-white rounded-full bg-primaryColor">
                ⚫
              </p>
              <p className="text-lg font-bold leading-5">2023 : Emeka Amadi Foundation</p>
            </div>
            <p className="text-sm text-gray-900">
              Non Governmental Organization
            </p>
          </div>
          <div className="relative p-5 duration-300 transform bg-white border-2 rounded shadow-sm border-deep-purple-accent-700 hover:-translate-y-2">
            <div className="flex items-center mb-2">
              <p className="flex items-center justify-center w-10 h-10 mr-2 text-lg font-bold text-white rounded-full bg-primaryColor">
                ⚫
              </p>
              <p className="text-lg font-bold leading-5">2023 : Logicgraph</p>
            </div>
            <p className="text-sm text-gray-900">
              An AI Company
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className='lg:px-8 px-2'>
        <Skills />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
