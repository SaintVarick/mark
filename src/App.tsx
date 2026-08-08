import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type Project = {
  name: string;
  description: string;
  accent: string;
  accentSoft: string;
  surfaces: string[];
  industry: string;
  since: string;
  chains: { label: string; color: string }[];
  socials: string[];
  note?: string;
};

const projects: Project[] = [
  {
    name: "Aave Labs",
    description:
      "Developers of the Aave Protocol, which allows users to supply and borrow a wide range of digital assets without intermediaries, and Aave.com, an easy way to directly interact with the protocol and community.",
    accent: "#9b8cff",
    accentSoft: "#d0c5ff",
    surfaces: ["Protocol", "App"],
    industry: "DeFi",
    since: "2017",
    chains: [
      { label: "B", color: "#f2a900" },
      { label: "E", color: "#e6d2b5" },
      { label: "V", color: "#21b69a" },
      { label: "A", color: "#00a8a8" },
      { label: "P", color: "#8247e5" },
      { label: "O", color: "#ff284c" },
      { label: "A", color: "#f04438" },
      { label: "R", color: "#4878a8" },
      { label: "C", color: "#1b72e8" },
      { label: "E", color: "#343b43" },
    ],
    socials: ["web", "x", "discord", "lens"],
    note: "Core features include risk mitigation tools, flash loans, and more.",
  },
  {
    name: "Family",
    description:
      "Family is the simple, yet powerful, everyday crypto wallet for mobile devices. The Family team is also behind ConnectKit, a popular developer library for seamless connections between wallets and dapps.",
    accent: "#ff916f",
    accentSoft: "#ffab8e",
    surfaces: ["App", "SDK"],
    industry: "DeFi",
    since: "2022",
    chains: [
      { label: "C", color: "#1b72e8" },
      { label: "R", color: "#4878a8" },
      { label: "O", color: "#ff284c" },
      { label: "P", color: "#8247e5" },
      { label: "E", color: "#343b43" },
    ],
    socials: ["web", "x"],
  },
  {
    name: "Lens",
    description:
      "Lens is a high-performance blockchain purpose-built for SocialFi use cases. Featuring built-in social primitives and decentralized storage, Lens offers developers the fastest, most cost-effective and scalable solution, while delivering an exceptional user experience.",
    accent: "#31c9f4",
    accentSoft: "#9bdcf5",
    surfaces: ["Protocol", "SDK"],
    industry: "Social",
    since: "2022",
    chains: [],
    socials: ["web", "lens", "x", "discord"],
  },
  {
    name: "GHO",
    description:
      "GHO, developed by Aave Labs, is a decentralized, over-collateralized stablecoin that's native to the Aave Protocol. It serves as an internet payment layer and as a reliable digital asset for storing value over time.",
    accent: "#71f59a",
    accentSoft: "#9effbb",
    surfaces: ["Stablecoin"],
    industry: "DeFi",
    since: "2023",
    chains: [
      { label: "R", color: "#4878a8" },
      { label: "E", color: "#343b43" },
    ],
    socials: ["web", "x", "lens"],
  },
];

