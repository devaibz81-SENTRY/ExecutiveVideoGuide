import { useState } from 'react';

/**
 * NOTE FOR LOCAL EXECUTION:
 * This file uses Tailwind CSS. If running locally outside of an environment
 * that provides Tailwind, ensure you include the Tailwind CDN script in your index.html:
 * <script src="https://cdn.tailwindcss.com"></script>
 */

// --- Custom SVG Icons to replace lucide-react for zero-dependency local runs ---
const Icons = {
  Camera: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>,
  Lightbulb: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .5 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>,
  Mic: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>,
  Maximize: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>,
  Smartphone: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>,
  Settings: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
  UserCheck: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>,
  CheckCircle2: ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
  )
};

const StepRow = ({ title, icon: Icon, children, tip, visual, id }) => (
  <div id={id} className="bg-white rounded-[2rem] p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/60 flex flex-col lg:flex-row gap-8 md:gap-12 mb-6 md:mb-8 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] hover:-translate-y-2 hover:scale-[1.01] hover:border-blue-200 group cursor-default">
    <div className="flex-grow space-y-4 md:space-y-6">
      <div className="flex items-center gap-3 md:gap-4">
        <div className="p-3 md:p-4 bg-blue-50 text-blue-700 rounded-xl md:rounded-2xl group-hover:scale-110 transition-transform">
          <Icon />
        </div>
        <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">{title}</h3>
      </div>
      
      <div className="grid gap-3 md:gap-4">
        {children}
      </div>

      {tip && (
        <div className="bg-blue-900/5 border-l-4 border-blue-600 p-4 md:p-5 rounded-r-xl md:rounded-r-2xl mt-2 md:mt-4">
          <p className="text-xs md:text-sm font-bold text-slate-800 flex items-start">
            <span className="mr-2 text-blue-600 uppercase tracking-tighter shrink-0">Golden Rule:</span> {tip}
          </p>
        </div>
      )}
    </div>
    
    {visual && (
      <div className="lg:w-[380px] w-full shrink-0 flex items-center justify-center bg-slate-50/50 rounded-2xl p-4 lg:p-0">
        {visual}
      </div>
    )}
  </div>
);

// --- SVG Illustrations ---

const CameraSetupSVG = () => (
  <div className="bg-[#0f172a] rounded-[1.5rem] p-6 shadow-2xl border border-slate-800 w-full flex items-center justify-center overflow-hidden aspect-video lg:aspect-auto">
    <svg viewBox="0 0 200 140" className="w-full h-full">
      <path d="M20 110 L180 110 M40 100 L160 100" stroke="#1e293b" strokeWidth="1" />
      <rect x="70" y="30" width="60" height="85" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      <g transform="translate(100, 50)">
        <circle 
          r="18" 
          fill="none" 
          stroke="#3b82f6" 
          strokeWidth="1.5" 
          strokeDasharray="4 2" 
          className="animate-spin-slow" 
        />
        <circle r="8" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
        <circle r="3" fill="#3b82f6" className="animate-pulse" />
      </g>
      <g opacity="0.3" stroke="#94a3b8" strokeWidth="0.5">
        <line x1="70" y1="58" x2="130" y2="58" />
        <line x1="70" y1="87" x2="130" y2="87" />
        <line x1="90" y1="30" x2="90" y2="115" />
        <line x1="110" y1="30" x2="110" y2="115" />
      </g>
      <g transform="translate(140, 50)">
        <path d="M0 -20 L10 -20 L10 20 L0 20" fill="none" stroke="#3b82f6" strokeWidth="1" />
        <text x="15" y="4" fill="#3b82f6" fontSize="7" fontWeight="black" className="uppercase">Eye Level</text>
      </g>
      <text x="100" y="130" fill="#475569" fontSize="8" textAnchor="middle" fontWeight="bold" className="uppercase tracking-widest">Lens Alignment</text>
    </svg>
    <style>{`
      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .animate-spin-slow {
        transform-origin: center;
        animation: spin-slow 8s linear infinite;
      }
    `}</style>
  </div>
);

