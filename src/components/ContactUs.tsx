import  React from 'react';
import emailjs from '@emailjs/browser';

type ContactUsProps = {
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void
};


const ContactUs: React.FC<ContactUsProps> = ({
  handleClose,
}) =>
{
  const form = React.useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm('service_itlkzak', 'template_ee6s74u', form.current, {
          publicKey: '10-NnnxJFw9zLmYPf',
        })
        .then(
          () => {
            console.log('SUCCESS!');
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
    }
  };

  const showSuccessMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    alert('Your message has been sent!');
    handleClose(e);
  }

  return (
    <div className="modal-overlay inset-0 bg-gray-900 bg-opacity-50 flex
    justify-center items-center fixed">
      <div className="modal md:w-full md:max-w-md mt-5 p-6 bg-white border
      rounded-lg shadow-lg">
        <div className="modal-content">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl">Contact Us!</h2>
            <button
              className="close-button text-2xl ml-auto self-start"
              onClick={handleClose}>&times;
            </button>
          </div>
          <h6 className="text-gray-400">Questions or comments? Let us know!</h6>
          <div>
            <form ref={form} onSubmit={sendEmail} className="max-w-md mx-auto mb-3 p-6">
              <div className="mb-4">
                <label className="block text-gray-500 mb-2" htmlFor="name">
                Name:
                </label>
                <input className="shadow appearance-none border rounded
                          w-full py-2 px-3 text-gray-700 leading-tight
                          focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        name="user_name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-500 mb-2" htmlFor="email">
                  Email:
                </label>
                <input className="shadow appearance-none border rounded
                                w-full py-2 px-3 text-gray-700 leading-tight
                                focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        name="user_email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-500 mb-2" htmlFor="message">
                  Message:
                </label>
                <textarea className="shadow appearance-none border rounded
                                  w-full py-2 px-3 text-gray-700 leading-tight
                                  focus:outline-none focus:shadow-outline"
                          id="message"
                          rows={5}
                          placeholder="Write your message here"
                          name="message"
                          >
                </textarea>
              </div>
              <button className="bg-blue-500 w-24 hover:bg-blue-700 text-white
                              py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                      onClick={showSuccessMessage}
              >
                Send
              </button>
              <button className="bg-white-500 w-24 hover:bg-gray-300 text-gray-400
                              py-2 px-4 rounded focus:outline-none focus:shadow-outline
                              border border-gray ml-4"
                      type="submit"
                      onClick={handleClose}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;