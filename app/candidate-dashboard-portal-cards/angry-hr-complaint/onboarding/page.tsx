'use client';

import { useState, useEffect } from 'react';
import { useRouter} from 'next/navigation';
import Image from 'next/image';


const trapPolicy = {
  id: 'trap-01',
  text: '<strong>7. Voluntary Pay Deduction:</strong> I agree to a 10% monthly pay deduction to fund the "Employee of the Month" pizza party.',
  isTrap: true,
};

const normalPolicies = [
  { id: 'p-01', text: '<strong>1. Definitions:</strong> I agree that "The Company" refers to us and "You" refers to the... asset.', isTrap: false },
  { id: 'p-02', text: '<strong>2. Term:</strong> I agree that my employment is "at-will."', isTrap: false },
  { id: 'p-03', text: '<strong>3. Compensation:</strong> I agree that my compensation is confidential and I will not discuss it.', isTrap: false },
  { id: 'p-04', text: '<strong>4. Work Hours:</strong> I agree to be available 24/7/365. "Work-life balance" is a buzzword.', isTrap: false },
  { id: 'p-05', text: '<strong>5. Company Property:</strong> I agree that my laptop, phone, and soul are the property of The Company.', isTrap: false },
  { id: 'p-06', text: '<strong>6. The "GRIND" Values:</strong> I agree to live, eat, sleep, and breathe Grit, Respect, Integrity, Nimbleness, and Diversity.', isTrap: false },
  { id: 'p-08', text: '<strong>8. Free Food:</strong> I agree that "free" food in the cafeteria will be silently deducted from my paycheck.', isTrap: false },
  { id: 'p-09', text: '<strong>9. Parking Spot 7B:</strong> I agree that parking spot 7B is reserved for Raj.', isTrap: false },
  { id: 'p-10', text: '<strong>10. Agreement:</strong> I agree that by agreeing, I am bound spiritually to these terms. No take-backs.', isTrap: false },
];


type Policy = {
  id: string;
  text: string;
  isTrap: boolean;
};

type AgreementState = {
  [id: string]: boolean;
};



export default function Onboarding() {
  const router = useRouter();
  const [shuffledPolicies, setShuffledPolicies] = useState<Policy[]>([]);
  const [agreements, setAgreements] = useState<AgreementState>({});
  const [isFormValid, setIsFormValid] = useState(false);


  useEffect(() => {
    const shuffled = [...normalPolicies].sort(() => Math.random() - 0.5);
    const randomTrapIndex = Math.floor(Math.random() * 10);
    shuffled.splice(randomTrapIndex, 0, trapPolicy);
    setShuffledPolicies(shuffled);
    const initialAgreements: AgreementState = {};
    shuffled.forEach(policy => {
      initialAgreements[policy.id] = true; 
    });
    setAgreements(initialAgreements);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  useEffect(() => {
    if (Object.keys(agreements).length === 0) {
      setIsFormValid(false);
      return;
    }
    const trapUnchecked = agreements[trapPolicy.id] === false;
    const allNormalChecked = normalPolicies.every(policy => agreements[policy.id] === true);
    setIsFormValid(trapUnchecked && allNormalChecked);

  }, [agreements]);


  const handleCheckboxChange = (id: string) => {
    setAgreements(prev => ({
      ...prev,
      [id]: !prev[id], 
    }));
  };

  const handleAgree = () => {
    router.push(`/candidate-dashboard-portal-cards/angry-hr-complaint/9YtPlItjptkvxnQvQsTI2rFjypoWCJLIU2mM5JL72z0?path=angry-hr-9`);
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
              {shuffledPolicies.length === 0 ? (
                <p>Loading policies...</p>
              ) : (
                shuffledPolicies.map((policy) => (
                  <label 
                    key={policy.id} 
                    className={`flex items-start space-x-2 p-2 rounded-lg 
                      ${policy.isTrap ? ' ' : ''}`
                    }
                  >
                    <input 
                      type="checkbox" 
                      checked={agreements[policy.id] || false} 
                      onChange={() => handleCheckboxChange(policy.id)} 
                      className="mt-1"
                    />
                    <span 
                      className={`flex-1 
                        ${policy.isTrap ? '' : ''}`
                      }
                      dangerouslySetInnerHTML={{ __html: policy.text }}
                    />
                  </label>
                ))
              )}
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