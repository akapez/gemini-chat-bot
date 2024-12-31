import { CreatePromptRequest } from "../dto/create-prompt.request";

export interface Prompt extends CreatePromptRequest {
  role: string;
  result: string;
}
