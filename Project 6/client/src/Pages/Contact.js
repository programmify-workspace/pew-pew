import React, { useState } from 'react';
import { Kavod } from '../Assets'
import { Footer, Nav } from '../UI'

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://iamkavod-portfolio.vercel.app/api/sendmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (response.ok) {
      alert('Mail sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      alert('Failed to send mail.');
    }
  };

  return (
    <main>
      {/* Nav */}
      <Nav />
      {/* Contact Me */}
      <div className="px-8">
        <div className="bg-black px-4 py-16 mx-auto max-w-screen-[1443px] md:px-24 lg:px-8 lg:py-20 rounded-[10px]">
          <div className="flex flex-col items-center justify-between xl:flex-row">
            <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
              <a
                href="/"
                aria-label="Home"
                className="inline-flex items-center border border-primaryColor p-4 rounded-full bg-primaryColor"
              >
                <img
                  className="object-center w-auto h-60"
                  src={Kavod}
                  alt="iamkavod"
                />
              </a>
            </div>
            <div className="w-full max-w-[800px]">
              <div className="rounded p-7 sm:p-10">
                <h3 className="mb-4 font-semibold sm:mb-6 text-[50px] text-white">
                  Let's Collaborate!
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-1 sm:mb-2">
                    <input
                      placeholder="Name"
                      required
                      type="text"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-1 sm:mb-2">
                    <input
                      placeholder="Email"
                      required
                      type="text"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="mb-1 sm:mb-2">
                      <textarea
                        placeholder="Message"
                        required
                        type="text"
                        className="flex-grow w-full h-40 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mt-4 mb-2 sm:mb-4">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-primaryColor text-white"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}
