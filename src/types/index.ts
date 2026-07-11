export type TestCategory = 'personality' | 'psychology' | 'relationship' | 'career' | 'cognition' | 'fun'
export type QuestionKind = 'likert' | 'single' | 'matrix'
export type TestOption = { id: string; label: string; value?: number }
export type TestQuestion = {
  id: string; text: string; type: QuestionKind; dimension?: string; reverse?: boolean
  weights?: Record<string, number>; options: TestOption[]; correctOptionId?: string
  difficulty?: 1 | 2 | 3 | 4 | 5; estimatedSeconds?: number; explanation?: string
  matrix?: { cells: string[]; missingIndex: number; rule: string }
}
export type TestVersion = { id: string; name: string; questionCount: number; estimatedMinutes: number; difficulty: string; confidenceLabel: string; recommendedFor: string; questionIds: string[] }
export type TestDefinition = {
  id: string; slug: string; name: string; shortName: string; category: TestCategory; description: string; longDescription: string; disclaimer: string; methodology: string; tags: string[]; sourceType: 'open' | 'original' | 'theory'; versions: TestVersion[]; dimensions: { id: string; label: string; shortLabel?: string; color?: string }[]; questions: TestQuestion[]; resultProfiles: Record<string, { title: string; summary: string; keywords: string[]; strengths: string[]; blindSpots: string[]; advice: string[] }>; score: (answers: Record<string, string>, questions: TestQuestion[]) => ScoreResult
}
export type ScoreResult = { headline: string; code?: string; summary: string; scores: { key: string; label: string; value: number; color?: string }[]; tags: string[]; sections: { title: string; content: string }[]; confidence: string; meta?: Record<string, string | number> }
export type SavedResult = { id: string; testId: string; testName: string; versionId: string; date: string; durationSeconds: number; result: ScoreResult; answers: Record<string, string> }
export type Progress = { testId: string; versionId: string; questionIds: string[]; answers: Record<string, string>; currentIndex: number; startedAt: number }
