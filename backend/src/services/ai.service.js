import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Ask AI a question based on given context
 */
export const askAI = async (context, question) => {
  const prompt = `
  Context: ${context}
  Question: ${question}
  Answer concisely.
  `;

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
  });

  return response.choices[0].message.content.trim();
};
