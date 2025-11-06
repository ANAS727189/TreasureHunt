import { Database } from '@/lib/database';
import Link from 'next/link';

async function getLeaderboard() {
  try {
    const leaders = await Database.getLeaderboard(50); // Top 50 users
    return leaders;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
}

export default async function LeaderboardPage() {
  const leaders = await getLeaderboard();

  return (
    <main className="min-h-screen bg-gray-900 text-white font-mono p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-yellow-400">
            🏆 Hall of Fame
          </h1>
          <p className="text-gray-300 text-xl">
            Top hackers who conquered the treasure hunt
          </p>
        </div>

        {/* Leaderboard */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-yellow-600 to-orange-600 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 font-bold text-sm uppercase tracking-wider">
              <div className="col-span-1 text-center">Rank</div>
              <div className="col-span-4">Name</div>
              <div className="col-span-2 text-center">Paths</div>
              <div className="col-span-3 text-center">Total Points</div>
              <div className="col-span-2 text-center">Last Activity</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-700">
            {leaders.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-400">
                <p className="text-xl">No one has completed any paths yet!</p>
                <p className="mt-2">Be the first to claim your spot! 🚀</p>
              </div>
            ) : (
              leaders.map((winner, index) => {
                const rank = index + 1;
                const getRankEmoji = () => {
                  if (rank === 1) return '🥇';
                  if (rank === 2) return '🥈';
                  if (rank === 3) return '🥉';
                  return `#${rank}`;
                };

                const getRankColor = () => {
                  if (rank === 1) return 'text-yellow-400 font-bold text-2xl';
                  if (rank === 2) return 'text-gray-300 font-bold text-xl';
                  if (rank === 3) return 'text-orange-400 font-bold text-xl';
                  return 'text-gray-500';
                };

                return (
                  <div
                    key={winner._id?.toString() || index}
                    className={`grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-700/30 transition-colors ${
                      rank <= 3 ? 'bg-gray-700/20' : ''
                    }`}
                  >
                    {/* Rank */}
                    <div className={`col-span-1 text-center ${getRankColor()} flex items-center justify-center`}>
                      {getRankEmoji()}
                    </div>

                    {/* Name */}
                    <div className="col-span-4 flex items-center">
                      <span className={`font-semibold ${rank <= 3 ? 'text-lg' : ''}`}>
                        {winner.name}
                      </span>
                    </div>

                    {/* Paths Completed */}
                    <div className="col-span-2 text-center flex items-center justify-center">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400 font-mono text-lg">
                          {winner.completedPaths?.length || 0}
                        </span>
                        <span className="text-gray-400 text-sm">/ 8</span>
                      </div>
                    </div>

                    {/* Total Points */}
                    <div className="col-span-3 text-center flex items-center justify-center">
                      <div className="bg-green-600 px-4 py-2 rounded-full">
                        <span className="font-bold text-lg">
                          {winner.totalPoints || 0}
                        </span>
                        <span className="text-sm ml-1">pts</span>
                      </div>
                    </div>

                    {/* Last Activity */}
                    <div className="col-span-2 text-center text-gray-400 text-sm flex items-center justify-center">
                      {winner.lastUpdated 
                        ? new Date(winner.lastUpdated).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : 'N/A'
                      }
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Stats Footer */}
        {leaders.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
              <div className="text-3xl font-bold text-yellow-400">
                {leaders.length}
              </div>
              <div className="text-gray-400 mt-1">Total Participants</div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
              <div className="text-3xl font-bold text-green-400">
                {leaders[0]?.totalPoints || 0}
              </div>
              <div className="text-gray-400 mt-1">Highest Score</div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
              <div className="text-3xl font-bold text-blue-400">
                {Math.max(...leaders.map(l => l.completedPaths?.length || 0), 0)}
              </div>
              <div className="text-gray-400 mt-1">Most Paths Completed</div>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
