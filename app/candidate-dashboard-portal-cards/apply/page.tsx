'use client';

import { useState, useEffect } from 'react';

export default function ApplyPage() {
    const [loading, setLoading] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        why_you: ''
    });
    useEffect(() => {
        const hintTimer = setTimeout(() => {
            setShowHint(true); 
        }, 30000); 
        return () => clearTimeout(hintTimer);
    }, []); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
        const response = await fetch('/api/apply', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Application failed:', error); 
            setFormData({ name: '', email: '', why_you: '' });
            setLoading(false);
        } else {
            const data = await response.json();
            if (data.redirect) {
            window.location.href = data.redirect;
            }
        }
        } catch (err) {
        console.error('Error submitting application:', err);
        setFormData({ name: '', email: '', why_you: '' });
        setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-8 md:p-12 bg-gray-100">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">
            Apply for Code Ninja Position
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
                </label>
                <input
                type="text"
                id="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
                </label>
                <input
                type="email"
                id="email"
                required
                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
            </div>

            <div>
                <label htmlFor="why_you" className="block text-sm font-medium text-gray-700 mb-1">
                Why do you want this job?
                </label>
                <textarea
                id="why_you"
                required
                rows={4}
                className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={formData.why_you}
                onChange={(e) => setFormData(prev => ({ ...prev, why_you: e.target.value }))}
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
                {loading ? (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em]" />
                ) : (
                'Submit Application'
                )}
            </button>
            {showHint && (
                <p className="mt-4 text-center text-sm text-gray-600">
                    <span className="font-bold"> STUCK?</span>A real developer knows where to look.
                    <br />
                    What you see is a <strong>lie</strong>... what you don't see tells the truth.
                </p>
            )}
            
            </form>
        </div>
        </main>
    );
}