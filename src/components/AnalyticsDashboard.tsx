import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  Flame,
  Award,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Zap,
  Target,
  ArrowUpRight,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';
import { StudentProfile, StudentAnalytics, SubjectId } from '../types';
import { SUBJECTS } from '../data/subjects';

interface AnalyticsDashboardProps {
  currentStudent: StudentProfile;
  analytics: StudentAnalytics;
  onLaunchRemediationQuiz: () => void;
  onSelectSubjectQuiz: (subjectId: SubjectId) => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  currentStudent,
  analytics,
  onLaunchRemediationQuiz,
  onSelectSubjectQuiz,
}) => {
  // Identify strongest and weakest subjects
  const subjectEntries = Object.entries(analytics.subjectPerformance) as [SubjectId, typeof analytics.subjectPerformance[SubjectId]][];
  const attemptedSubjects = subjectEntries.filter(([_, data]) => data.attempted > 0);

  const strongestSubject = attemptedSubjects.length > 0
    ? [...attemptedSubjects].sort((a, b) => b[1].accuracy - a[1].accuracy)[0]
    : null;

  const weakestSubject = attemptedSubjects.length > 0
    ? [...attemptedSubjects].sort((a, b) => a[1].accuracy - b[1].accuracy)[0]
    : null;

  // Format total study time
  const formatStudyTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m ${totalSeconds % 60}s`;
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6" id="analytics-dashboard-container">
      {/* Top Profile Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
              {currentStudent.avatarSeed}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{currentStudent.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  {currentStudent.collegeYear}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{currentStudent.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onLaunchRemediationQuiz}
              disabled={analytics.totalIncorrect === 0}
              className="px-4 py-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 font-semibold text-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shadow-xs"
            >
              <Target className="w-4 h-4 text-rose-600" />
              <span>Target Weak Areas Quiz</span>
            </button>
          </div>
        </div>

        {/* 4 Core Summary Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {/* Completion */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
              <span>Coverage</span>
              <BookOpen className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {analytics.totalAnswered}{' '}
              <span className="text-xs font-normal text-slate-500">/ 400</span>
            </div>
            <div className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
              <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${analytics.overallCompletionRate}%` }}
                />
              </div>
              <span className="font-semibold">{analytics.overallCompletionRate}%</span>
            </div>
          </div>

          {/* Accuracy */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
              <span>Overall Accuracy</span>
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
              {analytics.accuracyRate}%
            </div>
            <div className="mt-2 text-xs text-slate-500 flex items-center gap-2">
              <span className="text-emerald-700 font-semibold">✓ {analytics.totalCorrect} correct</span>
              <span className="text-rose-600">✗ {analytics.totalIncorrect} missed</span>
            </div>
          </div>

          {/* Average Pace */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
              <span>Average Speed</span>
              <Clock className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {analytics.averageTimePerQuestion}s
            </div>
            <div className="mt-2 text-xs text-slate-500">
              {analytics.averageTimePerQuestion > 0 && analytics.averageTimePerQuestion <= 65
                ? 'Target exam pace (<65s/q)'
                : analytics.averageTimePerQuestion > 65
                ? 'Slightly slower than board speed'
                : 'No timing data recorded'}
            </div>
          </div>

          {/* Total Study Time & Streak */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
              <span>Study Engagement</span>
              <Flame className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {formatStudyTime(analytics.totalStudyTimeSeconds)}
            </div>
            <div className="mt-2 text-xs text-amber-600 font-bold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>{analytics.streakDays} Day Active Study Streak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnostics: Strengths and Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Strongest Area */}
        <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Highest Proficiency Module</span>
          </div>
          {strongestSubject ? (
            <div>
              <h3 className="text-lg font-bold text-emerald-950 mb-1">
                {SUBJECTS.find((s) => s.id === strongestSubject[0])?.name}
              </h3>
              <p className="text-xs text-emerald-800 mb-3">
                Proficiency: <span className="font-extrabold">{strongestSubject[1].accuracy}%</span> accuracy across{' '}
                {strongestSubject[1].attempted} questions attempted.
              </p>
              <button
                onClick={() => onSelectSubjectQuiz(strongestSubject[0])}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
              >
                <span>Practice More in this Subject</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <p className="text-xs text-emerald-700">
              Take practice quizzes across subjects to generate your proficiency diagnosis.
            </p>
          )}
        </div>

        {/* Weakest Area / Needs Attention */}
        <div className="bg-rose-50/50 border border-rose-200/80 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-rose-800 font-bold text-sm mb-2">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <span>Remediation Priority Module</span>
          </div>
          {weakestSubject && weakestSubject[1].attempted > 0 ? (
            <div>
              <h3 className="text-lg font-bold text-rose-950 mb-1">
                {SUBJECTS.find((s) => s.id === weakestSubject[0])?.name}
              </h3>
              <p className="text-xs text-rose-800 mb-3">
                Proficiency: <span className="font-extrabold">{weakestSubject[1].accuracy}%</span> accuracy ({weakestSubject[1].correct} of {weakestSubject[1].attempted}). High return on study time!
              </p>
              <button
                onClick={() => onSelectSubjectQuiz(weakestSubject[0])}
                className="text-xs font-semibold text-rose-700 hover:text-rose-900 flex items-center gap-1"
              >
                <span>Launch Focused Remediation Quiz</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <p className="text-xs text-rose-700">
              No weak areas identified yet. Answer more questions to pinpoint topics needing reinforcement.
            </p>
          )}
        </div>
      </div>

      {/* 8-Subject Mastery Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Academic Modules Mastery Matrix</h3>
            <p className="text-xs text-slate-500">Each module comprises 125 carefully indexed multiple choice questions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SUBJECTS.map((sub) => {
            const perf = analytics.subjectPerformance[sub.id];
            const attempted = perf?.attempted || 0;
            const correct = perf?.correct || 0;
            const acc = perf?.accuracy || 0;
            const completionPct = Math.round((attempted / sub.totalQuestions) * 100);

            let statusBadge = {
              text: 'Unattempted',
              bg: 'bg-slate-100 text-slate-600 border-slate-200',
            };
            if (attempted > 0) {
              if (acc >= 80) {
                statusBadge = { text: 'Mastered', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
              } else if (acc >= 60) {
                statusBadge = { text: 'Competent', bg: 'bg-amber-50 text-amber-700 border-amber-200' };
              } else {
                statusBadge = { text: 'Needs Review', bg: 'bg-rose-50 text-rose-700 border-rose-200' };
              }
            }

            return (
              <div
                key={sub.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all bg-slate-50/50"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{sub.name}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{sub.description}</p>
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${statusBadge.bg}`}>
                    {statusBadge.text}
                  </span>
                </div>

                {/* Progress bar and stats */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">
                      Completed: <strong className="text-slate-900">{attempted}</strong> / {sub.totalQuestions} ({completionPct}%)
                    </span>
                    <span className="font-bold text-slate-900">
                      Accuracy: {attempted > 0 ? `${acc}%` : '—'}
                    </span>
                  </div>

                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        acc >= 80 ? 'bg-emerald-500' : acc >= 60 ? 'bg-amber-500' : 'bg-blue-600'
                      }`}
                      style={{ width: `${Math.max(attempted > 0 ? 5 : 0, completionPct)}%` }}
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400">
                      {correct} correct • {attempted - correct} incorrect
                    </span>
                    <button
                      onClick={() => onSelectSubjectQuiz(sub.id)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <span>Take Quiz</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Test History */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Recent Test Session History</h3>
            <p className="text-xs text-slate-500">Record of all completed quiz and exam attempts</p>
          </div>
        </div>

        {analytics.recentTestSessions.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            No test sessions completed yet. Launch a quiz session to build your testing log.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Module</th>
                  <th className="py-3 px-3">Questions</th>
                  <th className="py-3 px-3">Score</th>
                  <th className="py-3 px-3">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {analytics.recentTestSessions.map((session) => (
                  <tr key={session.id} className="hover:bg-slate-50/80">
                    <td className="py-3 px-3 font-medium text-slate-600">{session.date}</td>
                    <td className="py-3 px-3 font-semibold text-slate-900">{session.subject}</td>
                    <td className="py-3 px-3 text-slate-600">{session.total} MCQs</td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center font-bold px-2 py-0.5 rounded-full ${
                        session.percentage >= 75
                          ? 'bg-emerald-50 text-emerald-700'
                          : session.percentage >= 50
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}>
                        {session.score}/{session.total} ({session.percentage}%)
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-500">
                      {Math.floor(session.timeSpent / 60)}m {session.timeSpent % 60}s
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
