// @ts-nocheck
/* eslint-disable */
"use client";

// ============================================================
//  HERO — Esfera neuronal </FARID> + saludo contextual en vivo.
//  Portado desde el diseño "Hero Farid.dc.html" (Claude Design).
//  El terminal genera el saludo a partir del CONTEXTO REAL del
//  visitante (hora, idioma, dispositivo, origen, nº de visita).
//  CTAs y selector de audiencia conectados al resto del sitio.
// ============================================================

import React from "react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { useAudience } from "./audience-context";
import { whatsappUrl, profile } from "@/lib/profile";
import { useI18n } from "./i18n";
import { downloadVCard } from "@/lib/vcard";

class HeroSphere extends React.Component {
  state = { expanded: false, typed: "", phase: "idle", tick: 0, activeLang: "es" };

  C = { violet: "#8b7ff6", violet2: "#6c5cf5", cyan: "#62dbe4", white: "#eef0ff", ink: "#dcd9ff", dim: "#5b6088" };

  // sphere/glyph metrics (760 viewBox)
  VB = 760; CC = 380; ADV = 56; FS = 94; BASELINE = 402;
  // stage
  STAGE = 860; SC = 430; RING = 362;

  GREET = [
    { l: "es", t: "Hola, mundo", f: "'JetBrains Mono'" },
    { l: "en", t: "Hello, world", f: "'JetBrains Mono'" },
    { l: "fr", t: "Bonjour le monde", f: "'Noto Sans'" },
    { l: "de", t: "Hallo Welt", f: "'Noto Sans'" },
    { l: "pt", t: "Olá, mundo", f: "'Noto Sans'" },
    { l: "it", t: "Ciao mondo", f: "'Noto Sans'" },
    { l: "ja", t: "こんにちは世界", f: "'Noto Sans JP'" },
    { l: "zh", t: "你好，世界", f: "'Noto Sans SC'" },
    { l: "ko", t: "안녕 세계", f: "'Noto Sans KR'" },
    { l: "ru", t: "Привет, мир", f: "'Noto Sans'" },
    { l: "ar", t: "مرحبا بالعالم", f: "'Noto Sans Arabic'" },
    { l: "hi", t: "नमस्ते दुनिया", f: "'Noto Sans Devanagari'" },
    { l: "he", t: "שלום עולם", f: "'Noto Sans Hebrew'" },
    { l: "tr", t: "Merhaba dünya", f: "'Noto Sans'" },
  ];

  constructor(p) {
    super(p);
    this.bgCanvasRef = React.createRef(); this.pCanvasRef = React.createRef();
    this.rootRef = React.createRef(); this.stageWrapRef = React.createRef(); this.stageOuterRef = React.createRef();
    this.sphereWrapRef = React.createRef(); this.logoRef = React.createRef();
    this.ptr = { x: 0, y: 0 }; this.par = { x: 0, y: 0, rx: 0, ry: 0 }; this.parT = { x: 0, y: 0, rx: 0, ry: 0 };
    this.hasPointer = false; this.center = { x: 0, y: 0 }; this.stars = []; this.particles = []; this.pulse = 0;
    this.onMove = this.onMove.bind(this); this.onLeave = this.onLeave.bind(this);
  }

