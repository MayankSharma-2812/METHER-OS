<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>METHER OS | Neural Interface</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&amp;family=JetBrains+Mono:wght@400;500&amp;family=Geist:wght@400;500&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "secondary-fixed": "#f8d8ff",
                        "on-primary": "#00363a",
                        "primary-fixed-dim": "#00dbe9",
                        "on-primary-container": "#006970",
                        "inverse-primary": "#006970",
                        "on-tertiary": "#3c0090",
                        "inverse-surface": "#e3e1e9",
                        "primary": "#dbfcff",
                        "tertiary": "#faf3ff",
                        "surface-dim": "#121318",
                        "surface-container": "#1e1f25",
                        "on-surface-variant": "#b9cacb",
                        "secondary-container": "#b600f8",
                        "on-secondary-fixed-variant": "#74009f",
                        "surface-bright": "#38393f",
                        "on-error": "#690005",
                        "on-secondary": "#520072",
                        "surface-container-lowest": "#0d0e13",
                        "secondary": "#ebb2ff",
                        "tertiary-container": "#e1d2ff",
                        "surface-container-high": "#292a2f",
                        "tertiary-fixed": "#e9ddff",
                        "error": "#ffb4ab",
                        "outline": "#849495",
                        "background": "#08090d",
                        "on-secondary-container": "#fff6fc",
                        "primary-fixed": "#7df4ff",
                        "on-surface": "#e3e1e9",
                        "on-secondary-fixed": "#320047",
                        "secondary-fixed-dim": "#ebb2ff",
                        "surface-container-low": "#1a1b21",
                        "on-primary-fixed": "#002022",
                        "on-error-container": "#ffdad6",
                        "on-tertiary-fixed-variant": "#5700c9",
                        "primary-container": "#00f0ff",
                        "on-background": "#e3e1e9",
                        "inverse-on-surface": "#2f3036",
                        "tertiary-fixed-dim": "#d1bcff",
                        "surface-tint": "#00dbe9",
                        "surface": "#0d0e13",
                        "error-container": "#93000a",
                        "on-tertiary-container": "#7213ff",
                        "outline-variant": "#3b494b",
                        "on-primary-fixed-variant": "#004f54",
                        "on-tertiary-fixed": "#23005b",
                        "surface-variant": "#34343a",
                        "surface-container-highest": "#34343a"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "unit": "8px",
                        "mobile-margin": "20px",
                        "gutter": "24px",
                        "panel-gap": "32px",
                        "container-padding": "40px"
                    },
                    "fontFamily": {
                        "display-lg": ["Space Grotesk"],
                        "headline-lg-mobile": ["Space Grotesk"],
                        "body-lg": ["Geist"],
                        "headline-md": ["Space Grotesk"],
                        "label-caps": ["JetBrains Mono"],
                        "body-md": ["Geist"],
                        "headline-lg": ["Space Grotesk"]
                    },
                    "fontSize": {
                        "display-lg": ["64px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "300"}],
                        "headline-lg-mobile": ["28px", {"lineHeight": "1.2", "fontWeight": "400"}],
                        "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
                        "headline-md": ["24px", {"lineHeight": "1.3", "fontWeight": "500"}],
                        "label-caps": ["12px", {"lineHeight": "1.0", "letterSpacing": "0.1em", "fontWeight": "500"}],
                        "body-md": ["16px", {"lineHeight": "1.5", "fontWeight": "400"}],
                        "headline-lg": ["32px", {"lineHeight": "1.2", "letterSpacing": "0.02em", "fontWeight": "400"}]
                    }
                },
            },
        }
    </script>