const LightingSVG = () => (
  <div className="bg-[#0f172a] rounded-[1.5rem] p-6 shadow-2xl border border-slate-800 w-full flex items-center justify-center aspect-video lg:aspect-auto">
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <rect x="0" y="0" width="200" height="160" fill="#0f172a" />
      <g>
        <circle cx="160" cy="40" r="12" fill="#eab308" opacity="0.2">
          <animate attributeName="r" values="11;13;11" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="160" cy="40" r="6" fill="#facc15" />
        <text x="160" y="22" fill="#eab308" fontSize="7" textAnchor="middle" fontWeight="bold">LIGHT</text>
        <path d="M160 40 L60 85 L85 130 Z" fill="url(#lightGradient)" opacity="0.4" />
      </g>
      <g>
        <circle cx="80" cy="100" r="15" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
        <path d="M70 92 Q80 85 90 92" stroke="#facc15" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        <text x="80" y="130" fill="#f8fafc" fontSize="8" textAnchor="middle" fontWeight="bold">YOU (FACE)</text>
      </g>
      <defs>
        <linearGradient id="lightGradient" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const AudioSVG = () => (
  <div className="bg-[#0f172a] rounded-[1.5rem] p-6 shadow-2xl border border-slate-800 w-full flex items-center justify-center aspect-video lg:aspect-auto">
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <rect x="30" y="50" width="20" height="20" rx="4" fill="#1e293b" stroke="#3b82f6" strokeWidth="1"/>
      <circle cx="40" cy="50" r="8" fill="#3b82f6" opacity="0.4"/>
      <g>
        {[1, 2, 3, 4, 5].map((i) => (
          <path 
            key={i}
            d={`M${60 + (i * 15)} ${40 - (i * 2)} Q${75 + (i * 15)} 60 ${60 + (i * 15)} ${80 + (i * 2)}`} 
            fill="none" 
            stroke="#3b82f6" 
            strokeWidth="2" 
            strokeLinecap="round"
            opacity={1 - (i * 0.15)}
          >
            <animate attributeName="stroke-dasharray" from="0, 100" to="100, 0" dur={`${1 + (i * 0.2)}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values={`${1 - (i * 0.15)};0;${1 - (i * 0.15)}`} dur="2s" repeatCount="indefinite" />
          </path>
        ))}
      </g>
      <text x="100" y="105" fill="#94a3b8" fontSize="8" textAnchor="middle" fontWeight="bold">CLEAN AUDIO CAPTURE</text>
    </svg>
  </div>
);

const FramingSVG = () => (
  <div className="bg-[#0f172a] rounded-[1.5rem] p-6 shadow-2xl border border-slate-800 w-full flex items-center justify-center aspect-video lg:aspect-auto">
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <rect x="20" y="10" width="160" height="90" fill="none" stroke="#334155" strokeWidth="1"/>
      <line x1="20" y1="40" x2="180" y2="40" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4"/>
      <circle cx="100" cy="40" r="12" fill="#1e293b" stroke="#60a5fa" strokeWidth="1.5"/>
      <path d="M70 100 Q70 65 100 65 Q130 65 130 100" fill="#1e293b" stroke="#334155"/>
      <text x="100" y="25" fill="#60a5fa" fontSize="7" textAnchor="middle" fontWeight="bold">EYES AT THE TOP LINE</text>
    </svg>
  </div>
);

const StabilitySVG = () => (
  <div className="bg-[#0f172a] rounded-[1.5rem] p-6 shadow-2xl border border-slate-800 w-full flex items-center justify-center aspect-video lg:aspect-auto">
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <rect x="40" y="70" width="80" height="15" rx="2" fill="#1e293b" stroke="#334155" />
      <rect x="42" y="55" width="76" height="15" rx="2" fill="#334155" stroke="#475569" />
      <rect x="45" y="40" width="70" height="15" rx="2" fill="#1e293b" stroke="#334155" />
      <g transform="rotate(-10, 125, 80)">
        <rect x="120" y="20" width="10" height="70" rx="2" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1" />
        <circle cx="125" cy="30" r="1.5" fill="#0f172a" />
      </g>
      <line x1="20" y1="90" x2="180" y2="90" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
      <text x="100" y="110" fill="#94a3b8" fontSize="8" textAnchor="middle" fontWeight="bold">DIY OFFICE STAND (STABLE)</text>
    </svg>
  </div>
);

const SettingsSVG = () => (
  <div className="bg-[#0f172a] rounded-[1.5rem] p-6 shadow-2xl border border-slate-800 w-full flex items-center justify-center aspect-video lg:aspect-auto">
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <rect x="40" y="15" width="120" height="65" rx="8" fill="#000" stroke="#334155" strokeWidth="2"/>
      <g>
        <rect x="85" y="30" width="30" height="30" fill="none" stroke="#fbbf24" strokeWidth="1.5" className="animate-pulse">
          <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
        </rect>
        <circle cx="125" cy="45" r="3" fill="#fbbf24" />
        <rect x="75" y="20" width="50" height="8" rx="4" fill="#fbbf24" />
        <text x="100" y="26.5" fill="#000" fontSize="5" textAnchor="middle" fontWeight="black">AE/AF LOCK</text>
      </g>
      <text x="100" y="100" fill="#fbbf24" fontSize="10" textAnchor="middle" fontWeight="black">TAP & HOLD TO LOCK</text>
    </svg>
  </div>
);

const PerformanceSVG = () => (
  <div className="w-full flex flex-col items-center justify-center space-y-4 py-4">
    <svg viewBox="0 0 200 130" className="w-full max-w-[280px] drop-shadow-2xl">
      <rect x="50" y="10" width="100" height="60" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      <rect x="60" y="20" width="30" height="40" rx="6" fill="#0f172a" />
      <circle cx="75" cy="32" r="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1.5" />
      <g className="animate-pulse">
        <circle cx="75" cy="32" r="14" fill="none" stroke="#fbbf24" strokeWidth="1" strokeDasharray="4,2" />
        <path d="M75 10 L75 18 M75 46 L75 54 M56 32 L64 32 M86 32 L94 32" stroke="#fbbf24" strokeWidth="2" />
      </g>
      <path d="M140 100 L95 50" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
      <text x="100" y="115" fill="#fbbf24" fontSize="12" textAnchor="middle" fontWeight="black">LOOK AT THE LENS</text>
      <text x="100" y="128" fill="#64748b" fontSize="8" textAnchor="middle" fontWeight="bold">NOT YOUR FACE ON SCREEN</text>
    </svg>
  </div>
);

export default function App() {
  const [checks, setChecks] = useState(new Array(7).fill(false));
  const toggle = (i) => {
    const n = [...checks];
    n[i] = !n[i];
    setChecks(n);
  };

  const completed = checks.filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 md:pb-32 overflow-x-hidden font-sans">
      <header className="bg-slate-950 text-white pt-16 pb-36 md:pt-24 md:pb-48 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-10">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3 mb-4 md:mb-6">
              <span className="bg-blue-600 px-3 py-1 rounded text-[9px] md:text-[10px] font-black uppercase tracking-widest">Office Ready</span>
              <span className="text-slate-400 font-bold text-[10px] md:text-xs uppercase tracking-tight">Executive Video Standards</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-none mb-4 md:mb-6">
              Executive <span className="text-blue-500">Video.</span>
            </h1>
            <p className="text-base md:text-lg text-slate-400 font-medium leading-relaxed max-w-lg">
              Seven simple steps to ensure your office videos look professional, sharp, and high-impact.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] flex flex-row md:flex-col items-center gap-4 md:gap-0 w-full md:w-auto justify-between md:justify-center">
            <span className="text-[9px] md:text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] md:tracking-[0.3em] md:mb-2">Checklist</span>
            <div className="text-3xl md:text-5xl font-black tabular-nums">{completed} <span className="text-slate-600">/ 7</span></div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 -mt-16 md:-mt-24 relative z-20">
        <StepRow 
          id="camera"
          title="01. Professional Look" 
          icon={Icons.Camera} 
          visual={<CameraSetupSVG />}
          tip="Place the camera at eye level. Looking down or up at the phone feels unprofessional."
        >
          <div className="flex items-start gap-3">
            <Icons.CheckCircle2 size={20} className="text-blue-600 shrink-0 mt-0.5" />
            <p className="text-sm md:text-base text-slate-600"><strong className="text-slate-900">Back Camera Only:</strong> The back camera produces a much sharper, higher-quality image than the selfie lens.</p>
          </div>
          <div className="flex items-start gap-3">
            <Icons.CheckCircle2 size={20} className="text-blue-600 shrink-0 mt-0.5" />
            <p className="text-sm md:text-base text-slate-600"><strong className="text-slate-900">High Resolution:</strong> Set to '4K' or '1080p'. Higher resolution ensures it looks professional on laptops and TVs.</p>
          </div>
        </StepRow>

        <StepRow 
          id="lighting"
          title="02. Natural Lighting" 
          icon={Icons.Lightbulb} 
          visual={<LightingSVG />}
          tip="Always face your light source. If you have a window behind you, you'll look like a dark shadow."
        >
          <div className="flex items-start gap-3">
            <Icons.CheckCircle2 size={20} className="text-blue-600 shrink-0 mt-0.5" />
            <p className="text-sm md:text-base text-slate-600"><strong className="text-slate-900">Front Lighting:</strong> Facing a window provides the best, most natural light for your skin tone.</p>
          </div>
        </StepRow>

        <StepRow 
          id="audio"
          title="03. Clear Sound" 
          icon={Icons.Mic} 
          visual={<AudioSVG />}
          tip="Sound is 50% of the video. If they can't hear you clearly, they won't watch."
        >
          <div className="flex items-start gap-3">
            <Icons.CheckCircle2 size={20} className="text-blue-600 shrink-0 mt-0.5" />
            <p className="text-sm md:text-base text-slate-600"><strong className="text-slate-900">Stay Close:</strong> Stay within arm's length of your phone so the mic picks you up over background noise.</p>
          </div>
        </StepRow>

        <StepRow 
          id="framing"
          title="04. Eye-Level Framing" 
          icon={Icons.Maximize} 
          visual={<FramingSVG />}
          tip="Position yourself so your eyes are level with the top third of the screen."
        >
          <div className="flex items-start gap-3">
            <Icons.CheckCircle2 size={20} className="text-blue-600 shrink-0 mt-0.5" />
            <p className="text-sm md:text-base text-slate-600"><strong className="text-slate-900">Chest Up:</strong> Show yourself from the chest up. It feels natural, like a face-to-face meeting.</p>
          </div>
        </StepRow>

        <StepRow 
          id="stability"
          title="05. Rock Steady" 
          icon={Icons.Smartphone} 
          visual={<StabilitySVG />}
          tip="A steady video equals authority. Propping your phone against books is better than a shaky hand."
        >
          <div className="flex items-start gap-3">
            <Icons.CheckCircle2 size={20} className="text-blue-600 shrink-0 mt-0.5" />
            <p className="text-sm md:text-base text-slate-600"><strong className="text-slate-900">Hands-Free:</strong> Use a stable surface. Shaky video is distracting and looks accidental.</p>
          </div>
        </StepRow>

        <StepRow 
          id="settings"
          title="06. Tech Secrets" 
          icon={Icons.Settings} 
          visual={<SettingsSVG />}
          tip="Locking AE/AF prevents your phone from 'hunting' for focus while you speak."
        >
          <div className="flex items-start gap-3">
            <Icons.CheckCircle2 size={20} className="text-blue-600 shrink-0 mt-0.5" />
            <p className="text-sm md:text-base text-slate-600"><strong className="text-slate-900">Lock Focus:</strong> Tap and hold your face on screen until 'AE/AF Lock' appears to stop lighting shifts.</p>
          </div>
        </StepRow>

        <StepRow 
          id="performance"
          title="07. Powerful Presence" 
          icon={Icons.UserCheck} 
          visual={<PerformanceSVG />}
          tip="Look at the camera lens, not your own face on the screen. It creates a real connection."
        >
          <div className="flex items-start gap-3">
            <Icons.CheckCircle2 size={20} className="text-blue-600 shrink-0 mt-0.5" />
            <p className="text-sm md:text-base text-slate-600"><strong className="text-slate-900">Eye Contact:</strong> Direct eye contact with the lens makes the audience feel you are speaking to them.</p>
          </div>
        </StepRow>

        <div className="mt-12 md:mt-20 bg-[#1e293b] rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-3xl border-t-4 md:border-t-8 border-blue-600 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Ready to Record</h2>
              <p className="text-blue-400 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">Final Quality Check</p>
            </div>
            <div className="bg-white/10 px-4 md:px-8 py-2 md:py-3 rounded-xl md:rounded-2xl border border-white/10">
              <span className="text-blue-400 font-black text-xl md:text-2xl tabular-nums">{completed} / 7</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
            {['Camera', 'Light', 'Sound', 'Frame', 'Steady', 'Lock', 'Voice'].map((label, i) => (
              <button 
                key={label}
                onClick={() => toggle(i)}
                className={`p-4 md:p-5 rounded-2xl md:rounded-[1.5rem] border-2 transition-all flex flex-col items-center gap-2 md:gap-3 touch-manipulation ${checks[i] ? 'bg-blue-600 border-blue-400 scale-[0.98]' : 'bg-slate-800/50 border-slate-700 hover:border-slate-500 active:scale-95'}`}
              >
                <div className={`p-2 rounded-lg ${checks[i] ? 'bg-white text-blue-600' : 'bg-slate-700 text-slate-500'}`}>
                  <Icons.CheckCircle2 size={18} />
                </div>
                <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest ${checks[i] ? 'text-white' : 'text-slate-500'}`}>{label}</span>
              </button>
            ))}
          </div>

          {completed === 7 && (
            <div className="mt-8 md:mt-12 bg-blue-500 rounded-2xl md:rounded-3xl p-6 md:p-8 text-center animate-in zoom-in duration-500 shadow-[0_0_50px_rgba(59,130,246,0.3)]">
              <span className="text-3xl md:text-4xl">🚀</span>
              <h3 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tighter mt-4">You Are Ready</h3>
              <p className="text-blue-100 font-bold uppercase tracking-widest text-[10px] mt-1">Executive Standards Met • Press Record</p>
            </div>
          )}
        </div>
      </main>

      <footer className="text-center py-16 md:py-20 grayscale opacity-40 px-4">
        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-slate-500 leading-relaxed">
          Corporate Media Protocol • Professional Edition
        </p>
      </footer>
    </div>
  );
}