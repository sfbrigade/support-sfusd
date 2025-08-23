import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useToast } from "./Toast/ToastContext";

type ContactUsProps = {
  handleClose: () => void;
};

/**
 * ContactUs: A modal form for users to contact the Support SF Schools team.
 * - Validates email input before sending the message.
 * - Sends the message to the Support SF Schools team using emailjs.
 *
 * State:
 * - formData: an object containing the user's name, email, and message
 * Props:
 * - "handleClose" function: close the modal when message sent or canceled
 *
 * Beta banner (or About page ) => ContactUs
 *
 */
const ContactUs: React.FC<ContactUsProps> = ({ handleClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { showToast } = useToast();

  /**
   * isEmail: Validates the email input using a regular expression.
   */
  function isEmail(emailInput: string) {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(emailInput)) {
      return false;
    }
    return true;
  }
  /**
   * handleChange: Updates the form data when the user types in the input fields.
   */
  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    e.preventDefault();

    const { name, value } = e.target;
    setFormData((d) => ({ ...d, [name]: value }));
  }

  const form = React.useRef<HTMLFormElement | null>(null);

  /**
   * sendEmail: Sends the email to the Support SF Schools team using emailjs.
   * Validates the email input before sending the message.
   */
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEmail(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (form.current) {
      emailjs
        .sendForm("service_itlkzak", "template_ee6s74u", form.current, {
          publicKey: "10-NnnxJFw9zLmYPf",
        })
        .then(
          () => {
            showToast("Your message has been sent!");
            handleClose();
          },
          (error) => {
            console.log("FAILED...", error.text);
          },
        );
    }
  };

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex
    items-center justify-center bg-gray-900 bg-opacity-50"
    >
      <div
        className="modal mt-5 rounded-lg border bg-white p-6 shadow-lg
      md:w-full md:max-w-md"
      >
        <div className="modal-content">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl">Contact Us!</h2>
            <button
              className="close-button ml-auto self-start text-2xl"
              onClick={handleClose}
            >
              &times;
            </button>
          </div>
          <h6 className="text-gray-400">Questions or comments? Let us know!</h6>
          <div className="mt-4">
            <form
              ref={form}
              onSubmit={sendEmail}
              className="mx-auto max-w-md flex flex-col gap-4"
            >
              <div>
                <label className="mb-2 block text-gray-500" htmlFor="name">
                  Name:
                </label>
                <input
                  className="focus:shadow-outline w-full appearance-none rounded
                          border px-3 py-2 leading-tight text-gray-700
                          shadow focus:outline-none"
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-gray-500" htmlFor="email">
                  Email:
                </label>
                <input
                  className="focus:shadow-outline w-full appearance-none rounded
                                border px-3 py-2 leading-tight text-gray-700
                                shadow focus:outline-none"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-gray-500" htmlFor="message">
                  Message:
                </label>
                <textarea
                  className="focus:shadow-outline w-full appearance-none rounded
                                  border px-3 py-2 leading-tight text-gray-700
                                  shadow focus:outline-none"
                  id="message"
                  rows={5}
                  placeholder="Write your message here"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div>
                <button
                  className="focus:shadow-outline w-24 rounded bg-blue-500
                                px-4 py-2 text-white hover:bg-blue-700 focus:outline-none"
                  type="submit"
                >
                  Send
                </button>
                <button
                  className="bg-white-500 focus:shadow-outline border-gray ml-4
                                w-24 rounded border px-4 py-2
                                text-gray-400 hover:bg-gray-300 focus:outline-none"
                  onClick={handleClose}
                  type="button"
                >
                  Cancel
                </button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
