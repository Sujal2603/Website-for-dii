"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, Autoplay, Keyboard, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

const memories = [
  { src: "/photos/photo1.jpg", title: "A Perfect Sister", date: "May, 2025", story: "I don't know about story of this photo, but yeah isme aap and dii dono bhot khush ho, so all i want ki aap humesha khush raho..", size: "tall" },
  { src: "/photos/photo2.jpeg", title: "A Perfect Daughter", date: "May, 2025", story: "A Prefect photo with mummy, aap dono bhot acche lgg rhe ho and ye photo sach me bhot acchi hai..", size: "wide" },
  { src: "/photos/photo3.jpeg", title: "Ghar ki Chotu Princess", date: "March, 2026", story: "About this day.., 22 March, one of my favourite day, mza aaya tha flowers collect krne me and ghumne me bhi.., and V-Mart me bhot saari photos lene me bhi.", size: "standard" },
  { src: "/photos/photo4.jpeg", title: "Sisters ki Favouriate..", date: "June, 2024", story: "Yeah!! Ghar ka sbse chota baccha ho aap and sbki favourite baccha bhi ho, and ye photo sach me bhot beautiful hai.", size: "tall" },
  { src: "/photos/photo5.jpeg", title: "Main character energy- As a golu Molu Baccha", date: "November, 2010", story: "Ye photo!! Sach me bhot cute lgg rhe ho aap, and ye curly hairs, and innocent sa expression, mn kr rha hai pareshan kr k bhaag jaye🥲.", size: "standard" },
  { src: "/photos/photo6.jpeg", title: "Our golden hour with a happy family", date: "December, 2025", story: "Ye family photo bhot zyada acchi hai, yeah poori family same lgg rhi hai but and aap family ka sbse chhota version ho.", size: "wide" },
  { src: "/photos/photo7.jpeg", title: "Perfect Roommate, sister, daughter & Wife", date: "Februray, 2026", story: "Ye photo, Canteen ki 16 April ko li thi aavai baithe baithe itni acchi memory create kr li thi..and thankyou humesha mere bhaalu ka dhyan rakhne k liye dii😭", size: "standard" },
  { src: "/photos/photo8.jpeg", title: "At last a beautiful Person", date: "Forever & always", story: "20 March, koi to fuddu sa event tha BBAU ka, but yeah aap dono bhot beautiful lgg rhe ho..Hume bhi hona tha photo me🤧", size: "tall" },
];

const timeline = [
  { year: "2007", title: "A little star arrived", text: "The day our family got warmer, louder, and infinitely more interesting." },
  { year: "2025", title: "The day when me firstly met", text: "Silent, cute, with chotu si height, and a strong girl with no fear." },
  { year: "2026", title: "My Sister", text: "You began becoming more friendly, my little sister, and chota baccha of our group and a mature baccha." },
  { year: "Today", title: "Your beautiful now", text: "Still kind. Still curious. Still making ordinary days feel like a small celebration. Thankyou for everything Dii" },
];

const Paw = ({ style }: { style?: React.CSSProperties }) => <span className="paw" style={style}>🐾</span>;

function CatFace({ sleepy = false }: { sleepy?: boolean }) {
  return (
    <div className={`cat-face ${sleepy ? "sleepy" : ""}`} aria-hidden="true">
      <i className="ear left"/><i className="ear right"/>
      <span className="eye left"/><span className="eye right"/>
      <b className="nose">♥</b><span className="whiskers">≋　≋</span>
    </div>
  );
}

