import { tests } from '../src/data/tests/index'

const ids = new Set<string>(); const errors: string[] = []
const questionTexts = new Map<string, string>()
const matrixSignatures = new Map<string, string>()
for (const test of tests) {
  if (ids.has(test.id)) errors.push(`重复测试 ID: ${test.id}`); ids.add(test.id)
  const qids = new Set<string>()
  for (const q of test.questions) {
    if (qids.has(q.id)) errors.push(`${test.id}: 重复题目 ID ${q.id}`); qids.add(q.id)
    if (!q.text.trim()) errors.push(`${test.id}/${q.id}: 空题目`)
    const normalizedText = q.text.replace(/[\s。，、！？；：,.!?;:「」]/g, '').toLowerCase()
    const previousQuestion = questionTexts.get(normalizedText)
    if (previousQuestion) errors.push(`${test.id}/${q.id}: 与 ${previousQuestion} 题干重复`)
    else questionTexts.set(normalizedText, `${test.id}/${q.id}`)
    if (!q.options.length) errors.push(`${test.id}/${q.id}: 空选项`)
    if (q.type === 'matrix' && (!q.correctOptionId || !q.matrix)) errors.push(`${test.id}/${q.id}: 矩阵题缺少答案或配置`)
    if (q.type === 'matrix' && q.matrix && q.correctOptionId) {
      const signature = `${q.matrix.cells.join('|')}::${q.matrix.missingIndex}::${q.correctOptionId}::${q.matrix.rule}`
      const previousMatrix = matrixSignatures.get(signature)
      if (previousMatrix) errors.push(`${test.id}/${q.id}: 与 ${previousMatrix} 矩阵配置重复`)
      else matrixSignatures.set(signature, `${test.id}/${q.id}`)
    }
    if (q.type !== 'matrix' && (!q.weights || !q.dimension)) errors.push(`${test.id}/${q.id}: 缺少评分维度`)
  }
  for (const v of test.versions) {
    if (v.questionCount !== v.questionIds.length) errors.push(`${test.id}/${v.id}: 版本题量不一致`)
    for (const qid of v.questionIds) if (!qids.has(qid)) errors.push(`${test.id}/${v.id}: 引用无效题目 ${qid}`)
  }
  if (!test.disclaimer || !test.methodology) errors.push(`${test.id}: 缺少免责声明或方法说明`)
}
if (errors.length) { throw new Error(errors.join('\n')) }
console.log(`✓ 已审查 ${tests.length} 个测试、${tests.reduce((n, t) => n + t.questions.length, 0)} 道题目、${tests.reduce((n, t) => n + t.versions.length, 0)} 个版本`)
