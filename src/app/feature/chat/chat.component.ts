import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../service/chat.service';
import { ChatRequest } from 'src/app/model/chat-request';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  userInput = '';
  chatHistory:any[] = [];
  loading = false;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
  }

  sendMessage(): void {
    let chatRequest: ChatRequest = { message: this.userInput, sender: 'user' };
    let chatResponse: ChatRequest;
    this.chatHistory.push(chatRequest);
    this.loading = true;
    this.chatService.getResponse(this.userInput).subscribe(response => {
    chatResponse = { message: response.choices[0].text, sender: 'ai' }
      this.chatHistory.push(chatResponse);
      this.loading = false;
    }, error => {
      this.loading = false;
      console.error(error);
    });
    
    this.userInput = '';
  }
}