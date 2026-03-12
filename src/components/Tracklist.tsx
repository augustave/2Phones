import { useEffect, useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TrackData = {
  id: number;
  text: string;
  x: number;
  y: number;
  w: number;
  isHero?: boolean;
};

const trackData: TrackData[] = [
  { id: 1, text: "0:38:48 PRIME TIME BEATS - IHR SEID OUT!", x: 225, y: 150, w: 750 },
  { id: 2, text: "0:41:24 GALT MACDERMOT - COFFEE COLD", x: 250, y: 225, w: 700 },
  { id: 3, text: "0:44:28 FAT JON - DREAMERS", x: 325, y: 300, w: 550 },
  { id: 4, text: "0:46:41 LETTUCE - PHYLLIS", x: 335, y: 375, w: 530 },
  { id: 5, text: "0:53:13 SAVAGES - YOU'RE MY CHOCOLATE", x: 240, y: 450, w: 720 },
  { id: 6, text: "0:58:23 MADCOLOUR - SO", x: 360, y: 525, w: 480 },
  { id: 7, text: "1:00:26 MONONOME - UNDERSTANDING", x: 275, y: 600, w: 650 },
  { id: 8, text: "1:03:38 MASSIVE ATTACK - TEARDROP INSTRUMENTAL", x: 160, y: 675, w: 880, isHero: true },
  { id: 9, text: "1:08:50 BROCK BERRIGAN - THE CELEBRATION SONG", x: 170, y: 750, w: 860 },
  { id: 10, text: "1:11:27 SAIB. - SHANGHAI NIGHTS", x: 290, y: 825, w: 620 },
];

export function Tracklist({ isActive = true }: { isActive?: boolean }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [phase, setPhase] = useState<'entrance' | 'hold' | 'exit'>('entrance');
  const [emphasisId, setEmphasisId] = useState<number | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'd') {
        setIsDarkMode(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  // Loop control
  useEffect(() => {
    if (!isActive) return;

    let isMounted = true;
    let timeout: ReturnType<typeof setTimeout>;

    const cycle = async () => {
      if (!isMounted) return;
      setPhase('entrance');
      await new Promise(r => setTimeout(r, 4500));
      
      if (!isMounted) return;
      setPhase('hold');
      
      // Emphasis cycling during hold phase
      const ids = [3, 8, 9, 1, 7];
      let idx = 0;
      const interval = setInterval(() => {
        if (!isMounted) {
          clearInterval(interval);
          return;
        }
        setEmphasisId(ids[idx % ids.length]);
        idx++;
      }, 1200);
      
      await new Promise(r => setTimeout(r, 7200));
      clearInterval(interval);
      if (!isMounted) return;
      setEmphasisId(null);
      
      setPhase('exit');
      await new Promise(r => setTimeout(r, 2500));
      if (!isMounted) return;
      timeout = setTimeout(cycle, 1500);
    };

    cycle();
    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [isActive]);

  const colors = useMemo(() => {
    if (isDarkMode) {
      return {
        bg: '#151515',
        block: '#353535',
        blockHover: '#595959',
        blockHero: '#6a6a6a',
        text: '#d2d2d2',
        textHero: '#ffffff',
        scanline: 'rgba(255, 255, 255, 0.045)',
        glow: 'rgba(255, 255, 255, 0.08)'
      };
    }
    return {
      bg: '#e3e3e3',
      block: '#777777',
      blockHover: '#595959',
      blockHero: '#4d4d4d',
      text: '#4a4a4a',
      textHero: '#111111',
      scanline: 'rgba(0, 0, 0, 0.05)',
      glow: 'rgba(255, 255, 255, 0.20)'
    };
  }, [isDarkMode]);

  return (
    <div className="w-full h-full flex items-center justify-center p-4 md:p-10 transition-colors duration-500 overflow-hidden relative" style={{ backgroundColor: colors.bg }}>
      <AnimatePresence>
        {isActive && (
          <motion.div
            key="tracklist-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative shadow-[0_0_0.1px_rgba(0,0,0,0.5)] overflow-hidden"
            style={{ 
              width: 'min(980px, 92vw)',
              height: 'min(816px, 80vh)',
              backgroundColor: colors.bg,
              fontFamily: "'Oswald', sans-serif"
            }}
          >
            <svg viewBox="0 0 1200 1000" className="w-full h-full block relative z-10">
              <defs>
                <filter id="grain">
                  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch">
                    <animate attributeName="seed" values="0;100;0" dur="1s" repeatCount="indefinite" />
                  </feTurbulence>
                  <feColorMatrix type="matrix" values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0.08 0" />
                </filter>
              </defs>

              <rect width="1200" height="1000" fill={colors.bg} />

              <TitleRow colors={colors} visible={phase !== 'exit'} />

              {trackData.map((track, i) => (
                <TrackRow
                  key={track.id}
                  data={track}
                  colors={colors}
                  index={i}
                  phase={phase}
                  isEmphasized={emphasisId === track.id || (track.isHero === true && phase === 'hold' && emphasisId === null)}
                />
              ))}

              <rect width="1200" height="1000" filter="url(#grain)" opacity="0.9" pointerEvents="none" />
            </svg>

            {/* Overlays */}
            <div 
              className="absolute inset-0 pointer-events-none z-20 opacity-30 mix-blend-multiply"
              style={{
                background: `repeating-linear-gradient(to bottom, transparent 0px, transparent 5px, ${colors.scanline} 6px, transparent 7px)`
              }}
            />
            <div 
              className="absolute inset-0 pointer-events-none z-20 opacity-85 mix-blend-screen"
              style={{
                background: `
                  radial-gradient(circle at 50% 10%, ${colors.glow}, transparent 42%),
                  radial-gradient(circle at 50% 88%, rgba(0,0,0,0.05), transparent 32%)
                `
              }}
            />
            <motion.div 
              className="absolute inset-0 pointer-events-none z-20 opacity-0 mix-blend-screen"
              animate={phase === 'entrance' ? {
                translateX: ['-120%', '100%'],
                opacity: [0, 0.32, 0]
              } : {}}
              transition={{ duration: 0.8, ease: "circOut" }}
              style={{
                background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.00) 42%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.00) 58%, transparent 100%)`
              }}
            />

            <div className="absolute bottom-3 left-4 text-[11px] font-bold tracking-widest opacity-55 mix-blend-multiply pointer-events-none z-30" style={{ color: colors.text }}>
              PRESS D FOR DARK MODE
            </div>
            <div className="absolute bottom-3 right-4 text-[11px] font-bold tracking-widest opacity-55 mix-blend-multiply pointer-events-none z-30" style={{ color: colors.text }}>
              SIGNAL CUT / LOOP ACTIVE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


interface TrackColors {
  bg: string;
  grid: string;
  block: string;
  text: string;
  highlight: string;
  muted: string;
}

function TitleRow({ colors, visible }: { colors: TrackColors, visible: boolean }) {

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.rect
        x="460" y="75" width="280" height="85"
        fill={colors.block}
        initial={{ scaleX: 0 }}
        animate={visible ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: "circOut" }}
        style={{ originX: 0.5 }}
      />
      <motion.text
        x="600" y="118"
        fill={colors.text}
        fontSize="38" textAnchor="middle" dominantBaseline="middle"
        initial={{ opacity: 0, x: -18 }}
        animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        style={{ fontWeight: 700 }}
      >
        TRACKLIST
      </motion.text>
    </motion.g>
  );
}

function TrackRow({ data, colors, index, phase, isEmphasized }: { data: TrackData, colors: TrackColors, index: number, phase: string, isEmphasized: boolean }) {
  const [displayText, setDisplayText] = useState(data.text);
  const [flipY, setFlipY] = useState(0);
  const visible = phase !== 'exit';
  const scrambleRef = useRef<number | null>(null);
  
  // Scramble effect
  useEffect(() => {
    if (phase === 'entrance' && visible) {
      const timestamp = data.text.slice(0, 7);
      const rest = data.text.slice(7);
      const duration = 800;
      const start = Date.now();
      
      const tick = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const keepThreshold = Math.floor(progress * timestamp.length);
        
        let scrambled = '';
        for (let i = 0; i < timestamp.length; i++) {
          const char = timestamp[i];
          if (char >= '0' && char <= '9' && i >= keepThreshold) {
            scrambled += Math.floor(Math.random() * 10).toString();
          } else {
            scrambled += char;
          }
        }
        
        setDisplayText(scrambled + rest);
        // Subtle flip kick during generation
        if (Math.random() > 0.7) setFlipY(Math.random() > 0.5 ? -2 : 2);
        else setFlipY(0);

        if (progress < 1) {
          scrambleRef.current = requestAnimationFrame(tick);
        } else {
          setDisplayText(data.text);
          setFlipY(0);
        }
      };
      
      const timeout = setTimeout(() => {
        scrambleRef.current = requestAnimationFrame(tick);
      }, (index * 100) + 300);
      
      return () => {
        clearTimeout(timeout);
        if (scrambleRef.current) cancelAnimationFrame(scrambleRef.current);
      };
    } else if (!visible) {
      setDisplayText(data.text);
      setFlipY(0);
    }
  }, [phase, visible, data.text, index]);

  // Emphasis "Kick" scramble
  useEffect(() => {
    if (isEmphasized && phase === 'hold') {
      const timestamp = data.text.slice(0, 7);
      const rest = data.text.slice(7);
      let count = 0;
      
      const interval = setInterval(() => {
        let scrambled = '';
        for (let i = 0; i < timestamp.length; i++) {
          const char = timestamp[i];
          if (char >= '0' && char <= '9') {
            scrambled += Math.floor(Math.random() * 10).toString();
          } else {
            scrambled += char;
          }
        }
        setDisplayText(scrambled + rest);
        setFlipY(count % 2 === 0 ? -3 : 3);
        count++;
        if (count > 6) {
          clearInterval(interval);
          setDisplayText(data.text);
          setFlipY(0);
        }
      }, 60);
      
      return () => clearInterval(interval);
    }
  }, [isEmphasized, phase, data.text]);

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : { opacity: 0 }}
    >
      <motion.rect
        className="transition-colors duration-300"
        x={data.x} y={data.y} width={data.w} height={85}
        fill={isEmphasized ? colors.blockHero : colors.block}
        initial={{ scaleX: 0 }}
        animate={visible ? { 
          scaleX: 1,
          scaleY: isEmphasized ? 1.08 : 1,
          y: isEmphasized ? -2 : 0
        } : { scaleX: 0 }}
        transition={{ 
          delay: visible ? (index * 0.08) + 0.3 : (9 - index) * 0.05,
          duration: 0.6, 
          ease: [0.16, 1, 0.3, 1]
        }}
        style={{ originX: 0 }}
      />
      <motion.text
        className="transition-colors duration-300"
        x="600" y={data.y + 43}
        fill={isEmphasized ? colors.textHero : colors.text}
        fontSize="38" textAnchor="middle" dominantBaseline="middle"
        initial={{ opacity: 0, x: -18, rotateX: 0 }}
        animate={visible ? { 
          opacity: 1, 
          x: 0,
          y: flipY,
          rotateX: isEmphasized ? [0, 15, -15, 0] : 0
        } : { opacity: 0, x: 18 }}
        transition={visible ? { 
          delay: (index * 0.08) + 0.4,
          duration: 0.5 
        } : { duration: 0.3 }}
        style={{ fontWeight: 700, transformOrigin: 'center' }}
      >
        {displayText}
      </motion.text>
    </motion.g>
  );
}
