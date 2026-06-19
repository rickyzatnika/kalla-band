"use client";

import { useLayoutEffect, type ReactNode } from "react";
import { animatePageIn } from "@/lib/animations";

export default function Template({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    animatePageIn();
  }, []);

  return (
    <div>
      <div
        id="curtain-left"
        className="fixed inset-y-0 left-0 z-[100] w-1/2 bg-[#1f1f1f] pointer-events-none"
        style={{ transform: "translateX(0%)" }}
      />
      <div
        id="curtain-right"
        className="fixed inset-y-0 right-0 z-[100] w-1/2 bg-[#1f1f1f] pointer-events-none"
        style={{ transform: "translateX(0%)" }}
      />
      {children}
    </div>
  );
}
