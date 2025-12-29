

// pages/api/triage.js
export default async function handler(req, res) {
  const { messages } = req.body;

  // 這裡設定 AI 的分診原則
  const systemPrompt = {
    role: "system",
    content: "你是一位專業的醫院分診護理師。請根據使用者的症狀描述，判斷其急迫性。1. 若有胸痛、呼吸困難、意識不清，請立即指示就醫。2. 詢問關鍵問題以縮小科別範圍。3. 結尾必須加上免責聲明。請用繁體中文回答。"
  };

  // 呼叫 Gemini 或其他 LLM API 的邏輯 (示意)
  const response = await fetch('YOUR_AI_MODEL_ENDPOINT', {
    method: 'POST',
    body: JSON.stringify({
      model: "gemini-1.5-flash",
      messages: [systemPrompt, ...messages]
    }),
  });

  const data = await response.json();
  res.status(200).json({ reply: data.choices[0].message.content });
}