function GhostMascot({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 540 760" role="img" aria-label="Aave ghost mascot">
      <defs>
        <filter id="ghost-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="13" stdDeviation="8" floodColor="#7665db" floodOpacity=".16" />
        </filter>
      </defs>
      <g filter="url(#ghost-shadow)" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M184 220c-42-31-67-88-52-134 13-40 57-69 108-71 68-3 116 31 143 91 53-3 93 13 105 41 10 25-10 55-62 74 34 50 48 109 44 176-5 88-29 216-70 298-11 22-28 27-46 6-23 35-62 35-93 5-32 30-68 23-86-8-41 26-80 5-84-31-39-15-54-54-25-80-32-19-34-60 0-86-8-39 11-69 46-96 18-15 34-32 41-53-17-45-21-88-13-122 6-25 21-34 44-10Z"
          fill="#fefeff"
          stroke="#8e7af0"
          strokeWidth="20"
        />
        <path d="M183 226c-19 44-18 98 11 154" fill="none" stroke="#dfe0ff" strokeWidth="18" />
        <path d="M114 406c-4 35-28 55-57 76-28 20-35 50-15 66 16 14 46 10 74-8" fill="#fff" stroke="#452f68" strokeWidth="9" />
        <path d="M137 517c-21 20-44 31-69 39-32 11-34 46-7 63 14 9 35 12 54 8" fill="#fff" stroke="#452f68" strokeWidth="9" />
        <path d="M384 294c55-19 76 16 66 52-5 19-19 39-42 52" fill="#fff" stroke="#452f68" strokeWidth="9" />
        <path d="M112 477c-15 10-30 15-45 12" fill="none" stroke="#452f68" strokeWidth="9" />
        <path d="M110 591c18-7 35-18 50-33" fill="none" stroke="#452f68" strokeWidth="9" />
        <path d="M170 671c35-19 62-40 86-70m60 105 17-24m40 16 17-54" fill="none" stroke="#452f68" strokeWidth="9" />
        <path
          d="M153 252c-35-48-31-118 3-166 27-38 74-58 124-55 57 3 104 32 130 81-73-2-155 36-257 140Z"
          fill="#dfe0ff"
          stroke="#452f68"
          strokeWidth="10"
        />
        <path
          d="M151 253c51-8 66-35 105-71 48-44 111-68 166-60 46 6 74 22 72 45-2 23-35 41-75 45-46 5-76 31-111 61-39 33-75 48-112 46Z"
          fill="#b4b0ff"
          stroke="#452f68"
          strokeWidth="10"
        />
        <path d="M151 252c-13-38-12-82 5-117" fill="none" stroke="#796ee3" strokeWidth="9" />
        <path d="M259 99c1-20 16-36 34-36 14 0 25 8 31 19" fill="none" stroke="#978bff" strokeWidth="11" />
        <circle cx="281" cy="91" r="9" fill="#978bff" stroke="none" />
        <circle cx="306" cy="85" r="9" fill="#978bff" stroke="none" />
        <ellipse cx="267" cy="324" rx="13" ry="18" fill="#422a66" stroke="none" />
        <ellipse cx="326" cy="311" rx="13" ry="18" fill="#422a66" stroke="none" />
        <ellipse cx="233" cy="342" rx="15" ry="11" fill="#e1e0ff" stroke="none" />
        <ellipse cx="359" cy="328" rx="14" ry="10" fill="#e1e0ff" stroke="none" />
        <path d="M132 29c-13-8-31 0-36 17-5 18 6 34 23 32 12-1 21-11 22-23" fill="#a79aff" stroke="#452f68" strokeWidth="9" />
      </g>
    </svg>
  );
}

function FamilyMascot({ className = "" }: { className?: string }) {
  const flowerPath =
    "M350 105C318 38 224 36 198 116C128 70 54 143 101 214C21 242 31 340 106 365C41 413 84 506 167 489C169 574 269 604 315 536C356 613 454 589 463 511C542 546 604 461 548 402C627 365 609 267 535 249C583 175 503 103 440 142C423 57 378 48 350 105Z";
  return (
    <svg className={className} viewBox="0 0 700 650" role="img" aria-label="Family flower mascot">
      <defs>
        <filter id="family-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="12" stdDeviation="9" floodColor="#ff916f" floodOpacity=".12" />
        </filter>
      </defs>
      <g filter="url(#family-shadow)" transform="translate(25 10) scale(1.08)" strokeLinejoin="round">
        <path d={flowerPath} fill="#fff" stroke="#ff916f" strokeWidth="30" />
        <path d={flowerPath} fill="#fff" stroke="#372715" strokeWidth="9" />
        <path d="M215 236 464 228l8 249-249 10Z" fill="#ff916f" stroke="#372715" strokeWidth="14" />
        <path d="m237 259 204-7 7 201-205 8Z" fill="#020202" stroke="none" />
      </g>
    </svg>
  );
}

