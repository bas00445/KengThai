import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Add-ons
import {TextToSpeech} from '@ionic-native/text-to-speech';
import {AppService} from '../../services/app-service';
import {Observable} from 'rxjs/Rx';
import {Subscription} from "rxjs";

@Component({
  selector: 'page-play',
  templateUrl: 'play.html'
})
export class PlayPage {
  
  private groupName: string;
  private sentences: any[];
  private currentSentence: string;
  private sentenceInput: string;
  private currentIndex: number = 0;
  private timeLeft: number = 20;
  private subscription: Subscription;
  private timer: any;
  private endGame: boolean = false;
  
  constructor(public navCtrl: NavController,
    private tts: TextToSpeech,
    private appService: AppService,
    private navParams: NavParams) {
      this.groupName = navParams.data.name;
      this.sentences = navParams.data.sentences;
      this.currentSentence = this.sentences[this.currentIndex];
      
      this.runTime(3000);
    }
    
    private runTime(delay: number) {
      this.timer = Observable.timer(delay, 1000);
      this.subscription = this.timer.subscribe(
        t => {
          if (this.timeLeft <= 0) {
            this.pauseTime();
            this.endGame = true;
          } else {
            // this.timeLeft -= 1;
          }
        }
      )
    }
    
    private pauseTime() {
      this.subscription.unsubscribe();
    }
    
    private validateInput(event:any){
      if (this.sentenceInput === this.currentSentence) {
        this.appService.showToast('ถูกต้อง');
        this.timeLeft += 10;
        this.pauseTime();
        this.speak(this.currentSentence);
      }
    }

    private moveToHome(){
      this.navCtrl.pop();
    }
    
    private speak(word: string){ 
      let options: any = {
        text: word,
        locale: "th-TH",
        rate: 1
      }
      
      this.tts.speak(options).then(
        (res) => {
          this.currentIndex += 1;
          this.currentSentence = this.sentences[this.currentIndex];
          this.sentenceInput = '';
          
          if (this.currentSentence === undefined) {
            this.endGame = true;
          } else {
            this.runTime(0);
          }
        }
      ).catch( 
        (err) => {
          this.currentIndex += 1;
          this.currentSentence = this.sentences[this.currentIndex];
          this.sentenceInput = '';
          
          if (this.currentSentence === undefined) {
            this.endGame = true;
          } else {
            this.runTime(0);
          }
        });
        
      }
      
    }
    