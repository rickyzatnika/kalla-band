"use client";

import { useEffect, type ReactNode } from "react";
import { animatePageIn } from "@/lib/animations";

export default function Template({ children }: { children: ReactNode }) {
  useEffect(() => {
    const id = requestAnimationFrame(() => animatePageIn());
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div>
      <div
        id="curtain-left"
        className="fixed top-0 left-0 z-[100] w-1/2 h-dvh overflow-hidden pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] to-[#090909]" />
      </div>
      <div
        id="curtain-right"
        className="fixed top-0 right-0 z-[100] w-1/2 h-dvh overflow-hidden pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] to-[#090909]" />
      </div>
      {children}
    </div>
  );
}
