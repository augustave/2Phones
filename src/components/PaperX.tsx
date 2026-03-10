import { motion, AnimatePresence } from 'framer-motion';

const metaLeft = [
  'A8 FRONDCONT',
  'Istituto Statale d’Arte, Milano (IT)',
];

const metaRight = [
  'NINE.SIXTHREE™ / ATELIER LOMANN',
  'RM.: 1004 / Strategy-led Brand Consultancy',
];

const lineItems = [
  ['1', 'Reduction Businessplan', '1', '500.00', '500.00'],
  ['2', 'Erstellung Bildkonzept', '1', '600.00', '600.00'],
  ['3', 'Lizenzierung Schrift', '6', '150.00', '900.00'],
  ['4', 'Production Brochure', '10', '60.00', '600.00'],
  ['5', 'Layout und Konzept', '1', '250.00', '250.00'],
];

const footerLeft = [
  'Atelier Lomann GmbH',
  'Althofstrasse 147',
  '8106 Regensdorf (CH)',
];

const footerCenter = [
  '(T)   +41 (0) 557 53 94',
  '(E)   info@atelier-lomann.ch',
  '(W)   atelier-lomann.ch',
];

const footerRight = [
  'Zürcher Kantonalbank',
  'IBAN: CH72 0070 0114 0001 3030 4',
  'Swift: ZKBKCHZZ80A',
];

const ROUTE_CYCLE = 6.4;

