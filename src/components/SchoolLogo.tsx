import React from 'react';

interface SchoolLogoProps {
  className?: string;
  size?: number | string;
}

export function SchoolLogo({ className = "w-full h-full", size }: SchoolLogoProps) {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Emerald Green Background Gradient */}
        <radialGradient id="bgGrad" cx="50%" cy="40%" r="60%" fx="50%" fy="30%">
          <stop offset="0%" stopColor="#15803d" />
          <stop offset="60%" stopColor="#166534" />
          <stop offset="100%" stopColor="#14532d" />
        </radialGradient>

        {/* Gold Border Gradient */}
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        {/* Glowing Flame Gradient */}
        <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
          <stop offset="40%" stopColor="#eab308" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ca8a04" stopOpacity="0" />
        </radialGradient>

        {/* Path for Arched Text at Top */}
        <path
          id="textArc"
          d="M 32,80 A 75,75 0 0,1 168,80"
          fill="none"
        />

        {/* Shadow filter to make badge elements pop */}
        <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* 5-Lobed Petal Shield (Lotus Flower Shape / Bunga Melati Kelopak Lima) */}
      <path
        d="M 100,10 
           C 125,5 140,25 150,35
           C 165,50 195,65 190,95
           C 185,120 170,140 160,160
           C 145,185 115,195 100,192
           C 85,195 55,185 40,160
           C 30,140 15,120 10,95
           C 5,65 35,50 50,35
           C 60,25 75,5 100,10 Z"
        fill="url(#bgGrad)"
        stroke="url(#goldGrad)"
        strokeWidth="3.5"
        filter="url(#dropShadow)"
      />

      {/* Inner Thin Gold Trim Ring */}
      <path
        d="M 100,20 
           C 120,16 132,32 141,40
           C 153,52 178,65 174,89
           C 170,110 157,126 149,143
           C 137,164 112,172 100,170
           C 88,172 63,164 51,143
           C 43,126 30,110 26,89
           C 22,65 47,52 59,40
           C 68,32 80,16 100,20 Z"
        fill="none"
        stroke="url(#goldGrad)"
        strokeWidth="1"
        opacity="0.8"
      />

      {/* Glow Center Background */}
      <circle cx="100" cy="100" r="35" fill="url(#glowGrad)" opacity="0.6" />

      {/* Arched text "SMP NEGERI 21" at the top */}
      <text fill="#ffffff" fontSize="13.5" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.5">
        <textPath href="#textArc" startOffset="50%" textAnchor="middle">
          SMP NEGERI 21
        </textPath>
      </text>

      {/* Left Branch: Padi (Golden Rice) */}
      <g stroke="url(#goldGrad)" strokeWidth="0.8" fill="#fccd29">
        {/* We can draw small rotated ellipses climbing on the left curve */}
        {Array.from({ length: 9 }).map((_, i) => {
          const t = i / 8;
          // Curve path coordinates on left side
          const angle = Math.PI * 0.9 + t * Math.PI * 0.45;
          const r = 50 + i * 1.5;
          const cx = 100 + r * Math.cos(angle);
          const cy = 110 + r * Math.sin(angle);
          const rot = (angle * 180) / Math.PI + 90;
          return (
            <ellipse
              key={`rice-${i}`}
              cx={cx}
              cy={cy}
              rx="4.5"
              ry="2.5"
              transform={`rotate(${rot}, ${cx}, ${cy})`}
            />
          );
        })}
      </g>

      {/* Right Branch: Kapas (White Cotton Flowers) */}
      <g fill="#ffffff" stroke="#94a3b8" strokeWidth="0.8">
        {Array.from({ length: 8 }).map((_, i) => {
          const t = i / 7;
          const angle = Math.PI * 0.1 - t * Math.PI * 0.45;
          const r = 50 + i * 1.5;
          const cx = 100 + r * Math.cos(angle);
          const cy = 110 + r * Math.sin(angle);
          
          return (
            <g key={`cotton-${i}`}>
              {/* Petals / Cotton puff (3 overlapping tiny circles) */}
              <circle cx={cx - 1.5} cy={cy - 1.5} r="2.8" />
              <circle cx={cx + 1.5} cy={cy - 1.5} r="2.8" />
              <circle cx={cx} cy={cy + 1.5} r="3" />
              {/* Small green base */}
              <path d={`M ${cx - 2} ${cy + 3} L ${cx} ${cy + 5} L ${cx + 2} ${cy + 3} Z`} fill="#166534" stroke="none" />
            </g>
          );
        })}
      </g>

      {/* Open Book (Buku Terbuka) in Center Bottom */}
      <g filter="url(#dropShadow)">
        {/* Left Page shadow / background */}
        <path d="M 100,126 Q 80,118 64,128 L 64,111 Q 80,101 100,109 Z" fill="#e2e8f0" />
        {/* Right Page shadow / background */}
        <path d="M 100,126 Q 120,118 136,128 L 136,111 Q 120,101 100,109 Z" fill="#ffffff" />
        
        {/* Page book line separator */}
        <line x1="100" y1="109" x2="100" y2="126" stroke="#475569" strokeWidth="1" />
        
        {/* Book pages details */}
        <path d="M 69,122 Q 81,114 96,119" fill="none" stroke="#64748b" strokeWidth="0.8" />
        <path d="M 69,118 Q 81,110 96,115" fill="none" stroke="#64748b" strokeWidth="0.8" />
        <path d="M 69,114 Q 81,106 96,111" fill="none" stroke="#64748b" strokeWidth="0.8" />

        <path d="M 131,122 Q 119,114 104,119" fill="none" stroke="#64748b" strokeWidth="0.8" />
        <path d="M 131,118 Q 119,110 104,115" fill="none" stroke="#64748b" strokeWidth="0.8" />
        <path d="M 131,114 Q 119,106 104,111" fill="none" stroke="#64748b" strokeWidth="0.8" />
      </g>

      {/* Glowing Star Sparkle at Peak of Kris */}
      <circle cx="100" cy="62" r="3" fill="#ffffff" opacity="0.9" filter="url(#dropShadow)" />
      <line x1="100" y1="54" x2="100" y2="70" stroke="#fef08a" strokeWidth="1" />
      <line x1="92" y1="62" x2="108" y2="62" stroke="#fef08a" strokeWidth="1" />

      {/* Central Yellow Kris (Wavy Dagger / Tiang Cahaya) */}
      <g filter="url(#dropShadow)" transform="translate(100, 92) scale(0.9)">
        {/* Handle */}
        <path d="M -2,32 L 2,32 L 3,36 L -3,36 Z" fill="#d97706" />
        {/* Crossguard (Aron) */}
        <path d="M -8,30 Q 0,33 8,30 L 4,28 Q 0,30 -4,28 Z" fill="#ca8a04" stroke="url(#goldGrad)" strokeWidth="0.5" />
        {/* Wavy Blade (Bilah Keris) with glowing yellow */}
        <path 
          d="M 0,28
             Q 4,22 1,18
             Q -3,14 1,10
             Q 5,5 0,-25
             Q -5,5 -1,10
             Q 3,14 -1,18
             Q -4,22 0,28 Z" 
          fill="#facc15" 
          stroke="url(#goldGrad)" 
          strokeWidth="1" 
        />
        {/* Inner flame core */}
        <path 
          d="M 0,26
             Q 2,21 0.5,17
             Q -1,13 0.5,9
             Q 2,4 0,-22
             Q -2,4 -0.5,9
             Q 1,13 -0.5,17
             Q -2,21 0,26 Z" 
          fill="#ffffff" 
        />
      </g>

      {/* Decorative Ribbon (Pita Putih "KOTA JAMBI") at the Bottom */}
      <g filter="url(#dropShadow)">
        {/* Left tail fold */}
        <path d="M 36,150 L 50,138 L 50,154 Z" fill="#94a3b8" />
        <path d="M 36,150 L 50,154 L 30,160 Z" fill="#cbd5e1" stroke="url(#goldGrad)" strokeWidth="0.8" />
        
        {/* Right tail fold */}
        <path d="M 164,150 L 150,138 L 150,154 Z" fill="#94a3b8" />
        <path d="M 164,150 L 150,154 L 170,160 Z" fill="#cbd5e1" stroke="url(#goldGrad)" strokeWidth="0.8" />

        {/* Ribbon main body */}
        <path d="M 45,142 Q 100,154 155,142 L 150,160 Q 100,172 50,160 Z" fill="#ffffff" stroke="url(#goldGrad)" strokeWidth="1" />
      </g>

      {/* Ribbon Text "KOTA JAMBI" centered and curved */}
      <text
        x="100"
        y="157"
        fill="#14532d"
        fontSize="8"
        fontWeight="800"
        fontFamily="sans-serif"
        textAnchor="middle"
        letterSpacing="1.2"
      >
        KOTA JAMBI
      </text>
    </svg>
  );
}