function LensMascot({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 900 590" role="img" aria-label="Lens cloud mascot">
      <defs>
        <linearGradient id="cloud-fill" x1=".2" y1="0" x2=".8" y2="1">
          <stop stopColor="#d7f7ff" />
          <stop offset="1" stopColor="#c0eff8" />
        </linearGradient>
        <filter id="cloud-shadow" x="-15%" y="-20%" width="130%" height="155%">
          <feDropShadow dx="0" dy="13" stdDeviation="10" floodColor="#10bcec" floodOpacity=".15" />
        </filter>
      </defs>
      <g filter="url(#cloud-shadow)" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M226 467C91 440 28 354 61 259c26-75 102-109 171-78 22-105 153-145 233-68 53-95 203-62 208 61 94-43 190 14 184 112-6 97-103 175-241 198-132 22-274 7-390-17Z"
          fill="url(#cloud-fill)"
          stroke="#1ac8f5"
          strokeWidth="28"
        />
        <path
          d="M226 467C91 440 28 354 61 259c26-75 102-109 171-78 22-105 153-145 233-68 53-95 203-62 208 61 94-43 190 14 184 112-6 97-103 175-241 198-132 22-274 7-390-17Z"
          fill="none"
          stroke="#102d52"
          strokeWidth="9"
        />
        <path d="M278 332c19-51 81-50 103 1" fill="none" stroke="#102d52" strokeWidth="15" />
        <path d="M486 337c19-51 82-49 103 4" fill="none" stroke="#102d52" strokeWidth="15" />
        <ellipse cx="331" cy="326" rx="23" ry="28" fill="#102d52" stroke="none" />
        <ellipse cx="539" cy="331" rx="23" ry="28" fill="#102d52" stroke="none" />
        <path d="M389 390c34 40 91 44 132 7" fill="none" stroke="#102d52" strokeWidth="16" />
      </g>
    </svg>
  );
}

function GhoMascot({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 650 650" role="img" aria-label="GHO coin mascot">
      <defs>
        <filter id="gho-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="12" stdDeviation="9" floodColor="#00d86e" floodOpacity=".15" />
        </filter>
      </defs>
      <g filter="url(#gho-shadow)">
        <circle cx="325" cy="325" r="284" fill="#74f59a" stroke="#00da70" strokeWidth="25" />
        <circle cx="325" cy="325" r="269" fill="none" stroke="#004c0b" strokeWidth="8" />
        <path d="M456 359a166 166 0 1 1 3-72" fill="none" stroke="#004c0b" strokeWidth="58" />
        <path d="m448 352 83 24-37 135-59 38 36-130-45-13Z" fill="#004c0b" />
        <circle cx="280" cy="288" r="29" fill="#004c0b" />
        <circle cx="355" cy="306" r="29" fill="#004c0b" />
      </g>
    </svg>
  );
}

const mascotComponents = [GhostMascot, FamilyMascot, LensMascot, GhoMascot];

function SoundButton() {
  const [enabled, setEnabled] = useState(false);
  const audioRef = useRef<{ context: AudioContext; oscillators: OscillatorNode[] } | null>(null);

  const toggleSound = () => {
    if (enabled) {
      audioRef.current?.context.close();
      audioRef.current = null;
      setEnabled(false);
      return;
    }

    const AudioCtx = window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const context = new AudioCtx();
    const master = context.createGain();
    master.gain.value = 0.015;
    master.connect(context.destination);
    const oscillators = [92, 138].map((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = index ? "sine" : "triangle";
      oscillator.frequency.value = frequency;
      gain.gain.value = index ? 0.35 : 0.5;
      oscillator.connect(gain).connect(master);
      oscillator.start();
      return oscillator;
    });
    audioRef.current = { context, oscillators };
    setEnabled(true);
  };

  useEffect(() => () => {
    audioRef.current?.context.close();
  }, []);

  return (
    <button className="sound-button" onClick={toggleSound} aria-label={enabled ? "Mute ambient sound" : "Play ambient sound"}>
      <svg viewBox="0 0 30 30" aria-hidden="true">
        <path d="M4 12h5l6-5v16l-6-5H4Z" />
        {enabled ? <><path d="M19 11c2 2 2 6 0 8" /><path d="M22 7c5 4 5 12 0 16" /></> : <path d="m20 11 7 8m0-8-7 8" />}
      </svg>
    </button>
  );
}

