import {
  GoogleGenerativeAI,
  GenerativeModel,
  ChatSession,
} from '@google/generative-ai';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreatePromptRequest } from '@repo/types';
import { v4 } from 'uuid';

const GEMINI_MODEL = 'gemini-1.5-flash';

@Injectable()
export class GeminiService {
  private readonly googleAI: GoogleGenerativeAI;
  private readonly modal: GenerativeModel;
  private chatSessions: { [sessionId: string]: ChatSession } = {};
  private readonly logger = new Logger(GeminiService.name);

  constructor(configService: ConfigService) {
    const geminiApiKey = configService.get('GEMINI_API_KEY');
    this.googleAI = new GoogleGenerativeAI(geminiApiKey);
    this.modal = this.googleAI.getGenerativeModel({
      model: GEMINI_MODEL,
    });
  }

  private getChatSession(sessionId?: string) {
    let sessionIdExist = sessionId ?? v4();

    let result = this.chatSessions[sessionIdExist];
    if (!result) {
      result = this.modal.startChat();
      this.chatSessions[sessionIdExist] = result;
    }

    return {
      sessionId: sessionIdExist,
      chat: result,
    };
  }

  async generateText(data: CreatePromptRequest) {
    try {
      const { sessionId, chat } = this.getChatSession(data.sessionId);
      const result = await chat.sendMessage(data.prompt);
      const chatResponse = result.response.text();
      return {
        result: chatResponse,
        prompt: data.prompt,
        role: 'assistant',
        sessionId,
      };
    } catch (error) {
      this.logger.error('Error from Gemini API', error);
    }
  }
}
