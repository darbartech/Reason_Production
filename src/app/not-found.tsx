"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-20">
      <div className="relative mb-8">
        <h1 className="text-9xl font-black text-primary/10 select-none animate-pulse">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-2xl sm:text-3xl font-black text-primary uppercase tracking-widest">Page Not Found</p>
        </div>
      </div>
      
      <p className="text-primary/60 max-w-md mx-auto mb-10 text-lg font-medium">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link 
          href="/" 
          className="btn-primary group !px-8"
        >
          <Home size={20} className="group-hover:-rotate-12 transition-transform" />
          Back to Home
        </Link>
        <button 
          onClick={() => window.history.back()}
          className="btn-secondary group !px-8"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Go Back
        </button>
      </div>

      <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center font-black">?</div>
          <span className="text-[10px] font-black uppercase tracking-widest">Help</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center font-black">!</div>
          <span className="text-[10px] font-black uppercase tracking-widest">Support</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center font-black">#</div>
          <span className="text-[10px] font-black uppercase tracking-widest">Blog</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center font-black">*</div>
          <span className="text-[10px] font-black uppercase tracking-widest">Search</span>
        </div>
      </div>
    </div>
  );
}
