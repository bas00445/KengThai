import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

import {AppService} from '../../services/app-service';
import { NativeAudio } from '@ionic-native/native-audio';

// Pages
import {PlayPage} from '../play/play';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  private groupName: string = 'ทดสอบ';
  private newSentence: string = 'สวัสดี';
  
  constructor(public navCtrl: NavController,
    private appService: AppService,
    private nativeAudio: NativeAudio,
    private platform: Platform) {
      // platform.ready().then(
      //   () => {
      //     this.nativeAudio.preloadComplex('background-music', 'assets/sounds/bubbleSound.mp3', 1, 1, 0).then(
      //       () => {
      //         this.nativeAudio.loop('background-music').then(()=> {});
      //       }
      //     );
      //   }
      // );
    }
    
    private addNewSentence(){
      this.appService.addNewGroup(this.groupName, this.newSentence);
      this.appService.showToast("'" + this.newSentence + "'" + ' ได้ถูกเพิ่มเรียบร้อย');
    }
    
    private moveToPlayArea(group: any){
      this.navCtrl.push(PlayPage, group);
    }
  }
  