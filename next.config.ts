import type { NextConfig } from "next";

// const luckyIndex = Math.floor(Math.random() * (990 - 110 + 1)) + 110;
const luckyIndex = 423;
const luckyPage = `/page-${String(luckyIndex).padStart(2, "0")}`;

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: luckyPage,
        destination: '/candidate-dashboard-portal-cards/stack/sperPc08OGbzTRXULDJ2DhMY5QJoFrh61YkUnN3f7w?path=stack-4',
        permanent: false,
      },
      {
        source: '/6838-GRIND',
        destination: '/candidate-dashboard-portal-cards/angry-hr-complaint/hr-values/internal-server',
        permanent: false,
      },
      {
        source: `/page-:num((?!${String(luckyIndex).padStart(2, "0")}).*)`,
        destination: '/tu-nalla-hi-marega',
        permanent: false,
      },
      {
        source: '/candidate-dashboard-portal-cards/legacy-site/archive/nalla-backup',
        destination: '/tu-nalla-hi-marega',
        permanent: false,
      },
      {
        source: '/candidate-dashboard-portal-cards/phoenix-final-step',
        destination: '/tu-nalla-hi-marega', 
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
