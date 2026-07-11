import type { TestQuestion } from '../types'

export const clamp = (n: number, min = 0, max = 100) => Math.max(min, Math.min(max, n))
export const percentile = (n: number, min: number, max: number) => Math.round(clamp(((n - min) / (max - min)) * 100))

export function dimensionScores(answers: Record<string, string>, questions: TestQuestion[], dimensions: string[]) {
  const totals: Record<string, number> = Object.fromEntries(dimensions.map(d => [d, 0]))
  const counts: Record<string, number> = Object.fromEntries(dimensions.map(d => [d, 0]))
  questions.forEach(q => {
    const raw = Number(answers[q.id])
    if (!raw || !q.weights) return
    const score = q.reverse ? 6 - raw : raw
    Object.entries(q.weights).forEach(([key, weight]) => { if (key in totals) { totals[key] += score * weight; counts[key] += Math.abs(weight) } })
  })
  return dimensions.map(key => ({ key, value: counts[key] ? Math.round(clamp(((totals[key] / counts[key]) - 1) * 25)) : 50 }))
}

export function confidence(answers: Record<string, string>, questions: TestQuestion[]) {
  const values = questions.map(q => Number(answers[q.id])).filter(Boolean)
  if (!values.length || values.length < questions.length) return '较低'
  const same = values.filter(v => v === values[0]).length / values.length
  return same > 0.8 ? '一般' : values.length >= 48 ? '较高' : '良好'
}

export function rankKeys(scores: Record<string, number>) { return Object.entries(scores).sort((a, b) => b[1] - a[1]).map(([key]) => key) }

export function matrixMetrics(answers: Record<string, string>, questions: TestQuestion[]) {
  const weightedTotal = questions.reduce((s, q) => s + (q.difficulty ?? 1), 0)
  const weightedCorrect = questions.reduce((s, q) => s + (answers[q.id] === q.correctOptionId ? (q.difficulty ?? 1) : 0), 0)
  const accuracy = weightedTotal ? weightedCorrect / weightedTotal : 0
  const high = questions.filter(q => (q.difficulty ?? 1) >= 4)
  const highPerf = high.length ? high.reduce((s, q) => s + (answers[q.id] === q.correctOptionId ? (q.difficulty ?? 1) : 0), 0) / high.reduce((s, q) => s + (q.difficulty ?? 1), 0) : accuracy
  const index = Math.round(clamp((accuracy * 0.8 + highPerf * 0.15 + accuracy * 0.05) * 100))
  const iq = Math.round(70 + (index / 100) * 75)
  const error = questions.length <= 12 ? 12 : questions.length <= 24 ? 9 : questions.length <= 36 ? 7 : 6
  return { accuracy, index, iq, error, highPerf }
}

export function estimateIqRange(index: number, count: number) { const m = matrixMetrics({}, Array.from({ length: count }, (_, i) => ({ id: String(i), text: '', type: 'matrix' as const, options: [], correctOptionId: 'x', difficulty: 1 }))); void m; const iq = 70 + (index / 100) * 75; const error = count <= 12 ? 12 : count <= 24 ? 9 : count <= 36 ? 7 : 6; return { iq: Math.round(iq), low: Math.max(70, Math.round(iq - error)), high: Math.min(145, Math.round(iq + error)) } }
