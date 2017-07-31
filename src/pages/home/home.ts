import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {AppService} from '../../services/app-service';

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
    private appService: AppService) {
    }
    
    private addNewSentence(){
      this.appService.addNewGroup(this.groupName, this.newSentence);
    }
    
    private moveToPlayArea(group: any){
      console.log('Move to group:', group);
      this.navCtrl.push(PlayPage, group);
    }
  }
  