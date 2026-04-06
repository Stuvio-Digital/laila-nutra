"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const images = useRef<HTMLImageElement[]>([]);
  const state = useRef({ frame: 0 });

  const totalFrames = 361;
  const scrollLength = totalFrames * 4;

  const getImagePath = (i: number) =>
    `/image-sequence/Laila Nutrua-Flower animation_${i
      .toString()
      .padStart(5, "0")}.png`;

  /* ------------------ CANVAS SIZE ------------------ */
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  /* ------------------ RENDER ------------------ */
  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const img = images.current[state.current.frame];
    if (!img || !img.complete) return;

    const cw = window.innerWidth;
    const ch = window.innerHeight;
    const ir = img.naturalWidth / img.naturalHeight;
    const sr = cw / ch;

    let w: number, h: number, x: number, y: number;

    if (sr > ir) {
      w = cw;
      h = w / ir;
      x = 0;
      y = (ch - h) / 2;
    } else {
      h = ch;
      w = h * ir;
      x = (cw - w) / 2;
      y = 0;
    }

    ctx.drawImage(img, x, y, w, h);
  };

  /* ------------------ PRELOAD ------------------ */
  const preload = () => {
    images.current = [];

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = getImagePath(i);

      img.onload = () => {
        images.current[i] = img;

        // ✅ FIRST FRAME DRAW (CRITICAL)
        if (i === 0) {
          requestAnimationFrame(render);
        }
      };
    }
  };

  /* ------------------ EFFECT ------------------ */
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    resizeCanvas();
    preload();

    const onResize = () => {
      resizeCanvas();
      render();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", onResize);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${scrollLength}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = Number((self.progress * 100).toFixed(2));
          console.log("Scroll Progress:", progress);
        },
      },
      defaults: { ease: "none" },
    });

    tl.to(state.current, {
      frame: totalFrames - 1,
      duration: 1,
      onUpdate: () => {
        state.current.frame = Math.min(
          totalFrames - 1,
          Math.floor(state.current.frame)
        );
        render();
      },
    });

    ScrollTrigger.refresh();
    tl.progress(0.000);

    return () => {
      window.removeEventListener("resize", onResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-dvh overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />
      <div className="absolute w-full h-full inset-0 bg-black/16 z-20" />
      <div className="absolute inset-0 w-full h-full z-30 grid grid-cols-4 grid-rows-3 items-baseline px-4 sm:px-6 lg:px-10 pt-30 sm:pt-25 pb-10">
        <span className="row-span-1 h-full col-span-2 text-heading1 sm:text-display text-white tracking-heading1 sm:tracking-display leading-[110%] font-semibold 2xl:text-[10vw]">
          Nature
        </span>
        <span className="row-span-1 col-span-2 col-start-2 w-full h-full flex justify-center items-center text-white text-heading2 tracking-heading2 leading-[110%] font-medium 2xl:text-6xl">
          Meet
        </span>
        <div className="row-span-1 col-span-4 h-full grid grid-cols-4 items-end gap-x-4 sm:gap-x-5 lg:gap-x-7.5 gap-y-6">
          <p className="w-[80%] order-2 sm:order-1 text-white text-bodyBase 2xl:text-[1.25vw] tracking-text leading-[110%] font-normal col-span-4 sm:col-span-2">
            For 50 years, Laila Nutra has transformed India’s botanical heritage
            into patented, clinically proven health solutions trusted in 25
            countries.
          </p>
          <span className="col-span-4 order-1 sm:order-2 sm:col-span-2 text-right text-heading1 sm:text-display text-white tracking-heading1 sm:tracking-display leading-[110%] font-semibold 2xl:text-[10vw]">
            Science
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;