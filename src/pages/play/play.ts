import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {TextToSpeech} from '@ionic-native/text-to-speech';

import {AppService} from '../../services/app-service';

@Component({
  selector: 'page-play',
  templateUrl: 'play.html'
})
export class PlayPage {

  constructor(public navCtrl: NavController,
    private tts: TextToSpeech,
  private appService: AppService,
private navParams: NavParams) {
        console.log('Param:', navParams);
    }
    
    private speak(){ 
      let options: any = {
        text: 'สวัสดี',
        locale: "th-TH",
        rate: 1
      }
      
      this.tts.speak(options).then(
        (res) => {
          console.log(res);
        }
      ).catch( 
        (err) => {
          console.log(err);
        });
      
    }

  }
  