<style>
        body {
            background-color: #08090d;
            overflow: hidden;
        }
        .perspective-grid {
            background-image: 
                linear-gradient(to right, rgba(0, 219, 233, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 219, 233, 0.03) 1px, transparent 1px);
            background-size: 80px 80px;
            perspective: 1500px;
            transform: rotateX(70deg) translateY(-300px);
            mask-image: radial-gradient(circle at center, black, transparent 80%);
        }
        .holographic-glass {
            backdrop-filter: blur(25px);
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%);
            border: 1px solid rgba(0, 219, 233, 0.15);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 0 15px rgba(0, 219, 233, 0.05);
        }
        .glow-cyan {
            filter: drop-shadow(0 0 10px rgba(0, 219, 233, 0.4));
        }
        .glow-purple {
            filter: drop-shadow(0 0 10px rgba(235, 178, 255, 0.3));
        }
        .rotating-fast { animation: rotate 15s linear infinite; }
        .rotating-med { animation: rotate 25s linear infinite reverse; }
        .rotating-slow { animation: rotate 45s linear infinite; }
        
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .breath-slow {
            animation: breath 6s ease-in-out infinite;
        }
        @keyframes breath {
            0%, 100% { opacity: 0.3; transform: scale(1); filter: blur(40px); }
            50% { opacity: 0.7; transform: scale(1.1); filter: blur(30px); }
        }
        .scanlines {
            background: linear-gradient(to bottom, transparent 50%, rgba(0, 219, 233, 0.02) 50%);
            background-size: 100% 4px;
            pointer-events: none;
            animation: scanline 20s linear infinite;
        }
        @keyframes scanline {
            from { background-position: 0 0; }
            to { background-position: 0 100%; }
        }
        .dust-particles {
            position: absolute;
            width: 100%;
            height: 100%;
            background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
            background-size: 100px 100px;
            animation: drift 60s linear infinite;
        }
        @keyframes drift {
            from { transform: translateY(0); }
            to { transform: translateY(-100%); }
        }
        .nav-item-active {
            background: linear-gradient(to right, rgba(0, 219, 233, 0.1), transparent);
            border-left: 2px solid #00dbe9;
        }
    </style>
