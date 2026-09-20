import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  UserPlus,
  RotateCcw,
  Sparkles,
  Check,
  Award,
  BookOpen,
  Trash2,
} from 'lucide-react';
import { StudentProfile } from '../types';
import {
  getStoredProfiles,
  saveNewStudentProfile,
  setCurrentStudent,
  deleteStudentProfile,
  resetStudentProgress,
  recordQuestionAnswer,
} from '../services/storageService';
import { getAllQuestions } from '../data/questionsBank';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStudent: StudentProfile;
  onStudentChanged: (student: StudentProfile) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  currentStudent,
  onStudentChanged,
}) => {
  const [profiles, setProfiles] = useState<StudentProfile[]>(() => getStoredProfiles());
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>('');
  const [newRole, setNewRole] = useState<string>('Health Science Student');
  const [newYear, setNewYear] = useState<string>('GEDU404B Year 2');
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [demoLoadedMsg, setDemoLoadedMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setProfiles(getStoredProfiles());
      setIsCreating(false);
      setShowResetConfirm(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectStudent = (student: StudentProfile) => {
    setCurrentStudent(student);
    onStudentChanged(student);
    onClose();
  };

  const handleDeleteProfile = (e: React.MouseEvent, studentId: string) => {
    e.stopPropagation();
    const updated = deleteStudentProfile(studentId);
    setProfiles(updated);
    if (currentStudent.id === studentId && updated.length > 0) {
      onStudentChanged(updated[0]);
    }
    setDemoLoadedMsg('Profile deleted successfully.');
    setTimeout(() => setDemoLoadedMsg(null), 2500);
  };

  const handleClearAllOldProfiles = () => {
    // Delete all profiles except the current one if desired, or all old ones
    profiles.forEach((p) => {
      if (p.id !== currentStudent.id) {
        deleteStudentProfile(p.id);
      }
    });
    setProfiles(getStoredProfiles());
    setDemoLoadedMsg('Old student profiles cleared.');
    setTimeout(() => setDemoLoadedMsg(null), 2500);
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const created = saveNewStudentProfile(newName, newRole, newYear);
    setProfiles(getStoredProfiles());
    onStudentChanged(created);
    setIsCreating(false);
    setNewName('');
    onClose();
  };

  const handleResetCurrent = () => {
    resetStudentProgress(currentStudent.id);
    onStudentChanged({ ...currentStudent });
    setShowResetConfirm(false);
    onClose();
  };

  // Seed 40 demo questions with high accuracy so user can immediately view rich analytics & rankings
  const handleSeedDemoData = () => {
    const all = getAllQuestions();
    // Answer first 40 questions (34 correct, 6 incorrect)
    for (let i = 0; i < 40; i++) {
      const q = all[i];
      const isCorrect = i % 7 !== 0; // ~85% accuracy
      const choice = isCorrect ? q.correctAnswer : (q.correctAnswer + 1) % 4;
      recordQuestionAnswer(currentStudent.id, q.id, choice, isCorrect, Math.floor(Math.random() * 25) + 30);
    }
    setDemoLoadedMsg('Successfully loaded 40 sample questions with 85% accuracy!');
    setTimeout(() => {
      onStudentChanged({ ...currentStudent });
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Student Profile Switcher</h3>
            <p className="text-xs text-slate-500">Track independent progress for each student</p>
          </div>
        </div>

        {/* Creator Highlight Banner */}
        <div className="mb-4 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200/80 flex items-center gap-2 text-xs text-slate-700">
          <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Platform Creators: <strong className="text-blue-950 font-bold">Prabu and Mustafa</strong></span>
        </div>

        {demoLoadedMsg && (
          <div className="p-3 mb-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{demoLoadedMsg}</span>
          </div>
        )}

        {/* Existing Profiles List */}
        {!isCreating ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Select Active Student
              </span>

              {profiles.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
                  No student profiles registered yet. Create your student profile below.
                </div>
              ) : (
                profiles.map((p) => {
                  const isActive = p.id === currentStudent.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => handleSelectStudent(p)}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isActive
                          ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-600 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                          {p.avatarSeed}
                        </div>
                        <div>
                          <span className="text-sm font-bold text-slate-900 block">{p.name}</span>
                          <span className="text-xs text-slate-500">{p.collegeYear} • {p.role}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isActive && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
                        <button
                          type="button"
                          onClick={(e) => handleDeleteProfile(e, p.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title={`Delete profile for ${p.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {profiles.length > 1 && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={handleClearAllOldProfiles}
                  className="text-[11px] text-slate-500 hover:text-rose-600 font-medium inline-flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear other student profiles</span>
                </button>
              </div>
            )}

            <button
              onClick={() => setIsCreating(true)}
              className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/40 text-slate-700 hover:text-blue-700 font-semibold text-xs transition-all flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create New Student Profile</span>
            </button>

            {/* Quick Demo & Reset Utilities */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <button
                onClick={handleSeedDemoData}
                className="w-full py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold text-xs border border-amber-200 flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Quick-Seed 40 Sample MCQs (Instant Analytics)</span>
              </button>

              {!showResetConfirm ? (
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="w-full py-2 text-xs text-rose-600 hover:text-rose-700 font-medium text-center"
                >
                  Reset Progress for {currentStudent.name}
                </button>
              ) : (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs space-y-2 text-center">
                  <p className="font-semibold text-rose-800">
                    Are you sure? This will wipe all answers and test history for {currentStudent.name}.
                  </p>
                  <div className="flex items-center gap-2 justify-center">
                    <button
                      onClick={handleResetCurrent}
                      className="px-3 py-1 bg-rose-600 text-white rounded-lg font-bold"
                    >
                      Yes, Reset
                    </button>
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Create New Profile Form */
          <form onSubmit={handleCreateNew} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Student Full Name
              </label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g., Jordan Miller"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Academic Program / Role
              </label>
              <input
                type="text"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                placeholder="e.g., Medical Student / Biomedical Scholar"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Class / Cohort Year
              </label>
              <input
                type="text"
                value={newYear}
                onChange={(e) => setNewYear(e.target.value)}
                placeholder="e.g., GEDU404B Year 2"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700"
              >
                Save Profile
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-400 font-medium tracking-wide">done by Prabu and Mustafa</p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
