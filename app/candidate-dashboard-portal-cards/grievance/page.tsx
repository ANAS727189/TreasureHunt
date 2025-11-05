"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation';

const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center" style={{ fontFamily: 'Arial, sans-serif' }}>
            <div className="flex items-center">
                <img src="/file.svg" alt="Logo" className="h-8 w-8 mr-2" />
                <h1 className="text-xl font-bold">Employee Grievance Portal</h1>
            </div>
            <nav>
                <a href="https://www.youtube.com/shorts/T0l6W52GQis" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Secret Link</a>
                <a href="https://www.youtube.com/shorts/oCwUxkA_jXQ" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Do Not Visit</a>
                <a href="https://www.youtube.com/watch?v=sWYgVQlnQgU" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Surprise</a>
            </nav>
        </header>
    );
};

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-4 text-center text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
            <p>© 2025 Inhuman Resources, Inc. All Rights Reserved.</p>
            <div className="mt-2">
                <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" className="text-gray-400 hover:text-white mx-2">Final Challange</a>
                <a href="https://www.youtube.com/watch?v=Bu8bH2P37kY" className="text-gray-400 hover:text-white mx-2">Help Me</a>
                <a href="https://www.youtube.com/watch?v=wNfQIVXAWlM" className="text-gray-400 hover:text-white mx-2">Are You Sure</a>
            </div>
        </footer>
    );
};

