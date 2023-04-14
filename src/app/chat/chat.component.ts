import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChatGptService } from './chat-gpt.service';

export class textResponse{
  sno:number=1;
  text:string='';
  response:any='';
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  textList:textResponse[]=[{sno:1,text:'',response:''}];

  openaiAPIKey:string;

  constructor(private openaiService: ChatGptService) {}

  setOpenaiAPIKey() {
    localStorage.setItem('openaiAPIKey', this.openaiAPIKey);
  }

  generateText(data:textResponse) {
    this.openaiService.generateText(data.text).then(text => {
      data.response = text;
      if(this.textList.length===data.sno){
        this.textList.push({sno:1,text:'',response:''});
      }
    });
  }

}
