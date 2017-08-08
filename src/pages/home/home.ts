import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {AppService} from '../../services/app-service';
import {Keyboard} from '@ionic-native/keyboard';

// Pages
import {PlayPage} from '../play/play';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  private groupName: string = 'ทดสอบ';
  private newSentence: string = 'สวัสดี';
  private isShowKeyboard = false;
  
  constructor(public navCtrl: NavController,
    private appService: AppService,
    private keyboard: Keyboard) {
      keyboard.onKeyboardShow().subscribe((res)=>{
        this.isShowKeyboard = true;
      });
      keyboard.onKeyboardHide().subscribe((res) => {
        this.isShowKeyboard = false;
      })
    }
    
    private addNewSentence(){
      this.appService.addNewGroup(this.groupName, this.newSentence);
      this.appService.showToast("'" + this.newSentence + "'" + ' ได้ถูกเพิ่มเรียบร้อย');
    }
    
    private moveToPlayArea(group: any){
      console.log('Move to group:', group);
      this.navCtrl.push(PlayPage, group);
    }
  }
  