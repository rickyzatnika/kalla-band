import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const animatePageIn = () => {
  const left = document.getElementById("curtain-left");
  const right = document.getElementById("curtain-right");
  if (!left || !right) return;

  gsap.killTweensOf([left, right]);
  gsap.to(left, { x: "-100%", duration: 0.7, ease: "power3.inOut" });
  gsap.to(right, { x: "100%", duration: 0.7, ease: "power3.inOut" });
};

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const left = document.getElementById("curtain-left");
  const right = document.getElementById("curtain-right");
  if (!left || !right) {
    router.push(href);
    return;
  }

  gsap.killTweensOf([left, right]);
  gsap.to(left, { x: "0%", duration: 0.7, ease: "power3.inOut" });
  gsap.to(right, {
    x: "0%",
    duration: 0.7,
    ease: "power3.inOut",
    onComplete: () => router.push(href),
  });
};
