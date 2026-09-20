/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { QuizRunner } from './components/QuizRunner';
import { QuestionExplorer } from './components/QuestionExplorer';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { LeaderboardView } from './components/LeaderboardView';
import { StudentProfileModal } from './components/StudentProfileModal';
import { StudentProfile, SubjectId, MCQQuestion } from './types';
import {
  getCurrentStudent,
  getStudentAnalytics,
  getLeaderboard,
} from './services/storageService';
import { Activity, BookOpen, BarChart3, Trophy, Heart, Shield, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'quiz' | 'bank' | 'analytics' | 'leaderboard'>('quiz');
  const [currentStudent, setCurrentStudentState] = useState<StudentProfile>(() => getCurrentStudent());
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [selectedQuizSubject, setSelectedQuizSubject] = useState<SubjectId | 'all'>('all');
  const [quizKey, setQuizKey] = useState<number>(Date.now());
  const [updateCounter, setUpdateCounter] = useState<number>(0);

  // Trigger state refresh when tests complete
  const refreshAnalytics = useCallback(() => {
    setUpdateCounter((c) => c + 1);
  }, []);

  const analytics = useMemo(() => {
    return getStudentAnalytics(currentStudent.id);
  }, [currentStudent.id, updateCounter]);

  const userRank = useMemo(() => {
    const lb = getLeaderboard(currentStudent);
    const userEntry = lb.find((e) => e.isCurrentUser);
    return userEntry ? userEntry.rank : lb.length;
  }, [currentStudent, updateCounter]);

  const handleStudentChanged = (student: StudentProfile) => {
    setCurrentStudentState(student);
    refreshAnalytics();
  };

  const handleSelectSubjectQuiz = (subjectId: SubjectId) => {
    setSelectedQuizSubject(subjectId);
    setQuizKey(Date.now());
    setActiveTab('quiz');
  };

  const handleLaunchRemediationQuiz = () => {
    setSelectedQuizSubject('all');
    setQuizKey(Date.now());
    setActiveTab('quiz');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentStudent={currentStudent}
        analytics={analytics}
        userRank={userRank}
        onOpenProfileModal={() => setProfileModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'quiz' && (
          <QuizRunner
            key={quizKey}
            currentStudent={currentStudent}
            initialSubject={selectedQuizSubject}
            onTestCompleted={refreshAnalytics}
            onNavigateToAnalytics={() => setActiveTab('analytics')}
          />
        )}

        {activeTab === 'bank' && (
          <QuestionExplorer
            currentStudent={currentStudent}
            onSelectPracticeQuestion={(q) => {
              setSelectedQuizSubject(q.subjectId);
              setQuizKey(Date.now());
              setActiveTab('quiz');
            }}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard
            currentStudent={currentStudent}
            analytics={analytics}
            onLaunchRemediationQuiz={handleLaunchRemediationQuiz}
            onSelectSubjectQuiz={handleSelectSubjectQuiz}
          />
        )}

        {activeTab === 'leaderboard' && (
          <LeaderboardView
            currentStudent={currentStudent}
            onStartQuiz={(subject) => {
              if (subject) setSelectedQuizSubject(subject);
              setQuizKey(Date.now());
              setActiveTab('quiz');
            }}
            onOpenProfileModal={() => setProfileModalOpen(true)}
          />
        )}
      </main>

      {/* Student Profile Switcher Modal */}
      <StudentProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        currentStudent={currentStudent}
        onStudentChanged={handleStudentChanged}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              <Activity className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-slate-800">MedPulse 1,000 MCQ Platform</span>
            <span className="text-slate-300">•</span>
            <span>Applied Structure and Function of the Human Body (GEDU404B/2602)</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Cardiovascular</span>
            <span>•</span>
            <span>Tissues</span>
            <span>•</span>
            <span>Blood</span>
            <span>•</span>
            <span>Respiratory</span>
            <span>•</span>
            <span>Physiology</span>
          </div>
        </div>
        <p className="text-center text-slate-400 mt-4 text-xs font-medium">done by Prabu and Mustafa</p>
      </footer>
    </div>
  );
}
