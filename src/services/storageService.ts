import { StudentProfile, QuestionAnswerRecord, TestSession, StudentAnalytics, LeaderboardEntry, SubjectId } from '../types';
import { getAllQuestions } from '../data/questionsBank';
import { SUBJECTS } from '../data/subjects';

const STORAGE_KEYS = {
  CURRENT_STUDENT: 'medpulse_current_student',
  STUDENT_PROFILES: 'medpulse_student_profiles',
  ANSWERS_PREFIX: 'medpulse_answers_',
  FLAGGED_PREFIX: 'medpulse_flagged_',
  TEST_SESSIONS_PREFIX: 'medpulse_sessions_',
};

export const DEFAULT_PROFILES: StudentProfile[] = [];

// Pre-seeded peer students for the class leaderboard
export const PEER_STUDENTS: Array<{
  id: string;
  name: string;
  avatarBg: string;
  baseQuestions: number;
  baseAccuracy: number;
  streak: number;
  badge: string;
  tier: 'Grandmaster' | 'Master' | 'Diamond' | 'Platinum' | 'Gold';
  specialty: string;
  avgTimePerQ: number;
}> = [
  { id: 'peer-prabu', name: 'Prabu', avatarBg: 'bg-indigo-600', baseQuestions: 960, baseAccuracy: 97.5, streak: 28, badge: 'Platform Founder • Grandmaster 👑', tier: 'Grandmaster', specialty: 'Human Anatomy & Physiology Master', avgTimePerQ: 34 },
  { id: 'peer-mustafa', name: 'Mustafa', avatarBg: 'bg-emerald-600', baseQuestions: 945, baseAccuracy: 96.8, streak: 25, badge: 'Platform Founder • Grandmaster ⚡', tier: 'Grandmaster', specialty: 'Cardiovascular & Histology Master', avgTimePerQ: 36 },
  { id: 'peer-zainab', name: 'Zainab Qureshi', avatarBg: 'bg-purple-600', baseQuestions: 820, baseAccuracy: 93.2, streak: 19, badge: 'Diamond Honor Scholar 💎', tier: 'Diamond', specialty: 'Hematology & Blood Dynamics', avgTimePerQ: 41 },
  { id: 'peer-elena', name: 'Elena Rostova', avatarBg: 'bg-blue-600', baseQuestions: 770, baseAccuracy: 91.5, streak: 16, badge: 'Cardio Specialist 💎', tier: 'Diamond', specialty: 'Cardiorespiratory Dynamics', avgTimePerQ: 44 },
  { id: 'peer-jordan', name: 'Jordan Lee', avatarBg: 'bg-indigo-500', baseQuestions: 690, baseAccuracy: 89.4, streak: 14, badge: 'Hematology Pro 🏆', tier: 'Platinum', specialty: 'Blood Cells & Hemostasis', avgTimePerQ: 46 },
  { id: 'peer-priya', name: 'Priya Sharma', avatarBg: 'bg-rose-600', baseQuestions: 620, baseAccuracy: 90.1, streak: 12, badge: 'Histology Ace 🏆', tier: 'Platinum', specialty: 'Epithelial & Connective Tissues', avgTimePerQ: 48 },
  { id: 'peer-liam', name: 'Liam O’Connor', avatarBg: 'bg-amber-600', baseQuestions: 540, baseAccuracy: 86.3, streak: 9, badge: 'Respirometry Scholar 🥇', tier: 'Gold', specialty: 'Pulmonary Volumes & Gas Exchange', avgTimePerQ: 51 },
  { id: 'peer-sophia', name: 'Sophia Martinez', avatarBg: 'bg-pink-600', baseQuestions: 480, baseAccuracy: 87.0, streak: 8, badge: 'Genetics Master 🥇', tier: 'Gold', specialty: 'Cell Biology & Cytology', avgTimePerQ: 53 },
  { id: 'peer-noah', name: 'Noah Kim', avatarBg: 'bg-teal-600', baseQuestions: 410, baseAccuracy: 83.5, streak: 6, badge: 'Biomechanics Explorer 🥇', tier: 'Gold', specialty: 'Skeletal & Muscular Systems', avgTimePerQ: 55 },
  { id: 'peer-chloe', name: 'Chloe Bennett', avatarBg: 'bg-cyan-600', baseQuestions: 360, baseAccuracy: 81.2, streak: 5, badge: 'Chemistry Whiz 🥇', tier: 'Gold', specialty: 'Medical Biophysics & Fluids', avgTimePerQ: 58 },
];

