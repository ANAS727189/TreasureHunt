import type { Metadata } from "next";
import { Geist, Geist_Mono, Darker_Grotesque, Inter, Kalam } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DarkerGrotesque = Darker_Grotesque({
  subsets: ["latin"],
  variable: "--font-darker-grotesque",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-kalam",
});

export const metadata: Metadata = {
  title: {
    default: "Kya Tumhe Naukri Milegi ? - The Ultimate Job Hunting Platform",
    template: "%s | Treasure Hunt",
  },
  description:
    "Kyun Chahiye Tumhe Naukri? Ek Treasure Hunt! Embark on an exciting Treasure Hunt through our tech-themed challenges and puzzles. Test your skills, solve riddles, and uncover hidden gems in the world of technology.",
  keywords: [
    "Treasure Hunt",
    "Tech Odyssey",
    "Coding Challenges",
    "Puzzles",
    "Riddles",
    "Technology",
    "Programming",
    "Adventure",
    "Problem Solving",
    "Tech Games",
    "Naukri",
    "Job Portal",
    "Career",
    "Hiring",
    "Recruitment",
    "Job Search",
    "Job Opportunities",
    "Job Interviews",
    "Job Applications",
    "Tech Careers",
    "Tech Jobs",
    "IT Careers",
    "Software Development",
    "Tech Industry",
    "Tech Talent",
    "Tech Recruitment",
    "Tech Hiring",
    "kya-naukri-milegi-tumhe"
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${DarkerGrotesque.variable} ${inter.variable} ${kalam.variable}  antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
