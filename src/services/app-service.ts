import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {ToastController} from 'ionic-angular';

@Injectable()
export class AppService {
    
    public groupNameList: any = [
        {name: 'ของใช้ทั่วไป',
        sentences: ['หนังสือ','สมุด','ปากกา','ดินสอ', 'ยางลบ', 'กระดาษ', 'ไม้บรรทัด']},
        {name: 'สี',
        sentences: ['สีแดง','สีฟ้า', 'สีม่วง', 'สีส้ม', 'สีเหลือง', 'สีเขียว', 'สีดำ', 'สีชมพู', 'สีทอง', 'สีขาว']}];
    
    constructor(private toastCtrl: ToastController){
        
    }
    
    public addNewGroup(gName: string, sentence: string) {
        if(this.isNewGroup(gName)){
            this.groupNameList.push({name: gName, sentences: [sentence]});
        } else{
            for(let group of this.groupNameList){
                if (group.name === gName){
                    group.sentences.push(sentence);
                }
            }
        }
    }
    
    public isNewGroup(gName: string){
        for(let group of this.groupNameList){
            if (group.name === gName){
                return false;
            }
        }
        
        return true;
    }
    
    public showToast(word: string) {
        let toast = this.toastCtrl.create({
            message: word,
            duration: 3000
        });
        toast.present();
    }
    
}