export function getStoredProfiles(): StudentProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STUDENT_PROFILES);
    let list: StudentProfile[] = [];
    if (raw) {
      const parsed: StudentProfile[] = JSON.parse(raw);
      list = parsed.filter(
        (p) =>
          p.id !== 'student-primary' &&
          p.id !== 'student-alex' &&
          p.id !== 'student-marcus' &&
          p.name !== 'Stephanie Miller' &&
          p.name !== 'Alex Chen' &&
          p.name !== 'Marcus Vance'
      );
    }
    if (list.length === 0) {
      const defaultUser: StudentProfile = {
        id: 'student-mustafa-prabu',
        name: 'Student Scholar',
        avatarSeed: 'SS',
        role: 'Medical & Health Science Student',
        collegeYear: 'GEDU404B Year 2',
        createdAt: new Date().toISOString(),
      };
      list = [defaultUser];
      localStorage.setItem(STORAGE_KEYS.STUDENT_PROFILES, JSON.stringify(list));
      localStorage.setItem(STORAGE_KEYS.CURRENT_STUDENT, JSON.stringify(defaultUser));
    } else if (raw && JSON.parse(raw).length !== list.length) {
      localStorage.setItem(STORAGE_KEYS.STUDENT_PROFILES, JSON.stringify(list));
    }
    return list;
  } catch {
    return [{
      id: 'student-mustafa-prabu',
      name: 'Student Scholar',
      avatarSeed: 'SS',
      role: 'Medical & Health Science Student',
      collegeYear: 'GEDU404B Year 2',
      createdAt: new Date().toISOString(),
    }];
  }
}

export function getCurrentStudent(): StudentProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_STUDENT);
    if (raw) {
      const parsed: StudentProfile = JSON.parse(raw);
      if (
        parsed.id !== 'student-primary' &&
        parsed.id !== 'student-alex' &&
        parsed.id !== 'student-marcus' &&
        parsed.name !== 'Stephanie Miller' &&
        parsed.name !== 'Alex Chen' &&
        parsed.name !== 'Marcus Vance'
      ) {
        return parsed;
      }
    }
  } catch {}
  const profiles = getStoredProfiles();
  if (profiles.length > 0) {
    setCurrentStudent(profiles[0]);
    return profiles[0];
  }
  // Default clean profile for Mustafa & Prabu platform
  const defaultUser: StudentProfile = {
    id: 'student-mustafa-prabu',
    name: 'Student Scholar',
    avatarSeed: 'SS',
    role: 'Medical & Health Science Student',
    collegeYear: 'GEDU404B Year 2',
    createdAt: new Date().toISOString(),
  };
  setCurrentStudent(defaultUser);
  return defaultUser;
}

export function setCurrentStudent(student: StudentProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_STUDENT, JSON.stringify(student));
  } catch {}
}

export function deleteStudentProfile(studentId: string): StudentProfile[] {
  const profiles = getStoredProfiles().filter((p) => p.id !== studentId);
  try {
    localStorage.setItem(STORAGE_KEYS.STUDENT_PROFILES, JSON.stringify(profiles));
    resetStudentProgress(studentId);
    // If deleted student was current student, select the next available or fallback
    const current = getCurrentStudent();
    if (current.id === studentId) {
      if (profiles.length > 0) {
        setCurrentStudent(profiles[0]);
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_STUDENT);
      }
    }
  } catch {}
  return profiles;
}

export function saveNewStudentProfile(name: string, role: string, year: string): StudentProfile {
  const profiles = getStoredProfiles();
  const initials = name.trim().split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase() || 'ST';
  const newProfile: StudentProfile = {
    id: `student-${Date.now()}`,
    name: name.trim(),
    avatarSeed: initials,
    role: role.trim() || 'Health Sciences Student',
    collegeYear: year.trim() || 'Year 1',
    createdAt: new Date().toISOString(),
  };
  profiles.push(newProfile);
  try {
    localStorage.setItem(STORAGE_KEYS.STUDENT_PROFILES, JSON.stringify(profiles));
    localStorage.setItem(STORAGE_KEYS.CURRENT_STUDENT, JSON.stringify(newProfile));
  } catch {}
  return newProfile;
}

