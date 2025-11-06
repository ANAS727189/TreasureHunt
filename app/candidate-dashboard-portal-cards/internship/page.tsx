"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center" style={{ fontFamily: 'Arial, sans-serif' }}>
            <div className="flex items-center">
                <img src="/file.svg" alt="Logo" className="h-8 w-8 mr-2" />
                <h1 className="text-xl font-bold">Unpaid Internship Portal</h1>
            </div>
            <nav>
                <a href="https://www.youtube.com/shorts/ew7r0z-gZjo" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Secret Link</a>
                <a href="https://www.youtube.com/shorts/FWB2I6joOa0" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Do Not Visit</a>
                <a href="https://www.youtube.com/shorts/Fky7nSpNOr8" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Surprise</a>
            </nav>
        </header>
    );
};

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-4 text-center text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
            <p>© 2025 Inhuman Resources, Inc. All Rights Reserved.</p>
            <div className="mt-2">
                <a href="https://www.youtube.com/shorts/GQNW1IlvhcY" className="text-gray-400 hover:text-white mx-2">Final Challange</a>
                <a href="https://www.youtube.com/watch?v=rOeeBzMd_6I" className="text-gray-400 hover:text-white mx-2">Help Me</a>
                <a href="https://www.youtube.com/shorts/1wxrZEFFslY" className="text-gray-400 hover:text-white mx-2">Are You Sure</a>
            </div>
        </footer>
    );
};

