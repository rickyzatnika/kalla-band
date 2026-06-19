"use client";

import { useRef } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const bookingSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().min(8, "Nomor telepon minimal 8 digit"),
  event: z.string().min(3, "Nama acara minimal 3 karakter"),
  date: z.string().min(1, "Pilih tanggal acara"),
  location: z.string().min(3, "Lokasi minimal 3 karakter"),
  message: z.string().optional(),
});

type BookingForm = z.infer<typeof bookingSchema>;

export default function Booking() {
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingForm) => {
    await new Promise((r) => setTimeout(r, 1000));
    console.log(data);
    reset();
  };

  useGSAP(() => {
    gsap.fromTo(
      headerRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    ScrollTrigger.create({
      trigger: formRef.current,
      start: "top 75%",
      onEnter: () => {
        gsap.fromTo(
          formRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
      },
      once: true,
    });

    ScrollTrigger.create({
      trigger: infoRef.current,
      start: "top 80%",
      onEnter: () => {
        const els = infoRef.current ? Array.from(infoRef.current.children) : [];
        gsap.fromTo(
          els,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out" }
        );
      },
      once: true,
    });
  });

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#090909] pt-20">
        <section className="px-6 py-32">
          <div className="mx-auto max-w-5xl">
            <div ref={headerRef}>
              <p className="text-xs font-medium tracking-[0.3em] text-[#C08457] uppercase">
                Booking
              </p>
              <h1 className="mt-4 font-serif text-6xl font-bold tracking-wide sm:text-7xl">
                Pesan KALLA
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#A1A1AA]">
                Tertarik menghadirkan KALLA ke acara Anda? Isi form di bawah dan tim kami akan menghubungi Anda.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(255,255,255,0.06)] px-6 py-32">
          <div className="mx-auto max-w-3xl">
            <form
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-[#A1A1AA]">Nama Lengkap *</label>
                  <input
                    {...register("name")}
                    className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111111] px-4 py-3.5 text-sm text-white placeholder-[#A1A1AA]/50 outline-none transition-all duration-300 focus:border-[#C08457]"
                    placeholder="Nama Anda"
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-[#EF4444]">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm text-[#A1A1AA]">Email *</label>
                  <input
                    {...register("email")}
                    className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111111] px-4 py-3.5 text-sm text-white placeholder-[#A1A1AA]/50 outline-none transition-all duration-300 focus:border-[#C08457]"
                    placeholder="email@anda.com"
                  />
                  {errors.email && <p className="mt-1.5 text-xs text-[#EF4444]">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-[#A1A1AA]">Nomor Telepon *</label>
                  <input
                    {...register("phone")}
                    className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111111] px-4 py-3.5 text-sm text-white placeholder-[#A1A1AA]/50 outline-none transition-all duration-300 focus:border-[#C08457]"
                    placeholder="+62 812 3456 7890"
                  />
                  {errors.phone && <p className="mt-1.5 text-xs text-[#EF4444]">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm text-[#A1A1AA]">Tanggal Acara *</label>
                  <input
                    type="date"
                    {...register("date")}
                    className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111111] px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 focus:border-[#C08457]"
                  />
                  {errors.date && <p className="mt-1.5 text-xs text-[#EF4444]">{errors.date.message}</p>}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-[#A1A1AA]">Nama Acara *</label>
                  <input
                    {...register("event")}
                    className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111111] px-4 py-3.5 text-sm text-white placeholder-[#A1A1AA]/50 outline-none transition-all duration-300 focus:border-[#C08457]"
                    placeholder="Nama acara"
                  />
                  {errors.event && <p className="mt-1.5 text-xs text-[#EF4444]">{errors.event.message}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm text-[#A1A1AA]">Lokasi Acara *</label>
                  <input
                    {...register("location")}
                    className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111111] px-4 py-3.5 text-sm text-white placeholder-[#A1A1AA]/50 outline-none transition-all duration-300 focus:border-[#C08457]"
                    placeholder="Kota / Venue"
                  />
                  {errors.location && <p className="mt-1.5 text-xs text-[#EF4444]">{errors.location.message}</p>}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-[#A1A1AA]">Pesan Tambahan</label>
                <textarea
                  {...register("message")}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111111] px-4 py-3.5 text-sm text-white placeholder-[#A1A1AA]/50 outline-none transition-all duration-300 focus:border-[#C08457]"
                  placeholder="Ceritakan tentang acara Anda..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-full bg-[#C08457] px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#D4A373] disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Mengirim..."
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Kirim Permintaan Booking
                  </>
                )}
              </button>
            </form>

            <div ref={infoRef} className="mt-16 grid gap-6 sm:grid-cols-2">
              <a
                href="mailto:booking@kalla.id"
                className="group rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111111] p-6 transition-all duration-300 hover:border-[#C08457]/30"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#C08457]/10">
                  <CheckCircle className="h-5 w-5 text-[#C08457]" />
                </div>
                <p className="text-sm text-[#A1A1AA]">Kontak Langsung</p>
                <p className="mt-1 font-medium text-white transition-colors group-hover:text-[#C08457]">
                  booking@kalla.id
                </p>
              </a>
              <a
                href="tel:+62812345678"
                className="group rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111111] p-6 transition-all duration-300 hover:border-[#C08457]/30"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#C08457]/10">
                  <CheckCircle className="h-5 w-5 text-[#C08457]" />
                </div>
                <p className="text-sm text-[#A1A1AA]">Respon Cepat</p>
                <p className="mt-1 font-medium text-white transition-colors group-hover:text-[#C08457]">
                  +62 812 345 678
                </p>
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
