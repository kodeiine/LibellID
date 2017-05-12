import { Component } from '@angular/core';

import { NavController, PopoverController } from 'ionic-angular';
import {IdentifyPopover} from './identify-popover.component';
import {JsonDataService} from '../../providers/data-json.service';
import {IdentifyResultPage} from './identify-result/identify-result.component';

@Component({
  templateUrl: 'identify.component.html'
})
export class IdentifyPage {
    private criteria: Object[];
    private useDate: boolean = true;
    private usePosition: boolean = true;
    constructor(private navCtrl: NavController, private popoverCtrl: PopoverController, private jsonDataService: JsonDataService) {
      this.loadData();
    }
    private presentPopover(event):void{
        let popover = this.popoverCtrl.create(IdentifyPopover,{
            useDate: this.useDate,
            usePosition: this.usePosition
        });
        popover.present({ev: event});
        popover.onDidDismiss(data => {
            if(data != null){
                this.useDate = data.useDate;
                this.usePosition = data.usePosition;
            }
        });
    }

    private loadData():void{
        let that = this;
         this.jsonDataService.criteria().then(function(val){
             that.criteria = val;
         }).catch(function(err){
             alert("Un problème est survenu")
          });
    }

    private handleClickValue(event:Event):void{
      let element = <HTMLElement>event.target;
      if(!element.classList.contains("selected-value")){
        element.classList.add("selected-value");
      }else{
        element.classList.remove("selected-value");
      }
    }
    private resetCriteria():void{
        let tables = document.getElementsByClassName("table-criteria");
        for(var i = 0; i < tables.length; i++){
          let elems = tables[i].getElementsByTagName("td");
          for(var j = 0; j < elems.length; j++){
            elems[j].classList.remove("selected-value");
          }
        }
    }
    ionViewDidEnter(){
      let tdValues = document.getElementsByClassName("criter-value");
      for(var i = 0; i < tdValues.length; i++){
        tdValues[i].removeEventListener("click", this.handleClickValue);
        tdValues[i].addEventListener("click", this.handleClickValue);
      }
    }
    private getSelectedValues():void{
      let selectedValues: number[][] = [];
      let tables = document.getElementsByClassName("table-criteria");
      for(var i = 0; i < tables.length; i++){
        let selectedValuesPerCriter: number[] = [];
        let selectedElements = tables[i].getElementsByClassName("selected-value");
        for(var j = 0; j < selectedElements.length; j++){
          selectedValuesPerCriter.push((<HTMLTableCellElement>selectedElements[j]).cellIndex);
        }
        selectedValues.push(selectedValuesPerCriter);
      }
      this.navCtrl.push(IdentifyResultPage, {criteria: selectedValues, useDate: this.useDate, usePosition: this.usePosition});
    }

}