import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Bookmark,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  BookOpen,
  ArrowRight,
  Layers,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { MCQQuestion, SubjectId, StudentProfile, Difficulty } from '../types';
import { SUBJECTS } from '../data/subjects';
import { getAllQuestions } from '../data/questionsBank';
import {
  getStudentAnswers,
  getStudentFlaggedQuestions,
  toggleFlagQuestion,
  recordQuestionAnswer,
} from '../services/storageService';

interface QuestionExplorerProps {
  currentStudent: StudentProfile;
  onSelectPracticeQuestion?: (q: MCQQuestion) => void;
}

export const QuestionExplorer: React.FC<QuestionExplorerProps> = ({
  currentStudent,
  onSelectPracticeQuestion,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unanswered' | 'correct' | 'incorrect' | 'flagged'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'all'>('all');
  const [expandedQuestionId, setExpandedQuestionId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [jumpPageInput, setJumpPageInput] = useState<string>('');
  const [flaggedIds, setFlaggedIds] = useState<number[]>(() =>
    getStudentFlaggedQuestions(currentStudent.id)
  );

  const PAGE_SIZE = 20;

  // Retrieve user answers map
  const answersMap = useMemo(() => getStudentAnswers(currentStudent.id), [currentStudent.id]);

  const allQuestions = useMemo(() => getAllQuestions(), []);

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((q) => {
      // Subject filter
      if (selectedSubject !== 'all' && q.subjectId !== selectedSubject) {
        return false;
      }

      // Difficulty filter
      if (difficultyFilter !== 'all' && q.difficulty !== difficultyFilter) {
        return false;
      }

      // Status filter
      const record = answersMap[q.id];
      const isFlagged = flaggedIds.includes(q.id);

      if (statusFilter === 'unanswered' && record) return false;
      if (statusFilter === 'correct' && (!record || !record.isCorrect)) return false;
      if (statusFilter === 'incorrect' && (!record || record.isCorrect)) return false;
      if (statusFilter === 'flagged' && !isFlagged) return false;

      // Keyword Search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const inQuestion = q.question.toLowerCase().includes(query);
        const inExpl = q.explanation.toLowerCase().includes(query);
        const inSub = q.subtopic.toLowerCase().includes(query);
        const inOptions = q.options.some((opt) => opt.toLowerCase().includes(query));
        const inId = q.id.toString() === query || `#${q.id}` === query;
        if (!inQuestion && !inExpl && !inSub && !inOptions && !inId) {
          return false;
        }
      }

      return true;
    });
  }, [allQuestions, selectedSubject, difficultyFilter, statusFilter, searchTerm, answersMap, flaggedIds]);

  const totalPages = Math.ceil(filteredQuestions.length / PAGE_SIZE) || 1;
  const paginatedQuestions = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredQuestions.slice(start, start + PAGE_SIZE);
  }, [filteredQuestions, currentPage]);

  const handleToggleBookmark = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const isNowFlagged = toggleFlagQuestion(currentStudent.id, id);
    setFlaggedIds((prev) =>
      isNowFlagged ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const handleJumpToPage = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseInt(jumpPageInput, 10);
    if (!isNaN(p) && p >= 1 && p <= totalPages) {
      setCurrentPage(p);
      setJumpPageInput('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6" id="question-explorer-container">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">1,000 Questions Repository</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              {allQuestions.length} Questions Indexed
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Browse, search, review rationales, and bookmark across all 8 academic modules.
          </p>
        </div>

        {/* Global Bank Progress Meter */}
        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs flex items-center gap-4">
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase">Bank Coverage</div>
            <div className="text-base font-extrabold text-slate-900">
              {Object.keys(answersMap).length} <span className="text-xs font-normal text-slate-500">/ 1,000</span>
            </div>
          </div>
          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{ width: `${(Object.keys(answersMap).length / 1000) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Controls Card: Search & Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search questions by keyword, anatomical term, mechanism, or Q# (e.g., 'hematocrit', 'mitral', '7.3', '#42')..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm placeholder:text-slate-400 bg-slate-50/50"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 bg-slate-200 px-2 py-1 rounded"
            >
              Clear
            </button>
          )}
        </div>

        {/* Subject Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => {
              setSelectedSubject('all');
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
              selectedSubject === 'all'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Subjects (1,000)
          </button>
          {SUBJECTS.map((sub) => {
            const isSel = selectedSubject === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  setSelectedSubject(sub.id);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                  isSel
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {sub.shortName} ({sub.totalQuestions})
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Chips */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          {/* Status */}
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-500">Status:</span>
            {(['all', 'unanswered', 'correct', 'incorrect', 'flagged'] as const).map((st) => (
              <button
                key={st}
                onClick={() => {
                  setStatusFilter(st);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-md capitalize transition-colors ${
                  statusFilter === st
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Difficulty */}
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-500">Difficulty:</span>
            {(['all', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => {
                  setDifficultyFilter(diff);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  difficultyFilter === diff
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count & Pagination Nav Top */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
        <span>
          Showing <span className="font-bold text-slate-800">{filteredQuestions.length}</span> questions
          {filteredQuestions.length > 0 && ` • Page ${currentPage} of ${totalPages}`}
        </span>

        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-30"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-mono font-bold text-slate-700">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-30"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {paginatedQuestions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            <BookOpen className="w-10 h-10 mx-auto text-slate-300 mb-3" />
            <p className="font-bold text-slate-700 text-base">No questions found matching your filters</p>
            <p className="text-xs text-slate-400 mt-1">
              Try adjusting your search query, subject filter, or status toggles.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSubject('all');
                setStatusFilter('all');
                setDifficultyFilter('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-blue-50 text-blue-700 font-semibold text-xs hover:bg-blue-100"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          paginatedQuestions.map((q) => {
            const isExpanded = expandedQuestionId === q.id;
            const record = answersMap[q.id];
            const isFlagged = flaggedIds.includes(q.id);

            return (
              <div
                key={q.id}
                className={`bg-white rounded-xl border transition-all ${
                  isExpanded ? 'border-blue-400 shadow-sm ring-1 ring-blue-400/20' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Header Row (Always visible) */}
                <div
                  onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                  className="p-4 flex items-start justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-slate-200">
                      #{q.id}
                    </span>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700">
                          {q.subjectName}
                        </span>
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                          {q.subtopic}
                        </span>
                        <span className="text-[11px] font-medium text-slate-400">
                          {q.difficulty}
                        </span>

                        {/* Status Icon */}
                        {record && (
                          <span
                            className={`flex items-center gap-1 text-[11px] font-bold px-1.5 py-0.5 rounded ${
                              record.isCorrect
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-rose-50 text-rose-700'
                            }`}
                          >
                            {record.isCorrect ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            {record.isCorrect ? 'Correct' : 'Missed'}
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                        {q.question}
                      </h3>
                    </div>
                  </div>

                  {/* Right Action Icons */}
                  <div className="flex items-center gap-1.5 shrink-0 pt-1">
                    <button
                      onClick={(e) => handleToggleBookmark(q.id, e)}
                      className={`p-1.5 rounded-lg border text-xs transition-colors ${
                        isFlagged
                          ? 'border-amber-300 bg-amber-50 text-amber-600'
                          : 'border-slate-200 text-slate-400 hover:text-slate-600'
                      }`}
                      title={isFlagged ? 'Remove Bookmark' : 'Bookmark Question'}
                    >
                      <Bookmark className={`w-4 h-4 ${isFlagged ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
                      title={isExpanded ? 'Collapse' : 'Expand'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Drawer: Options & Rationales */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-3">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Options & Verified Correct Answer
                    </div>

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isCorrect = optIdx === q.correctAnswer;
                        const wasUserSelected = record?.selectedOption === optIdx;

                        return (
                          <div
                            key={optIdx}
                            className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 ${
                              isCorrect
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                                : wasUserSelected
                                ? 'bg-rose-50 border-rose-300 text-rose-950 line-through'
                                : 'bg-white border-slate-200 text-slate-700'
                            }`}
                          >
                            <span className="w-5 h-5 rounded-md font-bold text-xs bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="flex-1 pt-0.5">{opt}</span>
                            {isCorrect && (
                              <span className="text-xs font-bold text-emerald-700 shrink-0">
                                ✓ Correct Answer
                              </span>
                            )}
                            {wasUserSelected && !isCorrect && (
                              <span className="text-xs font-bold text-rose-700 shrink-0">
                                ✗ Your Response
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Scientific Explanation */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs space-y-2">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span>Explanation & Mechanism</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{q.explanation}</p>
                      {q.keyTakeaway && (
                        <div className="pt-2 border-t border-slate-100 flex items-start gap-1.5 text-blue-900 font-medium">
                          <span className="font-bold shrink-0">Clinical Pearl:</span>
                          <span>{q.keyTakeaway}</span>
                        </div>
                      )}
                      {q.sourceReference && (
                        <div className="text-[11px] text-slate-400 italic">
                          Reference: {q.sourceReference}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Nav Bottom */}
      {totalPages > 1 && (
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-xs text-xs">
          <div className="text-slate-600">
            Page <span className="font-bold text-slate-900">{currentPage}</span> of{' '}
            <span className="font-bold text-slate-900">{totalPages}</span> ({filteredQuestions.length} questions)
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 font-semibold disabled:opacity-40"
            >
              Previous
            </button>

            {/* Quick jump to page */}
            <form onSubmit={handleJumpToPage} className="flex items-center gap-1.5">
              <span className="text-slate-400">Go to:</span>
              <input
                type="number"
                min={1}
                max={totalPages}
                value={jumpPageInput}
                onChange={(e) => setJumpPageInput(e.target.value)}
                placeholder="#"
                className="w-12 px-2 py-1 rounded border border-slate-200 text-center font-mono"
              />
            </form>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 font-semibold disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
