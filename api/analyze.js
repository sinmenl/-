export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { question } = req.body;
  if (!question) return res.status(400).json({ error: 'Missing question' });

  const systemPrompt = `你是一位公务员面试审题专家，专门帮助考生分析题目关键词。
用户会给你一道公考面试题，你需要：
1. 判断题型（综合分析/情景应变/计划组织/人际关系/演讲发言）
2. 提取3-5个最关键的词或短语
3. 对每个关键词给出3条发散思路（每条20字以内）
4. 给出一段整体审题建议（60字以内）

关键词类型只能用：subject(主体/对象)、action(行为/动作)、scene(场景/背景)、tension(矛盾/张力)、scope(限定/范围)

严格返回JSON，格式如下，不要加任何其他文字：
{
  "questionType": "题型名称",
  "keywords": [
    {
      "word": "关键词",
      "type": "类型英文",
      "spread": ["发散思路1", "发散思路2", "发散思路3"]
    }
  ],
  "advice": "整体审题建议"
}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: 'user', content: `题目：${question}` }],
      }),
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data });

    const text = data.content.filter(b => b.type === 'text').map(b => b.text).join('');
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);
    res.status(200).json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