export function PaperX({ isActive = true }: { isActive?: boolean }) {
  return (
    <div className="w-full h-full bg-zinc-950 flex items-center justify-center overflow-hidden relative">
      <AnimatePresence>
        {isActive && (
          <motion.div
            key="paper-container"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-[#ebeae4] text-[#3d3d39] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col"
            style={{ 
              width: 'min(820px, 90vw)',
              height: 'min(1000px, 85vh)',
            }}
          >
            <PaperGrain />
            <AmbientField />
            <ScanLine />

            <motion.div
              animate={{ y: [0, -1.5, 0, 1, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 p-[22px] md:p-[28px] font-mono text-[9px] md:text-[10px] leading-[1.2] tracking-[0.01em] flex flex-col justify-between h-full"
            >
              <div className="relative h-[60px] shrink-0">
                <Header metaLeft={metaLeft} metaRight={metaRight} />
              </div>
              
              <div className="flex-1 relative my-4">
                <QuietPanels />
                <Structure />
                <LedgerBlock />
              </div>
              
              <div className="relative h-[60px] shrink-0">
                <Footer />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PaperGrain() {
  return (
    <div
      className="absolute inset-0 opacity-[0.12] pointer-events-none mix-blend-multiply z-10"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(255,255,255,0.7) 0 0.4px, transparent 0.5px),
          radial-gradient(circle at 70% 50%, rgba(0,0,0,0.35) 0 0.45px, transparent 0.55px),
          radial-gradient(circle at 35% 80%, rgba(0,0,0,0.25) 0 0.35px, transparent 0.45px)
        `,
        backgroundSize: '8px 8px, 11px 11px, 13px 13px',
      }}
    />
  );
}

function AmbientField() {
  return (
    <motion.div
      animate={{ opacity: [0.18, 0.26, 0.18] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        background:
          'radial-gradient(circle at 70% 20%, rgba(227,235,223,0.55), transparent 34%), radial-gradient(circle at 18% 72%, rgba(232,238,227,0.42), transparent 40%)',
      }}
    />
  );
}

function ScanLine() {
  return (
    <motion.div
      initial={{ y: '-8%' }}
      animate={{ y: ['-8%', '108%'] }}
      transition={{ duration: 6.5, repeat: Infinity, ease: 'linear' }}
      className="absolute left-0 right-0 h-[64px] pointer-events-none mix-blend-screen opacity-[0.15] z-20"
      style={{
        background:
          'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.8), rgba(255,255,255,0))',
      }}
    />
  );
}

function Header({ metaLeft, metaRight }: { metaLeft: string[]; metaRight: string[] }) {
  return (
    <div className="relative w-full h-full">
      <motion.div
        initial={{ scaleX: 0, opacity: 0.4 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4, ease: 'linear' }}
        style={{ transformOrigin: 'left center' }}
        className="absolute left-0 top-0 w-[34%] border-t-[3px] border-[#c7c7c0]"
      />
      <motion.div
        initial={{ scaleX: 0, opacity: 0.4 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.5, ease: 'linear' }}
        style={{ transformOrigin: 'left center' }}
        className="absolute left-[38.5%] top-0 right-0 border-t-[3px] border-[#c7c7c0]"
      />

      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6, ease: 'linear' }}
        className="absolute top-[4px] left-0 space-y-[2px] text-[#454540]"
      >
        {metaLeft.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.7, ease: 'linear' }}
        className="absolute top-[4px] left-[39%] right-0 text-[#454540]"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-[2px]">
            {metaRight.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
          <motion.div
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
            className="whitespace-nowrap"
          >
            01.01.26
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: [0.5, 0.95, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[-1px] right-0 text-[#66665f]"
      >
        1/3
      </motion.div>
    </div>
  );
}

function QuietPanels() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.55, 0.88, 0.55], x: [0, 6, 0] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[-8px] top-[10px] w-[43%] h-[22px] bg-[#edf1ea]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.48, 0.78, 0.48], x: [0, -8, 0], y: [0, 2, 0] }}
        transition={{ duration: 5.2, delay: 0.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[16%] top-[2px] w-[26%] h-[26px] bg-[#e7ece2]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.42, 0.8, 0.42], x: [0, -4, 0], scaleY: [1, 1.04, 1] }}
        transition={{ duration: 5.8, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[6%] top-[40px] w-[22%] h-[92px] border-[3px] border-[#dde3d8] bg-[#e7ece2]/70"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.5, 0.9, 0.5], y: [0, -8, 0], x: [0, -4, 0] }}
        transition={{ duration: 6.8, delay: 0.1, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[4%] top-[150px] w-[38%] h-[172px] border-[3px] border-[#dde3d8] bg-[#e3eadf]/72"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.58, 0.92, 0.58], x: [0, 10, 0], y: [0, -6, 0] }}
        transition={{ duration: 7.5, delay: 0.3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[-16px] top-[300px] w-[54%] h-[292px] border-[3px] border-[#dfe5da] bg-[#e6ece1]/82"
      />
    </div>
  );
}

function Structure() {
  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: [0, 1, 1, 1, 0.08, 0] }}
        transition={{
          duration: ROUTE_CYCLE,
          times: [0, 0.14, 0.74, 0.82, 0.94, 1],
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ transformOrigin: 'top center' }}
        className="absolute left-[39%] top-[10px] h-[355px] border-l-[3px] border-[#c9c9c3]"
      />

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: [0, 1, 1, 1, 0.06, 0] }}
        transition={{
          duration: ROUTE_CYCLE,
          delay: 0.12,
          times: [0, 0.16, 0.76, 0.84, 0.95, 1],
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ transformOrigin: 'left center' }}
        className="absolute left-[39%] right-[2px] top-[365px] border-t-[3px] border-[#c9c9c3]"
      />

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: [0, 1, 1, 1, 0.06, 0] }}
        transition={{
          duration: ROUTE_CYCLE,
          delay: 0.24,
          times: [0, 0.18, 0.78, 0.86, 0.96, 1],
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ transformOrigin: 'left center' }}
        className="absolute left-[0] right-[2px] bottom-[100px] border-t-[3px] border-[#c9c9c3]"
      />

      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" preserveAspectRatio="none">
        <motion.line
          x1="0"
          y1="552"
          x2="266"
          y2="386"
          stroke="#c7c7c0"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0.18 }}
          animate={{ pathLength: [0, 1, 1, 1, 0.06, 0], opacity: [0.18, 1, 1, 1, 0.2, 0.18] }}
          transition={{
            duration: ROUTE_CYCLE,
            delay: 0.34,
            times: [0, 0.22, 0.8, 0.88, 0.97, 1],
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </svg>
    </div>
  );
}

function LedgerBlock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: [0.35, 0.35, 1, 1, 1], y: [14, 14, 0, 0, 0] }}
      transition={{
        duration: ROUTE_CYCLE,
        times: [0, 0.4, 0.54, 0.84, 1],
        repeat: Infinity,
        ease: 'linear',
      }}
      className="absolute left-[29%] right-[2px] bottom-[105px] border-[3px] border-[#cfcfc8] bg-[#ecece7]/55 overflow-hidden z-30"
    >
      <motion.div
        animate={{
          x: ['-120%', '-120%', '122%', '122%'],
          opacity: [0, 0, 0.92, 0],
        }}
        transition={{
          duration: ROUTE_CYCLE,
          times: [0, 0.46, 0.7, 0.82],
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-0 bottom-0 w-[34%] pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.32), rgba(255,255,255,0))',
          mixBlendMode: 'screen',
        }}
      />
      <Ledger />
    </motion.div>
  );
}

function Ledger() {
  return (
    <div className="px-3 py-2 text-[#43433e]">
      <div className="grid grid-cols-[1.6fr_0.35fr_0.7fr_0.8fr] gap-x-3 border-b-[3px] border-[#cfcfc8] pb-1 mb-1 uppercase tracking-[0.03em] text-[8px] md:text-[9px]">
        <div>Nr. & Bezeichnung</div>
        <div className="text-right">Menge</div>
        <div className="text-right">Einzelpreis</div>
        <div className="text-right">Betrag</div>
      </div>

      <div className="space-y-[2px]">
        {lineItems.slice(0, 5).map(([id, item, qty, price, total]) => (
          <div
            key={id}
            className="grid grid-cols-[1.6fr_0.35fr_0.7fr_0.8fr] gap-x-3 items-start"
          >
            <div className="truncate">{id}) {item}</div>
            <div className="text-right">{qty}</div>
            <div className="text-right">{price}</div>
            <div className="text-right">{total}</div>
          </div>
        ))}
      </div>

      <div className="mt-3 border-t-[3px] border-[#cfcfc8] pt-2 space-y-[2px]">
        <SummaryRow label="Summe" value="4850.00" step={0} />
        <SummaryRow label="MwSt. 7.7%" value="373.45" step={1} />
        <SummaryRow label="Total Off" value="5223.45" step={2} isFinal />
      </div>
    </div>
  );
}

function SummaryRow({ label, value, step, isFinal = false }: { label: string; value: string; step: number; isFinal?: boolean }) {
  const start = 0.68 + step * 0.03;
  const peak = start + 0.07;
  const settle = isFinal ? 0.965 : peak + 0.08;

  const opacityFrames = isFinal
    ? [0.74, 0.74, 1, 1, 1, 0.74]
    : [0.74, 0.74, 1, 0.88, 0.74];

  const colorFrames = isFinal
    ? ['#43433e', '#43433e', '#151514', '#151514', '#151514', '#43433e']
    : ['#43433e', '#43433e', '#1f1f1d', '#2d2d2a', '#43433e'];

  const timeFrames = isFinal
    ? [0, start, peak, 0.9, settle, 1]
    : [0, start, peak, settle, 1];

  return (
    <motion.div
      animate={{
        opacity: opacityFrames,
        color: colorFrames,
      }}
      transition={{
        duration: ROUTE_CYCLE,
        times: timeFrames,
        repeat: Infinity,
        ease: 'linear',
      }}
      className="flex items-start justify-between gap-4"
    >
      <div className="truncate">• {label}</div>
      <div className="whitespace-nowrap">{value}</div>
    </motion.div>
  );
}

function Footer() {
  return (
    <div className="relative w-full h-full border-t-[3px] border-[#c9c9c3] pt-2 text-[#474741] z-40 bg-[#ebeae4]/80 backdrop-blur-sm">
      <div className="grid grid-cols-3 gap-4 pb-1">
        <FooterBlock symbol="⌂" lines={footerLeft} />
        <FooterBlock symbol="↦" lines={footerCenter} />
        <FooterBlock symbol="◇" lines={footerRight} />
      </div>
    </div>
  );
}

function FooterBlock({ symbol, lines }: { symbol: string; lines: string[] }) {
  return (
    <motion.div
      animate={{ opacity: [0.58, 0.58, 0.72, 1, 1] }}
      transition={{
        duration: ROUTE_CYCLE,
        times: [0, 0.78, 0.88, 0.96, 1],
        repeat: Infinity,
        ease: 'linear',
      }}
      className="flex gap-2 h-full"
    >
      <div className="pt-[1px] text-[#66665f] shrink-0">{symbol}</div>
      <div className="space-y-[1px] overflow-hidden">
        {lines.map((line) => (
          <div key={line} className="truncate text-[8px] md:text-[9px] leading-tight">{line}</div>
        ))}
      </div>
    </motion.div>
  );
}
