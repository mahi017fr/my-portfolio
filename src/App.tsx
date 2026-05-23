/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence, useMotionValue } from "motion/react";
import { ServiceCard } from "./components/ServiceCard";
import { TypingCodeBlock } from "./components/TypingCodeBlock";
import ClickSpark from "./components/ClickSpark";
import Dither from "./components/Dither";
import LetSTalk3D from "./components/LetSTalk3D";
import { 
  ArrowUpRight, 
  Github, 
  Linkedin, 
  Mail, 
  ChevronRight,
  Code2,
  Cpu,
  Globe,
  Zap,
  Activity,
  ShieldCheck,
  Box,
  Instagram,
  Menu,
  X,
  FileText,
  Twitter,
  MessageSquare,
  ExternalLink,
  Atom,
  Wind,
  Database
} from "lucide-react";

const PROJECTS = [
  {
    id: 1,
    title: "RialoHub",
    category: "Web3 Engineering",
    description: "Decentralized prediction market powered by real-time data and market node analysis, built on Sepolia testnet.",
    image: "https://i.ibb.co/svSGrgdw/image.png",
    tags: ["Solidity", "Sepolia Testnet", "Ethers.js", "React"],
    demoUrl: "https://github.com/mahi017fr",
    role: "Lead Smart Contract & Frontend Developer",
    stats: { primary: "Sepolia Live", secondary: "100% Reliable", tertiary: "Zero Fee Swap" },
    challenge: "Developing high-fidelity on-chain forecast resolution with gas-optimized oracle interactions.",
    solution: "Created modular smart contracts with real-time prediction pools and interactive token swap mechanics.",
    imageClass: "object-contain scale-102 group-hover:scale-105",
    bgClass: "bg-[#060606]"
  },
  {
    id: 2,
    title: "Intellipath AI",
    category: "AI & Automation",
    description: "An advanced AI-powered chatbot and prompt generation application offering fluid dialogues and contextual responses.",
    image: "https://media.discordapp.net/attachments/1457305239525920936/1506953434551685191/image.png?ex=6a102340&is=6a0ed1c0&hm=e5685ab61a7597b80089113dee40ca14eda5cfb67ecc459fb8eff3720f8f5d23&=&format=webp&quality=lossless&width=1554&height=777",
    tags: ["Gemini API", "React", "Node.js", "Tailwind CSS"],
    demoUrl: "https://github.com/mahi017fr",
    role: "Full-Stack AI Developer",
    stats: { primary: "Instant Flow", secondary: "99.9% Context", tertiary: "Multi-Model" },
    challenge: "Achieving zero-latency conversation flows with rich multi-turn context retention.",
    solution: "Implemented real-time streaming wrappers with client-side reactive token parsing and prompt memory buffering.",
    imageClass: "object-contain scale-102 group-hover:scale-105",
    bgClass: "bg-[#0a0b10]"
  },
  {
    id: 3,
    title: "Mahix NFT Market",
    category: "Web3 Engineering",
    description: "A premium Web3 NFT marketplace for trading, showcasing, and verifying digital art collections securely on-chain.",
    image: "https://media.discordapp.net/attachments/1457305239525920936/1506956023448211536/image.png?ex=6a1025a9&is=6a0ed429&hm=851150c3cdf55f62777bd3d5f10ac669f55263775884c7b5da0d4c491981f069&=&format=webp&quality=lossless&width=1706&height=777",
    tags: ["ERC-721A", "Solidity", "IPFS", "Hardhat"],
    demoUrl: "https://github.com/mahi017fr",
    role: "Smart Contract Architect",
    stats: { primary: "ERC-721A Live", secondary: "-45% Gas Cost", tertiary: "IPFS Linked" },
    challenge: "Mitigating massive minting transaction costs during peak congestion across decentralized exchanges.",
    solution: "Integrated optimized batch-minting layouts and secure metadata persistence pipelines coupled with IPFS content hash matching.",
    imageClass: "object-contain scale-[1.01] group-hover:scale-103",
    bgClass: "bg-[#050505]"
  },
  {
    id: 4,
    title: "ARCFI",
    category: "Web3 Engineering",
    description: "A decentralized USDC-based staking platform deployed on the Arc Testnet, featuring high-yield interest pools and automatic reward distribution.",
    image: "https://media.discordapp.net/attachments/1457305239525920936/1506953393665740800/image.png?ex=6a102336&is=6a0ed1b6&hm=30e643aea9bb170461523da90d92607b4ee2f5271ceae9382e01d353574298a1&=&format=webp&quality=lossless",
    tags: ["Solidity", "Arc Testnet", "USDC Staking", "Ethers.js"],
    demoUrl: "https://github.com/mahi017fr",
    role: "DeFi Contract Lead",
    stats: { primary: "Arc Testnet", secondary: "USDC Native", tertiary: "Dynamic APR" },
    challenge: "Resolving precision errors in Solidity dynamic compound interest accumulation calculations.",
    solution: "Developed fixed-point arithmetic models utilizing 18-decimal precision multipliers to track individual rewards.",
    imageClass: "object-contain scale-102 group-hover:scale-105",
    bgClass: "bg-[#070505]"
  },
  {
    id: 5,
    title: "Retro Survival Game",
    category: "Game Development",
    description: "An interactive, arcade-inspired pixel graphics survival shooter, featuring progressive difficulty algorithms and procedural enemy grids.",
    image: "https://media.discordapp.net/attachments/1457305239525920936/1506967855936049283/image.png?ex=6a1030ae&is=6a0edf2e&hm=cbf48b4dd57d633dd5fb12afb3244adbcfbf57be974fd35c0e3d15a553eefa79&=&format=webp&quality=lossless&width=1581&height=777",
    tags: ["HTML5 Canvas", "JavaScript", "Retro Audio", "Sprite Physics"],
    demoUrl: "https://github.com/mahi017fr",
    role: "Lead Solo Developer",
    stats: { primary: "60 FPS Active", secondary: "Infinite Wave", tertiary: "Sprite Engine" },
    challenge: "Rendering high-volume collision physics processes smoothly on low-powered mobile environments without thermal throttling.",
    solution: "Implemented frame-rate independent physics loops coupled with spatial grid partitions for rapid lookup operations.",
    imageClass: "object-contain scale-[1.01] group-hover:scale-103",
    bgClass: "bg-[#08080a]"
  },
  {
    id: 6,
    title: "Course Catalog Studio",
    category: "Legacy Projects",
    description: "An early-generation visual learning catalogue with integrated search index matches, interactive curriculums, and full mobile adaptability.",
    image: "https://cdn.discordapp.com/attachments/1457305239525920936/1506969189741494293/image.png?ex=6a1031ec&is=6a0ee06c&hm=076850210d442becf64e8be45a011764590d0ae6251dfefdbd3b91330013baf2",
    tags: ["HTML5", "CSS3 Features", "JS Indexes", "Fluid Flexbox"],
    demoUrl: "https://github.com/mahi017fr",
    role: "Frontend Architect",
    stats: { primary: "Fluid Adaptive", secondary: "Fast search", tertiary: "Legacy Code" },
    challenge: "Retrofitting absolute-unit columns of a legacy template to modern fully-responsive mobile viewport specifications.",
    solution: "Rebuilt the container structural bounds into scalable Grid columns using dynamic rem viewport relative sizing guidelines.",
    imageClass: "object-contain scale-[1.01] group-hover:scale-103",
    bgClass: "bg-[#0b0c0e]"
  }
];

