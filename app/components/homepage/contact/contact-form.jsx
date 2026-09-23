"use client";
// @flow strict
import { isValidEmail } from "@/utils/check-email";
import axios from "axios";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();

    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    };

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/contact`,
        userInput
      );

      toast.success("Message sent successfully!");
      setUserInput({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <div>
      <p className="font-mono mb-5 text-[#00E5FF] text-xl uppercase tracking-widest">&gt; send_message</p>
      <div className="max-w-3xl text-white rounded-xl border border-[#1E293B] p-3 lg:p-5 bg-[#131926]/60 backdrop-blur-sm">
        <p className="text-sm text-gray-500 font-mono">{"// Interested in collaborating or have a security challenge? Let's connect."}</p>
        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSendMail} noValidate>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="text-base font-mono text-gray-300">Your Name: </label>
            <input
              id="contact-name"
              className="bg-[#0B0F17] w-full border rounded-lg border-[#1E293B] focus:border-[#00E5FF] ring-0 outline-0 transition-all duration-300 px-3 py-2 font-mono text-sm text-[#10B981]"
              type="text"
              maxLength="100"
              required={true}
              autoComplete="name"
              onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
              onBlur={checkRequired}
              value={userInput.name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="text-base font-mono text-gray-300">Your Email: </label>
            <input
              id="contact-email"
              className="bg-[#0B0F17] w-full border rounded-lg border-[#1E293B] focus:border-[#00E5FF] ring-0 outline-0 transition-all duration-300 px-3 py-2 font-mono text-sm text-[#10B981]"
              type="email"
              maxLength="100"
              required={true}
              autoComplete="email"
              value={userInput.email}
              onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
              onBlur={() => {
                checkRequired();
                setError({ ...error, email: !isValidEmail(userInput.email) });
              }}
            />
            {error.email && <p className="text-sm text-red-400 font-mono">! Invalid email address</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-message" className="text-base font-mono text-gray-300">Your Message: </label>
            <textarea
              id="contact-message"
              className="bg-[#0B0F17] w-full border rounded-lg border-[#1E293B] focus:border-[#00E5FF] ring-0 outline-0 transition-all duration-300 px-3 py-2 font-mono text-sm text-[#10B981]"
              maxLength="500"
              name="message"
              required={true}
              onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
              onBlur={checkRequired}
              rows="4"
              value={userInput.message}
            />
          </div>
          <div className="flex flex-col items-center gap-3">
            {error.required && <p className="text-sm text-red-400 font-mono">
              ! All fields are required
            </p>}
            <button
              type="submit"
              className="flex items-center gap-2 hover:gap-3 rounded-lg bg-[#00E5FF] px-5 md:px-12 py-2.5 md:py-3 text-center text-xs md:text-sm font-mono font-bold uppercase tracking-wider text-[#0B0F17] no-underline transition-all duration-300 ease-out hover:shadow-[0_0_25px_rgba(0,229,255,0.4)]"
              disabled={isLoading}
            >
              {
                isLoading ?
                <span>Sending...</span>:
                <span className="flex items-center gap-2">
                  Send Message
                  <TbMailForward size={20} aria-hidden="true" />
                </span>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;