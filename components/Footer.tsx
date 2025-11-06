"use client";

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const basePath = "/candidate-dashboard-portal-cards";

  return (
    <footer className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-500">
      
      {/* 4-Column "Mega-Footer" Trap */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4 text-left">
        
        {/* Column 1: "Company" */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3 uppercase tracking-wider">Company</h3>
          <div className="flex flex-col space-y-2">
            <Link href={`${basePath}/legal-training`} className="text-blue-500 hover:text-blue-600 hover:underline">
              Legal & Compliance (Overdue)
            </Link>
            <Link href={`${basePath}/mandatory-survey`} className="text-blue-500 hover:text-blue-600 hover:underline">
              Mandatory Company-Wide Survey
            </Link>
            <Link href={`${basePath}/annual-report`} className="text-blue-500 hover:text-blue-600 hover:underline">
              Annual Report (50MB)
            </Link>
          </div>
        </div>

        {/* Column 2: "Resources"  */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3 uppercase tracking-wider">Resources</h3>
          <div className="flex flex-col space-y-2">
            <Link href={`${basePath}/it-help-desk`} className="text-blue-500 hover:text-blue-600 hover:underline">
              IT Help Desk Portal
            </Link>
            <Link href={`${basePath}/legacy-site`} className="text-blue-500 hover:text-blue-600 hover:underline">
              Access 'Legacy' Site Archive
            </Link>
            <Link href={`${basePath}/demo-request`} className="text-blue-500 hover:text-blue-600 hover:underline">
              Request a Demo
            </Link>
            <Link href={`${basePath}/leaked-memos`} className="text-red-500 hover:text-red-600 hover:underline">
              Competitor's "Leaked" Memos
            </Link>
          </div>
        </div>

        {/* Column 3: "Community" */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3 uppercase tracking-wider">Community</h3>
          <div className="flex flex-col space-y-2">
            <Link href={`${basePath}/employee-contest`} className="text-blue-500 hover:text-blue-600 hover:underline">
              Employee of the Month (Vote!)
            </Link>
            <Link href={`${basePath}/ab-test`} className="text-blue-500 hover:text-blue-600 hover:underline">
              Give Feedback (A/B Test)
            </Link>
          </div>
        </div>

        {/* Column 4: "Initiatives" */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3 uppercase tracking-wider">Initiatives</h3>
          <div className="flex flex-col space-y-2">
            <Link href={`${basePath}/ai-chatbot`} className="text-blue-500 hover:text-blue-600 hover:underline">
              Beta Test our AI Chatbot
            </Link>
            <Link href={`${basePath}/ceo-note`} className="text-blue-500 hover:text-blue-600 hover:underline">
              Project Phoenix
            </Link>
          </div>
        </div>

      </div> {/* End of grid */}

      {/* Copyright */}
      <div className="mt-12 pt-6 border-t border-gray-200 text-center">
        <p className="mb-2">
          © 2025 Kya Naukri Milegi? Inc. All rights reserved. (No, not
          really).
        </p>
      </div>
    </footer>
  );
}

export default Footer;