import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

let isClosing = false;

export const animatePageIn = () => {
  const left = document.getElementById("curtain-left");
  const right = document.getElementById("curtain-right");
  if (!left || !right) return;

  gsap.killTweensOf([left, right]);
  gsap.set(left, { x: "0%" });
  gsap.set(right, { x: "0%" });
  gsap.to(left, { x: "-100%", duration: 0.8, ease: "power4.in" });
  gsap.to(right, { x: "100%", duration: 0.8, ease: "power4.in" });
};

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const left = document.getElementById("curtain-left");
  const right = document.getElementById("curtain-right");
  if (!left || !right) {
    router.push(href);
    return;
  }

  if (isClosing) return;
  isClosing = true;

  gsap.killTweensOf([left, right]);
  gsap.set(left, { x: "-100%" });
  gsap.set(right, { x: "100%" });
  gsap.to(left, { x: "0%", duration: 1, ease: "power4.out" });
  gsap.to(right, {
    x: "0%",
    duration: 1,
    ease: "power4.out",
    onComplete: () => {
      isClosing = false;
      router.push(href);
    },
  });
};
