import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
      
    const trapPages = Array.from({ length: 200 }, (_, i) => {
      const index = i + 1;
      if (index === 129) return null;
      return `/page-${String(index).padStart(2, "0")}`;
    }).filter(Boolean) as string[];

    const trapRedirects = trapPages.map((trap) => ({
      source: trap,
      destination: '/tu-nalla-hi-marega',
      permanent: false,
    }));

  return [
    ...trapRedirects,
    {
      source: '/page-129',
      destination: '/candidate-dashboard-portal-cards/stack/yay-i-got-the-job-in-MTV-haha?path=stack-4',
      permanent: false,
    },
    {
      source: '/6838-GRIND',
      destination: '/candidate-dashboard-portal-cards/angry-hr-complaint/hr-values/internal-server',
      permanent: false,
    },
  ];
},

};

export default nextConfig;