function AvaraMark() {
  return (
    <div className="avara-mark" aria-label="Avara">
      <svg viewBox="0 0 144 24" role="img">
        <path d="M0 20 12 3h8l11 17h-8L16 9 8 20Zm35 0L24 3h8l7 11L47 3h8L43 20Zm16 0L63 3h8l11 17h-8L67 9l-8 11Zm31 0V3h24c6 0 9 3 9 8 0 3-2 6-6 7l7 2h-11l-7-6h9c2 0 3-1 3-3s-1-3-3-3H90v12Zm33 0 12-17h8l11 17h-8l-7-11-8 11Z" fill="currentColor" />
      </svg>
    </div>
  );
}

function Intro({ onSelect }: { onSelect: (index: number) => void }) {
  return (
    <motion.div
      className="intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.28, filter: "blur(6px)" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="intro-group" aria-label="Explore the Avara family">
        {mascotComponents.map((Mascot, index) => (
          <motion.button
            key={projects[index].name}
            className={`intro-mascot intro-mascot-${index}`}
            onClick={() => onSelect(index)}
            aria-label={`Explore ${projects[index].name}`}
            initial={{ opacity: 0, y: 24, rotate: index === 0 ? -3 : index === 3 ? 3 : 0 }}
            animate={{ opacity: 1, y: [0, -7, 0] }}
            transition={{
              opacity: { delay: 0.12 + index * 0.07, duration: 0.5 },
              y: { delay: 0.15 + index * 0.18, duration: 4.5 + index * 0.2, repeat: Infinity, ease: "easeInOut" },
            }}
            whileHover={{ y: -16, scale: 1.04, zIndex: 10 }}
            whileTap={{ scale: 0.97 }}
          >
            <Mascot className="mascot-svg" />
          </motion.button>
        ))}
      </div>
      <footer className="intro-footer">
        <AvaraMark />
        <nav aria-label="Footer links">
          <a href="https://x.com/avara" target="_blank" rel="noreferrer">X</a>
          <span>·</span>
          <a href="https://hey.xyz" target="_blank" rel="noreferrer">Hey</a>
          <span>·</span>
          <a href="#journal">Blog</a>
          <span>·</span>
          <a href="#careers">Careers</a>
        </nav>
      </footer>
    </motion.div>
  );
}

function ChainDots({ chains }: { chains: Project["chains"] }) {
  if (!chains.length) return <span className="dash">-</span>;
  return (
    <div className="chain-dots" aria-label={chains.map((chain) => chain.label).join(", ")}>
      {chains.map((chain, index) => (
        <span key={`${chain.label}-${index}`} style={{ backgroundColor: chain.color }}>
          {chain.label}
        </span>
      ))}
    </div>
  );
}

function SocialIcon({ type }: { type: string }) {
  if (type === "web") {
    return <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" /><path d="M4 12h16M12 4c3 3 3 13 0 16m0-16c-3 3-3 13 0 16" /></svg>;
  }
  if (type === "x") return <svg viewBox="0 0 24 24"><path d="m5 4 14 16M19 4 5 20" /></svg>;
  if (type === "discord") {
    return <svg viewBox="0 0 24 24"><path d="M7 7c3-2 7-2 10 0 2 3 3 6 3 9-2 2-4 3-6 3l-1-2h-2l-1 2c-2 0-4-1-6-3 0-3 1-6 3-9Z" /><circle cx="9" cy="13" r="1" fill="currentColor" /><circle cx="15" cy="13" r="1" fill="currentColor" /></svg>;
  }
  return <svg viewBox="0 0 24 24"><path d="M6 8c4-5 11-3 12 2 1 5-4 8-8 7-4-1-5-6-1-8 3-1 5 1 5 4" /></svg>;
}

