
import React from 'react';

interface PictoraLogoProps extends React.SVGProps<SVGSVGElement> {}

const PictoraLogo: React.FC<PictoraLogoProps> = (props) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="64" height="64" rx="16" fill="#106466" />
      <circle cx="24" cy="24" r="8" fill="#F8F4E3" />
      <path
        d="M16 40L32 28L48 40"
        stroke="#F8F4E3"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="16" y="16" width="32" height="32" rx="4" stroke="#E55812" strokeWidth="3" />
    </svg>
  );
};

export default PictoraLogo;
