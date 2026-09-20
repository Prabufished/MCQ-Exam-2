import React from 'react';
import { Activity, BookOpen, BarChart3, Trophy, User, CheckCircle2, Flame, Award } from 'lucide-react';
import { StudentProfile, StudentAnalytics } from '../types';

interface NavbarProps {
  activeTab: 'quiz' | 'bank' | 'analytics' | 'leaderboard';
  setActiveTab: (tab: 'quiz' | 'bank' | 'analytics' | 'leaderboard') => void;
  currentStudent: StudentProfile;
  analytics: StudentAnalytics;
  userRank: number;
  onOpenProfileModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentStudent,
  analytics,
  userRank,
  onOpenProfileModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs" id="app-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('quiz')} id="brand-logo">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight">GEDU404B Revision</span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  400 MCQs
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">Applied Structure & Function of the Human Body</p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2" aria-label="Main Navigation">
            <button
              id="nav-tab-quiz"
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'quiz'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Practice & Quiz</span>
            </button>

            <button
              id="nav-tab-bank"
              onClick={() => setActiveTab('bank')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'bank'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Question Bank</span>
              <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-600">
                400 Qs
              </span>
            </button>

            <button
              id="nav-tab-analytics"
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'analytics'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
              {analytics.totalAnswered > 0 && (
                <span className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700">
                  {analytics.accuracyRate}%
                </span>
              )}
            </button>

            <button
              id="nav-tab-leaderboard"
              onClick={() => setActiveTab('leaderboard')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'leaderboard'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Leaderboard</span>
              <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                #{userRank}
              </span>
            </button>
          </nav>

          {/* Student Profile Quick View */}
          <div className="flex items-center gap-3">
            <button
              id="btn-student-profile"
              onClick={onOpenProfileModal}
              className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-left"
              title="Switch or edit student profile"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {currentStudent.avatarSeed}
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-slate-800 leading-tight truncate max-w-[110px]">
                    {currentStudent.name}
                  </span>
                  {analytics.streakDays > 0 && (
                    <span className="flex items-center text-[10px] text-amber-600 font-bold" title={`${analytics.streakDays} Day Study Streak`}>
                      <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                      {analytics.streakDays}d
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span>{analytics.totalAnswered} / 1000 done</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
