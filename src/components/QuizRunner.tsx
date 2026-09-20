import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Clock,
  Play,
  Pause,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw,
  Award,
  ListOrdered,
  Sparkles,
  HelpCircle,
  Zap,
  Check,
  X,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { MCQQuestion, SubjectId, TestSession, StudentProfile, Difficulty } from '../types';
import { SUBJECTS } from '../data/subjects';
import { getAllQuestions, getQuestionsBySubject } from '../data/questionsBank';
import {
  recordQuestionAnswer,
  toggleFlagQuestion,
  getStudentFlaggedQuestions,
  getStudentAnswers,
  saveTestSession,
} from '../services/storageService';

interface QuizRunnerProps {
  currentStudent: StudentProfile;
  initialSubject?: SubjectId | 'all';
  onTestCompleted?: () => void;
  onNavigateToAnalytics?: () => void;
}

export const QuizRunner: React.FC<QuizRunnerProps> = ({
  currentStudent,
  initialSubject = 'all',
  onTestCompleted,
  onNavigateToAnalytics,
}) => {
  // Setup State
  const [inQuiz, setInQuiz] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>(initialSubject);
  const [questionCount, setQuestionCount] = useState<number>(25);
  const [quizMode, setQuizMode] = useState<'study' | 'exam'>('study');
  const [timerMode, setTimerMode] = useState<'stopwatch' | 'timed'>('timed');
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(25); // default 1 min/q
  const [questionFilter, setQuestionFilter] = useState<'all' | 'unanswered' | 'flagged' | 'incorrect'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');

  // Active Quiz State
  const [activeQuestions, setActiveQuestions] = useState<MCQQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [flaggedIds, setFlaggedIds] = useState<number[]>([]);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showNavDrawer, setShowNavDrawer] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [questionTimes, setQuestionTimes] = useState<Record<number, number>>({});
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect' | 'flagged'>('all');

  // Timers ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentQuestionStartTimeRef = useRef<number>(Date.now());

  // Load flagged IDs on mount or student change
  useEffect(() => {
    setFlaggedIds(getStudentFlaggedQuestions(currentStudent.id));
  }, [currentStudent.id]);

  // Overall student answer stats for setup badges
  const studentAnswers = useMemo(() => getStudentAnswers(currentStudent.id), [currentStudent.id, inQuiz, isCompleted]);

  // Handle Timer
  useEffect(() => {
    if (!inQuiz || isCompleted || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeElapsed((prev) => {
        const next = prev + 1;
        // Check if timed limit reached
        if (timerMode === 'timed' && next >= timeLimitMinutes * 60) {
          handleAutoSubmit();
        }
        return next;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [inQuiz, isCompleted, isPaused, timerMode, timeLimitMinutes]);

  // Start a new test
  const handleStartQuiz = () => {
    const all = getAllQuestions();
    let pool: MCQQuestion[] = [];

    if (selectedSubject === 'all') {
      pool = [...all];
    } else {
      pool = getQuestionsBySubject(selectedSubject);
    }

    // Apply filter
    const answeredMap = getStudentAnswers(currentStudent.id);
    const userFlagged = getStudentFlaggedQuestions(currentStudent.id);

    if (questionFilter === 'unanswered') {
      const unanswered = pool.filter((q) => !answeredMap[q.id]);
      pool = unanswered.length > 0 ? unanswered : pool;
    } else if (questionFilter === 'flagged') {
      const flagged = pool.filter((q) => userFlagged.includes(q.id));
      pool = flagged.length > 0 ? flagged : pool;
    } else if (questionFilter === 'incorrect') {
      const incorrect = pool.filter((q) => answeredMap[q.id] && !answeredMap[q.id].isCorrect);
      pool = incorrect.length > 0 ? incorrect : pool;
    }

    // Apply difficulty filter if selected
    if (selectedDifficulty !== 'all') {
      const byDiff = pool.filter((q) => q.difficulty === selectedDifficulty);
      pool = byDiff.length > 0 ? byDiff : pool;
    }

    // Shuffle pool
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length));

    setActiveQuestions(selected);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setTimeElapsed(0);
    setIsPaused(false);
    setIsCompleted(false);
    setQuestionTimes({});
    currentQuestionStartTimeRef.current = Date.now();
    setInQuiz(true);
  };

  // Option selection
  const handleSelectOption = (optionIndex: number) => {
    if (isCompleted || isPaused) return;

    const currentQ = activeQuestions[currentIndex];
    if (!currentQ) return;

    // Record time spent on this question
    const timeSpentSoFar = Math.max(1, Math.round((Date.now() - currentQuestionStartTimeRef.current) / 1000));
    setQuestionTimes((prev) => ({
      ...prev,
      [currentQ.id]: (prev[currentQ.id] || 0) + timeSpentSoFar,
    }));
    currentQuestionStartTimeRef.current = Date.now();

    // If already answered in study mode, prevent changing to encourage deliberate choice
    if (quizMode === 'study' && selectedAnswers[currentQ.id] !== undefined) {
      return;
    }

    const updated = {
      ...selectedAnswers,
      [currentQ.id]: optionIndex,
    };
    setSelectedAnswers(updated);

    const isCorrect = optionIndex === currentQ.correctAnswer;
    recordQuestionAnswer(currentStudent.id, currentQ.id, optionIndex, isCorrect, timeSpentSoFar);
  };

  // Toggle flag
  const handleToggleFlag = (questionId: number) => {
    const isNowFlagged = toggleFlagQuestion(currentStudent.id, questionId);
    setFlaggedIds((prev) =>
      isNowFlagged ? [...prev, questionId] : prev.filter((id) => id !== questionId)
    );
  };

  // Navigate Questions
  const handlePrev = () => {
    if (currentIndex > 0) {
      currentQuestionStartTimeRef.current = Date.now();
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < activeQuestions.length - 1) {
      currentQuestionStartTimeRef.current = Date.now();
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowSubmitModal(true);
    }
  };

  // Submit test
  const handleConfirmSubmit = () => {
    setShowSubmitModal(false);
    finalizeTest();
  };

  const handleAutoSubmit = () => {
    finalizeTest();
  };

  const finalizeTest = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    activeQuestions.forEach((q) => {
      const selected = selectedAnswers[q.id];
      if (selected === undefined) {
        unansweredCount++;
      } else if (selected === q.correctAnswer) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const percentage = Math.round((correctCount / activeQuestions.length) * 100);

    const session: TestSession = {
      id: `test-${Date.now()}`,
      studentId: currentStudent.id,
      mode: quizMode,
      subjectFilter: selectedSubject,
      totalQuestions: activeQuestions.length,
      questions: activeQuestions,
      currentIndex: 0,
      answers: selectedAnswers,
      flaggedQuestionIds: flaggedIds,
      startTime: Date.now() - (timeElapsed * 1000),
      elapsedSeconds: timeElapsed,
      timeLimitSeconds: timerMode === 'timed' ? timeLimitMinutes * 60 : null,
      isCompleted: true,
      score: {
        correct: correctCount,
        incorrect: incorrectCount,
        unanswered: unansweredCount,
        percentage,
        totalTimeSpent: timeElapsed,
      },
    };

    saveTestSession(currentStudent.id, session);
    setIsCompleted(true);
    if (onTestCompleted) onTestCompleted();
  };

  // Timer formatting
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const remainingSeconds = timerMode === 'timed' ? Math.max(0, timeLimitMinutes * 60 - timeElapsed) : 0;
  const isTimeCritical = timerMode === 'timed' && remainingSeconds <= 60;
  const isTimeUrgent = timerMode === 'timed' && remainingSeconds <= 15;

  const currentQuestion = activeQuestions[currentIndex];

  // -------------------------------------------------------------
  // VIEW 1: RESULTS VIEW
  // -------------------------------------------------------------
  if (isCompleted) {
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;
    activeQuestions.forEach((q) => {
      const sel = selectedAnswers[q.id];
      if (sel === undefined) unanswered++;
      else if (sel === q.correctAnswer) correct++;
      else incorrect++;
    });

    const scorePct = Math.round((correct / activeQuestions.length) * 100);
    const avgSecPerQ = activeQuestions.length > 0 ? Math.round(timeElapsed / activeQuestions.length) : 0;

    const filteredReviewQuestions = activeQuestions.filter((q) => {
      const sel = selectedAnswers[q.id];
      if (reviewFilter === 'incorrect') return sel !== undefined && sel !== q.correctAnswer;
      if (reviewFilter === 'flagged') return flaggedIds.includes(q.id);
      return true;
    });

    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6" id="test-results-container">
        {/* Results Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500" />

          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-4 ring-8 ring-blue-50/50">
            <Award className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Test Simulation Complete</h2>
          <p className="text-slate-600 max-w-md mx-auto mb-6 text-sm">
            Great work, {currentStudent.name}! Your responses have been saved to your student performance profile.
          </p>

          {/* Metric Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Score</span>
              <span className={`text-3xl font-extrabold ${scorePct >= 75 ? 'text-emerald-600' : scorePct >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>
                {scorePct}%
              </span>
              <span className="text-xs text-slate-500 block mt-1">{correct} of {activeQuestions.length}</span>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Time Elapsed</span>
              <span className="text-2xl font-bold text-slate-800">{formatTime(timeElapsed)}</span>
              <span className="text-xs text-slate-500 block mt-1">{avgSecPerQ}s avg / question</span>
            </div>

            <div className="bg-emerald-50/50 border border-emerald-200/60 rounded-xl p-4">
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-1">Correct</span>
              <span className="text-2xl font-bold text-emerald-700">{correct}</span>
              <span className="text-xs text-emerald-600 block mt-1">Accuracy {scorePct}%</span>
            </div>

            <div className="bg-rose-50/50 border border-rose-200/60 rounded-xl p-4">
              <span className="text-xs font-semibold text-rose-700 uppercase tracking-wider block mb-1">Incorrect</span>
              <span className="text-2xl font-bold text-rose-700">{incorrect}</span>
              <span className="text-xs text-rose-600 block mt-1">{unanswered} skipped</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                setInQuiz(false);
                setIsCompleted(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors shadow-xs flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Configure New Quiz</span>
            </button>

            {onNavigateToAnalytics && (
              <button
                onClick={onNavigateToAnalytics}
                className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200 transition-colors flex items-center gap-2"
              >
                <span>View Full Student Analytics</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Detailed Question Review Walkthrough */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Question-by-Question Review</h3>
              <p className="text-xs text-slate-500">Inspect correct answers, diagnostic rationales, and clinical takeaways</p>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setReviewFilter('all')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  reviewFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({activeQuestions.length})
              </button>
              <button
                onClick={() => setReviewFilter('incorrect')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  reviewFilter === 'incorrect' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Incorrect ({incorrect})
              </button>
              <button
                onClick={() => setReviewFilter('flagged')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  reviewFilter === 'flagged' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Flagged ({activeQuestions.filter((q) => flaggedIds.includes(q.id)).length})
              </button>
            </div>
          </div>

          {/* List of reviewed questions */}
          <div className="divide-y divide-slate-100 mt-4 space-y-6">
            {filteredReviewQuestions.length === 0 ? (
              <div className="py-12 text-center text-slate-500">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500 mb-2 opacity-80" />
                <p className="font-semibold text-slate-700">No questions match this review filter.</p>
                <p className="text-xs text-slate-400">You achieved perfect accuracy for the selected criteria!</p>
              </div>
            ) : (
              filteredReviewQuestions.map((q, idx) => {
                const userSelected = selectedAnswers[q.id];
                const isUserCorrect = userSelected === q.correctAnswer;
                const isFlagged = flaggedIds.includes(q.id);

                return (
                  <div key={q.id} className="pt-6 first:pt-2">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                          userSelected === undefined
                            ? 'bg-slate-200 text-slate-700'
                            : isUserCorrect
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-rose-100 text-rose-700'
                        }`}>
                          {activeQuestions.findIndex((item) => item.id === q.id) + 1}
                        </span>
                        <span className="text-xs font-medium text-slate-500">
                          Question #{q.id} • {q.subjectName}
                        </span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {q.subtopic}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleFlag(q.id)}
                          className={`p-1 rounded-md text-xs transition-colors ${
                            isFlagged ? 'text-amber-600 bg-amber-50' : 'text-slate-400 hover:text-slate-600'
                          }`}
                          title="Bookmark question"
                        >
                          <Bookmark className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                    </div>

                    <h4 className="text-base font-semibold text-slate-900 mb-4 leading-relaxed">
                      {q.question}
                    </h4>

                    {/* Options list */}
                    <div className="space-y-2 mb-4">
                      {q.options.map((opt, optIdx) => {
                        const isCorrectOpt = optIdx === q.correctAnswer;
                        const isUserChoice = optIdx === userSelected;

                        let styleClasses = 'border-slate-200 bg-slate-50/50 text-slate-700';
                        if (isCorrectOpt) {
                          styleClasses = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold ring-1 ring-emerald-500';
                        } else if (isUserChoice && !isUserCorrect) {
                          styleClasses = 'border-rose-400 bg-rose-50 text-rose-900 line-through';
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`flex items-center justify-between p-3 rounded-xl border text-sm transition-all ${styleClasses}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-lg bg-white border border-slate-300 font-bold text-xs flex items-center justify-center shrink-0">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                            </div>

                            {isCorrectOpt && (
                              <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 shrink-0">
                                <Check className="w-4 h-4" /> Correct
                              </span>
                            )}
                            {isUserChoice && !isUserCorrect && (
                              <span className="flex items-center gap-1 text-xs font-bold text-rose-700 shrink-0">
                                <X className="w-4 h-4" /> Your Pick
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Scientific Explanation Card */}
                    <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl p-4 text-xs space-y-2">
                      <div className="flex items-center gap-1.5 font-bold text-blue-900">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span>Explanation & Mechanism</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{q.explanation}</p>
                      {q.keyTakeaway && (
                        <div className="pt-2 border-t border-blue-200/60 flex items-start gap-2">
                          <span className="font-bold text-blue-800 shrink-0">Key Concept:</span>
                          <span className="text-slate-700 font-medium">{q.keyTakeaway}</span>
                        </div>
                      )}
                      {q.sourceReference && (
                        <div className="text-[11px] text-blue-600 italic">
                          Source: {q.sourceReference}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: ACTIVE QUESTION RUNNER
  // -------------------------------------------------------------
  if (inQuiz && currentQuestion) {
    const isAnswered = selectedAnswers[currentQuestion.id] !== undefined;
    const userSelectedOption = selectedAnswers[currentQuestion.id];
    const isCurrentFlagged = flaggedIds.includes(currentQuestion.id);

    return (
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6" id="active-quiz-container">
        {/* Top Floating Action Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-6 sticky top-20 z-30">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Question counter and status */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 uppercase">Question</span>
                <span className="text-lg font-extrabold text-slate-900">
                  {currentIndex + 1}
                  <span className="text-slate-400 font-medium text-sm"> / {activeQuestions.length}</span>
                </span>
              </div>

              {/* Progress bar */}
              <div className="hidden sm:block w-32 h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Middle: Subject and Subtopic Badges */}
            <div className="hidden md:flex items-center gap-2 truncate">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 truncate">
                {currentQuestion.subjectName}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 truncate">
                {currentQuestion.subtopic}
              </span>
            </div>

            {/* Right: Timer & Tools */}
            <div className="flex items-center gap-2">
              {/* Timer Display */}
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-sm font-mono font-bold transition-all ${
                  isTimeUrgent
                    ? 'bg-rose-500 text-white border-rose-600 animate-pulse ring-4 ring-rose-200'
                    : isTimeCritical
                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>
                  {timerMode === 'timed' ? formatTime(remainingSeconds) : formatTime(timeElapsed)}
                </span>
              </div>

              {/* Pause Toggle */}
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                title={isPaused ? 'Resume Test' : 'Pause Test'}
              >
                {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4" />}
              </button>

              {/* Flag Question */}
              <button
                onClick={() => handleToggleFlag(currentQuestion.id)}
                className={`p-2 rounded-xl border transition-colors ${
                  isCurrentFlagged
                    ? 'border-amber-400 bg-amber-50 text-amber-600'
                    : 'border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                }`}
                title="Flag / Bookmark question"
              >
                <Bookmark className={`w-4 h-4 ${isCurrentFlagged ? 'fill-current' : ''}`} />
              </button>

              {/* Grid Overview Toggle */}
              <button
                onClick={() => setShowNavDrawer(!showNavDrawer)}
                className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors relative"
                title="Question Grid Navigator"
              >
                <ListOrdered className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Pause Overlay */}
        {isPaused && (
          <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-xl p-12 text-center my-12">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <Pause className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Test Paused</h3>
            <p className="text-slate-600 text-sm max-w-sm mx-auto mb-6">
              Timer is currently suspended. Content is obscured to maintain exam integrity.
            </p>
            <button
              onClick={() => setIsPaused(false)}
              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-all shadow-md flex items-center gap-2 mx-auto"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Resume Test</span>
            </button>
          </div>
        )}

        {/* Question Card (visible when not paused) */}
        {!isPaused && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-6 relative">
            {/* Header info */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {currentQuestion.difficulty}
                </span>
                <span className="text-xs text-slate-400 font-mono">Q#{currentQuestion.id}</span>
              </div>
              {quizMode === 'study' && (
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Study Mode (Instant Feedback)
                </span>
              )}
            </div>

            {/* Question Stem */}
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 leading-relaxed mb-6">
              {currentQuestion.question}
            </h3>

            {/* Options */}
            <div className="space-y-3 mb-6" role="radiogroup">
              {currentQuestion.options.map((opt, optIdx) => {
                const isSelected = userSelectedOption === optIdx;
                const isCorrect = optIdx === currentQuestion.correctAnswer;
                const showStudyFeedback = quizMode === 'study' && isAnswered;

                let buttonStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800 hover:border-slate-300';

                if (showStudyFeedback) {
                  if (isCorrect) {
                    buttonStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500 font-semibold';
                  } else if (isSelected && !isCorrect) {
                    buttonStyle = 'border-rose-500 bg-rose-50 text-rose-950 ring-2 ring-rose-500';
                  } else {
                    buttonStyle = 'border-slate-200 bg-slate-50/50 text-slate-400';
                  }
                } else if (isSelected) {
                  buttonStyle = 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-600 font-semibold';
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={showStudyFeedback}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 group cursor-pointer disabled:cursor-default ${buttonStyle}`}
                  >
                    <span className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                      showStudyFeedback && isCorrect
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : showStudyFeedback && isSelected
                        ? 'bg-rose-600 text-white border-rose-600'
                        : isSelected
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-100 text-slate-700 border-slate-200 group-hover:border-slate-300'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <div className="flex-1 pt-0.5 text-sm sm:text-base leading-snug">
                      {opt}
                    </div>

                    {showStudyFeedback && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    {showStudyFeedback && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Study Mode Explanation Box */}
            {quizMode === 'study' && isAnswered && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 mb-2">
                  {userSelectedOption === currentQuestion.correctAnswer ? (
                    <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Correct Answer!</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-rose-700 font-bold text-sm">
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>Incorrect • Correct choice is {String.fromCharCode(65 + currentQuestion.correctAnswer)}</span>
                    </div>
                  )}
                </div>

                <p className="text-slate-700 text-sm leading-relaxed mb-3">
                  {currentQuestion.explanation}
                </p>

                {currentQuestion.keyTakeaway && (
                  <div className="p-3 bg-blue-50/70 border border-blue-200/70 rounded-lg text-xs flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-blue-900 block">High-Yield Takeaway</span>
                      <span className="text-slate-700">{currentQuestion.keyTakeaway}</span>
                    </div>
                  </div>
                )}
                {currentQuestion.sourceReference && (
                  <div className="text-[11px] text-slate-500 italic mt-2">
                    Course Reference: {currentQuestion.sourceReference}
                  </div>
                )}
              </div>
            )}

            {/* Bottom Controls */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="px-4 py-2.5 rounded-xl border border-rose-200 text-rose-700 font-semibold text-sm hover:bg-rose-50 transition-colors"
                >
                  End Test
                </button>

                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <span>{currentIndex === activeQuestions.length - 1 ? 'Review & Submit' : 'Next Question'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Question Grid Navigator Modal / Drawer */}
        {showNavDrawer && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Question Navigator</h4>
                  <p className="text-xs text-slate-500">Jump directly to any question</p>
                </div>
                <button
                  onClick={() => setShowNavDrawer(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-3 text-xs mb-4 p-2.5 bg-slate-50 rounded-xl">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-blue-600" /> Answered
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full border-2 border-slate-300" /> Unanswered
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-400" /> Flagged
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full ring-2 ring-blue-600 ring-offset-1" /> Current
                </span>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-5 sm:grid-cols-8 gap-2 mb-6">
                {activeQuestions.map((q, idx) => {
                  const isAns = selectedAnswers[q.id] !== undefined;
                  const isCur = idx === currentIndex;
                  const isFlag = flaggedIds.includes(q.id);

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        currentQuestionStartTimeRef.current = Date.now();
                        setCurrentIndex(idx);
                        setShowNavDrawer(false);
                      }}
                      className={`h-10 rounded-xl font-bold text-xs flex items-center justify-center relative transition-all ${
                        isCur
                          ? 'ring-2 ring-blue-600 ring-offset-2 bg-blue-600 text-white'
                          : isAns
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {idx + 1}
                      {isFlag && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500" />
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  setShowNavDrawer(false);
                  setShowSubmitModal(true);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors"
              >
                Proceed to Submit Test
              </button>
            </div>
          </div>
        )}

        {/* Submit Confirmation Modal */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-1">Submit Test Simulation?</h4>
              <p className="text-xs text-slate-500 mb-4">
                You have answered{' '}
                <span className="font-bold text-slate-800">
                  {Object.keys(selectedAnswers).length}
                </span>{' '}
                of <span className="font-bold text-slate-800">{activeQuestions.length}</span> questions.
                {activeQuestions.length - Object.keys(selectedAnswers).length > 0 && (
                  <span className="text-rose-600 font-semibold block mt-1">
                    {activeQuestions.length - Object.keys(selectedAnswers).length} questions remain unanswered.
                  </span>
                )}
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
                >
                  Continue Test
                </button>
                <button
                  onClick={handleConfirmSubmit}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors shadow-xs"
                >
                  Yes, Submit Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 3: QUIZ SETUP CONFIGURATION SCREEN
  // -------------------------------------------------------------
  const subjectOptions = [
    { id: 'all' as const, name: 'All 4 Curriculum Modules (Full 400 MCQ Bank)', questions: 400, color: 'border-blue-500' },
    ...SUBJECTS.map((s) => ({
      id: s.id,
      name: s.name,
      questions: s.totalQuestions,
      color: 'border-slate-300',
    })),
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6" id="quiz-setup-container">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GEDU404B / 2602 Curriculum Modules</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Practice & Timed Exam Simulator
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            Test your knowledge across 400 curated questions strictly from your 4 GEDU404B modules: Cardiovascular (Mod 7), Tissues & Integumentary (Mod 5), Blood & Hematology (Mod 6), and Respiratory (Mod 8).
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Full Explanations & Notes</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Timed Pacing Simulator</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Dynamic Leaderboard Points</span>
            </span>
          </div>
        </div>
      </div>

      {/* Setup Form */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
        {/* 1. Subject Selection */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-3">
            1. Select Academic Subject
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {subjectOptions.map((opt) => {
              const isSel = selectedSubject === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedSubject(opt.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                    isSel
                      ? 'border-blue-600 bg-blue-50/70 text-blue-950 ring-2 ring-blue-600 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
                  }`}
                >
                  <div className="truncate pr-2">
                    <span className="text-sm font-semibold block truncate">{opt.name}</span>
                    <span className="text-xs text-slate-500">{opt.questions} Questions</span>
                  </div>
                  {isSel && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Mode Selection */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-3">
            2. Choose Quiz Mode
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setQuizMode('study')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                quizMode === 'study'
                  ? 'border-blue-600 bg-blue-50/80 text-blue-950 ring-2 ring-blue-600'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Study Mode (Immediate Rationales)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive immediate correct/incorrect color feedback after each option click, with detailed biological rationales and key takeaways.
              </p>
            </button>

            <button
              onClick={() => setQuizMode('exam')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                quizMode === 'exam'
                  ? 'border-blue-600 bg-blue-50/80 text-blue-950 ring-2 ring-blue-600'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5 font-bold text-sm">
                <Zap className="w-4 h-4 text-blue-600" />
                <span>Exam Simulation (Timed, Score at End)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Realistic exam conditions. No answers or hints are revealed until you complete and submit the test for full scoring and analytics.
              </p>
            </button>
          </div>
        </div>

        {/* 3. Number of Questions & Difficulty */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3">
              3. Number of Questions
            </label>
            <div className="flex flex-wrap gap-2">
              {[10, 25, 50, 100].map((count) => (
                <button
                  key={count}
                  onClick={() => {
                    setQuestionCount(count);
                    setTimeLimitMinutes(count); // default 1 min / question
                  }}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    questionCount === count
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {count} Questions
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3">
              Difficulty Tier
            </label>
            <div className="flex flex-wrap gap-2">
              {(['all', 'Medium', 'Hard', 'Easy'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    selectedDifficulty === diff
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {diff === 'all' ? 'All Tiers' : diff}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Filter by question complexity (e.g. Medium & Hard for clinical exam preparation).
            </p>
          </div>
        </div>

        {/* 4. Timer Settings */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-3">
            4. Timer & Pace Settings
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setTimerMode('timed')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    timerMode === 'timed' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  Countdown Timer
                </button>
                <button
                  onClick={() => setTimerMode('stopwatch')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    timerMode === 'stopwatch' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  Untimed (Stopwatch)
                </button>
              </div>

              {timerMode === 'timed' && (
                <div className="pt-2 flex items-center gap-2">
                  <span className="text-xs text-slate-600 font-medium">Time Limit:</span>
                  <select
                    value={timeLimitMinutes}
                    onChange={(e) => setTimeLimitMinutes(Number(e.target.value))}
                    className="p-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white"
                  >
                    <option value={10}>10 Minutes (~1 min/q)</option>
                    <option value={15}>15 Minutes</option>
                    <option value={25}>25 Minutes</option>
                    <option value={30}>30 Minutes</option>
                    <option value={50}>50 Minutes</option>
                    <option value={60}>60 Minutes</option>
                    <option value={120}>120 Minutes</option>
                  </select>
                </div>
              )}
            </div>

            {/* Question Filter (unanswered, flagged, etc) */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-700 block">Question Bank Filter:</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setQuestionFilter('all')}
                  className={`p-2 rounded-lg border text-left font-medium ${
                    questionFilter === 'all' ? 'border-blue-500 bg-blue-50 text-blue-900 font-bold' : 'border-slate-200'
                  }`}
                >
                  All Questions
                </button>
                <button
                  onClick={() => setQuestionFilter('unanswered')}
                  className={`p-2 rounded-lg border text-left font-medium ${
                    questionFilter === 'unanswered' ? 'border-blue-500 bg-blue-50 text-blue-900 font-bold' : 'border-slate-200'
                  }`}
                >
                  Unanswered Only
                </button>
                <button
                  onClick={() => setQuestionFilter('flagged')}
                  className={`p-2 rounded-lg border text-left font-medium ${
                    questionFilter === 'flagged' ? 'border-blue-500 bg-blue-50 text-blue-900 font-bold' : 'border-slate-200'
                  }`}
                >
                  Bookmarked Only
                </button>
                <button
                  onClick={() => setQuestionFilter('incorrect')}
                  className={`p-2 rounded-lg border text-left font-medium ${
                    questionFilter === 'incorrect' ? 'border-blue-500 bg-blue-50 text-blue-900 font-bold' : 'border-slate-200'
                  }`}
                >
                  Previously Missed
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Current student:{' '}
            <span className="font-bold text-slate-800">{currentStudent.name}</span>
          </div>
          <button
            id="btn-launch-quiz"
            onClick={handleStartQuiz}
            className="px-8 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-base hover:bg-blue-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Launch Test Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};
