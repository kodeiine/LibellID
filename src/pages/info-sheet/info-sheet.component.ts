import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import {JsonDataService} from '../../providers/data-json.service';
import {DragonflyPage} from '../dragonfly/dragonfly.component';
import {Dragonfly} from '../../app/classes/dragonfly/dragonfly';


@Component({
  templateUrl: 'info-sheet.component.html'
})
export class InfoSheetPage {
  private dragonfliesData: Dragonfly[];

  constructor(private navCtrl: NavController, private jsonDataService: JsonDataService) {
    this.loadData();
  }
  ionViewDidLoad() {
    
  }

  private loadData():void{
      let that = this;
       this.jsonDataService.dragonflies().then(function(val){
           that.dragonfliesData = val as Dragonfly[];
           that.dragonfliesData.sort(function compare(a, b) {
            return that.alphabeticSort(a.commonName, b.commonName);
          })
       }).catch(function(err){
           alert("Un problème est survenu")
        });
  }
  private openPage(d:Dragonfly):void{
          this.navCtrl.push(DragonflyPage, {dragonfly: d, criteria: null});
  }

  private alphabeticSort(a, b) {
    if (a < b)
      return -1;
    if (a > b)
      return 1;
  }

}
