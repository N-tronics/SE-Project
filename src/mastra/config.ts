import { setDefaultResultOrder } from 'node:dns';

setDefaultResultOrder('ipv4first');

const value = (name: string, fallback?: string): string => {
  const configured = process.env[name]?.trim();
  if (configured) return configured;
  if (fallback !== undefined) return fallback;
  throw new Error(`Missing required environment variable: ${name}`);
};

export const config = {
  lmStudio: {
    baseURL: value('LM_STUDIO_BASE_URL', 'http://127.0.0.1:1234/v1'),
    apiKey: value('LM_STUDIO_API_KEY', 'lm-studio'),
    model: value('LM_STUDIO_MODEL', 'qwen/qwen3-vl-8b'),
  },
  gemini: {
    apiKey: value('GEMINI_API_KEY', ''),
    model: value('GEMINI_MODEL', 'gemini-3.8-flash'),
  },
  openai: {
    apiKey: value('OPENAI_API_KEY', ''),
    model: value('OPENAI_MODEL', 'gpt-4o-mini'),
  },
  groq: {
    apiKey: value('GROQ_API_KEY', ''),
    model: value('GROQ_MODEL', 'qwen/qwen3.8-27b'),
  },
};
