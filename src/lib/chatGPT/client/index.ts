import { DEFALUT_OPENAI_KEY, OPENAI_ORGANIZATION } from "@/const";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

export class ChatGPTClient {
  prompt?: string;
  openai: OpenAIApi;
  history: ChatCompletionRequestMessage[] = [];
  constructor(options?: { prompt?: string }) {
    if (options?.prompt) this.prompt = options.prompt;
    const configuration = new Configuration({
      apiKey: DEFALUT_OPENAI_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }
  async sendZeroMessage(message: string, options?: { model?: string }) {
    const model = options?.model || "gpt-3.5-turbo";
    const messages: ChatCompletionRequestMessage[] = [
      { role: "user", content: message },
    ];
    if (this.prompt) messages.unshift({ role: "user", content: this.prompt });
    try {
      const response = await this.openai.createChatCompletion({
        model,
        messages,
      });
      return response.data.choices[0].message?.content
    } catch (error) {
      throw new Error("request fail");
    }
  }
  async sendMessage(message: string, options?: { model?: string }) {
    const model = options?.model || "gpt-3.5-turbo";
    const messages: ChatCompletionRequestMessage[] = [
      ...this.history,
      { role: "user", content: message },
    ];
    if (this.prompt) messages.unshift({ role: "user", content: this.prompt });
    try {
      const response = await this.openai.createChatCompletion({
        model,
        messages,
      });
      if (response.data.choices[0].message) {
        this.history.push(response.data.choices[0].message);
      }
      return response.data.choices[0].message?.content;
    } catch (error) {
      throw new Error("request fail");
    }
    
  }
  setPrompt(prompt: string) {
    this.prompt = prompt
  }
}
