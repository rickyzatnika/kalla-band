"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "kalla-coming-soon-dismissed";
const DELAY = 3000;

export function ComingSoonPopup() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem(STORAGE_KEY)) return;
    const id = setTimeout(() => setOpen(true), DELAY);
    return () => clearTimeout(id);
  }, []);

  const close = () => {
    setOpen(false);
    localStorage.setItem(STORAGE_KEY, "1");
  };

  return (
    <AnimatePresence>
      {mounted && open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Pemberitahuan"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#090909]/80 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#111111]"
          >
            <button
              onClick={close}
              aria-label="Tutup pemberitahuan"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#090909]/70 text-white backdrop-blur transition-all duration-300 hover:bg-[#DC2626]"
            >
              <X className="h-5 w-5" />
            </button>
            <Image
              src="/images/coming-soon.jpg"
              alt="KALLA — Coming Soon"
              width={1426}
              height={802}
              priority
              className="h-auto w-full object-cover"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}