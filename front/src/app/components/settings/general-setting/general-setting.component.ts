import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { io } from 'socket.io-client';
// import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-general-setting',
  templateUrl: './general-setting.component.html',
  styleUrls: ['./general-setting.component.css'],
})
export class GeneralSettingComponent implements OnInit {
  newMessage = '';
  messageList: string[] = [];

  constructor(public router:Router){

  }

  ngOnInit(){
    // this.chatService.getNewMessage().subscribe((message: string) => {
    //   this.messageList.push(message);
    // })
  }

  sendMessage() {
    // this.chatService.sendMessage(this.newMessage);
    // this.newMessage = '';
  }
}
