import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Bot, Zap, Database, MessageSquare, BarChart3, Settings, 
  Mail, Linkedin, ExternalLink, ChevronUp, X,
  Cpu, Network, Globe, Sparkles, ArrowRight, Check,
  Code, Workflow, Cloud, Shield, Layers, Send
} from 'lucide-react';

// Premium Animated Logo Intro
const LogoIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<'particles' | 'forming' | 'glow' | 'fadeout'>('particles');
  
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('forming'), 800),
      setTimeout(() => setPhase('glow'), 2200),
      setTimeout(() => setPhase('fadeout'), 3800),
      setTimeout(() => onComplete(), 4500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Data stream particles
  const dataStreams = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    startX: Math.random() * 100,
    startY: Math.random() * 100,
    delay: Math.random() * 0.8,
    duration: 1 + Math.random() * 0.5,
  }));

  // Geometric shapes for background
  const geometricShapes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: 10 + (i % 4) * 25,
    y: 20 + Math.floor(i / 4) * 30,
    size: 50 + Math.random() * 100,
    rotation: Math.random() * 360,
    delay: i * 0.1,
  }));

  // Circuit line paths
  const circuitPaths = [
    "M 0 50 L 30 50 L 40 40 L 60 40 L 70 50 L 100 50",
    "M 0 30 L 20 30 L 30 20 L 50 20 L 60 30 L 80 30 L 90 40 L 100 40",
    "M 0 70 L 25 70 L 35 60 L 55 60 L 65 70 L 100 70",
    "M 50 0 L 50 25 L 40 35 L 40 45 L 50 55 L 50 100",
    "M 30 0 L 30 20 L 20 30 L 20 50 L 30 60 L 30 100",
    "M 70 0 L 70 15 L 80 25 L 80 55 L 70 65 L 70 100",
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #030014 0%, #0a0520 30%, #0f0a30 50%, #0a0520 70%, #030014 100%)'
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'fadeout' ? 0 : 1 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(ellipse at 50% 50%, rgba(99, 50, 255, 0.15) 0%, transparent 50%)',
            'radial-gradient(ellipse at 50% 50%, rgba(0, 200, 255, 0.12) 0%, transparent 50%)',
            'radial-gradient(ellipse at 50% 50%, rgba(99, 50, 255, 0.15) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Geometric shapes in background */}
      {geometricShapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute border border-white/5 rounded-lg"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
          }}
          initial={{ opacity: 0, scale: 0, rotate: shape.rotation }}
          animate={{ 
            opacity: phase === 'particles' || phase === 'forming' ? 0.3 : 0,
            scale: 1,
            rotate: shape.rotation + 90
          }}
          transition={{ duration: 2, delay: shape.delay, ease: 'easeOut' }}
        />
      ))}

      {/* Circuit board lines */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#00f5ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        {circuitPaths.map((path, i) => (
          <motion.path
            key={i}
            d={path}
            fill="none"
            stroke="url(#circuitGradient)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: phase === 'particles' || phase === 'forming' ? 1 : 0,
              opacity: phase === 'particles' || phase === 'forming' ? 0.4 : 0
            }}
            transition={{ duration: 1.5, delay: 0.2 + i * 0.15, ease: 'easeInOut' }}
          />
        ))}
      </svg>

      {/* Data stream particles moving inward */}
      {dataStreams.map((stream) => (
        <motion.div
          key={stream.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: stream.id % 3 === 0 ? '#00f5ff' : stream.id % 3 === 1 ? '#8b5cf6' : '#c084fc',
            boxShadow: `0 0 10px ${stream.id % 3 === 0 ? '#00f5ff' : stream.id % 3 === 1 ? '#8b5cf6' : '#c084fc'}`,
            left: `${stream.startX}%`,
            top: `${stream.startY}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1.5, 1, 0],
            x: `calc(50vw - ${stream.startX}vw)`,
            y: `calc(50vh - ${stream.startY}vh)`,
          }}
          transition={{
            duration: stream.duration,
            delay: stream.delay,
            ease: 'easeIn',
          }}
        />
      ))}

      {/* Expanding rings */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full border"
          style={{
            borderColor: ring === 1 ? 'rgba(0, 245, 255, 0.3)' : ring === 2 ? 'rgba(139, 92, 246, 0.25)' : 'rgba(192, 132, 252, 0.2)',
          }}
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{
            width: phase !== 'particles' ? [0, 600, 800] : 0,
            height: phase !== 'particles' ? [0, 600, 800] : 0,
            opacity: phase === 'forming' ? [0, 0.6, 0] : 0,
          }}
          transition={{
            duration: 2,
            delay: ring * 0.3,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Central glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 245, 255, 0.4) 0%, rgba(139, 92, 246, 0.2) 40%, transparent 70%)',
        }}
        initial={{ width: 0, height: 0, opacity: 0 }}
        animate={{
          width: phase !== 'particles' ? 500 : 0,
          height: phase !== 'particles' ? 500 : 0,
          opacity: phase === 'forming' || phase === 'glow' ? 1 : 0,
        }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      {/* Logo container */}
      <div className="relative z-10 text-center">
        {/* AI Agent initialization text */}
        <motion.div
          className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'particles' ? [0, 1, 1, 0] : 0 }}
          transition={{ duration: 1.5, times: [0, 0.2, 0.8, 1] }}
        >
          <span className="text-xs md:text-sm tracking-[0.3em] text-cyan-400/60 font-mono">
            INITIALIZING AI SYSTEM
          </span>
        </motion.div>

        {/* Main logo text - ALI RAZA */}
        <div className="relative">
          {/* Glitch/scan line effect */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'forming' ? 1 : 0 }}
          >
            <motion.div
              className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
              animate={{ y: [-50, 150] }}
              transition={{ duration: 0.8, repeat: 2, ease: 'linear' }}
            />
          </motion.div>

          {/* Logo text with character animation */}
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              background: 'linear-gradient(135deg, #ffffff 0%, #00f5ff 50%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
            animate={{
              opacity: phase !== 'particles' ? 1 : 0,
              scale: phase !== 'particles' ? 1 : 0.8,
              filter: phase !== 'particles' ? 'blur(0px)' : 'blur(20px)',
            }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {'ALI RAZA'.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{
                  opacity: phase !== 'particles' ? 1 : 0,
                  y: phase !== 'particles' ? 0 : 50,
                  rotateX: phase !== 'particles' ? 0 : -90,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.8 + i * 0.08,
                  ease: 'easeOut',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Underline glow */}
          <motion.div
            className="h-[2px] mx-auto mt-4 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, #00f5ff, #8b5cf6, #00f5ff, transparent)',
            }}
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: phase !== 'particles' ? '100%' : 0,
              opacity: phase !== 'particles' ? 1 : 0,
            }}
            transition={{ duration: 1, delay: 1.5, ease: 'easeOut' }}
          />
        </div>

        {/* Subtitle */}
        <motion.div
          className="mt-8 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'forming' || phase === 'glow' ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <motion.p
            className="text-lg md:text-xl lg:text-2xl tracking-[0.4em] text-gray-300/80 font-light"
            style={{ fontFamily: "'Inter', sans-serif" }}
            initial={{ y: 30, opacity: 0 }}
            animate={{
              y: phase === 'forming' || phase === 'glow' ? 0 : 30,
              opacity: phase === 'forming' || phase === 'glow' ? 1 : 0,
            }}
            transition={{ duration: 0.8, delay: 2, ease: 'easeOut' }}
          >
            AI AGENTS & AUTOMATION
          </motion.p>
        </motion.div>

        {/* Pulsing dots */}
        <motion.div
          className="flex justify-center gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'glow' ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 2.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                delay: i * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>

        {/* Floating tech icons around logo */}
        {[
          { Icon: Cpu, x: -180, y: -80, delay: 1.2 },
          { Icon: Network, x: 180, y: -60, delay: 1.4 },
          { Icon: Database, x: -160, y: 60, delay: 1.6 },
          { Icon: Zap, x: 160, y: 80, delay: 1.8 },
        ].map(({ Icon, x, y, delay }, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 text-cyan-400/40"
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: phase !== 'particles' && phase !== 'fadeout' ? 0.6 : 0,
              scale: phase !== 'particles' && phase !== 'fadeout' ? 1 : 0,
              x: phase !== 'particles' ? x : 0,
              y: phase !== 'particles' ? y : 0,
            }}
            transition={{ duration: 0.8, delay, ease: 'easeOut' }}
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Icon size={24} />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Particle field at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-8 rounded-full"
            style={{
              background: 'linear-gradient(to top, transparent, #00f5ff)',
              left: `${5 + i * 5}%`,
              bottom: 0,
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: [0, 30 + Math.random() * 40, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Corner accents */}
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner, i) => (
        <motion.div
          key={corner}
          className={`absolute w-24 h-24 ${
            corner.includes('top') ? 'top-8' : 'bottom-8'
          } ${corner.includes('left') ? 'left-8' : 'right-8'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: phase !== 'fadeout' ? 0.3 : 0 }}
          transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <motion.path
              d={
                corner === 'top-left' ? 'M 0 30 L 0 0 L 30 0' :
                corner === 'top-right' ? 'M 70 0 L 100 0 L 100 30' :
                corner === 'bottom-left' ? 'M 0 70 L 0 100 L 30 100' :
                'M 70 100 L 100 100 L 100 70'
              }
              fill="none"
              stroke="#00f5ff"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
            />
          </svg>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Enhanced Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: Math.random() * 20 + 15,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: '-10px',
            background: `radial-gradient(circle, ${
              p.id % 3 === 0 ? '#00f5ff' : p.id % 3 === 1 ? '#bf00ff' : '#ff00d4'
            } 0%, transparent 70%)`,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, Math.sin(p.id) * 100],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Animated background shapes with more movement
const BackgroundShapes = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <motion.div
      className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-20"
      style={{ background: 'radial-gradient(circle, #bf00ff 0%, transparent 70%)' }}
      animate={{ 
        scale: [1, 1.3, 1], 
        rotate: [0, 180, 360],
        x: [0, 50, 0],
        y: [0, -30, 0]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    />
    <motion.div
      className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full opacity-15"
      style={{ background: 'radial-gradient(circle, #00f5ff 0%, transparent 70%)' }}
      animate={{ 
        scale: [1.2, 1, 1.2], 
        rotate: [360, 180, 0],
        x: [0, -60, 0],
        y: [0, 40, 0]
      }}
      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
    />
    <motion.div
      className="absolute -bottom-32 left-1/3 w-[400px] h-[400px] rounded-full opacity-10"
      style={{ background: 'radial-gradient(circle, #ff00d4 0%, transparent 70%)' }}
      animate={{ 
        scale: [1, 1.4, 1],
        x: [0, 80, 0],
        y: [0, -50, 0]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
    />
    <motion.div
      className="absolute top-1/3 left-1/2 w-[300px] h-[300px] rounded-full opacity-10"
      style={{ background: 'radial-gradient(circle, #00a2ff 0%, transparent 70%)' }}
      animate={{ 
        scale: [1, 1.2, 1],
        x: [0, -100, 0],
        y: [0, 60, 0]
      }}
      transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
    />
    
    {/* Animated grid lines */}
    <svg className="absolute inset-0 w-full h-full opacity-10">
      <defs>
        <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f5ff" />
          <stop offset="50%" stopColor="#bf00ff" />
          <stop offset="100%" stopColor="#ff00d4" />
        </linearGradient>
      </defs>
      {[...Array(20)].map((_, i) => (
        <motion.line
          key={`h-${i}`}
          x1="0"
          y1={`${(i + 1) * 5}%`}
          x2="100%"
          y2={`${(i + 1) * 5}%`}
          stroke="url(#gridGradient)"
          strokeWidth="0.5"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: [0.1, 0.3, 0.1], pathLength: 1 }}
          transition={{ duration: 4, delay: i * 0.1, repeat: Infinity }}
        />
      ))}
    </svg>

    {/* Floating geometric shapes */}
    <motion.div
      className="absolute top-20 right-1/4 w-20 h-20 border border-[#00f5ff]/30 rotate-45"
      animate={{ 
        rotate: [45, 225, 45],
        scale: [1, 1.2, 1],
        y: [0, 30, 0]
      }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute bottom-40 left-1/4 w-16 h-16 border border-[#bf00ff]/30"
      style={{ borderRadius: '30%' }}
      animate={{ 
        rotate: [0, 360],
        scale: [1, 1.3, 1],
        x: [0, 20, 0]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute top-1/2 left-20 w-12 h-12 border-2 border-[#ff00d4]/20 rounded-full"
      animate={{ 
        scale: [1, 1.5, 1],
        opacity: [0.2, 0.5, 0.2]
      }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);

// Glowing orbs that float around
const GlowingOrbs = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full"
        style={{
          background: i % 2 === 0 ? '#00f5ff' : '#bf00ff',
          boxShadow: `0 0 20px 10px ${i % 2 === 0 ? '#00f5ff' : '#bf00ff'}40`,
          left: `${10 + i * 12}%`,
          top: `${20 + (i % 3) * 25}%`,
        }}
        animate={{
          y: [0, -50, 0, 50, 0],
          x: [0, 30, 0, -30, 0],
          scale: [1, 1.5, 1, 0.8, 1],
          opacity: [0.4, 0.8, 0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 10 + i * 2,
          delay: i * 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

// Typing animation hook
const useTypingAnimation = (texts: string[], typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
};

// Section wrapper with scroll animation
const AnimatedSection = ({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

// Navigation
const Navigation_Component = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-dark py-3' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <motion.a
          href="#"
          className="font-display text-2xl font-bold gradient-text"
          whileHover={{ scale: 1.05 }}
          animate={{ 
            textShadow: [
              '0 0 10px #00f5ff',
              '0 0 20px #bf00ff',
              '0 0 10px #00f5ff'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          AR
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="text-gray-300 hover:text-[#00f5ff] transition-colors relative group"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00f5ff] to-[#bf00ff] transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            className="px-6 py-2.5 bg-gradient-to-r from-[#00f5ff] to-[#00a2ff] rounded-full font-semibold text-black btn-glow transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px #00f5ff' }}
            whileTap={{ scale: 0.95 }}
          >
            Hire Me
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-full h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-dark mt-2 mx-4 rounded-xl overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-300 hover:text-[#00f5ff] transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="px-6 py-2.5 bg-gradient-to-r from-[#00f5ff] to-[#00a2ff] rounded-full font-semibold text-black text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Hero Section
const HeroSection = () => {
  const typingText = useTypingAnimation([
    'AI Agent Developer',
    'Automation Specialist',
    'Workflow Architect',
    'AI Solutions Expert',
  ]);

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-20">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              className="inline-block px-4 py-2 rounded-full glass text-[#00f5ff] text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px #00f5ff40' }}
            >
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="inline-block"
              >
                <Sparkles className="inline w-4 h-4 mr-2" />
              </motion.span>
              Available for Projects
            </motion.span>

            <motion.h1 
              className="text-5xl md:text-7xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.span 
                className="text-white inline-block"
                animate={{ 
                  textShadow: [
                    '0 0 10px rgba(255,255,255,0.5)',
                    '0 0 20px rgba(255,255,255,0.3)',
                    '0 0 10px rgba(255,255,255,0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Ali
              </motion.span>{' '}
              <motion.span 
                className="gradient-text inline-block"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Raza
              </motion.span>
            </motion.h1>

            <div className="h-16 mb-6">
              <h2 className="text-2xl md:text-3xl text-gray-300 font-light">
                <span className="typing-cursor">{typingText}</span>
              </h2>
            </div>

            <motion.p 
              className="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              I build AI-powered automations and intelligent agents that help businesses 
              work smarter, faster, and more efficiently. Transforming complex workflows 
              into seamless automated solutions.
            </motion.p>

            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#projects"
                className="group px-8 py-4 bg-gradient-to-r from-[#00f5ff] to-[#00a2ff] rounded-full font-semibold text-black btn-glow transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px #00f5ff' }}
                whileTap={{ scale: 0.95 }}
              >
                See My Work
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </motion.a>
              <motion.a
                href="#contact"
                className="px-8 py-4 border-2 border-[#bf00ff] rounded-full font-semibold text-white hover:bg-[#bf00ff]/20 btn-glow-purple transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px #bf00ff' }}
                whileTap={{ scale: 0.95 }}
              >
                Hire Me
              </motion.a>
            </div>

            {/* Stats */}
            <motion.div
              className="flex gap-8 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { value: '50+', label: 'Projects Completed' },
                { value: '30+', label: 'Happy Clients' },
                { value: '3+', label: 'Years Experience' },
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  whileHover={{ scale: 1.1, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                >
                  <motion.div 
                    className="text-3xl font-bold gradient-text"
                    animate={{ 
                      textShadow: [
                        '0 0 10px #00f5ff',
                        '0 0 20px #bf00ff',
                        '0 0 10px #00f5ff'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              {/* Animated rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#00f5ff]/30"
                style={{ width: '120%', height: '120%', left: '-10%', top: '-10%' }}
                animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#bf00ff]/20"
                style={{ width: '140%', height: '140%', left: '-20%', top: '-20%' }}
                animate={{ rotate: -360, scale: [1.05, 1, 1.05] }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-[#ff00d4]/10"
                style={{ width: '160%', height: '160%', left: '-30%', top: '-30%' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />

              {/* Profile image container */}
              <motion.div 
                className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden glass glow-cyan"
                animate={{ 
                  boxShadow: [
                    '0 0 30px #00f5ff40',
                    '0 0 50px #bf00ff40',
                    '0 0 30px #00f5ff40'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <img 
                  src="https://i.postimg.cc/x8VKVSC9/Screenshot-select-area-20260201152453.png" 
                  alt="Ali Raza - AI Agent & Automation Developer"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating icons */}
              {[
                { Icon: Cpu, top: '10%', left: '-10%', delay: 0, color: '#00f5ff' },
                { Icon: Network, top: '50%', right: '-15%', delay: 0.5, color: '#bf00ff' },
                { Icon: Zap, bottom: '10%', left: '-5%', delay: 1, color: '#ff00d4' },
                { Icon: Database, top: '20%', right: '-5%', delay: 1.5, color: '#00a2ff' },
              ].map(({ Icon, delay, color, ...pos }, i) => (
                <motion.div
                  key={i}
                  className="absolute w-12 h-12 glass rounded-xl flex items-center justify-center"
                  style={pos}
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 5, 0, -5, 0],
                    boxShadow: [
                      `0 0 10px ${color}40`,
                      `0 0 20px ${color}60`,
                      `0 0 10px ${color}40`
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const highlights = [
    { icon: Bot, text: 'AI-powered customer support agents' },
    { icon: Workflow, text: 'Workflow automation for SMBs and SaaS' },
    { icon: Zap, text: 'Lead qualification and sales automation' },
    { icon: BarChart3, text: 'Data extraction, reporting, and analytics' },
    { icon: Settings, text: 'Internal operations optimization' },
  ];

  return (
    <AnimatedSection id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Animated Illustration */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Central hub */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 glass rounded-2xl flex items-center justify-center glow-purple"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0, -5, 0],
                  boxShadow: [
                    '0 0 30px #bf00ff40',
                    '0 0 50px #bf00ff60',
                    '0 0 30px #bf00ff40'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <Bot className="w-16 h-16 text-[#bf00ff]" />
                </motion.div>
              </motion.div>

              {/* Orbiting icons */}
              {[
                { Icon: Database, angle: 0, color: '#00f5ff' },
                { Icon: Cloud, angle: 60, color: '#bf00ff' },
                { Icon: Code, angle: 120, color: '#ff00d4' },
                { Icon: Globe, angle: 180, color: '#00a2ff' },
                { Icon: Shield, angle: 240, color: '#00f5ff' },
                { Icon: Layers, angle: 300, color: '#bf00ff' },
              ].map(({ Icon, angle, color }, i) => {
                const radius = 140;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                return (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-14 h-14 glass rounded-xl flex items-center justify-center"
                    style={{ marginLeft: x - 28, marginTop: y - 28 }}
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [0, 10, 0, -10, 0],
                      boxShadow: [
                        `0 0 10px ${color}40`,
                        `0 0 20px ${color}60`,
                        `0 0 10px ${color}40`
                      ]
                    }}
                    transition={{ duration: 3 + i * 0.5, repeat: Infinity }}
                  >
                    <Icon className="w-7 h-7" style={{ color }} />
                  </motion.div>
                );
              })}

              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                  const radius = 140;
                  const x = Math.cos((angle * Math.PI) / 180) * radius + 50;
                  const y = Math.sin((angle * Math.PI) / 180) * radius + 50;
                  return (
                    <motion.line
                      key={i}
                      x1="50%"
                      y1="50%"
                      x2={`${x}%`}
                      y2={`${y}%`}
                      stroke="url(#gradient)"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.5 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                    />
                  );
                })}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00f5ff" />
                    <stop offset="100%" stopColor="#bf00ff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              className="text-[#00f5ff] font-medium mb-4 block"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              About Me
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Transforming Businesses with{' '}
              <span className="gradient-text">AI Automation</span>
            </h2>

            <div className="space-y-4 text-gray-400 mb-8">
              <p>
                I'm Ali Raza, a passionate AI agent and automation developer with expertise in 
                building intelligent systems that revolutionize how businesses operate. With years 
                of experience in the automation space, I've helped countless local businesses, 
                SMBs, and SaaS companies streamline their operations.
              </p>
              <p>
                My expertise lies in crafting AI-powered workflows using cutting-edge tools like 
                <span className="text-[#00f5ff]"> n8n</span>, 
                <span className="text-[#bf00ff]"> OpenRouter APIs</span>, 
                <span className="text-[#ff00d4]"> Supabase</span>, 
                <span className="text-[#00a2ff]"> Airtable</span>, and more. 
                I transform complex manual processes into seamless automated solutions that save 
                time, reduce errors, and boost productivity.
              </p>
              <p>
                Whether you need an AI-powered customer support agent, automated lead qualification, 
                or comprehensive workflow automation, I deliver solutions that drive real results 
                for your business.
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-3">
              {highlights.map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={text}
                  className="flex items-center gap-3 group"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <motion.div 
                    className="w-10 h-10 rounded-lg glass flex items-center justify-center group-hover:glow-cyan transition-all duration-300"
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 360,
                      boxShadow: '0 0 20px #00f5ff'
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-5 h-5 text-[#00f5ff]" />
                  </motion.div>
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

// Skills Section
const SkillsSection = () => {
  const skills = [
    { name: 'n8n', description: 'Workflow automation builder', level: 95, icon: Workflow },
    { name: 'OpenRouter', description: 'AI API integration', level: 90, icon: Bot },
    { name: 'Supabase', description: 'Backend database for AI', level: 88, icon: Database },
    { name: 'Airtable', description: 'Data management platform', level: 92, icon: Layers },
    { name: 'Google Sheets', description: 'Spreadsheet automation', level: 95, icon: BarChart3 },
    { name: 'Twilio', description: 'Communication APIs', level: 85, icon: MessageSquare },
    { name: 'REST APIs', description: 'API integration & design', level: 93, icon: Globe },
    { name: 'AI Agents', description: 'Intelligent automation', level: 90, icon: Cpu },
  ];

  return (
    <AnimatedSection id="skills" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span 
            className="text-[#00f5ff] font-medium mb-4 block"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            My Expertise
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Skills & <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Leveraging cutting-edge tools and technologies to build powerful AI automation solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="glass rounded-2xl p-6 group cursor-pointer hover:glow-cyan transition-all duration-500"
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring' }}
              whileHover={{ 
                y: -10, 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(0, 245, 255, 0.2)'
              }}
            >
              <motion.div 
                className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00f5ff]/20 to-[#bf00ff]/20 flex items-center justify-center mb-4"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <skill.icon className="w-7 h-7 text-[#00f5ff]" />
              </motion.div>
              
              <h3 className="text-xl font-semibold text-white mb-2">{skill.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{skill.description}</p>
              
              {/* Progress bar */}
              <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00f5ff] to-[#bf00ff] rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: 'easeOut' }}
                />
              </div>
              <span className="text-sm text-gray-500 mt-2 block">{skill.level}%</span>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

// Projects Section
const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filters = ['All', 'Customer Support', 'Sales Automation', 'Data Automation', 'Workflow'];

  const projects = [
    {
      id: 1,
      title: 'AI Customer Support Agent',
      category: 'Customer Support',
      description: 'Production-ready AI customer support system that classifies intent, answers from a database, tracks orders, and escalates complex cases to humans with ticket creation.',
      metrics: ['⏱ Faster response times', '🎯 Zero policy hallucinations', '📞 Seamless AI-to-human escalation'],
      tools: ['n8n', 'Supabase', 'OpenRouter', 'SupaBase', 'Webhooks', 'HTTP APIs', 'AI Agents'],
      image: 'https://i.postimg.cc/vBHzSycP/Screenshot_select_area_20260201151541.png',
    },
    {
      id: 2,
      title: 'AI-Powered Lead Management System',
      category: 'Sales Automation',
      description: 'AI automation that instantly captures inbound social leads, asks qualifying questions, understands intent, and flags high-value opportunities.',
      metrics: ['💰 Prevents lead loss', '⚡ Instant engagement', '🎯 Focus on high-intent leads only'],
      tools: ['n8n', 'AI Agents', 'Webhooks', 'CRM Logic', 'OpenRouter', 'APIs'],
      image: 'https://i.postimg.cc/NjmpKb39/Screenshot_select_area_20260201151412.png',
    },
    {
      id: 3,
      title: 'Automated Invoice Reminder System',
      category: 'Workflow',
      description: 'A deterministic automation that tracks overdue invoices and sends controlled reminders without duplicates or client spam.',
      metrics: ['💸 Reduced missed payments', '🔁 Reliable reminders', '📊 Full state control'],
      tools: ['n8n', 'Google Sheets', 'Email (SMTP)', 'Date Logic', 'Workflow State Management'],
      image: 'https://i.postimg.cc/7Z0m5XFb/Screenshot_select_area_20260201151430.png',
    },
    {
      id: 4,
      title: 'Automated Lead Capture & Reporting',
      category: 'Data Automation',
      description: 'Simple automation that captures form leads, stores them in Google Sheets, and sends daily lead summary reports automatically.',
      metrics: ['📈 Better visibility', '⏳ Zero manual reporting', '🧠 Cleaner lead data'],
      tools: ['n8n', 'Google Sheets', 'Forms', 'Email Automation', 'Triggers & Schedulers'],
      image: 'https://i.postimg.cc/X7TsNtzf/Screenshot_select_area_20260201151445.png',
    },
    {
      id: 5,
      title: 'Clinic Appointment Booking Automation',
      category: 'Workflow',
      description: 'Messaging-based appointment booking system that collects patient details and notifies clinic staff instantly.',
      metrics: ['🏥 Reduced admin workload', '⚡ Faster bookings', '📬 Instant staff alerts'],
      tools: ['n8n', 'Telegram / WhatsApp', 'Google Sheets', 'Email Automation', 'Webhooks'],
      image: 'https://i.postimg.cc/0yDczZTJ/Screenshot_select_area_20260201151459.png',
    },
    {
      id: 6,
      title: 'AI Email Classification & Reply Assistant',
      category: 'Customer Support',
      description: 'AI-powered email system that classifies incoming emails, applies labels, and generates context-aware draft replies with human review.',
      metrics: ['📥 Organized inbox', '⏱ Faster replies', '🧠 Human-in-the-loop safety'],
      tools: ['n8n', 'Gmail API', 'AI Agent', 'OpenRouter', 'Structured Outputs'],
      image: 'https://i.postimg.cc/XJ78DWpQ/Screenshot_select_area_20260201151516.png',
    },
    {
      id: 7,
      title: 'AI Phishing & Threat Detection System',
      category: 'Data Automation',
      description: 'Multi-agent AI system that detects phishing and malicious content across Gmail and web apps using intent analysis and risk-weighted decisions.',
      metrics: ['🛡 Reduced phishing risk', '⚖ Fewer false positives', '🔍 Real-time security verdicts'],
      tools: ['n8n', 'AI Agents', 'OpenRouter', 'Gmail API', 'Webhooks', 'Prompt Engineering'],
      image: 'https://i.postimg.cc/htTpXMkX/Screenshot_select_area_20260201151350.png',
    },
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <AnimatedSection id="projects" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span 
            className="text-[#00f5ff] font-medium mb-4 block"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            My Work
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore my portfolio of AI automation solutions that have transformed businesses
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter, i) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-[#00f5ff] to-[#00a2ff] text-black'
                  : 'glass text-gray-300 hover:text-white hover:border-[#00f5ff]'
              }`}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {filter}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                transition={{ duration: 0.5, delay: i * 0.1, type: 'spring' }}
                className="glass rounded-2xl overflow-hidden group cursor-pointer"
                whileHover={{ 
                  y: -15,
                  boxShadow: '0 25px 50px rgba(0, 245, 255, 0.2)'
                }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/40 to-transparent" />
                  
                  {/* Overlay on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-[#00f5ff]/10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Tool badges - show first 3 */}
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1">
                    {project.tools.slice(0, 3).map((tool) => (
                      <span key={tool} className="px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-xs text-[#00f5ff]">
                        {tool}
                      </span>
                    ))}
                    {project.tools.length > 3 && (
                      <span className="px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-xs text-[#bf00ff]">
                        +{project.tools.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[#bf00ff] text-sm font-medium">{project.category}</span>
                    <h3 className="text-xl font-semibold text-white mt-1 group-hover:text-[#00f5ff] transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">Short Description</p>
                    <p className="text-gray-400 text-sm">{project.description}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">Business Impact</p>
                    <div className="flex flex-wrap gap-2">
                      {project.metrics.map((metric) => (
                        <span key={metric} className="flex items-center gap-1 text-xs text-gray-300">
                          <Check className="w-3 h-3 text-[#00f5ff]" />
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">Tech Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool) => (
                        <span key={tool} className="px-2.5 py-1 rounded-full text-xs text-[#00f5ff] bg-[#00f5ff]/10 border border-[#00f5ff]/30">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 mb-6">Want similar AI automation solutions for your business?</p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#bf00ff] to-[#ff00d4] rounded-full font-semibold text-white btn-glow-purple"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px #bf00ff' }}
            whileTap={{ scale: 0.95 }}
          >
            Hire Me to Build Yours
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-[#0f0f2a] rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-auto"
              initial={{ scale: 0.9, opacity: 0, rotateX: -10 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotateX: 10 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <div>
                  <span className="text-[#bf00ff] text-sm">{selectedProject.category}</span>
                  <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                </div>
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 text-white" />
                </motion.button>
              </div>

              {/* Single Image Display */}
              <div className="p-6">
                <div className="relative rounded-xl overflow-hidden">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full aspect-video object-cover rounded-xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                    <p className="text-gray-300">{selectedProject.title} - Workflow Screenshot</p>
                  </div>
                </div>

                {/* Description & Metrics */}
                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">Short Description</p>
                      <p className="text-gray-300">{selectedProject.description}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">Tech Stack</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tools.map((tool) => (
                          <span key={tool} className="px-3 py-1 glass rounded-full text-sm text-[#00f5ff]">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">Business Impact</p>
                    <div className="space-y-2">
                      {selectedProject.metrics.map((metric) => (
                        <div key={metric} className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-[#00f5ff]" />
                          <span className="text-gray-300">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedSection>
  );
};

// Services Section
const ServicesSection = () => {
  const services = [
    {
      icon: Bot,
      title: 'AI Customer Support Agents',
      description: 'Build intelligent chatbots and AI agents that handle customer inquiries 24/7 with human-like accuracy.',
      color: '#00f5ff',
    },
    {
      icon: Zap,
      title: 'Lead Qualification & Sales Automation',
      description: 'Automate your sales pipeline from lead capture to qualification, scoring, and nurturing.',
      color: '#bf00ff',
    },
    {
      icon: Workflow,
      title: 'Workflow Automation for SMBs',
      description: 'Streamline your business operations with custom n8n workflows that eliminate repetitive tasks.',
      color: '#ff00d4',
    },
    {
      icon: BarChart3,
      title: 'Data Extraction & Analytics',
      description: 'Transform raw data into actionable insights with automated reporting and analytics pipelines.',
      color: '#00a2ff',
    },
    {
      icon: Settings,
      title: 'Internal Operations Optimization',
      description: 'Optimize your internal processes with AI-powered automation that boosts team productivity.',
      color: '#00f5ff',
    },
    {
      icon: Globe,
      title: 'API Integration & Development',
      description: 'Connect all your tools and platforms with seamless API integrations and custom connectors.',
      color: '#bf00ff',
    },
  ];

  return (
    <AnimatedSection id="services" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#bf00ff]/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <motion.span 
            className="text-[#00f5ff] font-medium mb-4 block"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            What I Offer
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive AI automation solutions tailored to your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="glass rounded-2xl p-8 group hover:border-[#00f5ff]/50 transition-all duration-500"
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring' }}
              whileHover={{ 
                y: -15, 
                boxShadow: `0 25px 50px ${service.color}30`,
                scale: 1.02
              }}
            >
              <motion.div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: `linear-gradient(135deg, ${service.color}20, ${service.color}10)` }}
                whileHover={{ scale: 1.2, rotate: 10 }}
                animate={{ 
                  boxShadow: [
                    `0 0 10px ${service.color}40`,
                    `0 0 20px ${service.color}60`,
                    `0 0 10px ${service.color}40`
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <service.icon className="w-8 h-8" style={{ color: service.color }} />
              </motion.div>
              
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00f5ff] transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00f5ff] to-[#00a2ff] rounded-full font-semibold text-black btn-glow"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px #00f5ff' }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Discuss Your Project
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const socialLinks = [
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/ali-raza-9816213a4', color: '#0077b5' },
    { icon: ExternalLink, label: 'Upwork', href: 'https://www.upwork.com/freelancers/~0159f86a70c47f0ac1', color: '#14a800' },
    { icon: ExternalLink, label: 'Freelancer', href: 'https://www.freelancer.com/u/aliraza799?sb=t', color: '#29b2fe' },
    { icon: Mail, label: 'Email Me', href: 'mailto:alirazaaa9980@gmail.com', color: '#ea4335' },
  ];

  return (
    <AnimatedSection id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-[#00f5ff]/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <motion.span 
            className="text-[#00f5ff] font-medium mb-4 block"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Get In Touch
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ready to transform your business with AI automation? Let's discuss your project!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              {[
                { name: 'name', label: 'Your Name', type: 'text', icon: Bot },
                { name: 'email', label: 'Email Address', type: 'email', icon: Mail },
              ].map((field) => (
                <div key={field.name} className="relative">
                  <label className="text-sm text-gray-400 mb-2 block">{field.label}</label>
                  <div className="relative">
                    <motion.div
                      animate={focused === field.name ? { 
                        scale: 1.1,
                        color: '#00f5ff'
                      } : {}}
                    >
                      <field.icon className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                        focused === field.name ? 'text-[#00f5ff]' : 'text-gray-500'
                      }`} />
                    </motion.div>
                    <input
                      type={field.type}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      onFocus={() => setFocused(field.name)}
                      onBlur={() => setFocused(null)}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#00f5ff] focus:shadow-[0_0_20px_rgba(0,245,255,0.2)] transition-all duration-300"
                      placeholder={`Enter your ${field.label.toLowerCase()}`}
                      required
                    />
                  </div>
                </div>
              ))}

              <div className="relative">
                <label className="text-sm text-gray-400 mb-2 block">Your Message</label>
                <div className="relative">
                  <MessageSquare className={`absolute left-4 top-4 w-5 h-5 transition-colors ${
                    focused === 'message' ? 'text-[#00f5ff]' : 'text-gray-500'
                  }`} />
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    rows={5}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#00f5ff] focus:shadow-[0_0_20px_rgba(0,245,255,0.2)] transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00f5ff] to-[#00a2ff] rounded-xl font-semibold text-black btn-glow"
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px #00f5ff' }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5" />
                Send Message
              </motion.button>
            </div>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Connect With Me</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.label !== 'Email Me' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 glass rounded-xl hover:border-white/30 transition-all duration-300 group"
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      boxShadow: `0 10px 30px ${link.color}30`
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <motion.div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: `${link.color}20` }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <link.icon className="w-5 h-5" style={{ color: link.color }} />
                    </motion.div>
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.div 
              className="glass rounded-2xl p-8"
              whileHover={{ boxShadow: '0 0 30px rgba(0, 245, 255, 0.1)' }}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Quick Response</h3>
              <p className="text-gray-400 mb-4">
                I typically respond within 24 hours. For urgent projects, reach out via LinkedIn or Email.
              </p>
              <motion.div 
                className="flex items-center gap-3 text-[#00f5ff]"
                animate={{ 
                  textShadow: [
                    '0 0 5px #00f5ff',
                    '0 0 10px #00f5ff',
                    '0 0 5px #00f5ff'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Mail className="w-5 h-5" />
                <span>alirazaaa9980@gmail.com</span>
              </motion.div>
            </motion.div>

            <motion.div 
              className="glass rounded-2xl p-8 bg-gradient-to-br from-[#00f5ff]/10 to-[#bf00ff]/10"
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(0, 245, 255, 0.1)',
                  '0 0 30px rgba(191, 0, 255, 0.1)',
                  '0 0 20px rgba(0, 245, 255, 0.1)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Ready to Start?</h3>
              <p className="text-gray-400">
                Let's discuss how AI automation can transform your business operations. 
                Book a free consultation call today!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

// Footer
const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/ali-raza-9816213a4' },
    { icon: ExternalLink, href: 'https://www.upwork.com/freelancers/~0159f86a70c47f0ac1' },
    { icon: Mail, href: 'mailto:alirazaaa9980@gmail.com' },
  ];

  return (
    <footer className="py-12 border-t border-white/10 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="font-display text-2xl font-bold gradient-text"
              animate={{ 
                textShadow: [
                  '0 0 10px #00f5ff',
                  '0 0 20px #bf00ff',
                  '0 0 10px #00f5ff'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              AR
            </motion.span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-400">© {new Date().getFullYear()} Ali Raza. All rights reserved.</span>
          </motion.div>

          <div className="flex items-center gap-6">
            {footerLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-[#00f5ff] hover:border-[#00f5ff] transition-all duration-300"
                whileHover={{ 
                  scale: 1.2, 
                  y: -5,
                  boxShadow: '0 10px 20px rgba(0, 245, 255, 0.3)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#00a2ff] flex items-center justify-center text-black shadow-lg glow-cyan z-40"
            whileHover={{ scale: 1.2, boxShadow: '0 0 30px #00f5ff' }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

// Main App
export function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Ensure intro is shown on mount
    setShowIntro(true);
    setContentVisible(false);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setTimeout(() => setContentVisible(true), 100);
  };

  return (
    <div className="relative min-h-screen bg-[#030014]">
      {/* Logo Intro Animation */}
      <AnimatePresence mode="wait">
        {showIntro && <LogoIntro onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* Main Website Content - Hidden until intro completes */}
      {!showIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: contentVisible ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <FloatingParticles />
          <BackgroundShapes />
          <GlowingOrbs />
          <Navigation_Component />
          <main>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ServicesSection />
            <ContactSection />
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
  );
}