  componentDidMount() {
    // Respeta prefers-reduced-motion: sin starfield, parallax, partículas ni tipeo.
    this.reduced =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // visit counter
    try { this.visit = (parseInt(localStorage.getItem("farid_visits") || "0", 10) || 0) + 1; localStorage.setItem("farid_visits", String(this.visit)); } catch (e) { this.visit = 1; }
    this.liveNow = new Date();
    this.ctx = this.detectCtx(null);
    this.setState({ activeLang: this.ctx.lang });
    this.buildStars(); this.resizeAll();
    window.addEventListener("resize", this._rs = () => { this.resizeAll(); this.measure(); });
    window.addEventListener("scroll", this._sc = () => this.measure(), { passive: true });
    this.measure();
    this.clock = setInterval(() => { this.liveNow = new Date(); this.setState((s) => ({ tick: s.tick + 1 })); }, 1000);
    this.t0 = performance.now(); this.loop = this.loop.bind(this);
    if (!this.reduced) this.raf = requestAnimationFrame(this.loop);
    // kick off first welcome shortly after load (inmediato si reduced)
    setTimeout(() => this.runWelcome(null), this.reduced ? 0 : 700);
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.raf); clearInterval(this.clock); clearInterval(this.typer);
    window.removeEventListener("resize", this._rs); window.removeEventListener("scroll", this._sc);
  }

  // ── context ──
  deviceType() { const w = window.innerWidth; const ua = navigator.userAgent || ""; if (/Mobi|Android|iPhone/i.test(ua) || w < 560) return "mobile"; if (/iPad|Tablet/i.test(ua) || w < 980) return "tablet"; return "desktop"; }
  daypartOf(h) { return h < 6 ? "madrugada" : h < 12 ? "mañana" : h < 19 ? "tarde" : "noche"; }
  detectCtx(sim) {
    let lang = (navigator.language || "es").slice(0, 2).toLowerCase();
    let hour = this.liveNow.getHours();
    let visit = this.visit, referrer = document.referrer || "", region = (navigator.language || "es-CO");
    if (sim === "night") hour = 2;
    if (sim === "returning") visit = Math.max(visit, 4);
    if (sim === "linkedin") referrer = "https://www.linkedin.com/";
    if (sim === "usa") { lang = "en"; region = "en-US"; }
    const daypart = this.daypartOf(hour);
    const speak = (lang === "en") ? "en" : "es";
    return { lang, speak, hour, daypart, visit, referrer, region, sim };
  }
  genWelcome(c) {
    const es = { night: "Trabajando de madrugada, ¿eh? Respeto.", linkedin: "Vi que llegaste desde LinkedIn. Hablemos de negocios.", returning: `De vuelta. Van ${c.visit} visitas — te gusta esto.`, manana: "Buenos días. Soy Farid: convierto datos en decisiones.", tarde: "Buenas tardes. ¿Construimos algo juntos?", noche: "Buenas noches. La IA no descansa; yo tampoco.", madrugada: "A esta hora solo quedamos los que construimos." };
    const en = { night: "Working late, huh? Respect.", linkedin: "Saw you came from LinkedIn. Let's talk business.", returning: `Back again — visit #${c.visit}. You clearly like this.`, manana: "Good morning. I'm Farid: I turn data into decisions.", tarde: "Good afternoon. Shall we build something?", noche: "Good evening. AI never sleeps; neither do I.", madrugada: "At this hour, only the builders remain." };
    const D = c.speak === "en" ? en : es;
    if (c.sim === "night" || c.daypart === "madrugada") return D.night || D.madrugada;
    if (/linkedin/i.test(c.referrer)) return D.linkedin;
    if (c.visit > 1) return D.returning;
    return D[c.daypart === "mañana" ? "manana" : c.daypart] || D.tarde;
  }
  runWelcome(sim) {
    clearInterval(this.typer);
    this.liveNow = new Date();
    this.ctx = this.detectCtx(sim);
    const phrase = this.genWelcome(this.ctx);
    this.target = phrase;
    // reduced-motion: muestra el saludo y el glifo completos sin tipeo ni burst.
    if (this.reduced) {
      this.setState({ typed: phrase, phase: "done", expanded: true, activeLang: this.ctx.lang });
      return;
    }
    this.setState({ typed: "", phase: "typing", expanded: false, activeLang: this.ctx.lang });
    let i = 0;
    this.typer = setInterval(() => {
      i++; this.setState({ typed: phrase.slice(0, i) });
      if (i >= phrase.length) { clearInterval(this.typer); this.onTypingDone(); }
    }, 34);
  }
  onTypingDone() {
    this.setState({ phase: "done", expanded: true });
    this.burst(); this.pulse = 1;
    setTimeout(() => { if (this.state.phase === "done") this.setState({ expanded: false }); }, 2600);
  }

  // ── starfield ──
  buildStars() {
    let a = 20240617; const rnd = () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    const W = window.innerWidth, H = window.innerHeight; this.stars = [];
    const n = Math.min(95, Math.round(W * H / 26000));
    for (let i = 0; i < n; i++) this.stars.push({ x: rnd() * W, y: rnd() * H, r: 0.6 + rnd() * 1.7, drift: 6 + rnd() * 14, ang: rnd() * 6.28, spd: 0.05 + rnd() * 0.18, ph: rnd() * 6.28 });
  }
  resizeAll() {
    const dpr = Math.min(2, window.devicePixelRatio || 1); this.dpr = dpr;
    const bg = this.bgCanvasRef.current; if (bg) { bg.width = Math.floor(window.innerWidth * dpr); bg.height = Math.floor(window.innerHeight * dpr); }
    const pc = this.pCanvasRef.current; if (pc) { pc.width = Math.floor(this.STAGE * dpr); pc.height = Math.floor(this.STAGE * dpr); }
    this.buildStars();
    // scale stage to viewport (and shrink its reserved layout box to match)
    const sw = this.stageWrapRef.current, so = this.stageOuterRef.current;
    if (sw && so) { const avail = Math.min(window.innerWidth * 0.94, window.innerHeight * 0.66, this.STAGE); const s = Math.max(0.34, avail / this.STAGE); this._stageScale = s; sw.style.transform = `scale(${s})`; so.style.width = (this.STAGE * s) + "px"; so.style.height = (this.STAGE * s) + "px"; }
  }
  measure() { const el = this.logoRef.current; if (!el) return; const r = el.getBoundingClientRect(); this.center = { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }

  drawStars(t) {
    const cv = this.bgCanvasRef.current; if (!cv) return; const ctx = cv.getContext("2d");
    const W = window.innerWidth, H = window.innerHeight; ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    const pts = this.stars.map((s) => ({ x: s.x + Math.cos(s.ang + t * s.spd) * s.drift, y: s.y + Math.sin(s.ang + t * s.spd) * s.drift, r: s.r, tw: 0.55 + 0.45 * Math.sin(t * 1.3 + s.ph) }));
    const M = 150;
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) { const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.hypot(dx, dy); if (d < M) { ctx.strokeStyle = `rgba(120,128,210,${(1 - d / M) * 0.13})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); } }
    for (const p of pts) { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fillStyle = `rgba(190,196,255,${0.22 + 0.5 * p.tw})`; ctx.fill(); }
  }

  burst() {
    const n = 52, cx = this.SC, cy = this.SC - 6;
    for (let i = 0; i < n; i++) { const a = Math.random() * 6.2832, sp = 2.4 + Math.random() * 5.5; this.particles.push({ x: cx, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0, max: 0.8 + Math.random() * 0.7, size: 1.4 + Math.random() * 2.6, hue: Math.random() < 0.5 ? this.C.cyan : this.C.violet }); }
  }
  drawParticles(dt) {
    const cv = this.pCanvasRef.current; if (!cv) return; const ctx = cv.getContext("2d");
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0); ctx.clearRect(0, 0, this.STAGE, this.STAGE);
    this.particles = this.particles.filter((p) => p.life < p.max);
    for (const p of this.particles) { p.life += dt; p.x += p.vx; p.y += p.vy; p.vx *= 0.96; p.vy *= 0.96; const al = Math.max(0, 1 - p.life / p.max); ctx.globalAlpha = al; ctx.fillStyle = p.hue; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, 6.2832); ctx.fill(); }
    ctx.globalAlpha = 1;
  }

  loop() {
    const now = performance.now(); const t = (now - this.t0) / 1000; const dt = Math.min(0.05, (now - (this._last || now)) / 1000); this._last = now;
    this.drawStars(t); this.drawParticles(dt);
    // parallax
    if (this.hasPointer) { const dx = this.ptr.x - this.center.x, dy = this.ptr.y - this.center.y; this.parT.x = Math.max(-18, Math.min(18, dx * 0.03)); this.parT.y = Math.max(-14, Math.min(14, dy * 0.03)); this.parT.ry = Math.max(-8, Math.min(8, dx * 0.016)); this.parT.rx = Math.max(-6, Math.min(6, -dy * 0.014)); }
    else { this.parT.x = Math.sin(t * 0.7) * 6; this.parT.y = Math.cos(t * 0.55) * 4; this.parT.ry = Math.sin(t * 0.7) * 2.4; this.parT.rx = Math.cos(t * 0.55) * 1.6; }
    const k = 0.08; this.par.x += (this.parT.x - this.par.x) * k; this.par.y += (this.parT.y - this.par.y) * k; this.par.rx += (this.parT.rx - this.par.rx) * k; this.par.ry += (this.parT.ry - this.par.ry) * k;
    this.pulse *= 0.92; const ps = 1 + this.pulse * 0.06;
    const w = this.sphereWrapRef.current; if (w) w.style.transform = `translate(-50%,-50%) perspective(1100px) translate3d(${this.par.x}px,${this.par.y}px,0) rotateX(${this.par.rx}deg) rotateY(${this.par.ry}deg) scale(${ps})`;
    this.raf = requestAnimationFrame(this.loop);
  }

  onMove(e) { this.hasPointer = true; this.ptr = { x: e.clientX, y: e.clientY }; if (!this.center.x) this.measure(); const d = Math.hypot(e.clientX - this.center.x, e.clientY - this.center.y); const want = d < 300; if (this.state.phase !== "typing" && want !== this.state.expanded) this.setState({ expanded: want }); }
  onLeave() { this.hasPointer = false; if (this.state.phase === "done") return; if (this.state.expanded) this.setState({ expanded: false }); }

  // ── sphere graph ──
  sphereGraph() { if (this._g) return this._g; let a = 91135; const rnd = () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    // Redondeo: cos/sin/hypot no son bit-idénticos entre el motor del servidor (Node)
    // y el del navegador → causaba un warning de hidratación. r3 elimina el último ULP.
    const r3 = (v) => Math.round(v * 1000) / 1000;
    const C = this.CC, nodes = []; for (let i = 0; i < 16; i++) { const ang = rnd() * 6.283, rad = 60 + rnd() * 195; nodes.push({ x: r3(C + Math.cos(ang) * rad), y: r3(C + Math.sin(ang) * rad), r: r3(1.6 + rnd() * 2.4), d: (rnd() * 3).toFixed(2) }); }
    const edges = []; for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) { const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y, d = r3(Math.hypot(dx, dy)); if (d < 140) edges.push([i, j, d]); }
    this._g = { nodes, edges }; return this._g; }

  glyph(ch, x, fill) { const { ADV, FS } = this; return React.createElement("text", { x: x + ADV / 2, y: 0, textAnchor: "middle", fill, style: { fontFamily: "'JetBrains Mono',monospace", fontSize: FS, fontWeight: 600, letterSpacing: "-2px" } }, ch); }
  drawGlyph(ch, idx, ex) { const { ADV, FS, C } = this; const x = ex ? (3 + idx) * ADV : 3 * ADV;
    return React.createElement("g", { key: "a" + idx, style: { transform: `translateX(${x}px)`, opacity: ex ? 1 : 0, transition: `transform .52s cubic-bezier(.2,.75,.2,1) ${idx * 0.07}s, opacity .4s ease ${idx * 0.06}s` } },
      React.createElement("text", { x: ADV / 2, y: 0, textAnchor: "middle", fill: C.ink, fillOpacity: ex ? 1 : 0, stroke: "url(#aridGrad)", strokeWidth: 2.2, strokeDasharray: 520, strokeDashoffset: ex ? 0 : 520, style: { fontFamily: "'JetBrains Mono',monospace", fontSize: FS, fontWeight: 600, letterSpacing: "-2px", transition: `stroke-dashoffset .6s cubic-bezier(.3,.7,.2,1) ${0.08 + idx * 0.1}s, fill-opacity .5s ease ${0.22 + idx * 0.1}s` } }, ch));
  }

  buildSphere() {
    const { ADV, FS, C, VB, CC, BASELINE } = this; const ex = this.state.expanded; const e = (...a) => React.createElement(...a);
    const caretX = (ex ? 7 * ADV : 3 * ADV) + 6; const closeX = caretX + 30; const tagW = closeX + ADV; const tagTX = CC - tagW / 2;
    const mono = { fontFamily: "'JetBrains Mono',monospace", fontSize: FS, fontWeight: 600, letterSpacing: "-2px" };
    const { nodes, edges } = this.sphereGraph();
    const tag = e("g", { style: { transform: `translate(${tagTX}px, ${BASELINE}px)`, transition: "transform .55s cubic-bezier(.2,.75,.2,1)" } },
      this.glyph("<", 0, C.cyan), this.glyph("/", ADV, C.cyan), this.glyph("F", 2 * ADV, C.white),
      ...["A", "R", "I", "D"].map((ch, i) => this.drawGlyph(ch, i, ex)),
      e("circle", { cx: caretX + 3.5, cy: -FS * 0.44, r: 7, fill: C.cyan, opacity: ex ? 0.9 : 0.4, style: { filter: "blur(4px)", transition: "cx .5s cubic-bezier(.2,.75,.2,1), opacity .4s ease" } }),
      e("rect", { x: caretX, y: -FS * 0.78, width: 7, height: FS * 0.84, rx: 3, fill: "url(#caretGrad)", style: { transition: "x .5s cubic-bezier(.2,.75,.2,1)", animation: "faridCaret 1.05s steps(1,end) infinite" } }),
      e("g", { style: { transform: `translateX(${closeX}px)`, transition: "transform .5s cubic-bezier(.2,.75,.2,1)" } }, e("text", { x: ADV / 2, y: 0, textAnchor: "middle", fill: C.cyan, style: mono }, ">")),
    );
    const svg = e("svg", { viewBox: `0 0 ${VB} ${VB}`, "aria-hidden": true, focusable: false, style: { width: "100%", height: "100%", overflow: "visible", display: "block" } },
      e("defs", null,
        e("linearGradient", { id: "aridGrad", x1: "0", y1: "0", x2: "1", y2: "0" }, e("stop", { offset: "0", stopColor: C.violet }), e("stop", { offset: "1", stopColor: C.cyan })),
        e("linearGradient", { id: "caretGrad", x1: "0", y1: "0", x2: "0", y2: "1" }, e("stop", { offset: "0", stopColor: C.violet }), e("stop", { offset: "1", stopColor: C.cyan })),
        e("radialGradient", { id: "sphereFill", cx: "42%", cy: "34%", r: "72%" }, e("stop", { offset: "0", stopColor: "#2a2660" }), e("stop", { offset: "0.55", stopColor: "#15132f" }), e("stop", { offset: "1", stopColor: "#080814" })),
        e("radialGradient", { id: "sphereGlow", cx: "50%", cy: "50%", r: "50%" }, e("stop", { offset: "0", stopColor: "rgba(124,108,246,0.55)" }), e("stop", { offset: "0.6", stopColor: "rgba(98,219,228,0.12)" }), e("stop", { offset: "1", stopColor: "rgba(8,8,20,0)" })),
        e("clipPath", { id: "sClip" }, e("circle", { cx: CC, cy: CC, r: 296 })),
      ),
      e("circle", { cx: CC, cy: CC, r: 330, fill: "url(#sphereGlow)", opacity: ex ? 0.98 : 0.6, style: { transition: "opacity .6s ease" } }),
      e("g", { style: { transformOrigin: `${CC}px ${CC}px`, transformBox: "view-box", animation: "faridSpin 44s linear infinite" } },
        e("circle", { cx: CC, cy: CC, r: 350, fill: "none", stroke: "rgba(150,150,220,0.22)", strokeWidth: 1.4, strokeDasharray: "2 12" }),
        e("circle", { cx: CC, cy: CC - 350, r: 4, fill: C.cyan, opacity: 0.9 }), e("circle", { cx: CC + 350, cy: CC, r: 3, fill: C.violet, opacity: 0.8 })),
      e("g", { style: { transformOrigin: `${CC}px ${CC}px`, transformBox: "view-box", animation: "faridSpinR 60s linear infinite" } },
        e("circle", { cx: CC, cy: CC, r: 318, fill: "none", stroke: "rgba(140,150,230,0.12)", strokeWidth: 1, strokeDasharray: "1 7" })),
      e("circle", { cx: CC, cy: CC, r: 300, fill: "url(#sphereFill)", stroke: "rgba(139,127,246,0.30)", strokeWidth: 1.2 }),
      e("g", { clipPath: "url(#sClip)" },
        ...edges.map(([i, j, d], k) => e("line", { key: "e" + k, x1: nodes[i].x, y1: nodes[i].y, x2: nodes[j].x, y2: nodes[j].y, stroke: "rgba(130,140,230,1)", strokeWidth: 0.9, opacity: (ex ? 0.6 : 0.22) * (1 - d / 170), style: { transition: "opacity .55s ease" } })),
        ...nodes.map((n, k) => e("circle", { key: "n" + k, cx: n.x, cy: n.y, r: n.r * (ex ? 1.3 : 1), fill: k % 3 === 0 ? C.cyan : C.violet, style: { animation: `faridTwinkle ${2.4 + (k % 5) * 0.5}s ease-in-out ${n.d}s infinite`, transition: "r .5s ease", filter: "drop-shadow(0 0 4px rgba(124,108,246,0.7))" } })),
      ),
      e("ellipse", { cx: CC, cy: CC - 172, rx: 150, ry: 58, fill: "rgba(200,205,255,0.035)", clipPath: "url(#sClip)", style: { filter: "blur(6px)" } }),
      tag,
      e("text", { x: CC, y: CC + 150, textAnchor: "middle", fill: "rgba(150,156,200,0.7)", style: { fontFamily: "'JetBrains Mono',monospace", fontSize: 19, fontWeight: 500, letterSpacing: "11px" } }, "EATHAN"),
    );
    return e("div", { ref: this.sphereWrapRef, style: { position: "absolute", left: "50%", top: "50%", width: 560, height: 560, transform: "translate(-50%,-50%)", marginLeft: 0, willChange: "transform" } },
      e("div", { style: { position: "absolute", left: "50%", top: "50%", width: 560, height: 560, transform: "translate(-50%,-50%)" } }, svg));
  }

  buildStage() {
    const e = (...a) => React.createElement(...a); const { STAGE, SC, RING, C } = this; const active = this.state.activeLang;
    // orbiting greetings
    const labels = this.GREET.map((g, i) => {
      const base = i / this.GREET.length * 360; const on = g.l === active;
      return e("div", { key: g.l, style: { position: "absolute", left: "50%", top: "50%", transform: `translate(-50%,-50%) rotate(${base}deg) translateY(-${RING}px)` } },
        e("div", { style: { animation: "faridRingR 150s linear infinite" } },
          e("div", { style: { transform: `rotate(${-base}deg)` } },
            e("span", { dir: (g.l === "ar" || g.l === "he") ? "rtl" : "ltr", style: { display: "inline-block", whiteSpace: "nowrap", fontFamily: `${g.f},'Inter',sans-serif`, fontSize: on ? 22 : 17, fontWeight: on ? 600 : 500, letterSpacing: ".3px", color: on ? "#eaf6ff" : "rgba(150,158,205,0.5)", textShadow: on ? "0 0 18px rgba(98,219,228,0.7)" : "none", transition: "all .5s ease", transform: "translateX(-50%)" } }, g.t))));
    });
    const inner = e("div", { ref: this.stageWrapRef, style: { position: "absolute", left: 0, top: 0, width: STAGE, height: STAGE, transformOrigin: "top left" } },
      e("canvas", { ref: this.pCanvasRef, "aria-hidden": true, width: STAGE, height: STAGE, style: { position: "absolute", inset: 0, width: STAGE, height: STAGE, pointerEvents: "none", zIndex: 4 } }),
      e("div", { style: { position: "absolute", left: "50%", top: "50%", width: STAGE, height: STAGE, transform: "translate(-50%,-50%) rotate(0deg)", animation: "faridRing 150s linear infinite", transformOrigin: "center" } }, ...labels),
      e("div", { ref: this.logoRef, style: { position: "absolute", inset: 0, zIndex: 3 } }, this.buildSphere()),
    );
    return e("div", { ref: this.stageOuterRef, style: { position: "relative", width: STAGE * 0.6, height: STAGE * 0.6, flex: "0 0 auto" } }, inner);
  }

  buildPanel() {
    const e = (...a) => React.createElement(...a); const c = this.ctx; if (!c) return e("div", null);
    // En móvil el panel taparía la esfera: se oculta.
    if (typeof window !== "undefined" && this.deviceType() === "mobile") return e("div", null);
    let hh = this.liveNow.getHours(); if (c.sim === "night") hh = 2; const mm = this.liveNow.getMinutes();
    const clk = String(hh).padStart(2, "0") + ":" + String(mm).padStart(2, "0");
    const row = (k, v, col) => e("div", { style: { display: "flex", gap: 10, whiteSpace: "nowrap" } }, e("span", { style: { color: "#5b6088", width: 62, flex: "0 0 auto" } }, k), e("span", { style: { color: col || "#c7ccef", overflow: "hidden", textOverflow: "ellipsis" } }, v));
    const ref = c.referrer ? (/linkedin/i.test(c.referrer) ? "linkedin.com" : (c.referrer.replace(/^https?:\/\//, "").split("/")[0] || "directo")) : "directo";
    return e("div", { style: { position: "absolute", top: 80, left: 22, zIndex: 5, width: 268, padding: "15px 17px", borderRadius: 14, background: "rgba(12,13,28,0.72)", border: "1px solid rgba(124,108,246,0.22)", backdropFilter: "blur(10px)", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: "22px", boxShadow: "0 18px 50px rgba(0,0,0,0.4)" } },
      e("div", { style: { display: "flex", alignItems: "center", gap: 9, marginBottom: 11 } },
        e("span", { style: { width: 8, height: 8, borderRadius: 9, background: this.C.cyan, boxShadow: `0 0 10px ${this.C.cyan}`, animation: "faridDot 1.6s ease-in-out infinite" } }),
        e("span", { style: { color: "#aab0d8", fontWeight: 600, letterSpacing: ".5px" } }, "context.detect()")),
      row("lang", c.region.toLowerCase()),
      row("device", this.deviceType()),
      row("local", `${clk} · ${c.daypart}`),
      row("source", ref),
      row("visit", "#" + c.visit, this.C.cyan),
    );
  }

  buildTerminal() {
    const e = (...a) => React.createElement(...a); const { phase, typed } = this.state;
    const tone = phase === "typing" ? "#62dbe4" : "#eaf0ff";
    return e("div", { style: { position: "relative", zIndex: 3, marginTop: 30, width: "min(680px,90vw)", padding: "15px 20px", borderRadius: 14, background: "rgba(10,11,24,0.6)", border: "1px solid rgba(124,108,246,0.20)", backdropFilter: "blur(8px)", fontFamily: "'JetBrains Mono',monospace" } },
      e("div", { style: { fontSize: 12.5, color: "#5b6088", marginBottom: 7, letterSpacing: ".3px" } },
        e("span", { style: { color: "#62dbe4" } }, "farid@portfolio"), ":~$ ", phase === "typing" ? "compilando saludo…" : "saludo.generado ✓"),
      e("div", { style: { fontSize: "clamp(17px,2.4vw,22px)", fontWeight: 500, color: tone, lineHeight: 1.4, minHeight: 31, transition: "color .4s ease" } },
        typed,
        e("span", { style: { display: "inline-block", width: 9, height: "1.05em", marginLeft: 4, verticalAlign: "-3px", background: "linear-gradient(180deg,#8b7ff6,#62dbe4)", borderRadius: 2, animation: phase === "typing" ? "none" : "faridCaret 1.05s steps(1,end) infinite", opacity: phase === "typing" ? 1 : undefined } })),
    );
  }

  renderVals() {
    return {
      rootRef: this.rootRef, bgCanvasRef: this.bgCanvasRef, onMove: this.onMove, onLeave: this.onLeave,
      panel: this.buildPanel(), stage: this.buildStage(), terminal: this.buildTerminal(),
    };
  }

  render() {
    const v = this.renderVals();
    return (
      <div
        id="top"
        ref={v.rootRef}
        onMouseMove={v.onMove}
        onMouseLeave={v.onLeave}
        style={{
          position: "relative", minHeight: "100dvh", width: "100%", overflow: "hidden",
          background: "radial-gradient(120% 90% at 50% 38%, #11102a 0%, #07081200 58%), #05060e",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          fontFamily: "'Inter',system-ui,sans-serif", cursor: "default", padding: "30px 18px",
        }}
      >
        <canvas aria-hidden ref={v.bgCanvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />

        {/* Encabezado real de la página (oculto a la vista, presente para SEO y lectores de pantalla).
            El glifo </FARID> es decorativo y va aria-hidden. */}
        {this.props.heading ? <h1 className="sr-only">{this.props.heading}</h1> : null}

        {this.props.topSlot || null}
        {v.panel}

        <div style={{ position: "relative", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
          {v.stage}
          {v.terminal}
          {this.props.actionsSlot || null}
        </div>

        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", boxShadow: "inset 0 0 240px 70px rgba(0,0,0,0.66)", zIndex: 2 }} />
      </div>
    );
  }
}

const PILL = "'JetBrains Mono',monospace";

export function HeroFarid() {
  const { c } = useI18n();
  const { audience, setAudience } = useAudience();
  const data = c.audiences[audience];

  // Selector de audiencia — controla el resto del sitio. Bajo el nav, centrado.
  const topSlot = (
    <div
      role="group"
      aria-label={c.hero.audienceAria}
      style={{
        position: "absolute", top: 76, left: "50%", transform: "translateX(-50%)", zIndex: 6,
        display: "flex", gap: 6, padding: 5, borderRadius: 999,
        background: "rgba(12,13,28,0.6)", border: "1px solid rgba(124,108,246,0.22)",
        backdropFilter: "blur(10px)", maxWidth: "92vw",
      }}
    >
      {(Object.keys(c.audiences) as (keyof typeof c.audiences)[]).map((k) => {
        const on = k === audience;
        return (
          <button
            key={k}
            type="button"
            aria-pressed={on}
            onClick={() => setAudience(k)}
            style={{
              cursor: "pointer", fontFamily: PILL, fontSize: 12.5, fontWeight: 600, letterSpacing: ".2px",
              padding: "7px 14px", borderRadius: 999, border: "1px solid transparent",
              transition: "background .2s ease, color .2s ease, box-shadow .2s ease",
              color: on ? "#fff" : "rgba(174,180,216,0.75)",
              background: on ? "linear-gradient(135deg,#6c5cf5,#8b7ff6)" : "transparent",
              boxShadow: on ? "0 8px 22px -10px rgba(124,108,246,0.9)" : "none",
            }}
          >
            {c.audiences[k].label}
          </button>
        );
      })}
    </div>
  );

  // CTAs reales — reemplazan los botones de demo del diseño original.
  const actionsSlot = (
    <div
      style={{
        position: "relative", zIndex: 3, marginTop: 26,
        display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", maxWidth: "92vw",
      }}
    >
      <a href="#contacto" className="btn btn-primary">{data.cta}</a>
      <a href="#proyectos" className="btn btn-ghost">{c.hero.buttons.projects}</a>
      <a
        href={whatsappUrl(c.hero.whatsappMsg)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-ghost"
      >
        <WhatsappLogo size={18} weight="fill" />
        {c.hero.buttons.whatsapp}
      </a>
      <button onClick={downloadVCard} className="btn btn-ghost">{c.hero.buttons.saveContact}</button>
    </div>
  );

  return (
    <HeroSphere
      topSlot={topSlot}
      actionsSlot={actionsSlot}
      heading={`${profile.name} — ${profile.role}. ${c.hero.tagline}`}
    />
  );
}
