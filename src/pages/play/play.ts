import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {TextToSpeech} from '@ionic-native/text-to-speech';

import {AppService} from '../../services/app-service';

@Component({
  selector: 'page-play',
  templateUrl: 'play.html'
})
export class PlayPage {
  
  private groupName: string;
  private sentences: any[];
  private currentSentence: string;
  private currentIndex: number = 0;

  constructor(public navCtrl: NavController,
    private tts: TextToSpeech,
    private appService: AppService,
    private navParams: NavParams) {
      this.groupName = navParams.data.name;
      this.sentences = navParams.data.sentences;
      this.currentSentence = this.sentences[this.currentIndex];
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
    