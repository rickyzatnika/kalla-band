"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Send } from "lucide-react";

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

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#090909] pt-20">
        <section className="px-6 py-32">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="text-xs font-medium tracking-[0.3em] text-[#C08457] uppercase">
                Booking
              </p>
              <h1 className="mt-4 font-serif text-6xl font-bold tracking-wide sm:text-7xl">
                Pesan KALLA
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#A1A1AA]">
                Tertarik menghadirkan KALLA ke acara Anda? Isi form di bawah dan tim kami akan menghubungi Anda.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="border-t border-[rgba(255,255,255,0.06)] px-6 py-32">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

              <div className="mt-16 grid gap-6 sm:grid-cols-2">
                {[
                  {
                    title: "Kontak Langsung",
                    info: "booking@kalla.id",
                    href: "mailto:booking@kalla.id",
                  },
                  {
                    title: "Respon Cepat",
                    info: "+62 812 345 678",
                    href: "tel:+62812345678",
                  },
                ].map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="group rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111111] p-6 transition-all duration-300 hover:border-[#C08457]/30"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#C08457]/10">
                      <CheckCircle className="h-5 w-5 text-[#C08457]" />
                    </div>
                    <p className="text-sm text-[#A1A1AA]">{item.title}</p>
                    <p className="mt-1 font-medium text-white transition-colors group-hover:text-[#C08457]">
                      {item.info}
                    </p>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