const DrawCircleChallenge = ({ onComplete }: { onComplete: () => void }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
    const [currentAccuracy, setCurrentAccuracy] = useState(0); 
    const [bestAccuracy, setBestAccuracy] = useState(0); 
    const [message, setMessage] = useState("Think you're well-rounded? Prove it. Draw a perfect circle.");
    const [attempts, setAttempts] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    const requiredAccuracy = 94; 
    const idealRadius = 100;
    const canvasSize = 300;
    const centerX = canvasSize / 2;
    const centerY = canvasSize / 2;

    const getCanvasContext = () => {
        const canvas = canvasRef.current;
        return canvas ? canvas.getContext("2d") : null;
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (isCompleted) return;
        const ctx = getCanvasContext();
        if (!ctx) return;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        setPoints([]);
        setIsDrawing(true);
        const rect = ctx.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setPoints([{ x, y }]);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDrawing || isCompleted) return;
        const ctx = getCanvasContext();
        if (!ctx) return;
        const rect = ctx.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const newPoints = [...points, { x, y }];
        setPoints(newPoints);

        if (newPoints.length < 2) return;

        const p1 = newPoints[newPoints.length - 2];
        const p2 = newPoints[newPoints.length - 1];

        const dist = Math.sqrt(Math.pow(p2.x - centerX, 2) + Math.pow(p2.y - centerY, 2));
        const diff = Math.abs(dist - idealRadius);
        const deviation = Math.min(diff / (idealRadius * 0.5), 1); 

        const getColorForDeviation = (d: number) => {
            const r = Math.floor(255 * d);
            const g = Math.floor(255 * (1 - d));
            return `rgb(${r}, ${g}, 0)`;
        };

        ctx.strokeStyle = getColorForDeviation(deviation);
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    };

    const handleMouseUp = () => {
        if (!isDrawing) return;
        setIsDrawing(false);
        if (points.length < 10) return;
        setAttempts(prev => prev + 1);
        calculateAccuracy();
    };

    const calculateAccuracy = () => {
        const distances = points.map(p => Math.sqrt(Math.pow(p.x - centerX, 2) + Math.pow(p.y - centerY, 2)));
        const avgRadius = distances.reduce((sum, d) => sum + d, 0) / distances.length;
        const stdDev = Math.sqrt(distances.map(d => Math.pow(d - avgRadius, 2)).reduce((sum, v) => sum + v, 0) / distances.length);
        
        const accuracy = Math.max(0, 100 - (stdDev / avgRadius) * 100);

        if (accuracy > bestAccuracy) {
            setBestAccuracy(accuracy);
        }

        if (accuracy > requiredAccuracy && !isCompleted) {
            setIsCompleted(true);
            setMessage(`Accuracy: ${accuracy.toFixed(2)}%. You did it! We're all so very impressed.`);
            setTimeout(onComplete, 2000);
        } else {
            let messagePool = [];
            if (accuracy > 85) {
                messagePool = ["So close, yet so far. The story of your life?", "Almost a circle. Almost hired.", "Is that the best you can do?"];
            } else if (accuracy > 50) {
                messagePool = ["That's a... creative interpretation of 'circle'.", "Is that a lumpy potato? We can't tell.", "We asked for a circle, not a modern art piece."];
            } else {
                messagePool = ["That's not a circle, that's a cry for help.", "Are you drawing with your feet?", "My 3-year-old cousin can draw better than that."];
            }

            if (attempts > 5) {
                messagePool.push("Still here? We admire your persistence, if not your skill.");
            }

            const randomMessage = messagePool[Math.floor(Math.random() * messagePool.length)];
            setMessage(`Accuracy: ${accuracy.toFixed(2)}%. ${randomMessage}`);
        }
    };

    return (
        <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-200 mb-4">Round 1: The 'Well-Rounded' Candidate Test</h3>
            <p className="text-gray-400 mb-4">Required: Over {requiredAccuracy}% accuracy. No pressure.</p>
            <p className="text-gray-400 mb-4">Your Best Attempt: {bestAccuracy.toFixed(2)}% | Attempts: {attempts}</p>
            <p className="text-lg font-semibold text-blue-400 mb-4 h-12">{message}</p>
            <canvas
                ref={canvasRef}
                width={canvasSize}
                height={canvasSize}
                className={`bg-transparent border-2 border-gray-600 rounded-lg mx-auto ${isCompleted ? 'cursor-not-allowed' : 'cursor-crosshair'}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            ></canvas>
        </div>
    );
};

const LadderChallenge = ({ onComplete }: { onComplete: () => void }) => {
    const [position, setPosition] = useState({ top: "50%", left: "50%" });
    const [score, setScore] = useState(0);
    const [misses, setMisses] = useState(0);
    const [taunt, setTaunt] = useState("The promotion button is... elusive. Good luck.");
    const [isWindowOpen, setIsWindowOpen] = useState(false);
    const [hasScoredThisWindow, setHasScoredThisWindow] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const windowIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const windowTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const completionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const completeChallenge = React.useCallback(() => {
        if (completionTimeoutRef.current) {
            return;
        }
        setIsCompleted(true);
        setTaunt("You've navigated the corporate labyrinth! Promotion secured.");
        completionTimeoutRef.current = setTimeout(() => {
            onComplete();
        }, 2000);
    }, [onComplete]);

    const registerScore = React.useCallback(() => {
        setScore(prev => {
            if (completionTimeoutRef.current) {
                return prev;
            }
            const nextScore = prev + 1;
            if (nextScore >= 10) {
                completeChallenge();
            }
            return nextScore;
        });
    }, [completeChallenge]);

    const moveButton = () => {
        setPosition({
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
        });
    };

    useEffect(() => {
        if (isCompleted) return;
        windowIntervalRef.current = setInterval(() => {
            setIsWindowOpen(true);
            setHasScoredThisWindow(false);
            setTaunt("The button is frozen! This is your chance!");

            windowTimeoutRef.current = setTimeout(() => {
                setIsWindowOpen(false);
                setTaunt("Window closed. Back to the chase.");
                moveButton(); 
            }, 5000);

        }, 60000);

        return () => {
            if (windowIntervalRef.current) clearInterval(windowIntervalRef.current);
            if (windowTimeoutRef.current) clearTimeout(windowTimeoutRef.current);
        };
    }, [isCompleted]);

    useEffect(() => {
        return () => {
            if (completionTimeoutRef.current) {
                clearTimeout(completionTimeoutRef.current);
            }
        };
    }, []);

    const handleMouseEnter = () => {
        if (isWindowOpen || isCompleted) return;
        moveButton();
        const tauntsPool = [
            "Too slow!", "Try harder!", "Is that all?", "My grandma moves faster.",
            "Oops, wrong department.", "Did you forget to network?", "The CEO doesn't like your shoes.",
            "Another meeting that could've been an email.", "Synergy! ...or something.",
            "Quick, the boss is coming!", "Are you even trying?", "Maybe this isn't for you.",
            "You get paid by the hour, right? Oh, wait..."
        ];
        setTaunt(tauntsPool[Math.floor(Math.random() * tauntsPool.length)]);
    };

    const handleClick = (e: React.MouseEvent) => {
        if (isCompleted) return;
        e.stopPropagation();

        if (isWindowOpen) { 
            if (hasScoredThisWindow) { 
                setTaunt("Don't be greedy! Only one promotion per window.");
                return;
            }
            registerScore();
            setHasScoredThisWindow(true);
            setTaunt("Nice one! A guaranteed promotion.");
            if (windowTimeoutRef.current) {
                clearTimeout(windowTimeoutRef.current);
                windowTimeoutRef.current = null;
            }
            setIsWindowOpen(false);
            moveButton();
        } else { 
            registerScore();
            moveButton();
            setTaunt("Got it! But the real challenge is catching it when it's frozen.");
        }
    };

    const handleMiss = () => {
        if (!isWindowOpen || isCompleted) { 
            setMisses(m => m + 1);
            if (misses > 10) {
                setTaunt("You're clicking everywhere but the button. A classic corporate strategy.");
            } else if (misses > 5) {
                setTaunt(`You've missed ${misses + 1} times. Are you even aiming?`);
            }
        }
    };

    return (
        <div className="text-center h-80 relative" onClick={handleMiss}>
            <h3 className="text-2xl font-bold text-gray-200 mb-4">Round 2: The Elusive Promotion</h3>
            <p className="text-gray-400 mb-4 h-6">{taunt}</p>
            <p className="text-gray-400 mb-4">Promotions Secured: {score} / 10 | Missed Clicks: {misses}</p>
            <button 
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                disabled={isCompleted}
                className={`absolute font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${isWindowOpen ? 'bg-green-500 animate-pulse' : 'bg-blue-600'} ${isCompleted ? 'cursor-not-allowed' : ''}`}
                style={{ top: position.top, left: position.left, transform: `translate(-50%, -50%)` }}
            >
                Climb
            </button>
        </div>
    );
};


const isPrime = (num: number): boolean => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i = i + 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
};

const allRules = [
    { text: "Rule 1: Your password must be at least 12 characters. Because size does matter.", check: (p: string) => p.length >= 12 },
    { text: "Rule 2: Must contain an uppercase letter. To show you're serious.", check: (p: string) => /[A-Z]/.test(p) },
    { text: "Rule 3: Must contain a number. Let's not make it too easy.", check: (p: string) => /[0-9]/.test(p) },
    { text: "Rule 4: A special character, for a little spice.", check: (p: string) => /[!@#$%^&*]/.test(p) },
    { text: "Rule 5: The digits must add up to 25. We know you can count.", check: (p: string) => (p.match(/\d/g) || []).reduce((sum, digit) => sum + parseInt(digit), 0) === 25 },
    { text: "Rule 6: A month of the year. Yes.. beleive me that's it.", check: (p: string) => /january|february|march|april|may|june|july|august|september|october|november|december/i.test(p) },
    { text: "Rule 7: Got you!! A Roman numeral.", check: (p:string) => /[IVXLCDM]/.test(p)},
    { text: "Rule 8: A lowercase letter. Don't shout at us.", check: (p: string) => /[a-z]/.test(p) },
    { text: "Rule 9: No consecutive identical characters. Originality, please.", check: (p: string) => !/(.)\1/.test(p) },
    { text: "Rule 10: A prime number. We value prime candidates.", check: (p: string) => {
        const numbers = p.match(/\d+/g) || [];
        return numbers.some(n => isPrime(parseInt(n, 10)));
    } },
    { text: "Rule 11: A fruit. Because... health.", check: (p: string) => /apple|banana|orange|grape|mango|pineapple|kiwi/i.test(p) },
    { text: "Rule 12: The current year. Are you even paying attention?", check: (p: string) => p.includes("2025") },
    { text: "Rule 13: Must be a Fibonacci number length. Naturally.", check: (p: string) => [13, 21, 34, 55].includes(p.length) },
    { text: "Rule 14: A programming language. Show us your nerd cred.", check: (p: string) => /python|javascript|typescript|java|c#|c\+\+|go|rust|swift/i.test(p) },
    { text: "Rule 15: And finally, the name of this Pokémon:", check: (p: string) => /snorlax/i.test(p) },
];

const PasswordChallenge = ({ onComplete }: { onComplete: () => void }) => {
    const [password, setPassword] = useState("");
    const [visibleRulesCount, setVisibleRulesCount] = useState(1);
    const [isCompleted, setIsCompleted] = useState(false);

    const [rules, setRules] = useState(allRules.map(rule => ({ ...rule, satisfied: false })));
    const [showPokemon, setShowPokemon] = useState(false);

    const allRulesSatisfied = rules.every(rule => rule.satisfied);

    useEffect(() => {
        const updatedRules = allRules.map(rule => ({ ...rule, satisfied: rule.check(password) }));
        setRules(updatedRules);

        if (visibleRulesCount < allRules.length && updatedRules[visibleRulesCount - 1].satisfied) {
            setVisibleRulesCount(prev => prev + 1);
        }

        if (visibleRulesCount === allRules.length) {
            setShowPokemon(true);
        }
    }, [password, visibleRulesCount]);

    const handleSubmit = () => {
        if (allRulesSatisfied && !isCompleted) {
            setIsCompleted(true);
            onComplete();
        }
    };

    return (
        <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-200 mb-4">Round 3: The Gauntlet of Security</h3>
            <p className="text-gray-400 mb-4">Your old password was 'password123'. Let's do better.</p>
            
            {showPokemon && (
                <img src="/memes/snorlax.png" alt="A wild Snorlax blocks the path!" className="mx-auto mb-4 h-24 rounded-lg animate-bounce" />
            )}

            <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isCompleted}
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white text-center font-mono"
                placeholder="Your pathetic attempt at a password goes here"
            />

            <div className="text-left mt-4 space-y-1 max-w-md mx-auto">
                {rules.slice(0, visibleRulesCount).map((rule, index) => (
                    <p key={index} className={`text-sm transition-all duration-300 ${rule.satisfied ? 'text-green-400' : 'text-red-400'}`}>
                        <span className="font-mono mr-2">{rule.satisfied ? '✓' : '✗'}</span>{rule.text}
                    </p>
                ))}
            </div>

            {allRulesSatisfied && (
                 <div className="mt-6">
                    <p className="text-green-400 font-bold text-lg mb-4">Incredible. You actually did it. We're... impressed?</p>
                    <button onClick={handleSubmit} disabled={isCompleted} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-110">
                        Fine, Set Password
                    </button>
                </div>
            )}
        </div>
    );
};

const PixelPerfectChallenge = ({ onComplete }: { onComplete: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [message, setMessage] = useState(
    "Our marketing team made a 'tiny' mistake. Find it. We're watching."
  );
  const [wrongClicks, setWrongClicks] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const pixelPosition = useRef<{x: number, y: number} | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const logoWidth = 300;
    const logoHeight = 300;
    canvas.width = logoWidth;
    canvas.height = logoHeight;

    if (pixelPosition.current === null) {
        pixelPosition.current = {
            x: Math.floor(Math.random() * (logoWidth - 8)) + 4,
            y: Math.floor(Math.random() * (logoHeight - 8)) + 4,
        };
    }
    const { x: pixelX, y: pixelY } = pixelPosition.current;

    const originalColor = "#4A90E2";
    const diffColor = "#4A90E8";

    ctx.fillStyle = originalColor;
    ctx.fillRect(0, 0, logoWidth, logoHeight);
    ctx.fillStyle = diffColor;
    ctx.fillRect(pixelX, pixelY, 2, 2);
    console.log(pixelX, pixelY);
    const handleClick = (event: MouseEvent) => {
      if (isCompleted) return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (x >= pixelX-1 && x <= pixelX + 1 && y >= pixelY-1 && y <= pixelY + 1) {
        setIsCompleted(true);
        setMessage(`You found it after only ${wrongClicks + 1} attempts! We're... moderately impressed.`);
        timeoutRef.current = setTimeout(onComplete, 1500);
      } else {
        setWrongClicks(c => c + 1);
        const taunts = [
            "Nope. Are you even looking?",
            "My grandma found it faster. And she needs glasses.",
            "Have you tried squinting?",
            "Maybe zoom in? Oh wait, you can't.",
            "Is that your final answer? It's wrong.",
            "Getting warmer? Nope, colder. Ice cold.",
            "This is a test of attention to detail. You're failing.",
            "It's right there! How can you not see it?"
        ];

        let newMessage = taunts[Math.floor(Math.random() * taunts.length)];

        if (wrongClicks + 1 > 10) {
            newMessage = "Just click everywhere, maybe you'll get lucky. Or not.";
        } else if (wrongClicks + 1 > 5) {
            newMessage = `You've made ${wrongClicks + 1} wrong clicks. We're starting a betting pool in the office.`;
        }
        setMessage(newMessage);
      }
    };

    canvas.addEventListener("click", handleClick);
    return () => {
        canvas.removeEventListener("click", handleClick);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };
  }, [onComplete, wrongClicks, isCompleted]);

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-gray-200 mb-4">Final Round: The Pixel-Perfect Panic</h3>
      <p className="text-lg font-semibold text-blue-400 mb-4 h-10">{message}</p>
      <p className="text-gray-500 text-sm">Wrong Clicks: {wrongClicks}</p>
      <div className="flex justify-center gap-8 items-center mt-4">
        <div>
            <div style={{ width: 300, height: 300, backgroundColor: '#4A90E2' }} className="rounded-lg border-2 border-gray-600"></div>
            <p className="text-sm mt-2 text-gray-500">Official Logo</p>
        </div>
        <div>
            <canvas ref={canvasRef} className="cursor-pointer bg-transparent border-2 border-gray-600 rounded-lg"></canvas>
            <p className="text-sm mt-2 text-gray-500">Marketing Asset</p>
        </div>
      </div>
    </div>
  );
};

export default function InternshipPage() {
  const [stage, setStage] = useState(0);
  const router = useRouter();

  const advanceStage = React.useCallback(() => {
    setStage((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (stage === 4) {
      const timeoutId = setTimeout(() => {
        router.push("/candidate-dashboard-portal-cards/internship/mtNa+d12y+vE5Ia5c0NrYx7ZN69/IpBzhutf7UlUgVc");
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [stage, router]);

  const challenges = [
    <DrawCircleChallenge onComplete={() => stage === 0 && advanceStage()} />,
    <LadderChallenge onComplete={() => stage === 1 && advanceStage()} />,
    <PasswordChallenge onComplete={() => stage === 2 && advanceStage()} />,
    <PixelPerfectChallenge onComplete={() => stage === 3 && advanceStage()} />,
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 font-sans">
        <Header />
        <main className="flex-grow text-white p-4 sm:p-8 md:p-12">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-200 sm:text-5xl md:text-6xl">Unpaid Internship Application</h1>
                <p className="mt-6 text-lg leading-8 text-gray-400">Prove your worth. Complete the tasks.</p>
                <div className="bg-white/10 p-8 rounded-2xl shadow-2xl w-full min-h-[350px] backdrop-blur-lg">
                    {stage < challenges.length ? challenges[stage] : <p className="text-2xl font-bold">Congratulations. We'll be in touch. Maybe.</p>}
                </div>
            </div>
        </main>
        <Footer />
    </div>
  );
}
