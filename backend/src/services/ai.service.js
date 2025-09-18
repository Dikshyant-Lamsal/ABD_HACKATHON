import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const askAI = async (context, question) => {
  try {
    const prompt = `
    You are an AI study assistant. 
    Context: ${context}
    Question: ${question}
    Provide a clear, short answer.
    `;

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    });

    return response.choices[0].message.content;
  } catch (err) {
    console.error('AI Error:', err.message);
    return 'Sorry, AI could not generate an answer.';
  }
};
