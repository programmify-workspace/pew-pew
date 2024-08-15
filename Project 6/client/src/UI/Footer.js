import React from 'react'
import '../Components/styles.css'
import { Kavod } from '../Assets';

export default function Footer() {
  return (
    <div className="mt-16 bg-black footer">
      <div className="px-4 py-16 md:px-24 lg:px-8 lg:py-20">
        <div className="">
          <div className="flex flex-col mx-auto mb-16 text-center sm:mb-0">
            <div className="mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <h2 className="mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-white lg:text-[100px] md:mx-auto">
                Have a cool project?
              </h2>
              <div className="flex items-center justify-center mt-16">
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
            <div className='flex flex-col justify-between pt-5 pb-10 border-b border-gray-800'></div>
          </div>
        </div>
      </div>
      <div className="px-4 pt-12 mx-auto max-w-screen-[1443px] md:px-24 lg:px-8">
        <div className="grid grid-cols-2">
          <div className="flex flex-col justify-center items-center">
            <a
              href="/"
              aria-label="Home"
              className="inline-flex items-center border border-primaryColor p-4 rounded-full bg-primaryColor"
            >
              <img
                className="object-center w-auto h-40"
                src={Kavod}
                alt=""
              />
            </a>
            <div className="mt-4 lg:max-w-sm">
              <p className="text-2xl font-bold text-white">
                Software Engineer
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 items-center">
            <div>
              <p className="tracking-wide text-white text-3xl font-bold">
                Navigation
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href="/"
                    className="transition-colors duration-300 text-white hover:text-white text-2xl"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="transition-colors duration-300 text-white hover:text-white text-2xl"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/project"
                    className="transition-colors duration-300 text-white hover:text-white text-2xl"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="transition-colors duration-300 text-white hover:text-white text-2xl"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold tracking-wide text-white text-3xl font-bold">
                Social Media
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href="https://x.com/iamkavod_"
                    className="transition-colors duration-300 text-white hover:text-white text-2xl"
                  >
                    X
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/iamkavod/"
                    className="transition-colors duration-300 text-white hover:text-white text-2xl"
                  >
                    Linkedin
                  </a>
                </li>
                <li>
                  <a
                    href="https://medium.com/@iamkavod_"
                    className="transition-colors duration-300 text-white hover:text-white text-2xl"
                  >
                    Medium
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/iamkavod"
                    className="transition-colors duration-300 text-white hover:text-white text-2xl"
                  >
                    Github
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between pt-5 pb-10 border-t border-gray-800 mt-20">
          <p className="text-sm text-white text-center mt-5">
            © Copyright 2024. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};