import  React, {useState} from 'react';
import emailjs from '@emailjs/browser';

type ContactUsProps = {
  handleClose: () => void
};

/**
 * ContactUs: A modal form for users to contact the Support SFUSD team.
 * - Validates email input before sending the message.
 * - Sends the message to the Support SFUSD team using emailjs.
 *
 * State:
 * - formData: an object containing the user's name, email, and message
 * Props:
 * - "handleClose" function: close the modal when message sent or canceled
 *
 * Beta banner (or About page ) => ContactUs
 *
 */
const ContactUs: React.FC<ContactUsProps> = ({
  handleClose,
}) =>
{

  const [formData, setFormData] = useState({name: "", email: "", message: ""});

  function isEmail(emailInput: string) {
      let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!regEmail.test(emailInput)){
        return false;
      }
      return true;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement> |
     React.ChangeEvent<HTMLTextAreaElement>) {
      e.preventDefault();

    const { name, value } = e.target;
    setFormData(d => ({ ...d, [name]: value }));
  }

  const form = React.useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!isEmail(formData.email)){
      alert("Please enter a valid email address");
      return;
    }

    if (form.current) {
      emailjs
        .sendForm('service_itlkzak', 'template_ee6s74u', form.current, {
          publicKey: '10-NnnxJFw9zLmYPf',
        })
        .then(
          () => {
            console.log('SUCCESS!');
            alert('Your message has been sent!');
            handleClose();
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
    }
  };

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
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
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
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
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
                          value={formData.message}
                          onChange={handleChange}
                          required
                          >
                </textarea>
              </div>
              <button className="bg-blue-500 w-24 hover:bg-blue-700 text-white
                              py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
              >
                Send
              </button>
              <button className="bg-white-500 w-24 hover:bg-gray-300 text-gray-400
                              py-2 px-4 rounded focus:outline-none focus:shadow-outline
                              border border-gray ml-4"
                      onClick={handleClose}
                      type="button"
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