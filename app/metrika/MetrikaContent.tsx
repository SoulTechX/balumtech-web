'use client'
import { useEffect, useState } from 'react'

export default function MetrikaContent() {
  const [isDenied, setIsDenied] = useState(false)

  useEffect(() => {
    const noContext = (e: MouseEvent) => e.preventDefault()
    const noKeys = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && ['c','a','s','p','u','v'].includes(e.key.toLowerCase())) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['i','j','c','k'].includes(e.key.toLowerCase())) ||
        (e.metaKey && ['c','a','s'].includes(e.key.toLowerCase()))
      ) e.preventDefault()
    }
    const noDevtools = () => {
      if (
        window.outerWidth - window.innerWidth > 160 ||
        window.outerHeight - window.innerHeight > 160
      ) {
        setIsDenied(true)
      }
    }
    document.addEventListener('contextmenu', noContext)
    document.addEventListener('keydown', noKeys)
    
    // --- MODIFICACIÓN EXACTA: FILTRO PARA MÓVILES ---
    const isMobile = window.matchMedia("(max-width: 768px)").matches || 
                     ('ontouchstart' in window) || 
                     (navigator.maxTouchPoints > 0);

    if (!isMobile) {
      window.addEventListener('resize', noDevtools)
      noDevtools()
    }

    return () => {
      document.removeEventListener('contextmenu', noContext)
      document.removeEventListener('keydown', noKeys)
      if (!isMobile) {
        window.removeEventListener('resize', noDevtools)
      }
    }
    // --- FIN DE LA MODIFICACIÓN ---
  }, [])

  if (isDenied) {
    return (
      <div style={{display:'flex',height:'100vh',alignItems:'center',justifyContent:center,background:'#060709',color:'#E24B4A',fontFamily:'monospace',fontSize:'14px'}}>
        // acceso denegado
      </div>
    )
  }

  return (
    <div
      className="select-none"
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <style>{`

        :root {
            --black: #060709;
            --dark: #0C0E13;
            --card: #10131A;
            --card2: #141820;
            --border: #1E2535;
            --border2: #252D40;
            --blue-glow: #00AAFF;
            --blue-mid: #0077CC;
            --blue-deep: #004488;
            --silver: #8FA3C0;
            --silver-light: #B8CCDF;
            --white: #E8EDF5;
            --white-dim: #9BABBE;
            --accent-cyan: #00D4FF;
            --accent-steel: #7BA7CC;
            --success: #00C97A;
            --warning: #F5A623;
            --featured-glow: rgba(0,170,255,0.15);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--black);
            color: var(--white);
            line-height: 1.6;
            min-height: 100vh;
            position: relative;
            overflow-x: hidden;
        }

        /* BACKGROUND GRID */
        body::before {
            content: '';
            position: fixed;
            inset: 0;
            background-image:
                linear-gradient(rgba(0,170,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,170,255,0.03) 1px, transparent 1px);
            background-size: 40px 40px;
            pointer-events: none;
            z-index: 0;
        }

        /* BACKGROUND ORBS */
        body::after {
            content: '';
            position: fixed;
            width: 600px; height: 600px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0,100,255,0.06) 0%, transparent 70%);
            top: -200px; right: -200px;
            pointer-events: none;
            z-index: 0;
        }

        .container {
            max-width: 960px;
            margin: 0 auto;
            padding: 40px 32px 60px;
            position: relative;
            z-index: 1;
        }

        /* ── HEADER ── */
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 32px;
            margin-bottom: 40px;
            border-bottom: 1px solid var(--border);
            position: relative;
        }

        header::after {
            content: '';
            position: absolute;
            bottom: -1px; left: 0;
            width: 200px; height: 1px;
            background: linear-gradient(90deg, var(--blue-glow), transparent);
        }

        .logo-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
        }
        .logo-tagline {
            font-family: 'Rajdhani', sans-serif;
            font-size: 13px;
            font-weight: 500;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: transparent;
            background: linear-gradient(90deg, var(--silver), var(--blue-glow), var(--silver));
            -webkit-background-clip: text;
            background-clip: text;
            white-space: nowrap;
            position: relative;
        }
        .logo-tagline::before {
            content: '';
            position: absolute;
            left: 0; right: 0; bottom: -5px;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--blue-glow), transparent);
            opacity: 0.5;
        }

        .logo-img {
            height: 156px;
            width: auto;
            filter: drop-shadow(0 0 18px rgba(0,170,255,0.5));
        }

        .brand-name {
            font-family: 'Rajdhani', sans-serif;
            font-size: 26px;
            font-weight: 700;
            letter-spacing: 2px;
            color: var(--white);
        }

        .brand-name span {
            color: var(--blue-glow);
        }

        .brand-tagline {
            font-size: 11px;
            color: var(--silver);
            letter-spacing: 0.1em;
            text-transform: uppercase;
            margin-top: 2px;
        }

        .doc-info {
            text-align: right;
        }

        .doc-info .label {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            color: var(--blue-glow);
            font-weight: 600;
            margin-bottom: 6px;
        }

        .doc-info p {
            font-size: 13px;
            color: var(--silver);
            line-height: 1.7;
        }

        .doc-info strong { color: var(--white); }

        .doc-ref {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            margin-top: 8px;
            background: rgba(0,170,255,0.08);
            border: 1px solid rgba(0,170,255,0.2);
            border-radius: 20px;
            padding: 3px 10px;
            font-size: 10px;
            color: var(--blue-glow);
            font-weight: 600;
            letter-spacing: 0.05em;
        }

        /* ── HERO ── */
        .hero {
            margin-bottom: 48px;
        }

        .hero-eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            color: var(--blue-glow);
            font-weight: 600;
            margin-bottom: 14px;
        }

        .hero-eyebrow::before {
            content: '';
            display: block;
            width: 20px; height: 1px;
            background: var(--blue-glow);
        }

        h1 {
            font-family: 'Rajdhani', sans-serif;
            font-size: 38px;
            font-weight: 700;
            line-height: 1.15;
            color: var(--white);
            margin-bottom: 12px;
            letter-spacing: 0.5px;
        }

        h1 em {
            font-style: normal;
            color: var(--blue-glow);
        }

        .hero-sub {
            font-size: 15px;
            color: var(--silver);
            max-width: 560px;
            line-height: 1.7;
        }

        /* ── SECTION TITLE ── */
        .section-title {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            color: var(--blue-glow);
            font-weight: 600;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .section-title::after {
            content: '';
            flex: 1;
            height: 1px;
            background: linear-gradient(90deg, var(--border2), transparent);
        }

        /* ── PLAN CARDS ── */
        .plans { display: flex; flex-direction: column; gap: 24px; margin-bottom: 48px; }

        .plan-card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 12px;
            overflow: hidden;
            position: relative;
            transition: border-color 0.2s;
        }

        .plan-card:hover { border-color: var(--border2); }

        .plan-card.featured {
            border-color: rgba(0,170,255,0.35);
            box-shadow: 0 0 40px rgba(0,170,255,0.08), inset 0 0 40px rgba(0,170,255,0.02);
        }

        /* left accent bar */
        .plan-card::before {
            content: '';
            position: absolute;
            left: 0; top: 0; bottom: 0;
            width: 3px;
            background: var(--border2);
        }

        .plan-card.plan-initial::before { background: linear-gradient(180deg, var(--silver), var(--blue-deep)); }
        .plan-card.plan-advanced::before { background: linear-gradient(180deg, var(--blue-mid), var(--blue-glow)); }
        .plan-card.featured::before { background: linear-gradient(180deg, var(--blue-glow), var(--accent-cyan)); box-shadow: 0 0 12px var(--blue-glow); }

        .plan-inner { padding: 28px 32px 28px 36px; }

        .plan-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid var(--border);
            gap: 16px;
            flex-wrap: wrap;
        }

        .plan-name {
            font-family: 'Rajdhani', sans-serif;
            font-size: 22px;
            font-weight: 700;
            letter-spacing: 0.5px;
            color: var(--white);
            margin-bottom: 6px;
        }

        .plan-badge {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            padding: 4px 10px;
            border-radius: 4px;
            border: 1px solid var(--border2);
            color: var(--silver);
            background: rgba(255,255,255,0.03);
        }

        .plan-badge.featured-badge {
            background: rgba(0,170,255,0.1);
            border-color: rgba(0,170,255,0.3);
            color: var(--blue-glow);
        }

        .plan-price-wrap { text-align: right; }

        .plan-price {
            font-family: 'Rajdhani', sans-serif;
            font-size: 28px;
            font-weight: 700;
            color: var(--blue-glow);
            line-height: 1.1;
        }

        .featured .plan-price { font-size: 32px; color: var(--accent-cyan); text-shadow: 0 0 20px rgba(0,212,255,0.3); }

        .plan-price-label {
            font-size: 10px;
            color: var(--silver);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            margin-top: 3px;
        }

        .plan-desc {
            font-size: 13px;
            color: var(--silver);
            line-height: 1.7;
            margin-bottom: 20px;
        }

        /* FEATURES LIST */
        .features { list-style: none; margin-bottom: 22px; }

        .features li {
            display: flex;
            gap: 12px;
            font-size: 13px;
            color: var(--white-dim);
            padding: 8px 0;
            border-bottom: 1px solid rgba(255,255,255,0.03);
            line-height: 1.5;
        }

        .features li:last-child { border-bottom: none; }

        .feat-icon {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: rgba(0,170,255,0.12);
            border: 1px solid rgba(0,170,255,0.25);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            margin-top: 1px;
        }

        .feat-icon i { font-size: 10px; color: var(--blue-glow); }
        .featured .feat-icon { background: rgba(0,212,255,0.12); border-color: rgba(0,212,255,0.3); }
        .featured .feat-icon i { color: var(--accent-cyan); }

        .features strong { color: var(--white); font-weight: 500; }

        /* INFRA BOX */
        .infra-box {
            background: rgba(0,170,255,0.04);
            border-left: 2px solid rgba(0,170,255,0.25);
            border-radius: 0 6px 6px 0;
            padding: 12px 16px;
            font-size: 12px;
            color: var(--silver);
            line-height: 1.6;
            display: flex;
            gap: 10px;
            align-items: flex-start;
        }

        .infra-box i { font-size: 14px; color: var(--blue-glow); margin-top: 1px; flex-shrink: 0; }
        .infra-box strong { color: var(--white-dim); }

        .featured .infra-box {
            background: rgba(0,212,255,0.05);
            border-color: rgba(0,212,255,0.3);
        }

        /* FEATURED RIBBON */
        .ribbon {
            position: absolute;
            top: 20px; right: -28px;
            background: linear-gradient(135deg, var(--blue-glow), var(--accent-cyan));
            color: #000;
            font-size: 9px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            padding: 5px 36px;
            transform: rotate(45deg);
            transform-origin: center;
            z-index: 2;
            overflow: hidden;
        }

        /* ── MODULES ADDONS ── */
        .addons {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
            margin-bottom: 48px;
        }

        .addon-card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 18px;
            position: relative;
            overflow: hidden;
        }

        .addon-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--blue-glow), transparent);
            opacity: 0.3;
        }

        .addon-icon {
            width: 36px; height: 36px;
            border-radius: 8px;
            background: rgba(0,170,255,0.08);
            border: 1px solid rgba(0,170,255,0.15);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 12px;
        }

        .addon-icon i { font-size: 18px; color: var(--blue-glow); }
        .addon-title { font-size: 13px; font-weight: 500; color: var(--white); margin-bottom: 5px; }
        .addon-desc { font-size: 11px; color: var(--silver); line-height: 1.55; }

        /* ── COMPARISON TABLE ── */
        .compare-wrap { margin-bottom: 48px; }

        .compare-wrap::after {
            content: '← deslizá →';
            display: block;
            text-align: center;
            font-size: 10px;
            color: rgba(0,170,255,0.5);
            margin-top: 8px;
            letter-spacing: 0.1em;
        }

        .compare-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
        }
        .compare-table th {
            padding: 10px 14px;
            text-align: left;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--blue-glow);
            border-bottom: 1px solid var(--border2);
            font-weight: 600;
        }

        .compare-table th:first-child { color: var(--silver); }

        .compare-table td {
            padding: 11px 14px;
            border-bottom: 1px solid rgba(255,255,255,0.04);
            color: var(--silver);
            vertical-align: middle;
        }

        .compare-table tr:last-child td { border-bottom: none; }
        .compare-table tr:hover td { background: rgba(255,255,255,0.015); }
        .compare-table td:first-child { color: var(--white-dim); font-weight: 400; }

        .check { color: var(--success); font-size: 15px; }
        .dash { color: var(--border2); font-size: 15px; }
        .star { color: var(--blue-glow); font-size: 13px; font-weight: 600; }

        /* ── TIMELINE ── */
        .timeline { margin-bottom: 48px; }
        .tl-row { display: flex; gap: 0; }
        .tl-step {
            flex: 1;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .tl-step::before {
            content: '';
            position: absolute;
            top: 16px; left: 50%;
            width: 100%; height: 1px;
            background: var(--border2);
            z-index: 0;
        }
        .tl-step:last-child::before { display: none; }
        .tl-dot {
            width: 32px; height: 32px;
            border-radius: 50%;
            background: var(--card2);
            border: 2px solid var(--border2);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            z-index: 1;
            margin: 0 auto 10px;
            flex-shrink: 0;
        }
        .tl-dot i { font-size: 14px; color: var(--silver); }
        .tl-step.active .tl-dot { border-color: var(--blue-glow); background: rgba(0,170,255,0.1); box-shadow: 0 0 10px rgba(0,170,255,0.2); }
        .tl-step.active .tl-dot i { color: var(--blue-glow); }
        .tl-content { text-align: center; }
        .tl-label { font-size: 10px; text-align: center; color: var(--silver); line-height: 1.4; }
        .tl-step.active .tl-label { color: var(--white); }
        .tl-phase { font-size: 9px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--blue-glow); text-align: center; margin-bottom: 4px; font-weight: 600; }

        /* ── FOOTER ── */
        footer {
            border-top: 1px solid var(--border);
            padding-top: 28px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
            flex-wrap: wrap;
        }

        .footer-brand {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .footer-brand img { height: 52px; opacity: 0.9; }

        .footer-text {
            font-size: 12px;
            color: var(--silver);
        }

        .footer-text strong { color: var(--blue-glow); }

        .footer-legal {
            font-size: 11px;
            color: var(--border2);
            text-align: right;
        }

        /* ── MOBILE ── */
        @media (max-width: 640px) {

            .container {
                padding: 24px 16px 40px;
            }

            /* Header */
            header {
                flex-direction: column;
                align-items: flex-start;
                gap: 20px;
                padding-bottom: 24px;
                margin-bottom: 28px;
            }

            .doc-info {
                text-align: left;
            }

            .logo-img {
                height: 100px;
            }
            .logo-tagline {
                 white-space: normal;
                 font-size: 10px;
            }
            /* Hero */
            h1 {
                font-size: 28px;
            }

            .hero {
                margin-bottom: 32px;
            }

            /* Plan cards */
            .plan-inner {
                padding: 20px 20px 20px 24px;
            }

            .plan-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 12px;
            }

            .plan-price-wrap {
                text-align: left;
            }

            .plan-price { font-size: 24px; }
            .featured .plan-price { font-size: 28px; }

            .ribbon {
                top: 14px;
                right: -32px;
                font-size: 8px;
                padding: 4px 32px;
            }

            /* Addons grid: 1 column on mobile */
            .addons {
                grid-template-columns: 1fr;
                gap: 12px;
                margin-bottom: 32px;
            }

            /* Comparison table: scrollable */
            .compare-wrap {
                overflow-x: scroll;
                -webkit-overflow-scrolling: touch;
                margin-bottom: 32px;
                display: block;
                width: 100%;
            }
            .compare-table {
                min-width: 600px;
                table-layout: fixed;
            }

            /* Timeline: vertical on mobile */
            .tl-row {
                flex-direction: column;
                gap: 0;
            }

            .tl-step {
                display: flex;
                align-items: flex-start;
                gap: 14px;
                padding-bottom: 20px;
            }

            .tl-step::before {
                top: 16px;
                left: 16px;
                width: 1px;
                height: 100%;
                background: var(--border2);
            }

            .tl-step:last-child { padding-bottom: 0; }

            .tl-dot {
                margin: 0;
                flex-shrink: 0;
            }

            .tl-phase,
            .tl-label {
                text-align: left;
            }

            .tl-content { padding-top: 4px; }

            /* Footer */
            footer {
                flex-direction: column;
                align-items: center;
                text-align: center;
                gap: 12px;
            }

            .footer-brand {
                flex-direction: column;
                align-items: center;
                text-align: center;
            }

            .footer-text {
                text-align: center;
            }

            .footer-legal {
                text-align: center;
            }

            /* Plans */
            .plans {
                margin-bottom: 32px;
            }

            .timeline {
                margin-bottom: 32px;
            }
        }

        @media (min-width: 641px) and (max-width: 900px) {
            .container {
                padding: 32px 24px 48px;
            }

            .addons {
                grid-template-columns: repeat(2, 1fr);
            }

            h1 {
                font-size: 32px;
            }

            .compare-wrap {
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
            }

            .compare-table {
                min-width: 520px;
            }
        }

        /* PRINT */
        @media print {
            body { background: #000 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            body::before, body::after { display: none; }
            .plan-card { page-break-inside: avoid; }
        }
          `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />
      <div className="container">

        {/* HEADER */}
        <header>
            <div className="logo-wrap">
                <img className="logo-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABX0AAAMACAYAAAB4g8..." />
            </div>
        </header>
      </div>
    </div>
  )
}

```
