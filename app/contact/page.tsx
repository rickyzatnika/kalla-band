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
import { Mail, MapPin, Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const contactSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  subject: z.string().min(3, "Subjek minimal 3 karakter"),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const headerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
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
      trigger: infoRef.current,
      start: "top 80%",
      onEnter: () => {
        const els = infoRef.current ? Array.from(infoRef.current.children) : [];
        gsap.fromTo(
          els,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
        );
      },
      once: true,
    });

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
  });

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#090909] pt-20">
        <section className="px-6 py-32">
          <div className="mx-auto max-w-5xl">
            <div ref={headerRef}>
              <p className="text-xs font-medium tracking-[0.3em] text-[#C08457] uppercase">
                Hubungi Kami
              </p>
              <h1 className="mt-4 font-serif text-6xl font-bold tracking-wide sm:text-7xl">
                Kontak
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#A1A1AA]">
                Punya pertanyaan atau ingin berdiskusi? Kami akan dengan senang hati mendengar dari Anda.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(255,255,255,0.06)] px-6 py-32">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-16 lg:grid-cols-5">
              <div ref={infoRef} className="space-y-8 lg:col-span-2">
                <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111111] p-8">
                  <Mail className="h-6 w-6 text-[#C08457]" />
                  <p className="mt-4 text-sm text-[#A1A1AA]">Email</p>
                  <a
                    href="mailto:hello@kalla.id"
                    className="mt-1 block font-medium transition-colors hover:text-[#C08457]"
                  >
                    hello@kalla.id
                  </a>
                </div>
                <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111111] p-8">
                  <MapPin className="h-6 w-6 text-[#C08457]" />
                  <p className="mt-4 text-sm text-[#A1A1AA]">Lokasi</p>
                  <p className="mt-1 font-medium">Bandung, Indonesia</p>
                </div>
                <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111111] p-8">
                  <p className="text-sm text-[#A1A1AA]">Ikuti Kami</p>
                  <div className="mt-4 flex gap-4">
                    {["Instagram", "YouTube", "Spotify"].map((s) => (
                      <a
                        key={s}
                        href="#"
                        className="text-sm text-[#A1A1AA] underline underline-offset-4 transition-colors hover:text-white"
                      >
                        {s}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div ref={formRef} className="lg:col-span-3">
                <h2 className="mb-8 font-serif text-3xl font-bold tracking-wide">
                  Kirim Pesan
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <input
                        {...register("name")}
                        placeholder="Nama Anda"
                        className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111111] px-4 py-3.5 text-sm text-white placeholder-[#A1A1AA]/50 outline-none transition-all duration-300 focus:border-[#C08457]"
                      />
                      {errors.name && <p className="mt-1.5 text-xs text-[#EF4444]">{errors.name.message}</p>}
                    </div>
                    <div>
                      <input
                        {...register("email")}
                        placeholder="Email Anda"
                        className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111111] px-4 py-3.5 text-sm text-white placeholder-[#A1A1AA]/50 outline-none transition-all duration-300 focus:border-[#C08457]"
                      />
                      {errors.email && <p className="mt-1.5 text-xs text-[#EF4444]">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div>
                    <input
                      {...register("subject")}
                      placeholder="Subjek"
                      className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111111] px-4 py-3.5 text-sm text-white placeholder-[#A1A1AA]/50 outline-none transition-all duration-300 focus:border-[#C08457]"
                    />
                    {errors.subject && <p className="mt-1.5 text-xs text-[#EF4444]">{errors.subject.message}</p>}
                  </div>
                  <div>
                    <textarea
                      {...register("message")}
                      rows={6}
                      placeholder="Pesan Anda..."
                      className="w-full resize-none rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111111] px-4 py-3.5 text-sm text-white placeholder-[#A1A1AA]/50 outline-none transition-all duration-300 focus:border-[#C08457]"
                    />
                    {errors.message && <p className="mt-1.5 text-xs text-[#EF4444]">{errors.message.message}</p>}
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
                        Kirim Pesan
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
