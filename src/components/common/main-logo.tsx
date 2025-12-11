interface MainLogoProps {
  backgroundColor?: string;
  logoColor?: string;
  size?: string;
  className?: string;
}

const MainLogo = ({ backgroundColor = 'white', logoColor = '#684DFF', size = '100%', className }: MainLogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 245 245"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="245" height="245" rx="122.5" fill={backgroundColor} />
      <path
        d="M68.9994 140.897C68.9994 140.897 76.0695 103.17 114.062 94.0875C152.054 85.0051 162.621 73.6716 175.052 48.6758C175.052 48.6758 182.2 78.3292 157.26 127.7C132.32 177.071 79.7989 198.884 79.7989 198.884C79.3327 199.194 108.079 166.436 114.994 149.979C114.994 149.979 122.531 134.221 116.315 125.061C110.1 115.901 95.1823 122.421 95.1823 122.421C95.1823 122.421 81.6635 126.613 68.9994 140.974L68.9994 140.897Z"
        fill={logoColor}
      />
      <path
        d="M122.142 80.7349C131.71 80.7349 139.467 72.9846 139.467 63.4241C139.467 53.8636 131.71 46.1133 122.142 46.1133C112.573 46.1133 104.816 53.8636 104.816 63.4241C104.816 72.9846 112.573 80.7349 122.142 80.7349Z"
        fill={logoColor}
      />
    </svg>
  );
};

export default MainLogo;
