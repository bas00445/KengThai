import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';

// Add-ons
import {TextToSpeech} from '@ionic-native/text-to-speech';
import { NativeAudio } from '@ionic-native/native-audio';
import {AppService} from '../../services/app-service';
import {Observable} from 'rxjs/Rx';
import {Subscription} from "rxjs";

@Component({
  selector: 'page-play',
  templateUrl: 'play.html'
})
export class PlayPage {
  
  @ViewChild('answerInput') myInput;
  
  private groupName: string;
  private sentences: any[];
  private currentSentence: string;
  private sentenceInput: any;
  private currentIndex: number = 0;
  private timeLeft: number = 15;
  private subscription: Subscription;
  private timer: any;
  private endGame: boolean = false;
  private isCorrect:boolean = false;
  
  constructor(public navCtrl: NavController,
    private tts: TextToSpeech,
    private appService: AppService,
    private navParams: NavParams,
    private nativeAudio: NativeAudio,
    private platform: Platform) {
      this.groupName = navParams.data.name;
      this.sentences = navParams.data.sentences;
      this.currentSentence = this.sentences[this.currentIndex];
      
      // Can't run on browser
      // platform.ready().then(
        //   () => {
          //     this.nativeAudio.preloadSimple('correctSound', 'assets/sounds/correctAnswer.mp3').then(()=>{});
          //   }
          // );
          this.runTime(1500);
        }
        
        private runTime(delay: number) {
          this.timer = Observable.timer(delay, 1000);
          this.subscription = this.timer.subscribe(
            t => {
              if (this.timeLeft <= 0) {
                this.pauseTime();
                this.endGame = true;
              } else {
                this.timeLeft -= 1;
              }
            }
          );
        }
        
        private pauseTime() {
          this.subscription.unsubscribe();
        }
        
        private validateInput(event, answerInput){
          if (this.sentenceInput === this.currentSentence) {
            // this.nativeAudio.play('correctSound');
            this.timeLeft += 5;
            this.isCorrect = true;
            this.pauseTime();
            this.speak(this.currentSentence);
            
            
            // Delay animation for 1 second
            setTimeout(()=> {
              this.isCorrect = false;
            }, 1000);
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
        