import { z } from 'zod'
import type { Progress, SavedResult } from '../types'

const resultSchema = z.object({ id: z.string(), testId: z.string(), testName: z.string(), versionId: z.string(), date: z.string(), durationSeconds: z.number(), result: z.object({ headline: z.string(), code: z.string().optional(), summary: z.string(), scores: z.array(z.object({ key: z.string(), label: z.string(), value: z.number(), color: z.string().optional() })), tags: z.array(z.string()), sections: z.array(z.object({ title: z.string(), content: z.string() })), confidence: z.string(), meta: z.record(z.union([z.string(), z.number()])).optional() }), answers: z.record(z.string()) })
const read = <T>(key: string, fallback: T): T => { try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) as T : fallback } catch { return fallback } }
export const getResults = (): SavedResult[] => read<unknown[]>('mindscope.results.v1', []).filter(r => resultSchema.safeParse(r).success) as SavedResult[]
export const saveResult = (result: SavedResult) => localStorage.setItem('mindscope.results.v1', JSON.stringify([result, ...getResults().filter(r => r.id !== result.id)].slice(0, 80)))
export const deleteResult = (id: string) => localStorage.setItem('mindscope.results.v1', JSON.stringify(getResults().filter(r => r.id !== id)))
export const clearResults = () => localStorage.removeItem('mindscope.results.v1')
export const getProgress = (testId: string, versionId: string): Progress | null => { const value = read<Progress | null>('mindscope.progress.v1', null); return value?.testId === testId && value.versionId === versionId ? value : null }
export const saveProgress = (progress: Progress) => localStorage.setItem('mindscope.progress.v1', JSON.stringify(progress))
export const clearProgress = () => localStorage.removeItem('mindscope.progress.v1')
export const getFavorites = (): string[] => read('mindscope.favorites.v1', [])
export const toggleFavorite = (id: string) => { const next = getFavorites().includes(id) ? getFavorites().filter(x => x !== id) : [...getFavorites(), id]; localStorage.setItem('mindscope.favorites.v1', JSON.stringify(next)); return next }
export const exportJson = () => JSON.stringify(getResults(), null, 2)
