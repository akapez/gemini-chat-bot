import { Body, Controller, Post } from '@nestjs/common';
import { CreatePromptRequest } from '@repo/types';
import { GeminiService } from './gemini.service';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly service: GeminiService) {}

  @Post()
  createPrompt(@Body() data: CreatePromptRequest) {
    return this.service.generateText(data);
  }
}