</head>
<body class="text-on-surface selection:bg-primary-container selection:text-on-primary-container font-body-md overflow-hidden">
<!-- Atmospheric Layers -->
<div class="fixed inset-0 z-0 pointer-events-none">
<div class="absolute inset-0 perspective-grid opacity-20"></div>
<div class="absolute inset-0 scanlines opacity-40"></div>
<div class="absolute inset-0 dust-particles opacity-30"></div>
<!-- Volumetric Ambient Light -->
<div class="absolute top-[-10%] left-[20%] w-[800px] h-[800px] bg-primary-fixed-dim/5 rounded-full blur-[150px] breath-slow"></div>
<div class="absolute bottom-[-10%] right-[20%] w-[800px] h-[800px] bg-secondary-container/5 rounded-full blur-[150px] breath-slow" style="animation-delay: -3s;"></div>
</div>
<!-- Global Header -->
<header class="fixed top-0 left-0 right-0 z-50 h-20 px-12 flex justify-between items-center bg-gradient-to-b from-black/40 to-transparent backdrop-blur-sm">
<div class="flex items-center gap-10">
<div class="flex flex-col">
<span class="font-display-lg text-2xl tracking-[0.2em] text-primary-fixed-dim glow-cyan">METHER OS</span>
<span class="font-label-caps text-[8px] tracking-[0.4em] opacity-40 uppercase">Neural Infrastructure v2.4</span>
</div>
<nav class="hidden md:flex items-center gap-8">
<a class="text-primary-fixed-dim border-b border-primary-fixed-dim/50 pb-1 text-sm tracking-widest font-label-caps" href="#">TELEMETRY</a>
<a class="text-on-surface-variant/40 hover:text-primary-fixed transition-colors text-sm tracking-widest font-label-caps" href="#">DIAGNOSTICS</a>
<a class="text-on-surface-variant/40 hover:text-primary-fixed transition-colors text-sm tracking-widest font-label-caps" href="#">NETWORK</a>
</nav>
</div>
<div class="flex items-center gap-8">
<div class="flex items-center gap-3 px-4 py-1.5 border border-white/5 rounded-full bg-white/5">
<div class="w-1.5 h-1.5 rounded-full bg-primary-fixed-dim shadow-[0_0_8px_rgba(0,219,233,0.8)]"></div>
<span class="font-label-caps text-[10px] tracking-widest text-on-surface-variant">NODE_04 ACTIVE</span>
</div>
<div class="flex items-center gap-5">
<button class="material-symbols-outlined text-on-surface-variant/60 hover:text-primary-fixed transition-all text-xl" data-icon="settings">settings</button>
<div class="w-10 h-10 rounded-full border border-primary-fixed-dim/30 p-0.5 overflow-hidden ring-4 ring-primary-fixed-dim/5">
<img alt="AI Core Avatar" class="w-full h-full rounded-full object-cover grayscale brightness-125" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRit3s7REW24w1r121_frQBfZkJcfuqjIpxRmil8ZwS8FzVdE8dy5YAnUz7zSNYv0lnscvQ5GPGha7snF4NivafJ-baI_xfuJKvifUkoPYLEnpH8VCGXh5wl7yfRHw5FGj76V7f3-DdOt1NfqTo3QX5_5z6vj9wRiFIJGrICql8CEa7SBqPj90Zd4M6YX7kBxPkyfoabIXTJV6X-ydRCncHxRkcJ1LtRog4a_V3V1k6Ag9ZrUgSife3rp2tk7oA_5I4y6VQk00DDwI"/>
</div>
</div>
</div>
</header>
<!-- Floating Holographic Sidebar -->
<aside class="fixed left-12 top-1/2 -translate-y-1/2 z-40 w-16 group hover:w-56 transition-all duration-700 ease-out">
<div class="holographic-glass rounded-full py-8 flex flex-col items-center gap-8 overflow-hidden backdrop-blur-xl border-white/10">
<div class="p-2 mb-4">
<div class="w-8 h-8 rounded-lg bg-primary-fixed-dim/10 flex items-center justify-center border border-primary-fixed-dim/30">
<span class="material-symbols-outlined text-primary-fixed-dim text-lg" data-icon="hub">hub</span>
</div>
</div>
<nav class="flex flex-col w-full">
<div class="nav-item-active group/item flex items-center gap-6 px-4 py-4 cursor-pointer transition-all">
<span class="material-symbols-outlined text-primary-fixed-dim shrink-0" data-icon="psychology">psychology</span>
<span class="font-label-caps text-xs tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">NEURAL HUB</span>
</div>
<div class="group/item flex items-center gap-6 px-4 py-4 cursor-pointer hover:bg-white/5 transition-all">
<span class="material-symbols-outlined text-on-surface-variant/40 group-hover/item:text-primary-fixed-dim shrink-0" data-icon="database">database</span>
<span class="font-label-caps text-xs tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">MEMORY BANK</span>
</div>
<div class="group/item flex items-center gap-6 px-4 py-4 cursor-pointer hover:bg-white/5 transition-all">
<span class="material-symbols-outlined text-on-surface-variant/40 group-hover/item:text-primary-fixed-dim shrink-0" data-icon="account_tree">account_tree</span>
<span class="font-label-caps text-xs tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">LOGIC FLOW</span>
</div>
<div class="group/item flex items-center gap-6 px-4 py-4 cursor-pointer hover:bg-white/5 transition-all">
<span class="material-symbols-outlined text-on-surface-variant/40 group-hover/item:text-primary-fixed-dim shrink-0" data-icon="folder_open">folder_open</span>
<span class="font-label-caps text-xs tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">ARCHIVES</span>
</div>
</nav>
<div class="mt-auto pb-4">
<span class="material-symbols-outlined text-on-surface-variant/20 hover:text-primary-fixed-dim cursor-pointer transition-colors" data-icon="security">security</span>
</div>
</div>
</aside>
<!-- Living Neural Core Main Canvas -->
<main class="ml-32 pr-12 min-h-screen relative flex items-center justify-center overflow-visible">
<!-- Neural Core: Emotional Centerpiece -->
<div class="relative w-[600px] h-[600px] flex items-center justify-center">
<!-- SVG Layers -->
<div class="absolute inset-0 flex items-center justify-center">
<!-- Distant Outer Rings -->
<svg class="absolute w-[110%] h-[110%] rotating-slow opacity-10" viewbox="0 0 100 100">
<circle cx="50" cy="50" fill="none" r="48" stroke="#00dbe9" stroke-dasharray="1 10" stroke-width="0.1"></circle>
</svg>
<!-- Mid Rings -->
<svg class="absolute w-[80%] h-[80%] rotating-med opacity-30" viewbox="0 0 100 100">
<circle cx="50" cy="50" fill="none" r="45" stroke="#00dbe9" stroke-dasharray="20 40" stroke-linecap="round" stroke-width="0.5"></circle>
<circle cx="50" cy="50" fill="none" r="42" stroke="#ebb2ff" stroke-dasharray="2 15" stroke-width="0.2"></circle>
</svg>
<!-- Inner Active Rings -->
<svg class="absolute w-[50%] h-[50%] rotating-fast" viewbox="0 0 100 100">
<defs>
<lineargradient id="cyanGrad" x1="0%" x2="100%" y1="0%" y2="100%">
<stop offset="0%" style="stop-color:#00dbe9;stop-opacity:1"></stop>
<stop offset="100%" style="stop-color:transparent;stop-opacity:0"></stop>
</lineargradient>
</defs>
<path class="glow-cyan" d="M 50,5 A 45,45 0 0 1 95,50" fill="none" stroke="url(#cyanGrad)" stroke-linecap="round" stroke-width="2"></path>
<circle cx="50" cy="50" fill="none" opacity="0.2" r="38" stroke="white" stroke-width="0.1"></circle>
</svg>
</div>
<!-- Central Core Orb -->
<div class="relative z-20 w-56 h-56 rounded-full flex items-center justify-center group">
<!-- Ambient Bloom Backgrounds -->
<div class="absolute inset-0 rounded-full bg-primary-fixed-dim/20 blur-3xl breath-slow"></div>
<div class="absolute inset-0 rounded-full bg-secondary-container/20 blur-2xl breath-slow" style="animation-delay: -2s;"></div>
<!-- Glass Core -->
<div class="relative w-40 h-40 rounded-full holographic-glass border-white/20 flex items-center justify-center overflow-hidden">
<div class="absolute inset-0 bg-gradient-to-tr from-primary-fixed-dim/20 to-secondary-container/20"></div>
<span class="material-symbols-outlined text-6xl text-white glow-cyan transition-transform group-hover:scale-110 duration-700" data-icon="bolt">bolt</span>
<!-- Particle Emission Simulation (Simple CSS pulse) -->
<div class="absolute inset-0 border border-primary-fixed-dim/40 rounded-full animate-ping opacity-20"></div>
</div>
<!-- Orbiting Metadata Labels -->
<div class="absolute -top-12 -left-12 flex flex-col items-center holographic-glass p-3 rounded-2xl border-primary-fixed-dim/30">
<span class="font-label-caps text-[9px] text-primary-fixed-dim tracking-tighter">SYNAPSE_LOAD</span>
<span class="font-display-lg text-xl">84.2%</span>
</div>
<div class="absolute -bottom-10 -right-10 flex flex-col items-center holographic-glass p-3 rounded-2xl border-secondary/30">
<span class="font-label-caps text-[9px] text-secondary tracking-tighter">LATENCY</span>
<span class="font-display-lg text-xl">1.2ms</span>
</div>
</div>
</div>
<!-- Floating UI Fragments -->
<div class="absolute inset-0 pointer-events-none p-16">
<!-- Weather fragment -->
<div class="absolute top-24 right-24 w-64 holographic-glass rounded-3xl p-8 pointer-events-auto hover:-translate-y-2 transition-transform duration-500">
<div class="flex justify-between items-start mb-6">
<div>
<h3 class="font-display-lg text-lg tracking-wide opacity-80">Neo-Tokyo</h3>
<p class="font-label-caps text-[10px] opacity-40 uppercase">Digital Dusk</p>
</div>
<span class="material-symbols-outlined text-3xl text-primary-fixed-dim glow-cyan" data-icon="cloud_queue">cloud_queue</span>
</div>
<div class="flex items-baseline gap-2">
<span class="text-4xl font-display-lg text-primary">24°</span>
<span class="text-primary-fixed-dim/60 font-label-caps text-[10px] tracking-widest">OPTIMAL_STATE</span>
</div>
<div class="mt-6 h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
<div class="h-full w-2/3 bg-gradient-to-right from-primary-fixed-dim/0 via-primary-fixed-dim to-primary-fixed-dim/0 glow-cyan"></div>
</div>
</div>
<!-- Calendar fragment -->
<div class="absolute top-48 left-12 w-48 holographic-glass rounded-3xl p-6 pointer-events-auto hover:translate-x-2 transition-transform duration-500">
<div class="flex justify-between items-center mb-6">
<span class="font-label-caps text-[10px] text-secondary tracking-widest">OCT 24</span>
<span class="material-symbols-outlined text-secondary/40 text-sm" data-icon="calendar_today">calendar_today</span>
</div>
<div class="space-y-3">
<div class="p-3 bg-primary-fixed-dim/5 rounded-xl border-l border-primary-fixed-dim/40">
<div class="text-[9px] font-label-caps opacity-40">14:00</div>
<div class="text-xs font-body-md tracking-wide">Core Sync</div>
</div>
<div class="p-3 bg-white/5 rounded-xl border-l border-white/10 opacity-40">
<div class="text-[9px] font-label-caps opacity-40">16:30</div>
<div class="text-xs font-body-md tracking-wide">Archive Sweep</div>
</div>
</div>
</div>
<!-- Telemetry Graph Fragment -->
<div class="absolute bottom-32 left-1/4 w-56 holographic-glass rounded-2xl p-5 pointer-events-auto">
<div class="flex justify-between items-end">
<div class="flex flex-col">
<span class="font-label-caps text-[9px] opacity-40 tracking-widest">BANDWIDTH</span>
<span class="font-display-lg text-lg text-primary">1.2 GB/S</span>
</div>
<div class="flex items-end gap-1 h-10">
<div class="w-1 bg-primary-fixed-dim/30 h-[20%] rounded-full"></div>
<div class="w-1 bg-primary-fixed-dim/50 h-[60%] rounded-full"></div>
<div class="w-1 bg-primary-fixed-dim h-[100%] rounded-full glow-cyan"></div>
<div class="w-1 bg-primary-fixed-dim/40 h-[40%] rounded-full"></div>
<div class="w-1 bg-primary-fixed-dim/20 h-[10%] rounded-full"></div>
</div>
</div>
</div>
<!-- AI Assistant Fragment -->
<div class="absolute bottom-32 right-1/4 holographic-glass rounded-full px-6 py-4 flex items-center gap-4 pointer-events-auto">
<div class="relative w-10 h-10">
<div class="absolute inset-0 bg-primary-fixed-dim/20 rounded-full animate-ping opacity-30"></div>
<div class="relative w-full h-full rounded-full border border-primary-fixed-dim/30 flex items-center justify-center bg-black/40">
<span class="material-symbols-outlined text-primary-fixed-dim text-lg" data-icon="neuroscience">GearFine</span>
</div>
</div>
<div class="flex flex-col">
<span class="font-label-caps text-[8px] text-primary-fixed-dim tracking-[0.2em]">METHER_AI</span>
<span class="text-xs font-body-md opacity-80">Listening for commands...</span>
</div>
</div>
</div>
</main>
<!-- Premium Voice Interaction Footer -->
<footer class="fixed bottom-12 left-1/2 -translate-x-1/2 w-full max-w-xl z-50 px-8">
<div class="relative group">
<!-- Volumetric Ambient Light under the bar -->
<div class="absolute inset-x-0 -bottom-10 h-20 bg-primary-fixed-dim/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
<div class="holographic-glass rounded-full h-14 flex items-center px-6 gap-5 border-white/10 group-focus-within:border-primary-fixed-dim/30 transition-all duration-500">
<span class="material-symbols-outlined text-primary-fixed-dim glow-cyan animate-pulse" data-icon="mic">mic</span>
<input class="flex-1 bg-transparent border-none focus:ring-0 text-on-surface font-body-md placeholder:text-on-surface-variant/20 text-sm tracking-wide" placeholder="Express a neural directive..." type="text"/>
<!-- Reactive Waveform -->
<div class="flex gap-1 items-center h-5 px-2">
<div class="w-0.5 h-2 bg-primary-fixed-dim/20 rounded-full"></div>
<div class="w-0.5 h-4 bg-primary-fixed-dim/40 rounded-full"></div>
<div class="w-0.5 h-5 bg-primary-fixed-dim rounded-full glow-cyan"></div>
<div class="w-0.5 h-3 bg-primary-fixed-dim/50 rounded-full"></div>
<div class="w-0.5 h-1 bg-primary-fixed-dim/20 rounded-full"></div>
</div>
<button class="material-symbols-outlined text-on-surface-variant/30 hover:text-primary-fixed-dim transition-colors" data-icon="send">send</button>
</div>
</div>
</footer>
</body></html>