const ROADMAP = [
  { year: "2022", event: "Crypto Genesis", detail: "Initiated a deep dive into decentralized finance and blockchain fundamentals, exploring the core protocols of the digital economy." },
  { year: "2023", event: "Web3 Transition", detail: "Began specialized research into decentralized application architecture and smart contract development environments." },
  { year: "2024", event: "Engineering Core", detail: "Formal transition into full-stack engineering, mastering modern frontend frameworks and high-performance development pipelines." },
  { year: "2025", event: "Market Impact", detail: "Successfully architected and launched a flagship production project, achieving high-fidelity execution and user validation." },
  { year: "2026", event: "Active Scaling", detail: "Managing a diverse portfolio of complex digital nodes, focusing on modular scaling and next-gen infrastructure. (Status: Ongoing)" },
  { year: "2027", event: "Future Vision", detail: "Expanding expertise in AI-driven decentralized apps and exploring advanced blockchain scalability solutions for global impact." },
];

const SERVICES = [
  { title: "Web & App Dev", icon: <Code2 className="w-5 h-5" />, desc: "Building pristine, high-performance web applications and mobile apps using modern React, Next.js, Node.js, and scaling technologies." },
  { title: "Blockchain Work", icon: <Box className="w-5 h-5" />, desc: "Architecting Ethereum-based DApps, writing highly secure smart contracts in Solidity, and facilitating node, wallet, and NFT integrations." },
  { title: "Web3 UI/UX Design", icon: <Zap className="w-5 h-5" />, desc: "Crafting beautiful, high-contrast, fully responsive design interfaces loaded with immersive layouts, typography, and interactive motion features." },
];

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeDetailProjectId, setActiveDetailProjectId] = useState<number | null>(null);

  return (
    <ClickSpark sparkColor="#ff8c42" sparkSize={29} sparkRadius={105} sparkCount={8} duration={400}>
      <div className="min-h-screen bg-neutral-950 text-neutral-200 noise-bg">
      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-brand-amber origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Modern Menu Bar */}
      <nav className="fixed top-10 left-10 z-50 flex pointer-events-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-1 p-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full"
        >
          {['About', 'Roadmap', 'Services', 'Work'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-white hover:bg-white/5 transition-all"
            >
              {item}
            </a>
          ))}
        </motion.div>
      </nav>

      {/* Hero Section - Refined Visuals */}
      <header className="relative min-h-screen w-full flex items-center overflow-hidden bg-neutral-950">
        {/* LIGHT SOURCE - Illuminating from the left logo area */}
        <div className="absolute top-1/2 left-0 w-[1400px] h-[1400px] bg-brand-amber/[0.12] blur-[200px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-brand-amber/[0.08] blur-[120px] rounded-full -translate-x-1/4 -translate-y-1/2 pointer-events-none z-0" />

        {/* TOP RIGHT TEXT */}
        <div className="absolute top-12 right-12 text-right z-30 hidden md:block opacity-30 grayscale">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400">Web3 Infrastructure</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-200">for the Future</p>
        </div>

        {/* BOTTOM LEFT TEXT */}
        <div className="absolute bottom-12 left-12 flex items-center gap-4 z-30 opacity-40 hover:opacity-100 transition-opacity grayscale">
          <Globe className="w-5 h-5 text-neutral-300" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em]">mahix.io</span>
        </div>

        <div className="w-full flex flex-col md:flex-row items-stretch justify-between px-6 md:px-12 relative z-20 h-screen">
          
          {/* LEFT: Massive Glowing Logo Element */}
          <div className="hidden md:flex w-1/4 flex-col justify-center h-full order-1 relative">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative ml-8 lg:ml-12"
            >
              {/* Intense focused light from logo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-amber/30 blur-[140px] rounded-full animate-pulse" />
              
              <div className="relative z-10">
                <motion.img 
                  src="https://i.ibb.co.com/1GkCg87r/a8fd39b7-2323-44a3-95c2-093a334466e7-removebg-preview.webp"
                  alt="Mahix Logo"
                  className="w-64 h-64 lg:w-96 lg:h-96 object-contain drop-shadow-[0_0_60px_rgba(255,140,66,0.8)]"
                  animate={{ 
                    y: [0, -20, 0],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* MIDDLE: Character Image (MUCH LARGER, fixed to bottom) */}
          <div className="w-full md:w-2/5 flex justify-center order-2 relative z-10 self-end h-[90vh]">
            <motion.div 
              initial={{ opacity: 0, y: 150 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="relative h-full flex items-end"
            >
              <img 
                src="https://i.ibb.co.com/gZYTSFq2/951a7c22-6c3b-4789-be9a-125ab18882e5-removebg-preview.png" 
                alt="Character" 
                className="h-[110%] w-auto max-w-none object-contain drop-shadow-[0_0_100px_rgba(255,140,66,0.1)] brightness-[1.1] transition-all duration-[2s]"
              />
            </motion.div>
          </div>

          {/* RIGHT: Typography & Buttons */}
          <div className="w-full md:w-2/5 flex flex-col items-center md:items-start gap-12 py-12 md:justify-center order-3 text-center md:text-left relative z-20 md:translate-x-12 lg:translate-x-20">
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="w-full max-w-lg"
            >
              <h1 className="font-display font-black text-6xl md:text-8xl xl:text-9xl tracking-tighter leading-[0.85] uppercase mb-10 text-white">
                I Build <br/>Web3 Flow
              </h1>
              <p className="text-neutral-400 text-[12px] md:text-sm leading-relaxed max-w-md mb-12 font-bold uppercase tracking-[0.4em] opacity-90 font-sans">
                Mahix provides the modular infrastructure you need to build the future of Web3.
              </p>

              {/* Icon Features Section - Matched to Screenshot */}
              <div className="flex flex-wrap md:flex-nowrap gap-10 mb-16 grayscale">
                <div className="flex items-center gap-4 group">
                  <div className="w-14 h-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center transition-all group-hover:border-brand-amber/30">
                    <Box className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-[11px] uppercase tracking-widest font-black leading-tight">
                    <p className="text-white">Modular</p>
                    <p className="text-neutral-500">Infrastructure</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-14 h-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center transition-all group-hover:border-brand-amber/30">
                    <ShieldCheck className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-[11px] uppercase tracking-widest font-black leading-tight">
                    <p className="text-white">Secure</p>
                    <p className="text-neutral-500">by Design</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-14 h-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center transition-all group-hover:border-brand-amber/30">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-[11px] uppercase tracking-widest font-black leading-tight">
                    <p className="text-white">Built for</p>
                    <p className="text-neutral-500">Web3</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Row Layout */}
              <div className="flex flex-row gap-6 w-full md:w-auto">
                <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-10 py-5 bg-brand-amber text-black font-black rounded-lg uppercase tracking-wider text-xs hover:bg-white transition-all transform hover:-translate-y-1 shadow-[0_20px_50px_rgba(255,140,66,0.2)]">
                  <Github className="w-5 h-5" />
                  GitHub Repository
                </button>
                <button 
                  onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex-1 md:flex-none flex items-center justify-center gap-3 px-10 py-5 bg-white/5 border border-white/10 backdrop-blur-md text-white font-black rounded-lg uppercase tracking-wider text-xs hover:bg-white/10 transition-all transform hover:-translate-y-1"
                >
                  View Projects
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* 2. ABOUT SECTION - FUTURISTIC UPGRADE WITH INTENSE SPOTLIGHT */}
      <section 
        id="about" 
        className="pt-32 pb-0 px-6 md:px-12 relative overflow-hidden bg-[#040405] border-t border-white/5 group/about"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
          e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
        }}
      >
        {/* Animated Aurora Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Dither
            colorStops={['#ff5e2c', '#ff8c42', '#2a1b3d']}
            amplitude={1.2}
            blend={0.6}
            speed={0.8}
          />
        </div>

        {/* Dynamic Cursor Light Effect - Intense "Grow" Background */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-700 opacity-0 group-hover/about:opacity-100"
          style={{
            background: `radial-gradient(450px circle at var(--mouse-x) var(--mouse-y), rgba(255, 140, 66, 0.25), transparent 60%)`
          } as any}
        />

        {/* Background Grid Motif */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>

        <div className="container mx-auto relative z-10 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-end">
            
            {/* Left Column: Narrative */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="pb-12 lg:pb-16"
            >
              {/* Technical Profile Data */}
              <div className="flex flex-wrap gap-1 items-center mb-8">
                <div className="h-[1.5px] px-0.5 flex items-center rounded-sm bg-brand-amber/10 border border-brand-amber/20">
                  <p className="font-mono text-[0.5px] text-brand-amber uppercase tracking-tighter leading-none">Sub: M_KHAN</p>
                </div>
                <div className="h-[1.5px] px-0.5 flex items-center rounded-sm bg-white/5 border border-white/10">
                  <p className="font-mono text-[0.5px] text-neutral-400 uppercase tracking-tighter leading-none">Age: <span className="text-white font-bold tracking-tighter">19_Y</span></p>
                </div>
              </div>

              <h2 className="font-display font-black text-6xl md:text-8xl uppercase tracking-tighter leading-none mb-12 italic text-white leading-tight">
                ABOUT <span className="amber-text-glow">ME.</span>
              </h2>

              <div className="space-y-12 text-neutral-400 font-light leading-relaxed max-w-xl text-lg">
                <p>
                  I construct digital architectures that respond to intent. Mahix is more than just code; it's a philosophy of modularity, decentralized scaling, and high-fidelity execution.
                </p>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap gap-6 pt-4">
                  <button className="flex items-center gap-3 px-8 py-4 bg-brand-amber text-black font-black rounded-lg uppercase tracking-wider text-xs hover:bg-white transition-all transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(255,140,66,0.2)]">
                    <FileText className="w-4 h-4" />
                    Download CV
                  </button>
                  <button className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-black rounded-lg uppercase tracking-wider text-xs hover:bg-white/10 transition-all transform hover:-translate-y-1">
                    <Mail className="w-4 h-4" />
                    Contact Me
                  </button>
                </div>

                {/* Social Links Sub-section */}
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500">Connect to Interface</p>
                  <div className="flex gap-8">
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-neutral-500 hover:text-brand-amber transition-colors group">
                      <Github className="w-5 h-5" />
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">GitHub</span>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-neutral-500 hover:text-brand-amber transition-colors group">
                      <Twitter className="w-5 h-5" />
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Twitter</span>
                    </a>
                    <a href="https://discord.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-neutral-500 hover:text-brand-amber transition-colors group">
                      <MessageSquare className="w-5 h-5" />
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Discord</span>
                    </a>
                  </div>
                </div>
                
                <div className="flex gap-12 pt-8 border-t border-white/5">
                  <div className="group relative">
                    <div className="absolute -inset-4 bg-brand-amber/5 blur-xl group-hover:bg-brand-amber/10 transition-all rounded-full" />
                    <p className="text-5xl font-display font-black text-white group-hover:text-brand-amber transition-colors relative">07+</p>
                    <p className="text-[9px] uppercase font-black tracking-[0.4em] text-neutral-600 mt-2 relative">Projects Successful</p>
                  </div>
                  <div className="group relative">
                    <div className="absolute -inset-4 bg-brand-amber/5 blur-xl group-hover:bg-brand-amber/10 transition-all rounded-full" />
                    <p className="text-5xl font-display font-black text-white group-hover:text-brand-amber transition-colors relative">35+</p>
                    <p className="text-[9px] uppercase font-black tracking-[0.4em] text-neutral-600 mt-2 relative">Projects</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Visual Core */}
            <div className="relative flex items-end">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative group w-full"
              >
                <img 
                  src="https://i.ibb.co.com/tMx7b8YB/abef82fddc6e3db86db23870f2a52277-removebg-preview.png" 
                  alt="Identity visualization" 
                  className="w-full h-auto object-contain block align-bottom"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ROADMAP SECTION - UNIFIED TECHNICAL PATH */}
      <section id="roadmap" className="py-24 px-6 md:px-12 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
        {/* ENHANCED SECTION-WIDE TECHNICAL GRID - MAXIMUM VISIBILITY */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Primary 4rem Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />
          {/* Secondary 1rem Sub-Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-20" />
          
          {/* Subtle Vignette/Fade Effects to preserve readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-40" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col items-center mb-24 text-center">
            <h2 className="font-display font-black text-6xl md:text-9xl uppercase tracking-tighter italic text-white text-glow-amber">ROADMAP</h2>
            <div className="w-20 h-[2px] bg-brand-amber mt-8 shadow-[0_0_20px_#ff8c42]" />
          </div>

          {/* GRID-CENTERED MAPPING AREA - COMPACT PIPE FLOW */}
          <div className="relative max-w-6xl mx-auto overflow-visible">
            {/* DESKTOP VIEW: Stunning 3:3 Interactive Serpentine Grid Map */}
            <div className="hidden lg:block relative h-[950px] w-full">
              {/* The Connecting Pipes - Multi-Layer Energy Flow - Highly Optimized for 60FPS Scroll */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Outer Shadow glow line (layered paths replace expensive Gaussian blurs for maximum fluidity) */}
                <motion.path 
                  d="M 15,22 L 50,22 L 85,22 L 85,75 L 50,75 L 15,75" 
                  stroke="#ff8c42" 
                  strokeWidth="0.9" 
                  fill="none" 
                  strokeOpacity="0.12"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                {/* Primary Pipe Framework */}
                <motion.path 
                  d="M 15,22 L 50,22 L 85,22 L 85,75 L 50,75 L 15,75" 
                  stroke="#ff8c42" 
                  strokeWidth="0.3" 
                  fill="none" 
                  strokeOpacity="0.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />

                {/* Intense Core Path */}
                <motion.path 
                  d="M 15,22 L 50,22 L 85,22 L 85,75 L 50,75 L 15,75" 
                  stroke="#ffffff" 
                  strokeWidth="0.1" 
                  fill="none" 
                  strokeOpacity="0.9"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />

                {/* PULSING FLOW PULSE - Pure CSS Glow */}
                <motion.circle r="0.6" fill="#ffffff" stroke="#ff8c42" strokeWidth="0.15">
                  <animateMotion 
                    dur="5s" 
                    repeatCount="indefinite" 
                    path="M 15,22 L 50,22 L 85,22 L 85,75 L 50,75 L 15,75" 
                  />
                </motion.circle>
              </svg>

              {[
                { 
                  year: '2022', 
                  label: 'WEB3 FOUNDATIONS', 
                  desc: 'In 2022, I started my journey into Web3. At that time, I was focused on learning the basics of blockchain, cryptocurrency, wallets, NFTs, and DeFi. Alongside this, I began learning web development with HTML, CSS, JavaScript, and React. My journey started with curiosity, exploring communities and building small beginner projects in Web3.', 
                  x: '15%', 
                  y: '22%' 
                },
                { 
                  year: '2023', 
                  label: 'SOLIDITY DEV', 
                  desc: 'In 2023, I became more serious about development. I started learning Solidity, Ethers.js, Hardhat, and smart contract deployment. During this time, I built simple NFT minting websites, token dashboards, and basic DApps. I also gained practical experience with GitHub, wallet integration, and blockchain interactions, which helped me understand real development workflows.', 
                  x: '50%', 
                  y: '22%' 
                },
                { 
                  year: '2024', 
                  label: 'FREELANCE READY', 
                  desc: 'In 2024, I moved into freelancing and real-world projects. I worked on full-stack Web3 development, UI/UX design for DApps, and smart contract integration. By collaborating with startups and Web3 communities, I gained real client experience and learned how to solve production-level problems. This helped me build a strong portfolio and developer identity.', 
                  x: '85%', 
                  y: '22%' 
                },
                { 
                  year: '2025', 
                  label: 'ADVANCED BUILDER', 
                  desc: 'In 2025, I focused on becoming an advanced builder. I started working on security, scalability, clean architecture, and performance optimization. I also explored modern fields like AI + Web3, prediction markets, Web3 gaming, and on-chain analytics. At this stage, I evolved from just a developer into a problem solver who builds meaningful systems.', 
                  x: '85%', 
                  y: '75%' 
                },
                { 
                  year: '2026', 
                  label: 'PROFESSIONAL DEV', 
                  desc: 'In 2026, I became a professional Web3 developer. I am now capable of building full DApps, NFT systems, Web3 dashboards, DeFi tools, and gaming ecosystems. I work professionally with technologies like React, Next.js, Solidity, Node.js, and Laravel. I also collaborate with different ecosystems and international communities, gaining real industry experience.', 
                  x: '50%', 
                  y: '75%' 
                },
                { 
                  year: '2027', 
                  label: 'ECOSYSTEM VISION', 
                  desc: 'In 2027, my main goal is to successfully complete 100+ Web3 projects. I aim to build scalable products, startup-level platforms, and innovative Web3 solutions. My long-term vision is to create my own ecosystem, collaborate with global founders, and help new developers grow while making a real impact in the Web3 industry.', 
                  x: '15%', 
                  y: '75%' 
                }
              ].map((loc, idx) => (
                <motion.div 
                  key={loc.year}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{ top: loc.y, left: loc.x }}
                >
                  <div className="relative group">
                    {/* Highly Optimized Light Halo (15px blur is 100x faster than 80px, utilizes fully hardware accelerated layout) */}
                    <div className="absolute inset-[6px] bg-brand-amber/5 rounded-[2.2rem] blur-[12px] pointer-events-none z-[-1]" />

                    <div className="relative bg-[#050505]/95 border border-white/10 p-5 lg:p-6 rounded-[2.5rem] group-hover:border-brand-amber/50 group-hover:scale-102 transition-all duration-300 lg:w-[300px] xl:w-[350px] shadow-[0_15px_45px_rgba(0,0,0,0.85),0_0_15px_rgba(255,140,66,0.03)] group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(255,140,66,0.15)]">
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                          <motion.span 
                            animate={{ color: ['#ff8c42', '#ffffff', '#ff8c42'] }}
                            transition={{ duration: 4, repeat: Infinity, delay: idx * 0.8 }}
                            className="text-brand-amber font-display font-black text-4xl italic leading-none tracking-tighter"
                          >
                            {loc.year}
                          </motion.span>
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-pulse shadow-[0_0_10px_#ff8c42]" />
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-amber/10" />
                          </div>
                        </div>
                        <div className="h-[1px] bg-white/10 w-full" />
                        <div className="flex flex-col gap-2">
                          <span className="text-white font-mono text-[10px] font-bold uppercase tracking-[0.2em]">{loc.label}</span>
                          <p className="text-neutral-500 font-sans text-[11px] leading-relaxed group-hover:text-neutral-200 transition-colors">
                            {loc.desc}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 mt-1 opacity-40 group-hover:opacity-100 transition-opacity">
                          <Activity className="w-4 h-4 text-brand-amber animate-pulse" />
                          <div className="h-[1px] flex-grow bg-white/10" />
                          <span className="text-[8px] font-mono text-neutral-400">0{idx + 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* MOBILE & TABLET VIEW: Perfectly Spaced Vertical Timeline (Prevents overlap on responsive screens) */}
            <div className="lg:hidden flex flex-col gap-12 relative px-4 py-8">
              {/* Central Timeline Thread line with pulse effect */}
              <div className="absolute top-0 bottom-0 left-[35px] w-[2px] bg-brand-amber/20" />
              <div className="absolute top-0 bottom-0 left-[35px] w-[1px] bg-brand-amber/5 animate-pulse" />

              {[
                { 
                  year: '2022', 
                  label: 'WEB3 FOUNDATIONS', 
                  desc: 'In 2022, I started my journey into Web3. At that time, I was focused on learning the basics of blockchain, cryptocurrency, wallets, NFTs, and DeFi. Alongside this, I began learning web development with HTML, CSS, JavaScript, and React. My journey started with curiosity, exploring communities and building small beginner projects in Web3.'
                },
                { 
                  year: '2023', 
                  label: 'SOLIDITY DEV', 
                  desc: 'In 2023, I became more serious about development. I started learning Solidity, Ethers.js, Hardhat, and smart contract deployment. During this time, I built simple NFT minting websites, token dashboards, and basic DApps. I also gained practical experience with GitHub, wallet integration, and blockchain interactions, which helped me understand real development workflows.'
                },
                { 
                  year: '2024', 
                  label: 'FREELANCE READY', 
                  desc: 'In 2024, I moved into freelancing and real-world projects. I worked on full-stack Web3 development, UI/UX design for DApps, and smart contract integration. By collaborating with startups and Web3 communities, I gained real client experience and learned how to solve production-level problems. This helped me build a strong portfolio and developer identity.'
                },
                { 
                  year: '2025', 
                  label: 'ADVANCED BUILDER', 
                  desc: 'In 2025, I focused on becoming an advanced builder. I started working on security, scalability, clean architecture, and performance optimization. I also explored modern fields like AI + Web3, prediction markets, Web3 gaming, and on-chain analytics. At this stage, I evolved from just a developer into a problem solver who builds meaningful systems.'
                },
                { 
                  year: '2026', 
                  label: 'PROFESSIONAL DEV', 
                  desc: 'In 2026, I became a professional Web3 developer. I am now capable of building full DApps, NFT systems, Web3 dashboards, DeFi tools, and gaming ecosystems. I work professionally with technologies like React, Next.js, Solidity, Node.js, and Laravel. I also collaborate with different ecosystems and international communities, gaining real industry experience.'
                },
                { 
                  year: '2027', 
                  label: 'ECOSYSTEM VISION', 
                  desc: 'In 2027, my main goal is to successfully complete 100+ Web3 projects. I aim to build scalable products, startup-level platforms, and innovative Web3 solutions. My long-term vision is to create my own ecosystem, collaborate with global founders, and help new developers grow while making a real impact in the Web3 industry.'
                }
              ].map((loc, idx) => (
                <motion.div 
                  key={loc.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative flex gap-6 pl-4"
                >
                  {/* Glowing Node Marker */}
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-black border-2 border-brand-amber flex items-center justify-center shadow-[0_0_15px_rgba(255,140,66,0.5)]">
                    <span className="text-white font-mono text-[9px] font-semibold">{idx + 1}</span>
                    <motion.div 
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                      className="absolute inset-0 rounded-full border border-brand-amber/30 scale-125"
                    />
                  </div>

                  {/* Content Card with high-contrast background & neon glow */}
                  <div className="relative flex-grow bg-[#050505] border border-white/10 p-5 rounded-[2rem] w-full max-w-lg shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                    {/* Background Soft Glow */}
                    <div className="absolute inset-0 bg-brand-amber/5 rounded-[2rem] blur-[20px] pointer-events-none" />

                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <span className="text-brand-amber font-display font-black text-3xl italic leading-none tracking-tighter">
                          {loc.year}
                        </span>
                        <div className="flex gap-1 items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-pulse" />
                          <span className="text-[9px] font-mono text-neutral-500">0{idx + 1}</span>
                        </div>
                      </div>
                      <div className="h-[1px] bg-white/10 w-full" />
                      <div className="flex flex-col gap-2">
                        <span className="text-white font-mono text-[10px] font-bold uppercase tracking-wider">{loc.label}</span>
                        <p className="text-neutral-400 font-sans text-xs leading-relaxed">
                          {loc.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT I DO (SERVICES) */}
      <section id="services" className="py-32 px-6 md:px-12 relative overflow-hidden bg-black border-t border-white/5">
        <div className="container mx-auto">
          <div className="flex flex-col items-center mb-24 text-center">
            <h2 className="font-display font-black text-6xl md:text-8xl uppercase tracking-tighter italic mb-4">What I Do</h2>
            <p className="text-neutral-500 max-w-md uppercase tracking-widest text-[10px] font-bold">End-to-end modular development pipelines</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((s, idx) => (
              <ServiceCard key={s.title} s={s} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* MY TECHSTACK SECTION */}
      <section id="techstack" className="py-32 px-6 md:px-12 relative overflow-hidden bg-black">
        {/* Decorative Grid Motif for Contextual depth */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-amber/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Know About Me & Contact Section */}
            <div className="lg:col-span-5 flex flex-col gap-8 text-left">
              <div>
                <h2 className="font-display font-black text-5xl md:text-6xl uppercase tracking-tighter italic mb-4 leading-none">
                  Know <br/>About Me
                </h2>
                <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
                  I am a relentless technology builder and full-stack developer based in Bangladesh. I construct performant decentralized networks, interactive Web3 systems, and enterprise-ready Node/React applications with extreme pride in layout, design, and reliable performance.
                </p>
              </div>

              {/* Seamless Contract / Contact section inside */}
              <div className="p-8 rounded-[2.5rem] bg-neutral-950/40 border border-brand-amber/20 relative overflow-hidden backdrop-blur-3xl group shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                {/* Micro accent elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-amber/5 blur-[30px] rounded-full pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-brand-amber/20 to-transparent" />

                <div className="relative z-10 flex flex-col gap-5">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-pulse shadow-[0_0_8px_rgba(255,140,66,0.8)]" />
                    <span className="text-brand-amber font-mono text-[9px] uppercase tracking-[0.3em] font-black">
                      ACTIVE CONTACT CHANNEL
                    </span>
                  </div>

                  <h3 className="text-2.5xl font-display font-black italic uppercase tracking-tighter text-white">
                    Start a Project
                  </h3>

                  <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
                    Initiate a connection to secure architectural consulting, system auditing, elite full-stack web engineering, or custom Web3 protocol design.
                  </p>

                  <div className="mt-2 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                    <a 
                      href="mailto:support@mahii.xyz" 
                      className="px-6 py-4 rounded-2xl bg-brand-amber text-neutral-950 font-black tracking-tighter text-xs md:text-sm uppercase text-center hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_10px_25px_rgba(255,140,66,0.15)]"
                    >
                      support@mahii.xyz
                    </a>
                    
                    <div className="flex gap-4 items-center justify-center sm:justify-start px-2 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                      <a href="https://github.com/mahi017fr" target="_blank" rel="noopener noreferrer" className="hover:text-brand-amber transition-colors">GitHub</a>
                      <span className="text-neutral-800">/</span>
                      <a href="https://x.com/HasibulHasanM2" target="_blank" rel="noopener noreferrer" className="hover:text-brand-amber transition-colors">Twitter</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Code Editor Mockup Card */}
            <div className="lg:col-span-7 w-full flex flex-col gap-6">
              <h2 className="font-display font-black text-5xl md:text-6xl uppercase tracking-tighter italic text-neutral-300">
                My Techstack
              </h2>

              <motion.div 
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full bg-neutral-950/60 border border-brand-amber/30 rounded-[2.5rem] p-8 md:p-12 relative shadow-[0_30px_100px_rgba(255,140,66,0.1),_inset_0_1px_1px_rgba(255,255,255,0.05)] hover:shadow-[0_40px_120px_rgba(255,140,66,0.2),_inset_0_1px_1px_rgba(255,255,255,0.1)] hover:border-brand-amber/60 backdrop-blur-3xl overflow-hidden group transition-all duration-500 cursor-pointer"
              >
                {/* Dynamic floating light beam behind container */}
                <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-amber to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />

                {/* Soft Radial Reflection Glow in Card Corner */}
                <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-brand-amber/15 blur-[80px] rounded-full pointer-events-none group-hover:bg-brand-amber/25 transition-colors duration-700 animate-pulse" />
                <div className="absolute -left-32 -top-32 w-96 h-96 bg-sky-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-sky-500/15 transition-colors duration-700" />

                {/* Glowing Tech Icons Row - Exactly resembling the user reference */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 180 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-14 h-14 rounded-2xl bg-neutral-900/40 border border-white/5 flex items-center justify-center transform hover:border-sky-400/30 hover:shadow-[0_0_25px_rgba(56,189,248,0.25)] transition-all duration-300 pointer-events-auto cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
                  >
                     <Atom className="w-6 h-6 text-sky-400 animate-spin-slow" />
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.2, y: -4 }}
                    className="w-14 h-14 rounded-2xl bg-neutral-900/40 border border-white/5 flex items-center justify-center transform hover:border-sky-400/30 hover:shadow-[0_0_25px_rgba(56,189,248,0.25)] transition-all duration-300 pointer-events-auto cursor-pointer font-sans font-black text-xs text-sky-400 tracking-tight shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
                  >
                     TS
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.2, y: -4 }}
                    className="w-14 h-14 rounded-2xl bg-neutral-900/40 border border-white/5 flex items-center justify-center transform hover:scale-110 hover:-translate-y-1 hover:border-yellow-500/30 hover:shadow-[0_0_25px_rgba(234,179,8,0.25)] transition-all duration-300 pointer-events-auto cursor-pointer font-sans font-black text-xs text-yellow-500 tracking-tight shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
                  >
                     JS
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.2, y: -4 }}
                    className="w-14 h-14 rounded-2xl bg-neutral-900/40 border border-white/5 flex items-center justify-center transform hover:scale-110 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all duration-300 pointer-events-auto cursor-pointer font-sans font-medium text-base text-neutral-200 tracking-tighter shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
                  >
                     N
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.2, y: -4 }}
                    className="w-14 h-14 rounded-2xl bg-neutral-900/40 border border-white/5 flex items-center justify-center transform hover:scale-110 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] transition-all duration-300 pointer-events-auto cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
                  >
                     <Wind className="w-6 h-6 text-cyan-400" />
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.2, y: -4 }}
                    className="w-14 h-14 rounded-2xl bg-neutral-900/40 border border-white/5 flex items-center justify-center transform hover:scale-110 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] transition-all duration-300 pointer-events-auto cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
                  >
                     <Database className="w-6 h-6 text-emerald-500" />
                  </motion.div>
                </div>

                {/* Window Controls Header dots resembling vscode/mac mockups */}
                <div className="flex justify-between items-center mb-8 bg-neutral-950/30 py-2.5 px-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    <span className="text-[10px] font-mono text-neutral-500 ml-4">developer.ts</span>
                  </div>
                </div>

                {/* Dynamic typing simulator with Syntax highlighting */}
                <TypingCodeBlock />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. MY WORK */}
      <section id="work" className="py-32 px-6 md:px-12 bg-white text-neutral-950 rounded-[4rem] md:rounded-[6rem] relative z-20 overflow-hidden">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="mb-20 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
            <div className="max-w-xl">
              <h2 className="font-display font-black text-6xl md:text-9xl uppercase tracking-tighter leading-[0.8] italic">Projects.</h2>
            </div>
            
            {/* Elegant Interactive Filter Header */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-neutral-100 rounded-2xl border border-neutral-200/50">
              {["All", "Web3 Engineering", "AI & Automation", "Game Development", "Legacy Projects"].map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setActiveDetailProjectId(null); // Reset detail view on categories change
                    }}
                    className="relative px-5 py-2 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all duration-300 pointer-events-auto cursor-pointer"
                    style={{ color: isActive ? "#ffffff" : "#737373" }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeProjectCategory"
                        className="absolute inset-0 bg-neutral-950 rounded-xl"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Upgraded Grid System with dynamic Entrance/Exit Animations */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            <AnimatePresence mode="popLayout">
              {PROJECTS.filter(p => selectedCategory === "All" || p.category === selectedCategory).map((p, idx) => {
                const isExpanded = activeDetailProjectId === p.id;
                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 30 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    key={p.id}
                    className="group flex flex-col bg-neutral-50 rounded-[2.5rem] border border-neutral-200/60 p-6 hover:shadow-[0_45px_90px_rgba(0,0,0,0.06)] hover:border-brand-amber/45 transition-all duration-300 pointer-events-auto"
                  >
                    {/* Image and Header Row */}
                    <div className={`relative aspect-[16/10] rounded-[1.8rem] overflow-hidden mb-8 border border-neutral-200/40 flex items-center justify-center ${p.bgClass || 'bg-neutral-950'}`}>
                      <img 
                        src={p.image} 
                        alt={p.title} 
                        className={`w-full h-full transition-transform duration-700 ${p.imageClass || 'object-cover scale-102 group-hover:scale-105 object-center'}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
                      
                      {/* Interactive Link Bubble */}
                      <a 
                        href={p.demoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md hover:bg-neutral-900 hover:text-white"
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </a>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        {/* Upper Details */}
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[9px] font-black uppercase tracking-[0.25em] text-neutral-400 bg-neutral-200/40 px-3 py-1 rounded-full">
                            {p.category}
                          </span>
                        </div>
                        
                        <h3 className="font-display font-black text-3xl uppercase tracking-tighter group-hover:text-brand-amber transition-colors italic mb-4">
                          {p.title}
                        </h3>
                        
                        <p className="text-xs text-neutral-500 font-medium leading-relaxed mb-6">
                          {p.description}
                        </p>
                      </div>

                      {/* Expandable Technical Protocol panel toggle */}
                      <div className="mt-auto border-t border-neutral-100 pt-5">
                        <button
                          onClick={() => setActiveDetailProjectId(isExpanded ? null : p.id)}
                          className="w-full flex items-center justify-between py-2 text-[10px] font-mono font-black uppercase tracking-widest text-neutral-600 hover:text-brand-amber transition-colors pointer-events-auto cursor-pointer"
                        >
                          <span>{isExpanded ? "COLLAPSE SPEC PROTOCOL ▲" : "EXPLORE BLUEPRINT ▼"}</span>
                          <span className="text-xs">{isExpanded ? "[-]" : "[+]"}</span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 pt-5 border-t border-neutral-200/60 flex flex-col gap-5 text-left bg-neutral-100/50 rounded-2xl p-4 border border-neutral-200/30">
                                
                                {/* Statistics Grid */}
                                <div className="grid grid-cols-3 gap-2 text-center pb-2 border-b border-neutral-200/45">
                                  <div className="p-2 bg-white rounded-lg border border-neutral-200/30">
                                    <div className="text-[10px] font-sans font-black text-neutral-900 tracking-tight">{p.stats.primary}</div>
                                    <div className="text-[8px] font-mono text-neutral-400 uppercase tracking-wider mt-0.5">Scale</div>
                                  </div>
                                  <div className="p-2 bg-white rounded-lg border border-neutral-200/30">
                                    <div className="text-[10px] font-sans font-black text-neutral-900 tracking-tight">{p.stats.secondary}</div>
                                    <div className="text-[8px] font-mono text-neutral-400 uppercase tracking-wider mt-0.5">Audit</div>
                                  </div>
                                  <div className="p-2 bg-white rounded-lg border border-neutral-200/30">
                                    <div className="text-[10px] font-sans font-black text-neutral-900 tracking-tight">{p.stats.tertiary}</div>
                                    <div className="text-[8px] font-mono text-neutral-400 uppercase tracking-wider mt-0.5">Optimized</div>
                                  </div>
                                </div>

                                {/* Engineering details */}
                                <div className="space-y-3 font-sans text-xs">
                                  <div>
                                    <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block mb-0.5">ROLE</span>
                                    <p className="font-bold text-neutral-800">{p.role}</p>
                                  </div>
                                  <div>
                                    <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block mb-0.5">CHALLENGE</span>
                                    <p className="text-neutral-500 font-medium leading-relaxed">{p.challenge}</p>
                                  </div>
                                  <div>
                                    <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block mb-0.5">RESOLUTION</span>
                                    <p className="text-neutral-500 font-medium leading-relaxed">{p.solution}</p>
                                  </div>
                                </div>

                                {/* External Repository Link */}
                                <a 
                                  href={p.demoUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="mt-2 w-full py-3 bg-neutral-900 hover:bg-brand-amber hover:text-neutral-950 text-white font-mono text-[9px] tracking-widest font-black uppercase text-center rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
                                >
                                  <span>VERIFY SYSTEM REPO</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>

                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Project tags list */}
                        {!isExpanded && (
                          <div className="flex flex-wrap gap-1.5 mt-4">
                            {p.tags?.map((tag) => (
                              <span 
                                key={tag} 
                                className="text-[8px] font-mono bg-neutral-100 text-neutral-500 px-2.5 py-0.5 rounded uppercase tracking-wider font-bold border border-neutral-100 font-black"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 6. FINAL ABOUT / CONTACT */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden mt-[-4rem]">
        <div className="container mx-auto relative z-10 pt-24">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="mb-12">
                <LetSTalk3D />
              </div>
              <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                <a href="mailto:support@mahii.xyz" className="px-12 py-6 bg-brand-amber text-neutral-950 font-black rounded-full uppercase tracking-tighter text-xl hover:bg-white transition-all scale-100 hover:scale-105">
                  support@mahii.xyz
                </a>
                <div className="flex gap-12 font-mono text-[11px] uppercase tracking-[0.4em] text-neutral-500">
                  <a href="https://github.com/mahi017fr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
                  <a href="https://x.com/HasibulHasanM2" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* LARGE BACKGROUND LOGO - REMOVED MAHE */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.02]">
          <h3 className="text-[40vw] font-black uppercase tracking-tighter select-none">FLOW</h3>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5 px-12 flex flex-col md:flex-row justify-between items-center gap-12 bg-neutral-950">
        <div className="flex items-center gap-4 text-neutral-600">
          <Globe className="w-5 h-5" />
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] font-bold">© 2026 Mahix | Web3 developer</span>
        </div>
        <div className="flex gap-12 font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-700">
        </div>
      </footer>
      </div>
    </ClickSpark>
  );
}
