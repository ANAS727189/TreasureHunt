'use client';

import { useState, useEffect } from 'react';
import { useRouter} from 'next/navigation';
import Image from 'next/image';


type AgreementState = {
  [key: number]: boolean;
};

export default function Onboarding() {
  const router = useRouter();
  const [agreements, setAgreements] = useState<AgreementState>({
    1: true, 2: true, 3: true, 4: true, 5: true, 
    6: true, 7: true, 8: true, 9: true, 10: true
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const handleCheckboxChange = (id: number) => {
    setAgreements(prev => ({
      ...prev,
      [id]: !prev[id], 
    }));
  };

  useEffect(() => {
    const correctCombination = 
      agreements[1] &&
      agreements[2] &&
      agreements[3] &&
      agreements[4] &&
      agreements[5] &&
      agreements[6] &&
      !agreements[7] &&
      agreements[8] &&
      agreements[9] &&
      agreements[10];

    setIsFormValid(correctCombination);

  }, [agreements]);


  const handleAgree = () => {
    router.push(`/candidate-dashboard-portal-cards/angry-hr-complaint/yay-i-got-the-job-in-MTV-haha?path=angry-hr-9`);
  };

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <Image
            src="/memes/agree-condition.webp"
            alt="I have read and agree"
            width={800}
            height={400}
            className="w-full h-64 object-cover"
          />
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">One Last Step: Employment Contract</h1>
            <p className="text-gray-600 mb-6">
              Welcome to the team! Please review and accept the following terms. 
              Failure to agree to all *valid* company policies will block your access.
            </p>
            <div 
              className="h-64 overflow-y-scroll border border-gray-300 rounded-md p-4 bg-gray-50 text-sm text-gray-700 space-y-3"
            >
              <p className="text-xs text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra...</p>
              <label className="flex items-start space-x-2">
                <input type="checkbox" checked={agreements[1]} onChange={() => handleCheckboxChange(1)} className="mt-1"/>
                <span className="flex-1"><strong>1. Definitions:</strong> I agree that "The Company" refers to us and "You" refers to the... asset.</span>
              </label>
              <label className="flex items-start space-x-2">
                <input type="checkbox" checked={agreements[2]} onChange={() => handleCheckboxChange(2)} className="mt-1"/>
                <span className="flex-1"><strong>2. Term:</strong> I agree that my employment is "at-will."</span>
              </label>
              <label className="flex items-start space-x-2">
                <input type="checkbox" checked={agreements[3]} onChange={() => handleCheckboxChange(3)} className="mt-1"/>
                <span className="flex-1"><strong>3. Compensation:</strong> I agree that my compensation is confidential and I will not discuss it.</span>
              </label>
              <label className="flex items-start space-x-2">
                <input type="checkbox" checked={agreements[4]} onChange={() => handleCheckboxChange(4)} className="mt-1"/>
                <span className="flex-1"><strong>4. Work Hours:</strong> I agree to be available 24/7/365. "Work-life balance" is a buzzword.</span>
              </label>
              <label className="flex items-start space-x-2">
                <input type="checkbox" checked={agreements[5]} onChange={() => handleCheckboxChange(5)} className="mt-1"/>
                <span className="flex-1"><strong>5. Company Property:</strong> I agree that my laptop, phone, and soul are the property of The Company.</span>
              </label>
              <label className="flex items-start space-x-2">
                <input type="checkbox" checked={agreements[6]} onChange={() => handleCheckboxChange(6)} className="mt-1"/>
                <span className="flex-1"><strong>6. The "GRIND" Values:</strong> I agree to live, eat, sleep, and breathe Grit, Respect, Integrity, Nimbleness, and Diversity.</span>
              </label>
              <label className="flex items-start space-x-2">
                <input type="checkbox" checked={agreements[7]} onChange={() => handleCheckboxChange(7)} className="mt-1"/>
                <span className="flex-1">
                  <span className="font-semibold">7. Voluntary Pay Deduction:</span> I agree to a 10% monthly pay deduction to fund the "Employee of the Month" pizza party.
                </span>
              </label>
              <label className="flex items-start space-x-2">
                <input type="checkbox" checked={agreements[8]} onChange={() => handleCheckboxChange(8)} className="mt-1"/>
                <span className="flex-1"><strong>8. Free Food:</strong> I agree that "free" food in the cafeteria will be silently deducted from my paycheck.</span>
              </label>
              <label className="flex items-start space-x-2">
                <input type="checkbox" checked={agreements[9]} onChange={() => handleCheckboxChange(9)} className="mt-1"/>
                <span className="flex-1"><strong>9. Parking Spot 7B:</strong> I agree that parking spot 7B is reserved for Raj.</span>
              </label>
              <label className="flex items-start space-x-2">
                <input type="checkbox" checked={agreements[10]} onChange={() => handleCheckboxChange(10)} className="mt-1"/>
                <span className="flex-1"><strong>10. Agreement:</strong> I agree that by agreeing, I am bound spiritually to these terms. No take-backs.</span>
              </label>
              
              <p className="text-xs text-gray-500">...Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi.</p>
            </div>
            
            <div className="mt-6">
              <button
                onClick={handleAgree}
                disabled={!isFormValid}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                           bg-green-600 hover:bg-green-700 
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                           disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isFormValid ? "I Accept All Terms & Conditions" : "You must agree to all *valid* policies"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}