export default function Home() {
  const [dark, setDark] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [thumbs, setThumbs] = useState<SwiperType | null>(null);
  const [letterOpen, setLetterOpen] = useState(false);
  const [music, setMusic] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [toast, setToast] = useState("");
  const hero = useRef<HTMLElement>(null);
  const audio = useRef<AudioContext | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  useEffect(() => {
    if (prefersReduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(".hero-orb.one", { yPercent: 35, xPercent: 12, ease: "none", scrollTrigger: { trigger: hero.current, scrub: 1 } });
      gsap.to(".hero-copy", { y: 90, opacity: .22, ease: "none", scrollTrigger: { trigger: hero.current, start: "top top", end: "bottom top", scrub: 1 } });
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: .9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 86%" } });
      });
    });
    return () => ctx.revert();
  }, [prefersReduced]);

  useEffect(() => {
    if (prefersReduced) return;
    const move = (e: PointerEvent) => {
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
      const x = (e.clientX / innerWidth - .5) * 7;
      const y = (e.clientY / innerHeight - .5) * 5;
      document.documentElement.style.setProperty("--eye-x", `${x}px`);
      document.documentElement.style.setProperty("--eye-y", `${y}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [prefersReduced]);

  useEffect(() => {
    document.body.style.overflow = active !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  const meow = useCallback(() => {
    const Ctx = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine"; osc.frequency.setValueAtTime(620, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(330, ctx.currentTime + .34);
    gain.gain.setValueAtTime(.0001, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(.18, ctx.currentTime + .03); gain.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + .42);
    osc.connect(gain).connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + .45);
    setToast("mrrp! you found a tiny meow ♡"); setTimeout(() => setToast(""), 2200);
  }, []);

  const toggleMusic = () => {
    if (music) { audio.current?.close(); audio.current = null; setMusic(false); return; }
    const ctx = new AudioContext(); audio.current = ctx;
    const notes = [261.6, 329.6, 392, 523.2];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.type = "sine"; osc.frequency.value = freq;
      gain.gain.setValueAtTime(.0001, ctx.currentTime + i * .25); gain.gain.exponentialRampToValueAtTime(.035, ctx.currentTime + i * .25 + .03); gain.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + i * .25 + 1.5);
      osc.connect(gain).connect(ctx.destination); osc.start(ctx.currentTime + i * .25); osc.stop(ctx.currentTime + i * .25 + 1.6);
    });
    setMusic(true); setTimeout(() => setMusic(false), 2400);
  };

  const celebrate = () => {
    const colors = ["#ff8ead", "#a898e8", "#74cbe8", "#ffd36e"];
    for (let i = 0; i < 70; i++) {
      const bit = document.createElement("i"); bit.className = "confetti"; bit.style.left = `${Math.random()*100}%`; bit.style.background = colors[i%4]; bit.style.setProperty("--fall", `${3+Math.random()*3}s`); bit.style.setProperty("--drift", `${-120+Math.random()*240}px`); document.body.appendChild(bit); setTimeout(() => bit.remove(), 6500);
    }
  };

  return (
    <main>
      <AnimatePresence>{!loaded && <motion.div className="loader" exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: .6 }}><div className="loader-cat"><CatFace/><span>gathering our favorite memories…</span><i/></div></motion.div>}</AnimatePresence>
      <div className="cursor-glow" aria-hidden="true"/>
      <nav aria-label="Main navigation">
        <a href="#home" className="brand"><span>♡</span> for my favorite human - Astha Dii</a>
        <div className="nav-links"><a href="#memories">Memories</a><a href="#timeline">Our story</a><a href="#letter">A letter</a></div>
        <div className="nav-actions"><button onClick={toggleMusic} aria-label="Play a little tune" className={music ? "playing" : ""}>{music ? "♫" : "♪"}</button><button onClick={() => setDark(!dark)} aria-label="Toggle color theme">{dark ? "☀" : "☾"}</button></div>
      </nav>

      <section className="hero" id="home" ref={hero}>
        <div className="noise"/><div className="hero-orb one"/><div className="hero-orb two"/>
        {[...Array(10)].map((_, i) => <Paw key={i} style={{ left: `${5+i*10}%`, animationDelay: `${i*.43}s`, animationDuration: `${7+i%3}s` }}/>) }
        <div className="hero-copy">
          <motion.p className="eyebrow typewriter" initial={{ opacity:0, y:12 }} animate={loaded ? {opacity:1,y:0}: {}}>A tiny universe, made for my favorite human</motion.p>
          <motion.h1 initial={{opacity:0,y:35}} animate={loaded ? {opacity:1,y:0}: {}} transition={{delay:.18,duration:.9}}>You make life feel<br/><em>softer & brighter.</em></motion.h1>
          <motion.p className="intro" initial={{opacity:0}} animate={loaded ? {opacity:1}: {}} transition={{delay:.55}}>For my sister, my forever friend, and the person who knows all my chapters—even the messy ones.</motion.p>
          <motion.div className="hero-buttons" initial={{opacity:0,y:15}} animate={loaded ? {opacity:1,y:0}: {}} transition={{delay:.75}}><a className="primary" href="#memories">Step into our story <span>↓</span></a><button className="text-button" onClick={celebrate}>sending some Magic ✦</button></motion.div>
        </div>
        <motion.div className="mascot-scene" initial={{opacity:0,scale:.75,rotate:7}} animate={loaded ? {opacity:1,scale:1,rotate:0}: {}} transition={{delay:.25,type:"spring",stiffness:80}}>
          <span className="float-heart h1">♡</span><span className="float-heart h2">✦</span><span className="float-heart h3">♥</span>
          <div className="mascot-cat"><div className="tail"/><div className="body"/><CatFace/><div className="arm">◡</div><div className="scarf"/></div>
          <div className="mascot-note">psst… you’re very loved <span>♥</span></div>
        </motion.div>
        <div className="scroll-cue"><span>scroll for the good stuff</span><i/></div>
      </section>

      <section className="marquee" aria-label="A loving message"><div>BIG DREAMS ✦ SOFT HEART ✦ BRIGHT SOUL ✦ BEST SISTER ✦ BIG DREAMS ✦ SOFT HEART ✦ BRIGHT SOUL ✦ BEST SISTER ✦</div></section>

      <section className="section memories" id="memories">
        <div className="section-heading reveal"><div><p className="eyebrow">The memory jar</p><h2>Little moments,<br/><em>kept forever.</em></h2></div><p>Tap any photo to uncover the story tucked inside. Some days deserve more than a camera roll.</p></div>
        <div className="memory-grid">
          {memories.map((m, i) => <motion.button key={m.title} className={`memory-card ${m.size} reveal`} whileHover={{y:-8}} onClick={() => setActive(i)} aria-label={`Open memory: ${m.title}`}><img src={m.src} alt="A cherished portrait memory" loading="lazy"/><span className="memory-shade"/><span className="memory-index">0{i+1}</span><span className="memory-label"><small>{m.date}</small><b>{m.title}</b><i>↗</i></span></motion.button>)}
        </div>
      </section>

      <section className="section timeline-section" id="timeline">
        <div className="timeline-cat reveal"><CatFace sleepy/><span className="zzz">z z z</span></div>
        <div className="section-heading reveal"><div><p className="eyebrow">Then, now, always</p><h2>Knowing up,<br/><em>side by side.</em></h2></div></div>
        <div className="timeline-line"><span/>{timeline.map((item, i) => <article className="timeline-item reveal" key={item.year}><div className="timeline-dot">♥</div><p>{item.year}</p><h3>{item.title}</h3><span>{item.text}</span>{i===3 && <b className="tape">and the best is yet to come</b>}</article>)}</div>
      </section>

      <section className="section about">
        <div className="about-card reveal">
          <div className="about-visual"><img src={memories[2].src} alt="A joyful portrait" loading="lazy"/><span>certified<br/>wonderful<br/>human ★</span></div>
          <div className="about-copy"><p className="eyebrow">About this extraordinary girl</p><h2>Equal parts<br/><em>magic & mettle.</em></h2><p>She’s the kind of person who remembers the little things, laughs with her whole face, and makes people feel like they belong. And she is perfect in every sense, and my pocket is sill waiting for you.</p><div className="stats"><div><b>∞</b><span>reasons to Trust her</span></div><div><b>10/10</b><span>our talks</span></div><div><b>24/7</b><span>main character energy</span></div></div><div className="chips"><span>🤧Chota baccha</span><span>♫ perfect Girl</span><span>✈ little adventures</span><span>☾ big dreams</span></div></div>
        </div>
      </section>

      <section className="letter-section" id="letter">
        <div className="letter-stars">✦　·　♡　·　✦</div>
        <p className="eyebrow reveal">One last thing</p><h2 className="reveal">I wrote you<br/><em>a little something.</em></h2>
        <div className={`envelope-wrap reveal ${letterOpen ? "open" : ""}`}>
          <div className="letter-paper"><p>My dearest sister,</p><p>In every version of my life, I’d choose you again. Thank you for being the beautiful sister, wonderful person, the mature baccha, and the quiet courage beside me.</p><p>I hope life is gentle with your heart and wildly generous with your dreams. Wherever we go, you’ll always have a home in me.</p><p>Love you beyond words,</p><strong>Your forever teammate ♡</strong></div>
          <button className="envelope" onClick={() => setLetterOpen(!letterOpen)} aria-expanded={letterOpen}><span className="flap"/><span className="seal">♥</span><small>{letterOpen ? "close letter" : "open me"}</small></button>
        </div>
      </section>

      <footer><div className="walking-cat"><div className="tail"/><CatFace/></div><p>Made with unreasonable amounts of love <span>♥</span></p><p>Keep being you. The world is better for it.</p><button onClick={celebrate}>celebrate her ✦</button></footer>

      <button className="cat-assistant" onClick={meow} aria-label="Say hello to Momo the cat"><CatFace/><span>say hi to Momo- Your Brother - Sujal😈 </span></button>
      <AnimatePresence>{toast && <motion.div className="toast" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:10}}>{toast}</motion.div>}</AnimatePresence>

      <AnimatePresence>{active !== null && <motion.div className="modal" role="dialog" aria-modal="true" aria-label="Memory gallery" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setActive(null)}>
        <button className="modal-close" onClick={() => setActive(null)} aria-label="Close gallery">×</button>
        <motion.div className="modal-shell" initial={{scale:.94,y:30}} animate={{scale:1,y:0}} exit={{scale:.96}} onClick={e => e.stopPropagation()}>
          <button className="modal-autoplay" onClick={() => setAutoPlay(!autoPlay)}>{autoPlay ? "pause stories Ⅱ" : "play stories ▶"}</button>
          <Swiper initialSlide={active} modules={[Navigation,Pagination,Thumbs,Autoplay,Keyboard,A11y]} navigation pagination={{type:"fraction"}} autoplay={autoPlay ? {delay:4500,disableOnInteraction:false,pauseOnMouseEnter:true} : false} keyboard={{enabled:true}} thumbs={{swiper: thumbs && !thumbs.destroyed ? thumbs : null}} className="main-slider" onSlideChange={s => setActive(s.activeIndex)}>
            {memories.map(m => <SwiperSlide key={m.title}><div className="slide-photo"><img src={m.src} alt={m.title}/></div><motion.div className="slide-story" key={`${m.title}-${active}`} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}}><p>{m.date}</p><h3>{m.title}</h3><span>{m.story}</span><small>memory {String(memories.indexOf(m)+1).padStart(2,"0")} / {String(memories.length).padStart(2,"0")}</small></motion.div></SwiperSlide>)}
          </Swiper>
          <Swiper onSwiper={setThumbs} modules={[Thumbs]} slidesPerView={6} spaceBetween={10} watchSlidesProgress className="thumb-slider">{memories.map(m => <SwiperSlide key={m.src}><img src={m.src} alt=""/></SwiperSlide>)}</Swiper>
        </motion.div>
      </motion.div>}</AnimatePresence>
    </main>
  );
}
