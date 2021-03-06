import { 
  Component, 
  OnInit, 
  Input, 
  ViewChild, 
  ElementRef, 
  Output,
  ContentChild,
  EventEmitter,
  ViewEncapsulation } from '@angular/core';
import { MatSort, MatSortable } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { SktnPaginationComponent, ISktnPaginationEvent } from './../pagination';
import { ISktnDataTableEvent } from './interfaces';
import { SktnDataTableService } from './data-table.service';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'sktn-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: [
    './data-table.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class SktnDataTableComponent {

  @Input()
  pagination = true;

  @Input()
  filter = true;

  @Input()
  actions = true;

  @Input()
  page = 1;

  @Input()
  total_items = 0;
  
  @Input()
  limit = 50;
  
  @Input()
  orderby: string;

  @Input()
  direction: 'ASC' | 'DESC' = 'ASC';

  @Input()
  active = true;

  @Input()
  loading = false;

  @ViewChild('filterinput') 
  protected _filter: ElementRef;

  @ViewChild(SktnPaginationComponent) 
  protected _page: SktnPaginationComponent;

  @ContentChild(MatSort) 
  sort: MatSort;

  @Output()
  onChange: EventEmitter<ISktnDataTableEvent> = new EventEmitter();

  subscriptions: Subscription[] = [];

  constructor(
    public table: SktnDataTableService
  ) { }

  ngOnInit() {

    if(!this.table.event) {
      this.table.event = {
        page: this.page,
        limit: this.limit,
        orderby: this.orderby,
        direction: this.direction
      }
    }
    
  }

  ngAfterContentInit() {
    if(this.sort) {
      this.subscriptions.push(this.sort.sortChange.subscribe(
        (sort: any) => {
          this.table.event.orderby = sort.active;
          this.table.event.direction = sort.direction.toUpperCase();
          this._registerChange();
        }
      ));
    }

  }

  ngAfterViewInit() {
    
    // This is the filter affect and debounces it for fast typing
    if(this.filter) {
    this.subscriptions.push(Observable.fromEvent(this._filter.nativeElement, 'keyup')
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(() => {
        this.table.event.page = 1;
        this.table.event.filter = this._filter.nativeElement.value;
        this._registerChange();
      }));
    }

    if(this.pagination) {
      // Pagination changes
      this.subscriptions.push(this._page.onChange
        .debounceTime(250)
        .distinctUntilChanged()
        .subscribe(
          (page: ISktnPaginationEvent) => {
            this.table.event.page = page.page;
            this.table.event.limit = page.limit;
            this._registerChange();
          }
        ));
    }
  }
  
  _registerChange() {
    this.onChange.emit(this.table.event);
  }

  refresh() {
    this._registerChange();
  }

  onDestory() {
    this.subscriptions.forEach((sub: Subscription)=> {
      sub.unsubscribe();
    });
  }

}
