import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { config } from './config';

export const lmStudio = createOpenAICompatible({
  name: 'lm-studio',
  baseURL: config.lmStudio.baseURL,
  apiKey: config.lmStudio.apiKey,
});

export const chatModel = lmStudio.chatModel(config.lmStudio.model);

export type ModelMode = 'local' | 'gemini';

export function getChatModel(mode: ModelMode = 'local', apiKeyOverride?: string) {
  if (mode === 'gemini') {
    const apiKey = (apiKeyOverride ?? config.gemini.apiKey).trim();
    if (!apiKey) {
      throw new Error('Gemini API key is required for Gemini mode. Set GEMINI_API_KEY in .env or enter it in the UI.');
    }
    const gemini = createOpenAICompatible({
      name: 'gemini',
      baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
      apiKey,
    });
    return gemini.chatModel(config.gemini.model);
  }
  return chatModel;
}
