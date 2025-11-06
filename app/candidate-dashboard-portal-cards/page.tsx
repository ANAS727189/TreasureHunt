"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import EasyPath2 from "@/components/path-2/Easy-Path-2";
import EasyPath3 from "@/components/path-2/Easy-Path-3";
import ApplyCard from "@/components/ApplyCard";

export default function Dashboard() {
  const initialCards = [
    <ApplyCard key="1" />,

    <EasyPath2 key="2" />,

    <EasyPath3 key="3" />,

    <Link
      key="4"
      href="/candidate-dashboard-portal-cards/stack"
      className="flex flex-col h-full bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm border border-gray-200 transform hover:-translate-y-1 transition-all overflow-hidden"
    >
      <Image src="/memes/jenga.jpg" alt="Jenga tower code meme" width={400} height={200} className="w-full h-48 object-cover" />
      <div className="p-6 grow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Our &apos;Award-Winning&apos;  Tech
        </h2>
        <p className="text-gray-700">
          Learn about the &apos;cutting-edge&apos; tools we use.
        </p>
      </div>
      <footer className="p-6 pt-2 text-sm text-gray-500 border-t border-gray-200">
        <strong>Classification:</strong> Internal Use Only<br/>
        <strong>Documentation:</strong> v0.1 (Draft)<br/>
        <strong>Maintained by:</strong> &apos;The Interns&apos;
      </footer>
    </Link>,

    <Link
      key="5"
      href="/candidate-dashboard-portal-cards/policy"
      className="flex flex-col h-full bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm border border-gray-200 transform hover:-translate-y-1 transition-all overflow-hidden"
    >
      <Image src="/memes/agree-condition.webp" alt="I read the terms and conditions" width={400} height={200} className="w-full h-48 object-cover"/>
      <div className="p-6 grow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Company Policy & Legal
        </h2>
        <p className="text-gray-700">
          Mandatory reading. Seriously... *mandatory*.
        </p>
      </div>
      <footer className="p-6 pt-2 text-sm text-gray-500 border-t border-gray-200">
        <strong>Last Revised:</strong> 2022<br/>
        <strong>Compliance:</strong> <span className="text-red-600">Overdue</span><br/>
        <strong>File Size:</strong> 2.1MB (PDF)
      </footer>
    </Link>,

    <Link
      key="6"
      href="/candidate-dashboard-portal-cards/internship"
      className="flex flex-col h-full bg-red-50 hover:bg-red-100 rounded-lg shadow-sm border border-red-300 transform hover:-translate-y-1 transition-all overflow-hidden"
    >
      <Image src="/memes/free-real-estate.webp" alt="It's free real estate meme" width={400} height={200} className="w-full h-48 object-cover"/>
      <div className="p-6 grow">
        <h2 className="text-2xl font-semibold text-red-800 mb-2">
          Apply: &apos;Unpaid Internship&apos;
        </h2>
        <p className="text-red-700">
          6 months, no pay. Great &apos;exposure&apos;. (Leads to /nalla).
        </p>
      </div>
      <footer className="p-6 pt-2 text-sm text-gray-500 border-t border-red-100">
        <strong>Applications:</strong> 1,337<br/>
        <strong>Closes:</strong> Today<br/>
        <strong>Pay:</strong> ₹0.00
      </footer>
    </Link>,

    <Link
      key="7"
      href="/candidate-dashboard-portal-cards/grievance"
      className="flex flex-col h-full bg-orange-50 hover:bg-orange-100 rounded-lg shadow-sm border border-orange-200 transform hover:-translate-y-1 transition-all overflow-hidden"
    >
      <Image src="/memes/worthless.webp" alt="This is worthless meme" width={400} height={200} className="w-full h-48 object-cover"/>
      <div className="p-6 grow">
        <h2 className="text-2xl font-semibold text-orange-800 mb-2">
          Employee Grievance Form
        </h2>
        <p className="text-orange-700">
          Why is this public? Seems like a mistake... or a test.
        </p>
      </div>
      <footer className="p-6 pt-2 text-sm text-gray-500 border-t border-orange-100">
        <strong>Anonymous:</strong> Yes<br/>
        <strong>Status:</strong> Unread (99+)<br/>
        <strong>Response Time:</strong> N/A
      </footer>
    </Link>,

    <Link
      key="8"
      href="/candidate-dashboard-portal-cards/swag-store"
      className="flex flex-col h-full bg-purple-50 hover:bg-purple-100 rounded-lg shadow-sm border border-purple-200 transform hover:-translate-y-1 transition-all overflow-hidden"
    >
      <Image src="/memes/shut-up-take-money.webp" alt="Shut up and take my money meme" width={400} height={200} className="w-full h-48 object-cover"/>
      <div className="p-6 grow">
        <h2 className="text-2xl font-semibold text-purple-800 mb-2">
          Company Swag Store
        </h2>
        <p className="text-purple-700">
          Buy our branded mugs and t-shirts. (Currently &quot;Sold Out&quot;).
        </p>
      </div>
      <footer className="p-6 pt-2 text-sm text-gray-500 border-t border-purple-100">
        <strong>Status:</strong> <span className="font-bold text-red-600">SOLD OUT</span><br/>
        <strong>Next Restock:</strong> TBD<br/>
        <strong>Discount Code:</strong> N/A
      </footer>
    </Link>,

    <Link
      key="9"
      href="/candidate-dashboard-portal-cards/angry-hr-complaint/hr-complaints"
      className="flex flex-col h-full bg-yellow-50 hover:bg-yellow-100 rounded-lg shadow-sm border border-yellow-200 transform hover:-translate-y-1 transition-all overflow-hidden"
    >
      <Image src="/memes/jhethalala-angry.webp" alt="Jethalal Angry Boss Meme" width={400} height={200} className="w-full h-48 object-cover"/>
      <div className="p-6 grow">
        <h2 className="text-2xl font-semibold text-yellow-800 mb-2">
          Anger of HR: Exit Interviews
        </h2>
        <p className="text-yellow-700">
          They forgot to secure these audio files... 👀
        </p>
      </div>
      <footer className="p-6 pt-2 text-sm text-gray-500 border-t border-yellow-100">
        <strong>Status:</strong> <span className="text-red-600 font-bold">CONFIDENTIAL</span><br/>
        <strong>Last Update:</strong> Today<br/>
        <strong>Files:</strong> 11 Audio Recordings
      </footer>
    </Link>,
  ];

  const [cards, setCards] = useState(initialCards);

  useEffect(() => {
    const shuffle = () => {
      setCards(prev => {
        const arr = [...prev];
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.random() * (i + 1) | 0;
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      });
    };

    const timer = setInterval(shuffle, 30000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-12 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900 font-sans">
      <div className="w-full max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 tracking-tight">
              📋 Candidate Dashboard
            </h1>
            <p className="text-sm text-gray-500 font-mono">Welcome, Hacker • Access Level: <span className="text-green-600 font-semibold">FULL</span></p>
          </div>
          <Link
            href="/candidate-dashboard-portal-cards/task-queue"
            className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 rounded-xl 
                       hover:from-red-100 hover:to-red-200 hover:border-red-400 hover:shadow-lg 
                       transform hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
            <span className="text-red-800 font-bold text-sm">
              9 &apos;Urgent&apos; Tasks Pending
            </span>
          </Link>
        </div>

        {/* Welcome Message */}
        <div className="bg-white border-l-4 border-blue-500 p-6 rounded-lg shadow-sm mb-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            <span className="font-semibold text-blue-600">Access Granted.</span> You&apos;re in. Good job... hacker. 🕵️ Now the <em className="text-red-600 font-semibold">real</em> test begins. HR has
            flagged the following items for your immediate attention. Choose your
            first task wisely.
          </p>
        </div>

        {/* Company Stats Bar */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-gray-800 to-gray-900 text-white p-5 rounded-xl shadow-lg mb-10 border border-gray-700">
          <div className="flex items-center space-x-8 mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">💰</span>
              <div>
                <span className="text-gray-400 text-sm block">Company Value</span>
                <span className="text-green-400 font-bold text-xl">$4.20B</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📈</span>
              <div>
                <span className="text-gray-400 text-sm block">Growth</span>
                <span className="text-green-400 font-bold text-xl">+69%</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <Link 
              href="/candidate-dashboard-portal-cards/demo-request"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors flex items-center space-x-1"
            >
              <span>📞</span>
              <span className="underline">Request a Demo</span>
            </Link>
            <Link 
              href="/candidate-dashboard-portal-cards/annual-report"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors flex items-center space-x-1"
            >
              <span>📄</span>
              <span className="underline">Annual Report</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards}
        </div>
      </div>
    </main>
  );
}
