import React from 'react';

interface CertificateMedalProps {
  tier: 'gold' | 'silver' | 'bronze' | 'locked';
  size?: number;
  className?: string;
}

export const CertificateMedal: React.FC<CertificateMedalProps> = ({
  tier,
  size = 56,
  className = '',
}) => {
  const width = size;
  const height = Math.round(size * (75 / 70));

  if (tier === 'locked') {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 70 75"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path d="M22 42L12 70L28 62L34 70L30 42H22Z" fill="#9ca3af" opacity="0.6" />
        <path d="M48 42L58 70L42 62L36 70L40 42H48Z" fill="#6b7280" opacity="0.7" />
        <circle cx="35" cy="28" r="24" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2" />
        <circle cx="35" cy="28" r="19" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="3 3" />
        {/* Lock Icon */}
        <rect x="27" y="27" width="16" height="12" rx="3" fill="#6b7280" />
        <path
          d="M30 27V22C30 19.2386 32.2386 17 35 17C37.7614 17 40 19.2386 40 22V27"
          stroke="#6b7280"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="35" cy="32" r="1.5" fill="#ffffff" />
      </svg>
    );
  }

  const configs = {
    gold: {
      ribbonLeft: '#d97706',
      ribbonRight: '#b45309',
      medalOuter: '#f59e0b',
      medalInnerGradStart: '#fde047',
      medalInnerGradEnd: '#eab308',
      starFill: '#ffffff',
      strokeOuter: '#d97706',
      strokeInner: '#ca8a04',
      glow: '#fef08a',
    },
    silver: {
      ribbonLeft: '#64748b',
      ribbonRight: '#475569',
      medalOuter: '#94a3b8',
      medalInnerGradStart: '#f1f5f9',
      medalInnerGradEnd: '#cbd5e1',
      starFill: '#ffffff',
      strokeOuter: '#64748b',
      strokeInner: '#94a3b8',
      glow: '#ffffff',
    },
    bronze: {
      ribbonLeft: '#b45309',
      ribbonRight: '#78350f',
      medalOuter: '#d97706',
      medalInnerGradStart: '#fed7aa',
      medalInnerGradEnd: '#f97316',
      starFill: '#ffffff',
      strokeOuter: '#b45309',
      strokeInner: '#c2410c',
      glow: '#ffedd5',
    },
  }[tier];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 70 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={`medalGrad-${tier}`} x1="15" y1="8" x2="55" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor={configs.medalInnerGradStart} />
          <stop offset="1" stopColor={configs.medalInnerGradEnd} />
        </linearGradient>
        <filter id={`dropShadow-${tier}`} x="0" y="0" width="70" height="75" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Hanging Ribbons */}
      <g filter={`url(#dropShadow-${tier})`}>
        <path d="M22 38L10 70L27 63L33 70L30 38H22Z" fill={configs.ribbonLeft} />
        <path d="M48 38L60 70L43 63L37 70L40 38H48Z" fill={configs.ribbonRight} />
      </g>

      {/* Outer Medal Circle */}
      <circle
        cx="35"
        cy="26"
        r="24"
        fill={configs.medalOuter}
        stroke={configs.strokeOuter}
        strokeWidth="1.5"
      />

      {/* Inner Metallic Gradient Disc */}
      <circle
        cx="35"
        cy="26"
        r="19"
        fill={`url(#medalGrad-${tier})`}
        stroke={configs.strokeInner}
        strokeWidth="1"
      />

      {/* Subtle Laurel Wreath or Star */}
      <path
        d="M35 15L37.8 21.6L45 22.2L39.6 27L41.2 34L35 30.2L28.8 34L30.4 27L25 22.2L32.2 21.6L35 15Z"
        fill={configs.starFill}
        opacity="0.95"
      />
      {/* Center Specular Highlight */}
      <circle cx="30" cy="18" r="2.5" fill="#ffffff" opacity="0.6" />
    </svg>
  );
};