// Answers record management
export function getStudentAnswers(studentId: string): Record<number, QuestionAnswerRecord> {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEYS.ANSWERS_PREFIX}${studentId}`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function recordQuestionAnswer(
  studentId: string,
  questionId: number,
  selectedOption: number,
  isCorrect: boolean,
  timeSpentSeconds: number
): void {
  const current = getStudentAnswers(studentId);
  current[questionId] = {
    questionId,
    selectedOption,
    isCorrect,
    timeSpentSeconds,
    answeredAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(`${STORAGE_KEYS.ANSWERS_PREFIX}${studentId}`, JSON.stringify(current));
  } catch {}
}

// Flagged / Bookmarked questions
export function getStudentFlaggedQuestions(studentId: string): number[] {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEYS.FLAGGED_PREFIX}${studentId}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleFlagQuestion(studentId: string, questionId: number): boolean {
  const flagged = getStudentFlaggedQuestions(studentId);
  const index = flagged.indexOf(questionId);
  let isFlagged = false;
  if (index > -1) {
    flagged.splice(index, 1);
    isFlagged = false;
  } else {
    flagged.push(questionId);
    isFlagged = true;
  }
  try {
    localStorage.setItem(`${STORAGE_KEYS.FLAGGED_PREFIX}${studentId}`, JSON.stringify(flagged));
  } catch {}
  return isFlagged;
}

// Test sessions
export function getStudentTestSessions(studentId: string): TestSession[] {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEYS.TEST_SESSIONS_PREFIX}${studentId}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveTestSession(studentId: string, session: TestSession): void {
  const sessions = getStudentTestSessions(studentId);
  sessions.unshift(session);
  // Keep last 30 sessions
  if (sessions.length > 30) sessions.length = 30;
  try {
    localStorage.setItem(`${STORAGE_KEYS.TEST_SESSIONS_PREFIX}${studentId}`, JSON.stringify(sessions));
  } catch {}
}

// Reset student data
export function resetStudentProgress(studentId: string): void {
  try {
    localStorage.removeItem(`${STORAGE_KEYS.ANSWERS_PREFIX}${studentId}`);
    localStorage.removeItem(`${STORAGE_KEYS.FLAGGED_PREFIX}${studentId}`);
    localStorage.removeItem(`${STORAGE_KEYS.TEST_SESSIONS_PREFIX}${studentId}`);
  } catch {}
}

// Calculate full analytics for a student
export function getStudentAnalytics(studentId: string): StudentAnalytics {
  const answers = getStudentAnswers(studentId);
  const answersList = Object.values(answers);
  const totalAnswered = answersList.length;
  const totalCorrect = answersList.filter((a) => a.isCorrect).length;
  const totalIncorrect = totalAnswered - totalCorrect;
  const accuracyRate = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 1000) / 10 : 0;
  const overallCompletionRate = Math.round((totalAnswered / 1000) * 1000) / 10;

  let totalStudyTimeSeconds = 0;
  answersList.forEach((a) => {
    totalStudyTimeSeconds += a.timeSpentSeconds || 0;
  });

  const averageTimePerQuestion = totalAnswered > 0 ? Math.round(totalStudyTimeSeconds / totalAnswered) : 0;

  // Subject performance calculation
  const allQuestions = getAllQuestions();
  const questionMap = new Map<number, typeof allQuestions[0]>();
  allQuestions.forEach((q) => questionMap.set(q.id, q));

  const subjectPerformance: StudentAnalytics['subjectPerformance'] = {
    cardiovascular: { attempted: 0, correct: 0, total: 125, accuracy: 0 },
    tissues_integumentary: { attempted: 0, correct: 0, total: 125, accuracy: 0 },
    blood_hematology: { attempted: 0, correct: 0, total: 125, accuracy: 0 },
    respiratory: { attempted: 0, correct: 0, total: 125, accuracy: 0 },
    cell_biology: { attempted: 0, correct: 0, total: 125, accuracy: 0 },
    chemistry: { attempted: 0, correct: 0, total: 125, accuracy: 0 },
    physics_biomechanics: { attempted: 0, correct: 0, total: 125, accuracy: 0 },
    systems_physiology: { attempted: 0, correct: 0, total: 125, accuracy: 0 },
  };

  answersList.forEach((ans) => {
    const q = questionMap.get(ans.questionId);
    if (q && subjectPerformance[q.subjectId]) {
      subjectPerformance[q.subjectId].attempted++;
      if (ans.isCorrect) {
        subjectPerformance[q.subjectId].correct++;
      }
    }
  });

  // Calculate percentage
  for (const sKey of Object.keys(subjectPerformance) as SubjectId[]) {
    const sp = subjectPerformance[sKey];
    sp.accuracy = sp.attempted > 0 ? Math.round((sp.correct / sp.attempted) * 1000) / 10 : 0;
  }

  // Recent test sessions
  const sessions = getStudentTestSessions(studentId);
  const recentTestSessions = sessions.slice(0, 10).map((s) => {
    const subjectName = s.subjectFilter === 'all' ? 'All Subjects' : (SUBJECTS.find((sub) => sub.id === s.subjectFilter)?.shortName || s.subjectFilter);
    const correct = s.score?.correct || 0;
    const total = s.totalQuestions || 1;
    const percentage = s.score?.percentage ?? Math.round((correct / total) * 100);
    return {
      id: s.id,
      date: new Date(s.startTime).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      subject: subjectName,
      score: correct,
      total,
      percentage,
      timeSpent: s.elapsedSeconds || 0,
    };
  });

  return {
    totalAnswered,
    totalCorrect,
    totalIncorrect,
    accuracyRate,
    overallCompletionRate,
    averageTimePerQuestion,
    totalStudyTimeSeconds,
    streakDays: totalAnswered > 0 ? Math.min(14, Math.max(1, Math.floor(totalAnswered / 12))) : 0,
    subjectPerformance,
    recentTestSessions,
  };
}

// Generate Leaderboard with live stats
export function getLeaderboard(currentStudent: StudentProfile): LeaderboardEntry[] {
  const analytics = getStudentAnalytics(currentStudent.id);

  // User points formula: (correct answers * 10) + (accuracy * 5) + (streak * 25)
  const userPoints = Math.round((analytics.totalCorrect * 10) + (analytics.accuracyRate * 5) + (analytics.streakDays * 25));

  let userTier: 'Grandmaster' | 'Master' | 'Diamond' | 'Platinum' | 'Gold' = 'Gold';
  if (userPoints >= 8000) userTier = 'Grandmaster';
  else if (userPoints >= 6000) userTier = 'Master';
  else if (userPoints >= 4000) userTier = 'Diamond';
  else if (userPoints >= 2000) userTier = 'Platinum';

  const userBadge = analytics.totalAnswered >= 500
    ? 'Mastery Grandmaster 👑'
    : analytics.totalAnswered >= 150
    ? 'Diamond Scholar 💎'
    : analytics.totalAnswered >= 50
    ? 'Platinum Scholar 🏆'
    : 'Active Scholar 🥇';

  const entries: LeaderboardEntry[] = [
    {
      rank: 0,
      studentId: currentStudent.id,
      studentName: currentStudent.name,
      avatarBg: 'bg-indigo-600',
      points: userPoints,
      questionsCompleted: analytics.totalAnswered,
      accuracy: analytics.accuracyRate,
      streak: analytics.streakDays,
      badge: userBadge,
      tier: userTier,
      specialty: 'Human Anatomy & Clinical Applications',
      avgTimePerQ: analytics.averageTimePerQuestion || 42,
      isCurrentUser: true,
      isOnline: true,
      lastActive: 'Active now',
    },
  ];

  // Include other saved local student profiles
  const allStored = getStoredProfiles();
  allStored.forEach((stored) => {
    if (stored.id !== currentStudent.id) {
      const storedAnalytics = getStudentAnalytics(stored.id);
      const stPoints = Math.round((storedAnalytics.totalCorrect * 10) + (storedAnalytics.accuracyRate * 5) + (storedAnalytics.streakDays * 25));
      let stTier: 'Grandmaster' | 'Master' | 'Diamond' | 'Platinum' | 'Gold' = 'Gold';
      if (stPoints >= 8000) stTier = 'Grandmaster';
      else if (stPoints >= 6000) stTier = 'Master';
      else if (stPoints >= 4000) stTier = 'Diamond';
      else if (stPoints >= 2000) stTier = 'Platinum';

      entries.push({
        rank: 0,
        studentId: stored.id,
        studentName: stored.name,
        avatarBg: 'bg-blue-600',
        points: stPoints,
        questionsCompleted: storedAnalytics.totalAnswered,
        accuracy: storedAnalytics.accuracyRate,
        streak: storedAnalytics.streakDays,
        badge: storedAnalytics.totalAnswered > 100 ? 'Class Scholar 🏆' : 'Active Student',
        tier: stTier,
        specialty: stored.role,
        avgTimePerQ: storedAnalytics.averageTimePerQuestion || 45,
        isCurrentUser: false,
        isOnline: false,
        lastActive: '5m ago',
      });
    }
  });

  // Add peers (avoid duplicating if current student name matches peer name)
  const currentLowerName = currentStudent.name.toLowerCase().trim();
  PEER_STUDENTS.forEach((peer) => {
    if (peer.name.toLowerCase().trim() === currentLowerName) {
      return;
    }
    const peerCorrect = Math.round(peer.baseQuestions * (peer.baseAccuracy / 100));
    const peerPoints = Math.round((peerCorrect * 10) + (peer.baseAccuracy * 5) + (peer.streak * 25));
    entries.push({
      rank: 0,
      studentId: peer.id,
      studentName: peer.name,
      avatarBg: peer.avatarBg,
      points: peerPoints,
      questionsCompleted: peer.baseQuestions,
      accuracy: peer.baseAccuracy,
      streak: peer.streak,
      badge: peer.badge,
      tier: peer.tier,
      specialty: peer.specialty,
      avgTimePerQ: peer.avgTimePerQ,
      isCurrentUser: false,
      isOnline: Math.random() > 0.35,
      lastActive: 'Just now',
    });
  });

  // Sort by points descending
  entries.sort((a, b) => b.points - a.points);

  // Assign ranks
  entries.forEach((e, idx) => {
    e.rank = idx + 1;
  });

  return entries;
}
