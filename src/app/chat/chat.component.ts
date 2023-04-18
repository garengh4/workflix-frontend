import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private openaiService: ChatGptService, private _snackBar: MatSnackBar) {}

  setOpenaiAPIKey() {
    localStorage.setItem('openaiAPIKey', this.openaiAPIKey);
  }

  openSnackBar() {
    if (this.openaiAPIKey != null) {
      this._snackBar.open('API key set', 'Got it', { 
        duration: 3000,
        panelClass: ['api-key-notification']
      });
    } else {
      this._snackBar.open('API key not set', 'Got it', { 
        duration: 3000,
        panelClass: ['api-key-notification']
      });
    }
  }

  generateText(data:textResponse) {
    this.openaiService.generateText(data.text).then(text => {
      data.response = text;
    });
  }

}
