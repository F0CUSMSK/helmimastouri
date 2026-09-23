"use client";
// @flow strict
import { isValidEmail } from "@/utils/check-email";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error" | null
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
    setStatus(null);

    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    }

    try {
      setIsLoading(true);

      const formData = new FormData(e.target);
      formData.append("access_key", "0f0e9bef-8aea-4bfe-9208-91a4917fd6e5");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        setStatus("success");
        setUserInput({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
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
              name="name"
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
              name="email"
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

            {/* Status feedback */}
            {status === "success" && (
              <div className="w-full rounded-lg border border-[#10B98130] bg-[#10B98110] px-4 py-3 font-mono text-sm text-[#10B981] transition-all duration-300">
                <span className="mr-2">✓</span>Message sent — I&apos;ll get back to you soon!
              </div>
            )}
            {status === "error" && (
              <div className="w-full rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 font-mono text-sm text-red-400 transition-all duration-300">
                <span className="mr-2">✗</span>Could not send — please email me directly instead.
              </div>
            )}

            <button
              type="submit"
              className={`flex items-center gap-2 hover:gap-3 rounded-lg px-5 md:px-12 py-2.5 md:py-3 text-center text-xs md:text-sm font-mono font-bold uppercase tracking-wider no-underline transition-all duration-300 ease-out ${
                isLoading
                  ? "bg-[#00E5FF]/50 text-[#0B0F17]/60 cursor-wait"
                  : "bg-[#00E5FF] text-[#0B0F17] hover:shadow-[0_0_25px_rgba(0,229,255,0.4)]"
              }`}
              disabled={isLoading}
            >
              {
                isLoading ?
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Sending...
                </span>:
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
}

export default ContactForm;