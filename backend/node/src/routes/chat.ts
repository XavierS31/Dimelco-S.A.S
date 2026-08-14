import { Router } from 'express';
import { HttpError } from '../lib/http.js';
import { companyAssistantContext } from '../lib/companyAssistantContext.js';
import { chatLimiter } from '../middleware/rateLimiter.js';
import { chatRequestSchema } from '../schemas.js';

type GeminiResponse = {
  candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  error?: { message?: string };
};

export const chatRouter = Router();

chatRouter.post('/', chatLimiter, async (req, res, next) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new HttpError(503, 'El asistente aún no está configurado.');

    const { message, history } = chatRequestSchema.parse(req.body);
    const model = process.env.GEMINI_MODEL || 'gemini-3.6-flash';
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: companyAssistantContext }] },
        contents: [
          ...history.map((item) => ({ role: item.role, parts: [{ text: item.text }] })),
          { role: 'user', parts: [{ text: message }] },
        ],
        generationConfig: { temperature: 0.2, maxOutputTokens: 480 },
      }),
      signal: AbortSignal.timeout(20_000),
    });

    const payload = await response.json() as GeminiResponse;
    if (!response.ok) {
      if (response.status === 429) throw new HttpError(429, 'El asistente alcanzó su límite temporal. Intente más tarde.');
      console.error('Gemini request failed', response.status, payload.error?.message);
      throw new HttpError(502, 'No fue posible consultar el asistente en este momento.');
    }

    const reply = payload.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('').trim();
    if (!reply) throw new HttpError(502, 'El asistente no pudo generar una respuesta.');
    res.json({ reply });
  } catch (error) {
    next(error);
  }
});
