import { NgForOf, NgForOfContext } from '@angular/common';
import {Component, NgModule, Directive, Input, IterableDiffers, OnChanges, SimpleChange, SimpleChanges, TemplateRef,
  ViewContainerRef } from '@angular/core'

interface NgForInChanges extends SimpleChanges {
  ngForIn?: SimpleChange;
  ngForOf?: SimpleChange;
}

@Directive({
  selector: '[ngFor][ngForIn]'
})
export class NgForIn<T> extends NgForOf<T> implements OnChanges {

  @Input() 
  ngForIn: any;

  ngOnChanges(changes: NgForInChanges): void {

    if (changes.ngForIn) {
      this.ngForOf = Object.keys(this.ngForIn) as Array<any>;

      const change = changes.ngForIn;
      const currentValue = Object.keys(change.currentValue);
      const previousValue = change.previousValue ? Object.keys(change.previousValue) : undefined;
      changes.ngForOf =  new SimpleChange(previousValue, currentValue, change.firstChange);

      super.ngOnChanges(changes);
    }
    
  }

}