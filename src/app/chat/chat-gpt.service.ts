import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';


@Injectable({
  providedIn: 'root'
})
export class ChatGptService {
  private openai: OpenAIApi;
  configuration: Configuration;

  constructor() { }

  generateText(prompt: string): Promise<string | undefined> {
    this.configuration = new Configuration({
      apiKey: localStorage.getItem('openaiAPIKey')
    });

    delete this.configuration.baseOptions.headers['User-Agent'];

    this.openai = new OpenAIApi(this.configuration);

    return this.openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 256
    }).then(response => {
      return response.data.choices[0].text;
    }).catch(error => {
      console.log(error);
      return '';
    });
  }
}
