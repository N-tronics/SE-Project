import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { config } from './config';

export const lmStudio = createOpenAICompatible({
  name: 'lm-studio',
  baseURL: config.lmStudio.baseURL,
  apiKey: config.lmStudio.apiKey,
});

export const chatModel = lmStudio.chatModel(config.lmStudio.model);

export type ModelMode = 'local' | 'gemini' | 'openai' | 'groq';

export function getChatModel(mode: ModelMode = 'local', apiKeyOverride?: string, modelOverride?: string) {
  if (mode === 'gemini') {
    const apiKey = (apiKeyOverride ?? config.gemini.apiKey).trim();
    if (!apiKey) {
      throw new Error('Gemini API key is required for Gemini mode. Set GEMINI_API_KEY in .env.');
    }
    const gemini = createOpenAICompatible({
      name: 'gemini',
      baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
      apiKey,
    });
    return gemini.chatModel(config.gemini.model);
  }
  if (mode === 'openai') {
    const apiKey = (apiKeyOverride ?? config.openai.apiKey).trim();
    if (!apiKey) {
      throw new Error('OpenAI API key is required for OpenAI mode. Set OPENAI_API_KEY in .env.');
    }
    const openai = createOpenAICompatible({
      name: 'openai',
      baseURL: 'https://api.openai.com/v1',
      apiKey,
    });
    return openai.chatModel(config.openai.model);
  }
  if (mode === 'groq') {
    const apiKey = (apiKeyOverride ?? config.groq.apiKey).trim();
    if (!apiKey) {
      throw new Error('Groq API key is required for Groq mode. Set GROQ_API_KEY in .env.');
    }
    const groq = createOpenAICompatible({
      name: 'groq',
      baseURL: 'https://api.groq.com/openai/v1',
      apiKey,
    });
    return groq.chatModel(modelOverride ?? config.groq.model);
  }
  return chatModel;
}
