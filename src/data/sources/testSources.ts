export const testSources = [
  { id: 'ipip', title: 'International Personality Item Pool (IPIP)', organization: 'Oregon Research Institute', sourceUrl: 'https://ipip.ori.org/', license: 'Public Domain', usageType: 'translated/adapted', notes: 'IPIP 官方说明允许复制、编辑、翻译和使用；本项目只用于大五的部分题目，并标记为非正式中文自我探索版本。' },
  { id: 'holland', title: 'Holland RIASEC vocational model', author: 'John L. Holland', sourceUrl: 'https://doi.org/10.1007/978-3-319-24612-3_797', license: 'Reference Only', usageType: 'original-based-on-construct', notes: '仅采用公开理论构念与六维命名，题目为平台原创。' },
  { id: 'attachment', title: '成人依恋二维模型', sourceUrl: 'https://doi.org/10.1037/0022-3514.78.2.350', license: 'Reference Only', usageType: 'original-based-on-construct', notes: '焦虑/回避二维结构仅作理论参考，题目与文案为平台原创。' },
  { id: 'matrix', title: '渐进矩阵类非语言推理结构', sourceUrl: 'https://www.pearsonassessments.com/en-us/Store/Professional-Assessments/Cognition-%26-Neuro/Raven%E2%80%99s-Progressive-Matrices-Second-Edition-%7C-Raven%27s-2/p/100001960', license: 'Reference Only', usageType: 'original-based-on-construct', notes: '平台原创 SVG 题目，不使用 Pearson/Raven 素材、名称、答案或常模。' },
  { id: 'original', title: 'MindScope 平台原创题库', sourceUrl: 'https://github.com/', license: 'Original', usageType: 'original-based-on-construct', notes: 'DISC、九型、荣格功能、DnD、关系与其他题目依据公开理论重写，不声称官方认证。' }
] as const
