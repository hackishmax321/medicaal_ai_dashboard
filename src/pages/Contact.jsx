import React from 'react'

function Contact() {
  return (
    <section>
      <div className="container mx-auto mt-8 p-6">
        <div className='lg:w-[470px] mx-auto'>
          <h2 className='heading text-center'>
            Contact Us
          </h2>
          <p className='text__para text-center'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
          </p>
        </div>
        <br></br>
        <hr></hr>
        <br></br>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Your Name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Your Email Address"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="bg-white p-8 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <p className="mb-4">
              Feel free to reach out to us for any inquiries or assistance. We're here to help!
            </p>

            <div className="mb-2">
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-700">info@medicare.com</p>
            </div>

            <div className="mb-2">
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-gray-700">077 345 4335</p>
            </div>

            <div className="mb-2">
              <h3 className="text-lg font-semibold mb-2">Address</h3>
              <p className="text-gray-700">
                SOme Address, Colombo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact