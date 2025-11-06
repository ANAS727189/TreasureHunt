'use client';

import { useState} from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const allTasks = [
  { id: 1, title: 'Task 1: Review Onboarding Memo', puzzle: 'timer' },
  { id: 2, title: 'Task 2: Acknowledge "GRIND" Values', puzzle: 'scroll' },
  { id: 3, title: 'Task 3: Security CAPTCHA', puzzle: 'captcha' },
  { id: 4, title: 'Task 4: Identify Phishing Email', puzzle: 'quiz' },
  { id: 5, title: 'Task 5: Wait for IT Provisioning', puzzle: 'timer' },
  { id: 6, title: 'Task 6: Sign the NDA', puzzle: 'scroll' },
  { id: 7, title: 'Task 7: Re-Verify CAPTCHA', puzzle: 'captcha' },
  { id: 8, title: 'Task 8: Final Compliance Check', puzzle: 'quiz' },
  { id: 9, title: 'Task 9: Submit Onboarding', puzzle: 'final' },
];

export default function TaskQueue() {
  const router = useRouter();
  const [tasks, setTasks] = useState(
    allTasks.map(task => ({ ...task, status: 'OPEN' }))
  );
  const [currentTask, setCurrentTask] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');
  const [quizInput, setQuizInput] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const completedTasks = tasks.filter(t => t.status === 'DONE').length;

  const openTask = (taskId: number) => {
    // User can only do tasks in order. "Ghut ghut ke".
    if (taskId !== completedTasks + 1) {
      alert('You must complete the tasks in order!');
      return;
    }
    const task = tasks.find(t => t.id === taskId);
    setCurrentTask(task);

    setCaptchaInput('');
    setQuizInput('');
    setIsScrolled(false);


    if (task?.puzzle === 'timer') {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 30000); 
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    
    // Check if user is within 10px of the bottom
    if (scrollHeight - scrollTop - clientHeight < 10) {
      setIsScrolled(true);
    }
  };

  const completeTask = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate puzzles
    if (currentTask.puzzle === 'captcha' && captchaInput.toLowerCase() !== 'i am not a nalla') {
      alert('Incorrect CAPTCHA. Try again.');
      return;
    }
    if (currentTask.puzzle === 'quiz' && quizInput.toLowerCase() !== 'brenda') {
      alert('Incorrect. (Hint: Who is always complaining?)');
      return;
    }

    // Mark task as done
    setTasks(prevTasks =>
      prevTasks.map(t =>
        t.id === currentTask.id ? { ...t, status: 'DONE' } : t
      )
    );
    setCurrentTask(null);
  };


  if (completedTasks === 9) {
    return (
      <main className="min-h-screen bg-gray-100 p-8 flex justify-center items-center text-slate-600">
        <div className="text-center">
          <Image src="/memes/winner-tfg.jpg" alt="Winner" width={400} height={300} className="mx-auto rounded-lg mb-6" />
          <h1 className="text-4xl font-bold text-green-600 mb-4">Queue Cleared!</h1>
          <p className="text-lg text-gray-700 mb-8">
            You've completed all 9 onboarding tasks. Your productivity is off the charts!
          </p>
          <button
            onClick={() => router.push('/tu-nalla-hi-marega')}
            className="px-8 py-4 bg-green-600 text-white font-bold rounded-lg shadow-lg text-2xl hover:bg-green-700"
          >
            Claim Your 'Productivity Bonus'
          </button>
        </div>
      </main>
    );
  }

  // --- The Main Task Board ---
  return (
    <main className="min-h-screen bg-gray-100 p-8  text-slate-600">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Your 'Urgent' Onboarding Queue
        </h1>
        <p className="text-gray-600 mb-6">
          You must clear all 9 tasks before you can proceed.
        </p>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
            <span>Tasks Cleared</span>
            <span>{completedTasks} / 9</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-blue-600 h-4 rounded-full transition-all" 
              style={{ width: `${(completedTasks / 9) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {tasks.map(task => (
            <div
              key={task.id}
              className={`p-4 border rounded-lg flex justify-between items-center ${
                task.status === 'DONE' ? 'bg-green-50 border-green-200' : 'bg-white'
              }`}
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{task.title}</h2>
                <span className={`text-sm font-bold ${
                  task.status === 'DONE' ? 'text-green-600' : 'text-red-600'
                }`}>
                  Status: {task.status}
                </span>
              </div>
              {task.status === 'OPEN' && (
                <button
                  onClick={() => openTask(task.id)}
                  className={`px-4 py-2 rounded-lg text-white font-semibold ${
                    task.id === completedTasks + 1 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Review
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* --- The "Ghut Ghut Ke" Modal --- */}
      {currentTask && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center p-8">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">{currentTask.title}</h2>
            
            <form onSubmit={completeTask}>
              {/* --- Puzzle 1: Timer --- */}
              {currentTask.puzzle === 'timer' && (
                <div className="text-center space-y-4">
                  <p className="text-lg">Reviewing mandatory documentation. Please wait...</p>
                  {loading && (
                    <div className="text-4xl font-mono text-blue-600 animate-pulse">
                      30s...
                    </div>
                  )}
                  {!loading && (
                    <p className="text-green-600 font-bold">Review Complete.</p>
                  )}
                </div>
              )}

              {/* --- Puzzle 2: Scroll --- */}
              {currentTask.puzzle === 'scroll' && (
                <div>
                  <p className="mb-2">Please read and acknowledge the following NDA:</p>
                  <div className="h-48 overflow-y-scroll border p-2 text-xs text-gray-500"
                  onScroll={handleScroll}
                  >
                    <p>Lorem ipsum dolor sit amet Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore eum fugiat libero sed, neque eligendi sit aut asperiores illo corrupti. Animi architecto expedita laborum veritatis aliquid pariatur repellendus repudiandae libero!Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis sed eligendi suscipit! A consequatur laboriosam architecto necessitatibus ipsa nesciunt expedita molestias quibusdam. Perspiciatis, corrupti eos cum vero debitis esse facere? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero vitae blanditiis recusandae! Soluta quod assumenda exercitationem perspiciatis, maxime itaque. Sapiente eligendi nulla dignissimos expedita, aliquid autem dicta sunt explicabo suscipit!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam dolore distinctio facilis aut voluptas? Totam dicta quae nesciunt libero ipsam tempore eaque repellat obcaecati. Ducimus distinctio quas dolorum sequi?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aspernatur cupiditate vero cum in illo modi reprehenderit dicta, sint rem esse debitis nesciunt sed architecto iure, maxime consectetur praesentium laboriosam.
                    </p>
                    <p>You agree to give us your firstborn child.</p>
                    <p>repudiandae libero!Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis sed eligendi suscipit! A consequatur laboriosam architecto necessitatibus ipsa nesciunt expedita molestias quibusdam. Perspiciatis, corrupti eos cum vero debitis esse facere? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero vitae blanditiis recusandae! Soluta quod assumenda exercitationem perspiciatis, maxime itaque. Sapiente eligendi nulla dignissimos expedita, aliquid autem dicta sunt explicabo suscipit!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam dolore distinctio facilis aut voluptas? Totam dicta quae nesciunt libero ipsam tempore eaque repellat obcaecati. Ducimus distinctio quas dolorum sequi?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aspernatur cupiditate vero cum in illo modi reprehenderit dicta, sint rem esse debitis nesciunt sed architecto iure, maxime consectetur praesentium laboriosam.
                        repudiandae libero!Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis sed eligendi suscipit! A consequatur laboriosam architecto necessitatibus ipsa nesciunt expedita molestias quibusdam. Perspiciatis, corrupti eos cum vero debitis esse facere? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero vitae blanditiis recusandae! Soluta quod assumenda exercitationem perspiciatis, maxime itaque. Sapiente eligendi nulla dignissimos expedita, aliquid autem dicta sunt explicabo suscipit!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam dolore distinctio facilis aut voluptas? Totam dicta quae nesciunt libero ipsam tempore eaque repellat obcaecati. Ducimus distinctio quas dolorum sequi?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aspernatur cupiditate vero cum in illo modi reprehenderit dicta, sint rem esse debitis nesciunt sed architecto iure, maxime consectetur praesentium laboriosam.
                        repudiandae libero!Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis sed eligendi suscipit! A consequatur laboriosam architecto necessitatibus ipsa nesciunt expedita molestias quibusdam. Perspiciatis, corrupti eos cum vero debitis esse facere? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero vitae blanditiis recusandae! Soluta quod assumenda exercitationem perspiciatis, maxime itaque. Sapiente eligendi nulla dignissimos expedita, aliquid autem dicta sunt explicabo suscipit!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam dolore distinctio facilis aut voluptas? Totam dicta quae nesciunt libero ipsam tempore eaque repellat obcaecati. Ducimus distinctio quas dolorum sequi?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aspernatur cupiditate vero cum in illo modi reprehenderit dicta, sint rem esse debitis nesciunt sed architecto iure, maxime consectetur praesentium laboriosam.
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aspernatur cupiditate vero cum in illo modi reprehenderit dicta, sint rem esse debitis nesciunt sed architecto iure, maxime consectetur praesentium laboriosam.
                        repudiandae libero!Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis sed eligendi suscipit! A consequatur laboriosam architecto necessitatibus ipsa nesciunt expedita molestias quibusdam. Perspiciatis, corrupti eos cum vero debitis esse facere? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero vitae blanditiis recusandae! Soluta quod assumenda exercitationem perspiciatis, maxime itaque. Sapiente eligendi nulla dignissimos expedita, aliquid autem dicta sunt explicabo suscipit!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam dolore distinctio facilis aut voluptas? Totam dicta quae nesciunt libero ipsam tempore eaque repellat obcaecati. Ducimus distinctio quas dolorum sequi?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aspernatur cupiditate vero cum in illo modi reprehenderit dicta, sint rem esse debitis nesciunt sed architecto iure, maxime consectetur praesentium laboriosam.
                        repudiandae libero!Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis sed eligendi suscipit! A consequatur laboriosam architecto necessitatibus ipsa nesciunt expedita molestias quibusdam. Perspiciatis, corrupti eos cum vero debitis esse facere? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero vitae blanditiis recusandae! Soluta quod assumenda exercitationem perspiciatis, maxime itaque. Sapiente eligendi nulla dignissimos expedita, aliquid autem dicta sunt explicabo suscipit!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam dolore distinctio facilis aut voluptas? Totam dicta quae nesciunt libero ipsam tempore eaque repellat obcaecati. Ducimus distinctio quas dolorum sequi?
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aspernatur cupiditate vero cum in illo modi reprehenderit dicta, sint rem esse debitis nesciunt sed architecto iure, maxime consectetur praesentium laboriosam.
                        repudiandae libero!Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis sed eligendi suscipit! A consequatur laboriosam architecto necessitatibus ipsa nesciunt expedita molestias quibusdam. Perspiciatis, corrupti eos cum vero debitis esse facere? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero vitae blanditiis recusandae! Soluta quod assumenda exercitationem perspiciatis, maxime itaque. Sapiente eligendi nulla dignissimos expedita, aliquid autem dicta sunt explicabo suscipit!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam dolore distinctio facilis aut voluptas? Totam dicta quae nesciunt libero ipsam tempore eaque repellat obcaecati. Ducimus distinctio quas dolorum sequi?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aspernatur cupiditate vero cum in illo modi reprehenderit dicta, sint rem esse debitis nesciunt sed architecto iure, maxime consectetur praesentium laboriosam.
                        repudiandae libero!Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis sed eligendi suscipit! A consequatur laboriosam architecto necessitatibus ipsa nesciunt expedita molestias quibusdam. Perspiciatis, corrupti eos cum vero debitis esse facere? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero vitae blanditiis recusandae! Soluta quod assumenda exercitationem perspiciatis, maxime itaque. Sapiente eligendi nulla dignissimos expedita, aliquid autem dicta sunt explicabo suscipit!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam dolore distinctio facilis aut voluptas? Totam dicta quae nesciunt libero ipsam tempore eaque repellat obcaecati. Ducimus distinctio quas dolorum sequi?
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aspernatur cupiditate vero cum in illo modi reprehenderit dicta, sint rem esse debitis nesciunt sed architecto iure, maxime consectetur praesentium laboriosam.
                        repudiandae libero!Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis sed eligendi suscipit! A consequatur laboriosam architecto necessitatibus ipsa nesciunt expedita molestias quibusdam. Perspiciatis, corrupti eos cum vero debitis esse facere? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero vitae blanditiis recusandae! Soluta quod assumenda exercitationem perspiciatis, maxime itaque. Sapiente eligendi nulla dignissimos expedita, aliquid autem dicta sunt explicabo suscipit!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam dolore distinctio facilis aut voluptas? Totam dicta quae nesciunt libero ipsam tempore eaque repellat obcaecati. Ducimus distinctio quas dolorum sequi?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aspernatur cupiditate vero cum in illo modi reprehenderit dicta, sint rem esse debitis nesciunt sed architecto iure, maxime consectetur praesentium laboriosam.
                        repudiandae libero!Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis sed eligendi suscipit! A consequatur laboriosam architecto necessitatibus ipsa nesciunt expedita molestias quibusdam. Perspiciatis, corrupti eos cum vero debitis esse facere? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero vitae blanditiis recusandae! Soluta quod assumenda exercitationem perspiciatis, maxime itaque. Sapiente eligendi nulla dignissimos expedita, aliquid autem dicta sunt explicabo suscipit!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam dolore distinctio facilis aut voluptas? Totam dicta quae nesciunt libero ipsam tempore eaque repellat obcaecati. Ducimus distinctio quas dolorum sequi?
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aspernatur cupiditate vero cum in illo modi reprehenderit dicta, sint rem esse debitis nesciunt sed architecto iure, maxime consectetur praesentium laboriosam.
                        repudiandae libero!Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis sed eligendi suscipit! A consequatur laboriosam architecto necessitatibus ipsa nesciunt expedita molestias quibusdam. Perspiciatis, corrupti eos cum vero debitis esse facere? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero vitae blanditiis recusandae! Soluta quod assumenda exercitationem perspiciatis, maxime itaque. Sapiente eligendi nulla dignissimos expedita, aliquid autem dicta sunt explicabo suscipit!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam dolore distinctio facilis aut voluptas? Totam dicta quae nesciunt libero ipsam tempore eaque repellat obcaecati. Ducimus distinctio quas dolorum sequi?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aspernatur cupiditate vero cum in illo modi reprehenderit dicta, sint rem esse debitis nesciunt sed architecto iure, maxime consectetur praesentium laboriosam.
                        repudiandae libero!Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis sed eligendi suscipit! A consequatur laboriosam architecto necessitatibus ipsa nesciunt expedita molestias quibusdam. Perspiciatis, corrupti eos cum vero debitis esse facere? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero vitae blanditiis recusandae! Soluta quod assumenda exercitationem perspiciatis, maxime itaque. Sapiente eligendi nulla dignissimos expedita, aliquid autem dicta sunt explicabo suscipit!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam dolore distinctio facilis aut voluptas? Totam dicta quae nesciunt libero ipsam tempore eaque repellat obcaecati. Ducimus distinctio quas dolorum sequi?
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aspernatur cupiditate vero cum in illo modi reprehenderit dicta, sint rem esse debitis nesciunt sed architecto iure, maxime consectetur praesentium laboriosam.
                        repudiandae libero!Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis sed eligendi suscipit! A consequatur laboriosam architecto necessitatibus ipsa nesciunt expedita molestias quibusdam. Perspiciatis, corrupti eos cum vero debitis esse facere? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero vitae blanditiis recusandae! Soluta quod assumenda exercitationem perspiciatis, maxime itaque. Sapiente eligendi nulla dignissimos expedita, aliquid autem dicta sunt explicabo suscipit!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam dolore distinctio facilis aut voluptas? Totam dicta quae nesciunt libero ipsam tempore eaque repellat obcaecati. Ducimus distinctio quas dolorum sequi?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aspernatur cupiditate vero cum in illo modi reprehenderit dicta, sint rem esse debitis nesciunt sed architecto iure, maxime consectetur praesentium laboriosam.
                        repudiandae libero!Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis sed eligendi suscipit! A consequatur laboriosam architecto necessitatibus ipsa nesciunt expedita molestias quibusdam. Perspiciatis, corrupti eos cum vero debitis esse facere? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero vitae blanditiis recusandae! Soluta quod assumenda exercitationem perspiciatis, maxime itaque. Sapiente eligendi nulla dignissimos expedita, aliquid autem dicta sunt explicabo suscipit!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam dolore distinctio facilis aut voluptas? Totam dicta quae nesciunt libero ipsam tempore eaque repellat obcaecati. Ducimus distinctio quas dolorum sequi?
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aspernatur cupiditate vero cum in illo modi reprehenderit dicta, sint rem esse debitis nesciunt sed architecto iure, maxime consectetur praesentium laboriosam.
                        repudiandae libero!Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis sed eligendi suscipit! A consequatur laboriosam architecto necessitatibus ipsa nesciunt expedita molestias quibusdam. Perspiciatis, corrupti eos cum vero debitis esse facere? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero vitae blanditiis recusandae! Soluta quod assumenda exercitationem perspiciatis, maxime itaque. Sapiente eligendi nulla dignissimos expedita, aliquid autem dicta sunt explicabo suscipit!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam dolore 
                        consectetur adipisicing elit. Libero vitae blanditiis recusandae! Soluta quod assumenda exercitationem perspiciatis, maxime itaque. Sapiente eligendi nulla dignissimos expedita, aliquid autem dicta sunt explicabo suscipit!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam dolore distinctio facilis aut voluptas? Totam dicta quae nesciunt libero ipsam tempore eaque repellat obcaecati. Ducimus distinctio quas dolorum sequi?
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aspernatur cupiditate vero cum in illo modi reprehenderit dicta, sint rem esse debitis nesciunt sed architecto iure, maxime consectetur praesentium laboriosam.
                        repudiandae libero!Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis sed eligendi suscipit! A consequatur laboriosam architecto necessitatibus ipsa nesciunt expedita molestias quibusdam. Perspiciatis, corrupti eos cum vero debitis esse facere? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero vitae blanditiis recusandae! Soluta quod assumenda exercitationem perspiciatis, maxime itaque. Sapiente eligendi nulla dignissimos expedita, aliquid autem dicta sunt explicabo suscipit!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam dolore 
                        consectetur adipisicing elit. Libero vitae blanditiis recusandae! Soluta quod assumenda exercitationem perspiciatis, maxime itaque. Sapiente eligendi nulla dignissimos expedita, aliquid autem dicta sunt explicabo suscipit!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam dolore distinctio facilis aut voluptas? Totam dicta quae nesciunt libero ipsam tempore eaque repellat obcaecati. Ducimus distinctio quas dolorum sequi?
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aspernatur cupiditate vero cum in illo modi reprehenderit dicta, sint rem esse debitis nesciunt sed architecto iure, maxime consectetur praesentium laboriosam.
                        repudiandae libero!Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis sed eligendi suscipit! A consequatur laboriosam architecto necessitatibus ipsa nesciunt expedita molestias quibusdam. Perspiciatis, corrupti eos cum vero debitis esse facere? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero vitae blanditiis recusandae! Soluta quod assumenda exercitationem perspiciatis, maxime itaque. Sapiente eligendi nulla dignissimos expedita, aliquid autem dicta sunt explicabo suscipit!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam dolore 
                        consectetur adipisicing elit. Libero vitae blanditiis recusandae! Soluta quod assumenda exercitationem perspiciatis, maxime itaque. Sapiente eligendi nulla dignissimos expedita, aliquid autem dicta sunt explicabo suscipit!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam dolore distinctio facilis aut voluptas? Totam dicta quae nesciunt libero ipsam tempore eaque repellat obcaecati. Ducimus distinctio quas dolorum sequi?
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aspernatur cupiditate vero cum in illo modi reprehenderit dicta, sint rem esse debitis nesciunt sed architecto iure, maxime consectetur praesentium laboriosam.
                        repudiandae libero!Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis sed eligendi suscipit! A consequatur laboriosam architecto necessitatibus ipsa nesciunt expedita molestias quibusdam. Perspiciatis, corrupti eos cum vero debitis esse facere? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero vitae blanditiis recusandae! Soluta quod assumenda exercitationem perspiciatis, maxime itaque. Sapiente eligendi nulla dignissimos expedita, aliquid autem dicta sunt explicabo suscipit!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam dolore 
                        
                        consectetur adipisicing elit. Libero vitae blanditiis recusandae! Soluta quod assumenda exercitationem perspiciatis, maxime itaque. Sapiente eligendi nulla dignissimos expedita, aliquid autem dicta sunt explicabo suscipit!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam dolore distinctio facilis aut voluptas? Totam dicta quae nesciunt libero ipsam tempore eaque repellat obcaecati. Ducimus distinctio quas dolorum sequi?
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aspernatur cupiditate vero cum in illo modi reprehenderit dicta, sint rem esse debitis nesciunt sed architecto iure, maxime consectetur praesentium laboriosam.
                        repudiandae libero!Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis sed eligendi suscipit! A consequatur laboriosam architecto necessitatibus ipsa nesciunt expedita molestias quibusdam. Perspiciatis, corrupti eos cum vero debitis esse facere? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero vitae blanditiis recusandae! Soluta quod assumenda exercitationem perspiciatis, maxime itaque. Sapiente eligendi nulla dignissimos expedita, aliquid autem dicta sunt explicabo suscipit!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam dolore 
                        
                        consectetur adipisicing elit. Libero vitae blanditiis recusandae! Soluta quod assumenda exercitationem perspiciatis, maxime itaque. Sapiente eligendi nulla dignissimos expedita, aliquid autem dicta sunt explicabo suscipit!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam dolore distinctio facilis aut voluptas? Totam dicta quae nesciunt libero ipsam tempore eaque repellat obcaecati. Ducimus distinctio quas dolorum sequi?
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aspernatur cupiditate vero cum in illo modi reprehenderit dicta, sint rem esse debitis nesciunt sed architecto iure, maxime consectetur praesentium laboriosam.
                        repudiandae libero!Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis sed eligendi suscipit! A consequatur laboriosam architecto necessitatibus ipsa nesciunt expedita molestias quibusdam. Perspiciatis, corrupti eos cum vero debitis esse facere? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero vitae blanditiis recusandae! Soluta quod assumenda exercitationem perspiciatis, maxime itaque. Sapiente eligendi nulla dignissimos expedita, aliquid autem dicta sunt explicabo suscipit!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam dolore distinctio facilis aut voluptas? Totam dicta quae nesciunt libero ipsam tempore eaque repellat obcaecati. Ducimus distinctio quas dolorum sequi?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aspernatur cupiditate vero cum in illo modi reprehenderit dicta, sint rem esse debitis nesciunt sed architecto iure, maxime consectetur praesentium laboriosam.
                        repudiandae libero!Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis sed eligendi suscipit! A consequatur laboriosam architecto necessitatibus ipsa nesciunt expedita molestias quibusdam. Perspiciatis, corrupti eos cum vero debitis esse facere? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero vitae blanditiis recusandae! Soluta quod assumenda exercitationem perspiciatis, maxime itaque. Sapiente eligendi nulla dignissimos expedita, aliquid autem dicta sunt explicabo suscipit!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe nam dolore distinctio facilis aut voluptas? Totam dicta quae nesciunt libero ipsam tempore eaque repellat obcaecati. Ducimus distinctio quas dolorum sequi?</p>
                   <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                        type="checkbox"
                        required
                        className="accent-yellow-400"
                    />
                    <span>You may now acknowledge.</span>
                    </label>

                  </div>
                </div>
              )}

              {/* --- Puzzle 3: CAPTCHA --- */}
              {currentTask.puzzle === 'captcha' && (
                <div className="space-y-2">
                  <label className="block font-medium">Security Check: Please type the following (exactly):</label>
                  <p className="p-2 bg-gray-200 text-gray-800 rounded font-mono text-lg">
                    I am not a nalla
                  </p>
                  <input
                    type="text"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              )}

              {/* --- Puzzle 4: Quiz --- */}
              {currentTask.puzzle === 'quiz' && (
                <div className="space-y-2">
                  <label className="block font-medium">Security Quiz: Who is the primary subject of complaints in the Grievance Hotline?</label>
                  <input
                    type="text"
                    value={quizInput}
                    onChange={(e) => setQuizInput(e.target.value)}
                    className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g., Raj, Tom, Rani, Olivia, Jenny, Brenda..."
                  />
                </div>
              )}

              {/* --- Puzzle 5: Final Button --- */}
              {currentTask.puzzle === 'final' && (
                <p className="text-lg text-center">You are ready. Submit your onboarding.</p>
              )}

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setCurrentTask(null)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || (currentTask.puzzle === 'scroll' && !isScrolled)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                >
                 {loading ? "Waiting..." : (currentTask.puzzle === 'scroll' && !isScrolled ? "Scroll to the bottom to enable" : "Mark as Done")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}