export type SubjectId = 
  | 'cardiovascular'
  | 'tissues_integumentary'
  | 'blood_hematology'
  | 'respiratory';

export interface SubjectMeta {
  id: SubjectId;
  name: string;
  shortName: string;
  iconName: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  description: string;
  totalQuestions: number;
}

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface MCQQuestion {
  id: number;
  subjectId: SubjectId;
  subjectName: string;
  subtopic: string;
  question: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0, 1, 2, 3
  explanation: string;
  keyTakeaway?: string;
  difficulty: Difficulty;
  sourceReference?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  avatarSeed: string;
  role: string;
  collegeYear: string;
  createdAt: string;
}

export interface QuestionAnswerRecord {
  questionId: number;
  selectedOption: number;
  isCorrect: boolean;
  timeSpentSeconds: number;
  answeredAt: string;
}

export interface TestSession {
  id: string;
  studentId: string;
  mode: 'study' | 'exam';
  subjectFilter: SubjectId | 'all';
  totalQuestions: number;
  questions: MCQQuestion[];
  currentIndex: number;
  answers: Record<number, number>; // questionId -> selectedOptionIndex
  flaggedQuestionIds: number[];
  startTime: number;
  elapsedSeconds: number;
  timeLimitSeconds: number | null; // null for untimed/stopwatch
  isCompleted: boolean;
  score?: {
    correct: number;
    incorrect: number;
    unanswered: number;
    percentage: number;
    totalTimeSpent: number;
  };
}

export interface StudentAnalytics {
  totalAnswered: number;
  totalCorrect: number;
  totalIncorrect: number;
  accuracyRate: number;
  overallCompletionRate: number; // out of 1000
  averageTimePerQuestion: number;
  totalStudyTimeSeconds: number;
  streakDays: number;
  subjectPerformance: Record<SubjectId, {
    attempted: number;
    correct: number;
    total: number;
    accuracy: number;
  }>;
  recentTestSessions: {
    id: string;
    date: string;
    subject: string;
    score: number;
    total: number;
    percentage: number;
    timeSpent: number;
  }[];
}

export interface LeaderboardEntry {
  rank: number;
  studentId: string;
  studentName: string;
  avatarBg: string;
  points: number;
  questionsCompleted: number;
  accuracy: number;
  streak: number;
  badge: string;
  isCurrentUser: boolean;
  tier?: 'Grandmaster' | 'Master' | 'Diamond' | 'Platinum' | 'Gold';
  specialty?: string;
  avgTimePerQ?: number;
  isOnline?: boolean;
  lastActive?: string;
}
