"use client";
import Image from "next/image";
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="relative flex justify-between items-center px-8 py-4 border-b border-[#693333] font-sans overflow-hidden">
      
      {/* --- Psychedelic Background Layer --- */}
      <div className="absolute inset-0 -z-10 opacity-70">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover animate-pulse-slow brightness-110"
          style={{ filter: 'hue-rotate(0deg)' }} // Initial state
        >
          {/* Path to your mushroom video in /public */}
          <source src="/psychedelic-mushrooms.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay to ensure text stays readable */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* --- Logo/Brand --- */}
      <div className="flex items-center gap-2 text-3xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        <Image 
          src="/favicon.ico" 
          alt="Metro Mushrooms Logo" 
          width={40} 
          height={40} 
          className="rounded-full"
        />
        <span>Metro Mushrooms</span>
      </div>
      
      {/* --- Navigation Links --- */}
      <div className="flex gap-5">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/shop">Shop</NavLink>
        <NavLink href="/about">About</NavLink>
      </div>

      {/* Global CSS for the Color Shifting Animation */}
      <style jsx global>{`
        @keyframes trippy {
          0% { filter: hue-rotate(0deg) brightness(1); }
          50% { filter: hue-rotate(180deg) brightness(1.3); }
          100% { filter: hue-rotate(360deg) brightness(1); }
        }
        .animate-trippy {
          animation: trippy 15s linear infinite;
        }
      `}</style>
    </nav>
  );
}

// Sub-component for cleaner link styles
function NavLink({ href, children }) {
  return (
    <Link 
      href={href} 
      className="text-white font-semibold transition-colors hover:text-pink-400 drop-shadow-[0_1px_2px_rgba(0,0,0,1)]"
    >
      {children}
    </Link>
  );
}


