import {Injectable} from '@angular/core';
import * as _ from 'lodash';


@Injectable()
export class AppService {
    
    public groupNameList: any = [];
    
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
    
}