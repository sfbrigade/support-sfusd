import React from 'react';


function ContactUs() {
  return (
    <div>
      <form className="max-w-md mx-auto mt-5 mb-3 p-6">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Name:
          </label>
          <input className="shadow appearance-none border rounded
                          w-full py-2 px-3 text-gray-700 leading-tight
                          focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email:
          </label>
          <input className="shadow appearance-none border rounded
                          w-full py-2 px-3 text-gray-700 leading-tight
                          focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="message">
            Message:
          </label>
          <textarea className="shadow appearance-none border rounded
                             w-full py-2 px-3 text-gray-700 leading-tight
                             focus:outline-none focus:shadow-outline"
                    id="message"
                    rows={5}
                    placeholder="Write your message here"></textarea>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold
                         py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactUs;