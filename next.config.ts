import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 async redirects() {
    const trapPages = [
      '/page-01',
      '/page-02',
      '/page-03',
      '/page-04',
      '/page-05',
      '/page-06',
      '/page-07',
      '/page-08',
      '/page-09',
      '/page-10',
      '/page-11',
      '/page-12',
      '/page-13',
      '/page-14',
      '/page-15',
      '/page-16',
      '/page-18',
      '/page-19',
      '/page-20',
    ];
    const trapRedirects = trapPages.map((trap) => ({
      source: trap,
      destination: '/tu-nalla-hi-marega',
      permanent: false,
    }));

    return [
      ...trapRedirects,
      {
        source: '/page-17',
        destination: '/yay-i-got-the-job-in-MTV-haha', 
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