function DetailPanel({ project, direction }: { project: Project; direction: number }) {
  return (
    <motion.aside
      className="detail-panel"
      initial={{ x: "105%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "105%", opacity: 0 }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
      style={{ "--accent": project.accent, "--accent-soft": project.accentSoft } as React.CSSProperties}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={project.name}
          className="detail-content"
          initial={{ opacity: 0, y: direction >= 0 ? 24 : -24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: direction >= 0 ? -18 : 18 }}
          transition={{ duration: 0.34, ease: "easeOut" }}
        >
          <div className="detail-copy">
            <h1>{project.name}</h1>
            <p>{project.description}</p>
          </div>

          <dl className="project-facts">
            <div>
              <dt>Surfaces</dt>
              <dd className="surface-list">
                {project.surfaces.map((surface) => <span key={surface}>{surface}</span>)}
              </dd>
            </div>
            <div><dt>Industry</dt><dd>{project.industry}</dd></div>
            <div><dt>Since</dt><dd>{project.since}</dd></div>
            {project.chains.length > 0 && <div><dt>Chains</dt><dd><ChainDots chains={project.chains} /></dd></div>}
            <div><dt>Status</dt><dd>Active</dd></div>
          </dl>

          <div className="panel-footer">
            <div className="social-links">
              {project.socials.map((social, index) => (
                <a href="#connect" aria-label={`${project.name} ${social}`} key={`${social}-${index}`}><SocialIcon type={social} /></a>
              ))}
            </div>
            {project.note && <p>{project.note}</p>}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.aside>
  );
}

function Carousel({ active, onNavigate }: { active: number; onNavigate: (step: number) => void }) {
  const onPanEnd = (_: PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 55 || Math.abs(info.velocity.x) > 420) {
      onNavigate(info.offset.x < 0 ? 1 : -1);
    }
  };

  return (
    <motion.main className="carousel" onPanEnd={onPanEnd}>
      <motion.div className={`carousel-track track-${active}`}>
        {mascotComponents.map((Mascot, index) => (
          <motion.div
            className={`carousel-slide slide-${index}`}
            key={projects[index].name}
            animate={{ opacity: Math.abs(index - active) > 1 ? 0.42 : 1, scale: index === active ? 1 : 0.96 }}
            transition={{ duration: 0.55 }}
            aria-hidden={index !== active}
          >
            <Mascot className="carousel-mascot" />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="carousel-controls"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <button onClick={() => onNavigate(-1)} aria-label="Previous project">‹</button>
        <button onClick={() => onNavigate(1)} aria-label="Next project">›</button>
      </motion.div>
      <span className="slide-count" aria-live="polite">{active + 1} / {projects.length}</span>
    </motion.main>
  );
}

export default function App() {
  const [active, setActive] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);

  const navigate = useCallback((step: number) => {
    setDirection(step);
    setActive((current) => current === null ? 0 : (current + step + projects.length) % projects.length);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (active === null) {
        if (event.key === "Enter" || event.key === " ") setActive(0);
        return;
      }
      if (event.key === "ArrowRight") navigate(1);
      if (event.key === "ArrowLeft") navigate(-1);
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, navigate]);

  const selectProject = (index: number) => {
    setDirection(index >= (active ?? 0) ? 1 : -1);
    setActive(index);
  };

  return (
    <div className={`app-shell ${active !== null ? "is-open" : ""}`}>
      <SoundButton />
      <AnimatePresence mode="wait">
        {active === null ? (
          <Intro key="intro" onSelect={selectProject} />
        ) : (
          <motion.div
            className="experience"
            key="experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <button className="home-button" onClick={() => setActive(null)} aria-label="Back to Avara home">
              <AvaraMark />
            </button>
            <Carousel active={active} onNavigate={navigate} />
            <DetailPanel project={projects[active]} direction={direction} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}