const NeverEndingTerms = ({ onScrollToEnd }: { onScrollToEnd: () => void }) => {
    const [content, setContent] = useState("By submitting this form, you agree to the following terms: All grievances, complaints, and whinings, whether real or imagined, become the sole property of the Corporation. We reserve the right to use your submission for internal amusement, training materials on 'what not to do,' or as a script for our annual comedy night. You waive any and all rights to privacy, dignity, and a timely response. You acknowledge that the 'Submit' button is a placebo and that this form is a digital black hole designed to test your compliance and ability to perform futile tasks, a key performance indicator for your continued employment. You agree to be automatically enrolled in our 'Advanced Synergy and Paradigm Re-alignment' weekend workshop (mandatory, unpaid). You also agree to provide your firstborn child as collateral for any perceived lack of enthusiasm. Failure to comply will result in your desk being moved to the basement, next to the perpetually leaking pipe we've affectionately named 'Milton.'");
    const termsDivRef = useRef<HTMLDivElement>(null);

    const moreContent = "And furthermore, you agree that the definition of 'timely' shall be at the sole discretion of the Corporation, and may be subject to change based on planetary alignment, the current price of coffee beans, or the general mood of the CEO's cat. Any attempt to dispute this will be met with aggressive team-building exercises. We are not responsible for any existential dread, loss of will to live, or spontaneous combustion that may occur as a result of using this portal. All your base are belong to us. This agreement is binding in all known and unknown universes, dimensions, and timelines. By continuing to scroll, you agree to agree to any future agreements we may or may not create. Your continued existence is contingent on your compliance.";

    useEffect(() => {
        const div = termsDivRef.current;
        if (!div) return;

        const handleScroll = () => {
            if (div.scrollTop + div.clientHeight >= div.scrollHeight - 20) {
                setContent(prevContent => prevContent + " " + moreContent);
                // We could call onScrollToEnd() here if we were nice. We are not.
            }
        };

        div.addEventListener('scroll', handleScroll);

        return () => {
            div.removeEventListener('scroll', handleScroll);
        };
    }, [moreContent, onScrollToEnd]);

    return (
        <> 
            <style>
                {`
                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .no-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}
            </style>
            <div ref={termsDivRef} className="text-xs text-gray-400 bg-gray-900 p-2 rounded h-24 overflow-y-scroll no-scrollbar">
                {content}
            </div>
        </>
    );
};

const GrievanceForm = ({ onComplete }: { onComplete: () => void }) => {
    const [formState, setFormState] = useState({ priority: 'low', department: 'other' });
    const [error, setError] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [isChecked, setIsChecked] = useState(false);
    const [isTermsRead, setIsTermsRead] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isChecked) {
            setError("You must agree to the terms and conditions before we can ignore your grievance.");
            return;
        }

        setAttempts(attempts + 1);

        if (attempts > 1) { // Redirect after 2 attempts
            onComplete();
            return;
        }

        const errors = [
            'Synergy Misalignment: Your request lacks inter-departmental synergy.',
            'Invalid Ticket ID Format (Error 404.2b): Ticket ID must be a 17-digit alphanumeric string, checksum verified.',
            'Corporate Buzzword Compliance Failure: Please use at least 5 approved corporate buzzwords.',
            "Mood Sensor Reading: Your grievance has been flagged as 'overly emotional'. Please resubmit with a more neutral tone.",
            'Your grievance has been auto-rejected because it is Tuesday.',
            'Error 500: Server is currently on a coffee break. Please try again later.',
            'Your grievance has been lost in the blockchain. Please resubmit in the next fiscal year.',
            'User emotional index exceeds threshold. Please take a moment to meditate on your life choices.',
            'Grievance contains un-synergized characters. Please re-align your paradigm.',
            'Your Employee ID has been flagged as "peon". Grievances from this tier are automatically discarded.',
        ];
        setError(errors[Math.floor(Math.random() * errors.length)]);
    };

    return (
        <div className="text-left">
            <h3 className="text-2xl font-bold text-yellow-300 mb-4 animate-pulse">Submit a Grievance</h3>
            <p className="text-green-200 mb-4">We value your feedback. Please fill out the form below to submit your grievance. A representant will get back to you within 5-7 business years.</p>
            {error && <p className="text-red-400 mb-4 animate-bounce">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" onChange={handleChange} className="w-full p-2 rounded bg-green-900 border-2 border-yellow-300 text-white" placeholder="Your Name (as it appears on your birth certificate)" />
                <input type="text" name="employeeId" onChange={handleChange} className="w-full p-2 rounded bg-green-900 border-2 border-yellow-300 text-white" placeholder="Employee ID (17-digit alphanumeric)" />
                <select name="department" onChange={handleChange} className="w-full p-2 rounded bg-green-900 border-2 border-yellow-300 text-white">
                    <option>Select Department...</option>
                    <option value="synergy">Synergy</option>
                    <option value="buzzwords">Buzzwords</option>
                    <option value="other">Other</option>
                </select>
                <select name="priority" onChange={handleChange} className="w-full p-2 rounded bg-green-900 border-2 border-yellow-300 text-white">
                    <option value="low">Low Priority (Default)</option>
                    <option value="medium">Medium Priority (Requires manager approval)</option>
                    <option value="high">High Priority (Requires VP approval and a blood sample)</option>
                </select>
                <textarea name="grievance" onChange={handleChange} className="w-full p-2 rounded bg-green-900 border-2 border-yellow-300 text-white" placeholder="Describe your grievance in 5000 words or less..."></textarea>
                
                <NeverEndingTerms onScrollToEnd={() => setIsTermsRead(true)} />

                <div className="flex items-center mt-4">
                    <input type="checkbox" id="terms" checked={isChecked} onChange={() => setIsChecked(!isChecked)} className="mr-2" disabled={!isTermsRead} title="You must scroll through all terms and conditions to enable this checkbox. Good luck." />
                    <label htmlFor="terms" className="text-sm" title="You must scroll through all terms and conditions to enable this checkbox. Good luck.">I have read, understood, and agree to forfeit my soul by checking this box.</label>
                </div>

                <button type="submit" className="w-full p-3 bg-yellow-500 text-blue-800 font-bold rounded-lg animate-pulse">Submit Grievance</button>
            </form>
        </div>
    );
};


export default function GrievancePage() {
    const router = useRouter();

    const redirectToDeadEnd = () => {
        router.push('/tu-nalla-hi-marega');
    };


    return (
        <div className="flex flex-col min-h-screen bg-blue-800" style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}>
            <Header />
            <main className="flex-grow text-white p-4 sm:p-8 md:p-12">
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                    <h1 className="text-5xl font-extrabold text-yellow-300 sm:text-6xl md:text-7xl animate-bounce">The Illusion of Choice Portal</h1>
                    <p className="mt-6 text-lg leading-8 text-green-200">Your insignificant complaints are very important to us. Please scream into the void below.</p>
                    <div className="bg-green-700/50 p-8 rounded-2xl shadow-2xl w-full min-h-[350px] backdrop-blur-lg border-4 border-dashed border-yellow-300">
                        <GrievanceForm onComplete={redirectToDeadEnd} />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}