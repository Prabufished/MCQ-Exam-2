import React, { useState, useEffect, useMemo } from 'react';
import {
  Trophy,
  Medal,
  Award,
  Flame,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Search,
  Zap,
  Clock,
  ChevronDown,
  ChevronUp,
  Target,
  ShieldCheck,
  Crown,
  ArrowUpRight,
  Sliders,
  RefreshCw,
  Radio,
  Users,
  Activity,
  User,
} from 'lucide-react';
import { LeaderboardEntry, StudentProfile, SubjectId } from '../types';
import { getLeaderboard, recordQuestionAnswer } from '../services/storageService';

interface LeaderboardViewProps {
  currentStudent: StudentProfile;
  onStartQuiz?: (subject?: SubjectId) => void;
  onOpenProfileModal?: () => void;
}

interface LiveActivityEvent {
  id: string;
  studentName: string;
  avatarBg: string;
  action: string;
  pointsEarned: number;
  timeAgo: string;
  subject: string;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  currentStudent,
  onStartQuiz,
  onOpenProfileModal,
}) => {
  const [filterMode, setFilterMode] = useState<'points' | 'accuracy' | 'volume' | 'speed' | 'streak'>('points');
  const [selectedTier, setSelectedTier] = useState<'all' | 'Grandmaster' | 'Diamond' | 'Platinum' | 'Gold'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedStudentId, setExpandedStudentId] = useState<string | null>(null);
  const [showSimulator, setShowSimulator] = useState<boolean>(false);
  const [simExtraQuestions, setSimExtraQuestions] = useState<number>(15);

  // Live Auto-Update State
  const [isLiveActive, setIsLiveActive] = useState<boolean>(true);
  const [secondsAgo, setSecondsAgo] = useState<number>(0);
  const [activeOnlineCount, setActiveOnlineCount] = useState<number>(16);
  const [livePointsOffsets, setLivePointsOffsets] = useState<Record<string, number>>({});
  const [recentLiveEvents, setRecentLiveEvents] = useState<LiveActivityEvent[]>([
    {
      id: 'e1',
      studentName: 'Mustafa',
      avatarBg: 'bg-emerald-600',
      action: 'answered 15 Cardiovascular MCQs with 100% accuracy',
      pointsEarned: 150,
      timeAgo: 'Just now',
      subject: 'Cardiovascular',
    },
    {
      id: 'e2',
      studentName: 'Prabu',
      avatarBg: 'bg-indigo-600',
      action: 'completed 20 Human Anatomy & Physiology questions',
      pointsEarned: 210,
      timeAgo: '20s ago',
      subject: 'Histology & Tissues',
    },
    {
      id: 'e3',
      studentName: 'Elena Rostova',
      avatarBg: 'bg-blue-600',
      action: 'maintained 16-day active streak in Blood Dynamics',
      pointsEarned: 85,
      timeAgo: '45s ago',
      subject: 'Blood Dynamics',
    },
    {
      id: 'e4',
      studentName: 'Zainab Qureshi',
      avatarBg: 'bg-purple-600',
      action: 'scored 94% on Respiratory System Exam',
      pointsEarned: 120,
      timeAgo: '1m ago',
      subject: 'Respiratory',
    },
  ]);

  const rawEntries = useMemo(() => getLeaderboard(currentStudent), [currentStudent]);

  // Apply live point offsets to simulate real-time dynamic score updates
  const liveAdjustedEntries = useMemo(() => {
    return rawEntries.map((e) => {
      const extra = livePointsOffsets[e.studentId] || 0;
      return {
        ...e,
        points: e.points + extra,
        questionsCompleted: e.questionsCompleted + (extra > 0 ? Math.floor(extra / 10) : 0),
      };
    });
  }, [rawEntries, livePointsOffsets]);

  // Live simulation tick interval (auto-updates every few seconds)
  useEffect(() => {
    if (!isLiveActive) return;

    const timer = setInterval(() => {
      setSecondsAgo((prev) => prev + 1);

      // Random dynamic peer activity trigger every 6 seconds
      if (Math.random() > 0.4) {
        const peers = [
          { name: 'Prabu', bg: 'bg-indigo-600', id: 'peer-prabu', sub: 'Human Anatomy' },
          { name: 'Mustafa', bg: 'bg-emerald-600', id: 'peer-mustafa', sub: 'Cardiovascular' },
          { name: 'Zainab Qureshi', bg: 'bg-purple-600', id: 'peer-zainab', sub: 'Blood Dynamics' },
          { name: 'Elena Rostova', bg: 'bg-blue-600', id: 'peer-elena', sub: 'Cardiorespiratory' },
          { name: 'Jordan Lee', bg: 'bg-indigo-500', id: 'peer-jordan', sub: 'Hematology' },
          { name: 'Priya Sharma', bg: 'bg-rose-600', id: 'peer-priya', sub: 'Tissues & Histology' },
        ];
        const picked = peers[Math.floor(Math.random() * peers.length)];
        const earned = Math.floor(Math.random() * 30) + 10;

        setLivePointsOffsets((prev) => ({
          ...prev,
          [picked.id]: (prev[picked.id] || 0) + earned,
        }));

        setRecentLiveEvents((prev) => [
          {
            id: String(Date.now()),
            studentName: picked.name,
            avatarBg: picked.bg,
            action: `scored in ${picked.sub} MCQ Practice`,
            pointsEarned: earned,
            timeAgo: 'Just now',
            subject: picked.sub,
          },
          ...prev.slice(0, 4),
        ]);

        setActiveOnlineCount((prev) => Math.max(12, Math.min(24, prev + (Math.random() > 0.5 ? 1 : -1))));
        setSecondsAgo(0);
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [isLiveActive]);

  // Sort entries according to the selected ranking mode (Remix modes)
  const sortedEntries = useMemo(() => {
    const list = [...liveAdjustedEntries];
    if (filterMode === 'accuracy') {
      list.sort((a, b) => b.accuracy - a.accuracy || b.questionsCompleted - a.questionsCompleted);
    } else if (filterMode === 'volume') {
      list.sort((a, b) => b.questionsCompleted - a.questionsCompleted || b.accuracy - a.accuracy);
    } else if (filterMode === 'speed') {
      list.sort((a, b) => (a.avgTimePerQ || 60) - (b.avgTimePerQ || 60) || b.accuracy - a.accuracy);
    } else if (filterMode === 'streak') {
      list.sort((a, b) => b.streak - a.streak || b.points - a.points);
    } else {
      list.sort((a, b) => b.points - a.points);
    }

    // Re-index ranks
    return list.map((entry, idx) => ({
      ...entry,
      rank: idx + 1,
    }));
  }, [liveAdjustedEntries, filterMode]);

  // Filter by Tier and Search Query
  const filteredEntries = useMemo(() => {
    return sortedEntries.filter((e) => {
      if (selectedTier !== 'all' && e.tier !== selectedTier) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = e.studentName.toLowerCase().includes(q);
        const matchesBadge = e.badge.toLowerCase().includes(q);
        const matchesSpecialty = (e.specialty || '').toLowerCase().includes(q);
        return matchesName || matchesBadge || matchesSpecialty;
      }
      return true;
    });
  }, [sortedEntries, selectedTier, searchQuery]);

  const currentUserEntry = sortedEntries.find((e) => e.isCurrentUser);
  const topThree = sortedEntries.slice(0, 3);

  // Target scholar directly ahead of user
  const scholarAhead = useMemo(() => {
    if (!currentUserEntry || currentUserEntry.rank <= 1) return null;
    return sortedEntries[currentUserEntry.rank - 2];
  }, [sortedEntries, currentUserEntry]);

  const pointsToOvertake = useMemo(() => {
    if (!scholarAhead || !currentUserEntry) return 0;
    return Math.max(10, scholarAhead.points - currentUserEntry.points + 10);
  }, [scholarAhead, currentUserEntry]);

  // Simulated points
  const simulatedPoints = useMemo(() => {
    if (!currentUserEntry) return 0;
    return currentUserEntry.points + (simExtraQuestions * 10) + Math.round(simExtraQuestions * 1.5);
  }, [currentUserEntry, simExtraQuestions]);

  const simulatedRank = useMemo(() => {
    if (!currentUserEntry) return 1;
    const countAbove = sortedEntries.filter(
      (e) => !e.isCurrentUser && e.points > simulatedPoints
    ).length;
    return countAbove + 1;
  }, [sortedEntries, currentUserEntry, simulatedPoints]);

  const handleManualRefresh = () => {
    setSecondsAgo(0);
    // Add small random bump to refresh
    setActiveOnlineCount(Math.floor(Math.random() * 6) + 14);
  };

  // Instant practice boost: records 5 real answered questions for current student
  const handleQuickLiveBoost = () => {
    // Record 5 correct questions in storage for current student
    for (let i = 1; i <= 5; i++) {
      const qId = Math.floor(Math.random() * 900) + 1;
      recordQuestionAnswer(currentStudent.id, qId, 0, true, 25);
    }
    // Boost local state
    setLivePointsOffsets((prev) => ({
      ...prev,
      [currentStudent.id]: (prev[currentStudent.id] || 0) + 55,
    }));
    setRecentLiveEvents((prev) => [
      {
        id: String(Date.now()),
        studentName: currentStudent.name,
        avatarBg: 'bg-blue-600',
        action: 'completed 5 Practice MCQs live (+55 pts)',
        pointsEarned: 55,
        timeAgo: 'Just now',
        subject: 'Live Anatomy Drill',
      },
      ...prev.slice(0, 4),
    ]);
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6" id="leaderboard-live-container">
      {/* Top Live Broadcast Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold animate-pulse">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
              <span>LIVE LEADERBOARD</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <Users className="w-3.5 h-3.5 text-emerald-600" />
              <span>{activeOnlineCount} Scholars Active Online</span>
            </span>

            <span className="text-slate-400 text-xs font-mono">
              Synced {secondsAgo === 0 ? 'just now' : `${secondsAgo}s ago`}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Academic Rankings Remix • Live Cohort League
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
            Real-time standings across 400 curriculum MCQs, speed metrics, accuracy scores, and streaks.
          </p>
        </div>

        {/* Live Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsLiveActive(!isLiveActive)}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isLiveActive
                ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            title="Toggle real-time auto-updates"
          >
            <Radio className={`w-3.5 h-3.5 ${isLiveActive ? 'text-rose-600 animate-spin' : ''}`} />
            <span>{isLiveActive ? 'Live Sync: ON' : 'Live Sync: PAUSED'}</span>
          </button>

          <button
            onClick={handleManualRefresh}
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
            title="Force refresh standings"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {onStartQuiz && (
            <button
              onClick={() => onStartQuiz()}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Start Live Quiz</span>
            </button>
          )}
        </div>
      </div>

      {/* Live Activity Ticker Stream */}
      <div className="mb-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-3.5 text-white shadow-md border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 overflow-hidden">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-300 shrink-0">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="uppercase tracking-wider">Live Activity:</span>
        </div>

        <div className="flex-1 overflow-x-auto no-scrollbar py-0.5">
          <div className="flex items-center gap-4 text-xs whitespace-nowrap">
            {recentLiveEvents.map((evt) => (
              <div
                key={evt.id}
                className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-xl border border-white/10 backdrop-blur-xs text-slate-200"
              >
                <span className="font-bold text-white">{evt.studentName}</span>
                <span className="text-slate-300">{evt.action}</span>
                <span className="text-emerald-400 font-extrabold">+{evt.pointsEarned} pts</span>
                <span className="text-slate-400 text-[10px]">({evt.timeAgo})</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-[11px] text-slate-300 shrink-0">
          Creators: <strong className="text-white">Prabu & Mustafa</strong>
        </div>
      </div>

      {/* Current User Standing Card with Live Rank & Overtake Calculator */}
      {currentUserEntry && (
        <div className="bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden border border-blue-800">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-32 h-32 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left: User Identity & Live Rank */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-500 text-white font-black text-2xl flex items-center justify-center shadow-lg ring-4 ring-white/10">
                  {currentStudent.avatarSeed}
                </div>
                <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow-md">
                  #{currentUserEntry.rank}
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold">
                    {currentUserEntry.tier || 'Scholar'} Division
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Live Online</span>
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">{currentStudent.name}</h3>
                <p className="text-xs text-slate-300 mt-0.5">{currentStudent.collegeYear} • {currentStudent.role}</p>
              </div>
            </div>

            {/* Middle: Live Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-xs">
              <div className="text-center px-2">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">Total Points</span>
                <span className="text-xl sm:text-2xl font-black text-white">{currentUserEntry.points.toLocaleString()}</span>
                <span className="text-[10px] text-blue-300 block mt-0.5">Weighted Score</span>
              </div>
              <div className="text-center px-2 border-l border-white/10">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">Accuracy</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-400">{currentUserEntry.accuracy}%</span>
                <span className="text-[10px] text-emerald-300 block mt-0.5">Verified</span>
              </div>
              <div className="text-center px-2 border-l border-white/10">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">Questions</span>
                <span className="text-xl sm:text-2xl font-black text-white">{currentUserEntry.questionsCompleted}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">of 400 MCQs</span>
              </div>
              <div className="text-center px-2 border-l border-white/10">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">Study Streak</span>
                <div className="flex items-center justify-center gap-1 text-xl sm:text-2xl font-black text-amber-400">
                  <Flame className="w-5 h-5 fill-current" />
                  <span>{currentUserEntry.streak}d</span>
                </div>
                <span className="text-[10px] text-amber-300 block mt-0.5">Active Days</span>
              </div>
            </div>

            {/* Right: Quick Action Controls */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
              <button
                onClick={handleQuickLiveBoost}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                title="Simulate quick answers and earn instant live points"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>+5 Quick Practice Drill</span>
              </button>

              <button
                onClick={() => setShowSimulator(!showSimulator)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{showSimulator ? 'Hide Simulator' : 'Rank Rise Simulator'}</span>
              </button>

              {scholarAhead && (
                <div className="p-2 rounded-xl bg-white/10 border border-white/10 text-xs text-center">
                  <span className="text-slate-300 text-[11px] block">
                    Target Ahead: <strong className="text-white">{scholarAhead.studentName}</strong>
                  </span>
                  <span className="font-extrabold text-amber-300 text-xs">
                    +{pointsToOvertake} pts to overtake
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Rank Simulator Drawer */}
          {showSimulator && (
            <div className="mt-6 pt-6 border-t border-white/15 bg-white/5 rounded-2xl p-4 sm:p-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-400" />
                  <h4 className="font-bold text-sm text-white">Live Rank Projection Simulator</h4>
                </div>
                <span className="text-xs text-blue-200">Simulate practice questions</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="space-y-2 md:col-span-2">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Simulate answering extra practice MCQs:</span>
                    <strong className="text-blue-300 font-bold">+{simExtraQuestions} Questions (~{(simExtraQuestions * 10)} pts)</strong>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={simExtraQuestions}
                    onChange={(e) => setSimExtraQuestions(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>+5 Qs</span>
                    <span>+25 Qs</span>
                    <span>+50 Qs</span>
                    <span>+100 Qs</span>
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-3 text-center border border-white/15">
                  <span className="text-[11px] text-slate-300 uppercase block">Simulated Rank</span>
                  <div className="text-2xl font-black text-amber-300">
                    #{simulatedRank}{' '}
                    {simulatedRank < currentUserEntry.rank && (
                      <span className="text-xs text-emerald-400 font-bold">
                        (↑ {currentUserEntry.rank - simulatedRank} spots)
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-300 block mt-1">
                    Projected: {simulatedPoints.toLocaleString()} pts
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 items-end">
        {/* 2nd Place */}
        {topThree[1] && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center order-2 sm:order-1 relative overflow-hidden transition-all hover:shadow-md">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-300" />
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 font-black text-sm flex items-center justify-center mx-auto mb-3 border border-slate-300 shadow-xs">
              🥈 2nd
            </div>
            <div className={`w-14 h-14 rounded-full ${topThree[1].avatarBg} text-white font-black text-lg flex items-center justify-center mx-auto mb-2 ring-4 ring-slate-100 shadow-sm relative`}>
              {topThree[1].studentName.split(' ').map((w) => w[0]).join('').substring(0, 2)}
              <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0" title="Online now" />
            </div>
            <h4 className="font-extrabold text-slate-900 text-base truncate">{topThree[1].studentName}</h4>
            <span className="text-xs text-indigo-700 font-bold block mb-1">{topThree[1].badge}</span>
            <span className="text-[11px] text-slate-500 font-medium block mb-3 line-clamp-1">{topThree[1].specialty}</span>
            <div className="text-2xl font-black text-slate-900">{topThree[1].points.toLocaleString()} pts</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">
              {topThree[1].accuracy}% acc • {topThree[1].questionsCompleted} Qs • {topThree[1].avgTimePerQ || 36}s pace
            </div>
          </div>
        )}

        {/* 1st Place - Gold Champion */}
        {topThree[0] && (
          <div className="bg-gradient-to-b from-amber-50/90 via-white to-amber-50/30 rounded-3xl border-2 border-amber-300 shadow-lg p-6 sm:p-7 text-center order-1 sm:order-2 sm:-translate-y-3 relative overflow-hidden transition-all">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500" />
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 font-black text-lg flex items-center justify-center mx-auto mb-3 border border-amber-300 shadow-sm ring-4 ring-amber-100/60">
              👑 1st
            </div>
            <div className={`w-16 h-16 rounded-full ${topThree[0].avatarBg} text-white font-black text-xl flex items-center justify-center mx-auto mb-2 ring-4 ring-amber-300 shadow-md relative`}>
              {topThree[0].studentName.split(' ').map((w) => w[0]).join('').substring(0, 2)}
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0" title="Online now" />
            </div>
            <h4 className="font-black text-slate-900 text-lg truncate">{topThree[0].studentName}</h4>
            <span className="text-xs text-amber-800 font-extrabold block mb-1">{topThree[0].badge}</span>
            <span className="text-[11px] text-slate-600 font-medium block mb-3 line-clamp-1">{topThree[0].specialty}</span>
            <div className="text-3xl font-black text-amber-700">{topThree[0].points.toLocaleString()} pts</div>
            <div className="text-xs text-slate-600 mt-1 font-bold">
              {topThree[0].accuracy}% acc • {topThree[0].questionsCompleted} Qs • {topThree[0].avgTimePerQ || 34}s pace
            </div>
          </div>
        )}

        {/* 3rd Place */}
        {topThree[2] && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center order-3 relative overflow-hidden transition-all hover:shadow-md">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-600/40" />
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-800 font-black text-sm flex items-center justify-center mx-auto mb-3 border border-amber-200 shadow-xs">
              🥉 3rd
            </div>
            <div className={`w-14 h-14 rounded-full ${topThree[2].avatarBg} text-white font-black text-lg flex items-center justify-center mx-auto mb-2 ring-4 ring-amber-50 shadow-sm relative`}>
              {topThree[2].studentName.split(' ').map((w) => w[0]).join('').substring(0, 2)}
              <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0" title="Online now" />
            </div>
            <h4 className="font-extrabold text-slate-900 text-base truncate">{topThree[2].studentName}</h4>
            <span className="text-xs text-indigo-700 font-bold block mb-1">{topThree[2].badge}</span>
            <span className="text-[11px] text-slate-500 font-medium block mb-3 line-clamp-1">{topThree[2].specialty}</span>
            <div className="text-2xl font-black text-slate-900">{topThree[2].points.toLocaleString()} pts</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">
              {topThree[2].accuracy}% acc • {topThree[2].questionsCompleted} Qs • {topThree[2].avgTimePerQ || 41}s pace
            </div>
          </div>
        )}
      </div>

      {/* Remix Controls: League Tiers & Criteria Sorters */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 mb-6 space-y-4">
        {/* Row 1: Ranking Metric Mode */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold">
            <span className="text-slate-500 font-bold uppercase text-[11px] mr-1 shrink-0">Rank By:</span>
            <button
              onClick={() => setFilterMode('points')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                filterMode === 'points' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Honor Points</span>
            </button>
            <button
              onClick={() => setFilterMode('accuracy')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                filterMode === 'accuracy' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Highest Accuracy</span>
            </button>
            <button
              onClick={() => setFilterMode('volume')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                filterMode === 'volume' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Questions Solved</span>
            </button>
            <button
              onClick={() => setFilterMode('speed')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                filterMode === 'speed' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Fastest Pace</span>
            </button>
            <button
              onClick={() => setFilterMode('streak')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                filterMode === 'streak' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Study Streak</span>
            </button>
          </div>

          {/* Search peer student */}
          <div className="relative shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scholar or specialty..."
              className="pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 w-full sm:w-56"
            />
          </div>
        </div>

        {/* Row 2: League Tier Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 text-xs">
          <span className="font-bold text-slate-500 text-[11px] uppercase mr-1">League Division:</span>
          {(['all', 'Grandmaster', 'Diamond', 'Platinum', 'Gold'] as const).map((tier) => {
            const isSel = selectedTier === tier;
            return (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  isSel
                    ? 'bg-slate-900 text-white font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tier === 'all' ? 'All Divisions' : `${tier} Division`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Full Live Leaderboard Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                <th className="py-3.5 px-3 sm:px-4 w-12 sm:w-16 text-center">Rank</th>
                <th className="py-3.5 px-3 sm:px-4">Scholar Details</th>
                <th className="hidden sm:table-cell py-3.5 px-3 text-center">Status</th>
                <th className="hidden md:table-cell py-3.5 px-3 text-center">League Tier</th>
                <th className="hidden md:table-cell py-3.5 px-3 text-center">Questions</th>
                <th className="py-3.5 px-3 text-center">Accuracy</th>
                <th className="hidden lg:table-cell py-3.5 px-3 text-center">Pace</th>
                <th className="hidden sm:table-cell py-3.5 px-3 text-center">Streak</th>
                <th className="py-3.5 px-3 sm:px-4 text-right">Points</th>
                <th className="py-3.5 px-2 text-center w-8"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEntries.map((entry) => {
                const isUser = entry.isCurrentUser;
                const isExpanded = expandedStudentId === entry.studentId;

                return (
                  <React.Fragment key={entry.studentId}>
                    <tr
                      onClick={() => setExpandedStudentId(isExpanded ? null : entry.studentId)}
                      className={`cursor-pointer transition-colors ${
                        isUser
                          ? 'bg-blue-50/80 font-semibold text-blue-950'
                          : 'hover:bg-slate-50/80 text-slate-800'
                      }`}
                    >
                      {/* Rank Column */}
                      <td className="py-3.5 px-3 sm:px-4 text-center font-bold">
                        {entry.rank === 1 ? (
                          <span className="text-base">🥇</span>
                        ) : entry.rank === 2 ? (
                          <span className="text-base">🥈</span>
                        ) : entry.rank === 3 ? (
                          <span className="text-base">🥉</span>
                        ) : (
                          <span className="font-mono text-slate-600">#{entry.rank}</span>
                        )}
                      </td>

                      {/* Student Info */}
                      <td className="py-3.5 px-3 sm:px-4">
                        <div className="flex items-center gap-2.5 sm:gap-3">
                          <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl ${entry.avatarBg} text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs relative`}>
                            {entry.studentName.split(' ').map((w) => w[0]).join('').substring(0, 2)}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-slate-900 text-sm">{entry.studentName}</span>
                              {isUser && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-600 text-white font-extrabold">
                                  You
                                </span>
                              )}
                              {(entry.studentName === 'Mustafa' || entry.studentName === 'Prabu') && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300 font-extrabold">
                                  Founder
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-500 block truncate max-w-[140px] sm:max-w-xs">{entry.badge}</span>
                          </div>
                        </div>
                      </td>

                      {/* Live Online Status */}
                      <td className="hidden sm:table-cell py-3.5 px-3 text-center">
                        {entry.isOnline || entry.isCurrentUser ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Active</span>
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-medium">Offline</span>
                        )}
                      </td>

                      {/* League Tier Badge */}
                      <td className="hidden md:table-cell py-3.5 px-3 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[10px] border ${
                          entry.tier === 'Grandmaster'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : entry.tier === 'Diamond'
                            ? 'bg-purple-50 text-purple-800 border-purple-200'
                            : entry.tier === 'Platinum'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          {entry.tier || 'Scholar'}
                        </span>
                      </td>

                      {/* Questions Solved */}
                      <td className="hidden md:table-cell py-3.5 px-3 text-center font-mono">
                        <span className="font-bold text-slate-800">{entry.questionsCompleted}</span>{' '}
                        <span className="text-slate-400">/ 400</span>
                      </td>

                      {/* Accuracy */}
                      <td className="py-3.5 px-3 text-center">
                        <span className={`inline-flex items-center font-bold px-2 py-0.5 rounded-full ${
                          entry.accuracy >= 92
                            ? 'bg-emerald-50 text-emerald-700'
                            : entry.accuracy >= 80
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}>
                          {entry.accuracy}%
                        </span>
                      </td>

                      {/* Pace */}
                      <td className="hidden lg:table-cell py-3.5 px-3 text-center font-mono text-slate-600">
                        {entry.avgTimePerQ || 45}s/q
                      </td>

                      {/* Streak */}
                      <td className="hidden sm:table-cell py-3.5 px-3 text-center">
                        {entry.streak > 0 ? (
                          <span className="inline-flex items-center gap-1 text-amber-600 font-bold">
                            <Flame className="w-3.5 h-3.5 fill-current" />
                            {entry.streak}d
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>

                      {/* Honor Points */}
                      <td className="py-3.5 px-3 sm:px-4 text-right font-black text-slate-900 text-sm">
                        {entry.points.toLocaleString()}
                      </td>

                      {/* Expand Chevron */}
                      <td className="py-3.5 px-2 text-center text-slate-400">
                        {isExpanded ? <ChevronUp className="w-4 h-4 mx-auto" /> : <ChevronDown className="w-4 h-4 mx-auto" />}
                      </td>
                    </tr>

                    {/* Expandable Scholar Card Row */}
                    {isExpanded && (
                      <tr className="bg-slate-50/70 border-b border-slate-200">
                        <td colSpan={10} className="p-4 sm:p-5">
                          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-slate-900">{entry.studentName}</span>
                                <span className="text-[11px] text-slate-500">• {entry.badge}</span>
                              </div>
                              <p className="text-xs text-slate-600">
                                <strong>Anatomical Specialty:</strong> {entry.specialty || 'General Human Anatomy & Systems Physiology'}
                              </p>
                              <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 mt-2">
                                <span>Total MCQs Solved: <strong>{entry.questionsCompleted}</strong></span>
                                <span>Verified Accuracy: <strong>{entry.accuracy}%</strong></span>
                                <span>Average Speed: <strong>{entry.avgTimePerQ || 45}s / question</strong></span>
                                <span>Active Daily Study Streak: <strong>{entry.streak} days</strong></span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {onStartQuiz && (
                                <button
                                  onClick={() => onStartQuiz()}
                                  className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shrink-0 cursor-pointer"
                                >
                                  <span>Practice Live MCQs</span>
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                </button>
                              )}
                              {onOpenProfileModal && (
                                <button
                                  onClick={onOpenProfileModal}
                                  className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors shrink-0 cursor-pointer"
                                >
                                  Switch Student
                                </button>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cohort Hall of Fame Spotlight: Prabu & Mustafa */}
      <div className="bg-gradient-to-r from-amber-50/80 via-indigo-50/60 to-blue-50/80 border border-amber-200/80 rounded-2xl p-6 mb-8 text-xs text-slate-700">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Crown className="w-5 h-5" />
          </div>
          <div className="space-y-1 flex-1">
            <h4 className="font-bold text-slate-900 text-sm">
              Cohort Distinction & Platform Hall of Fame
            </h4>
            <p className="leading-relaxed">
              Honoring <strong>Mustafa</strong> and <strong>Prabu</strong> for constructing the MedPulse GEDU404B 400 MCQ Academic Engine, curating verified pathophysiological rationales, and designing the cohort testing simulator.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] font-semibold text-slate-600">
              <span className="flex items-center gap-1 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" /> 400 Curated MCQs
              </span>
              <span className="flex items-center gap-1 text-blue-700">
                <ShieldCheck className="w-3.5 h-3.5" /> 4 Curriculum Modules
              </span>
              <span className="flex items-center gap-1 text-amber-700">
                <Crown className="w-3.5 h-3.5" /> Grandmaster Honor Roll
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scoring Algorithm Explanation Note */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-800">Scoring Algorithm:</strong> Points are earned continuously through active study: 10 points per correct answer + (Accuracy Rate × 5) + (Daily Streak Days × 25). Rankings update live automatically upon answering questions.
        </p>
      </div>
    </div>
  );
};
