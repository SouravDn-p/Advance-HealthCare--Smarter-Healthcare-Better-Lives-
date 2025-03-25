"use client";

import {
  Facebook,
  Twitter,
  Youtube,
  Mail,
  ArrowRight,
  Heart,
} from "lucide-react";
import { useState } from "react";
import logo from "../../assets/Logo.png";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
    alert("Thanks for subscribing!");
  };

  return (
    <div className="relative">
      <footer className="relative pt-16 pb-10 px-6 md:px-10 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-t-xl shadow-2xl">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-[#3b82f6] animate-pulse-slow"></div>
          <div className="absolute right-20 top-40 w-60 h-60 rounded-full bg-[#8b5cf6] animate-pulse-slower"></div>
          <div className="absolute left-40 bottom-20 w-32 h-32 rounded-full bg-[#f43f5e] animate-pulse-slow"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 border-b border-white/10 pb-16">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Stay Connected
              </h3>
              <p className="text-slate-300 mb-6 max-w-md">
                Subscribe to receive healthcare updates, wellness tips, and
                exclusive offers.
              </p>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input input-bordered bg-white/10 border-white/20 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 flex-grow"
                  required
                />
                <button
                  type="submit"
                  className="btn btn-primary gap-2 transition-all duration-300 hover:translate-x-1 group"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-4 text-white/90">About</h4>
                <nav className="flex flex-col gap-3">
                  <a
                    className="link link-hover text-slate-300 hover:text-cyan-400 transition-colors duration-300"
                    href="#"
                  >
                    Our Services
                  </a>
                  <a
                    className="link link-hover text-slate-300 hover:text-cyan-400 transition-colors duration-300"
                    href="#"
                  >
                    Contact Us
                  </a>
                  <a
                    className="link link-hover text-slate-300 hover:text-cyan-400 transition-colors duration-300"
                    href="#"
                  >
                    Privacy Policy
                  </a>
                  <a
                    className="link link-hover text-slate-300 hover:text-cyan-400 transition-colors duration-300"
                    href="#"
                  >
                    Terms & Conditions
                  </a>
                </nav>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4 text-white/90">
                  Support
                </h4>
                <nav className="flex flex-col gap-3">
                  <a
                    className="link link-hover text-slate-300 hover:text-cyan-400 transition-colors duration-300"
                    href="#"
                  >
                    Help Center
                  </a>
                  <a
                    className="link link-hover text-slate-300 hover:text-cyan-400 transition-colors duration-300"
                    href="#"
                  >
                    FAQs
                  </a>
                  <a
                    className="link link-hover text-slate-300 hover:text-cyan-400 transition-colors duration-300"
                    href="#"
                  >
                    Emergency Services
                  </a>
                  <a
                    className="link link-hover text-slate-300 hover:text-cyan-400 transition-colors duration-300"
                    href="#"
                  >
                    Community
                  </a>
                </nav>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
            <div className="flex items-center">
              <div className="">
                <img
                  src={logo || "/placeholder.svg"}
                  alt="Advance HealthService logo"
                  className="h-20 w-32 sm:h-28 sm:w-48 object-contain"
                />
              </div>
            </div>
            <nav>
              <div className="flex gap-6">
                <a
                  className="btn btn-circle btn-ghost hover:text-cyan-400 transition-transform duration-300"
                  href="#"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  className="btn btn-circle btn-ghost hover:text-blue-500 transition-transform duration-300"
                  href="#"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  className="btn btn-circle btn-ghost hover:text-blue-600 transition-transform duration-300"
                  href="#"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  className="btn btn-circle btn-ghost hover:text-cyan-400 transition-transform duration-300"
                  href="#"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </nav>
          </div>

          <div className="text-center text-slate-400 text-sm flex flex-col items-center gap-2">
            <p>
              Copyright © {new Date().getFullYear()} - Advanced Healthcare. All
              rights reserved.
            </p>
            <p className="flex items-center gap-1 text-xs opacity-70">
              Made with <Heart className="w-3 h-3 text-red-500 animate-pulse" />{" "}
              by Advanced Healthcare Team
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
