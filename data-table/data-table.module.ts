import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdInputModule, MdTableModule, MdButtonModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SktnDataTableComponent } from './data-table.component';
import { SktnPaginationModule } from './../pagination';

@NgModule({
  imports: [
    CommonModule,
    MdInputModule,
    MdTableModule,
    MdButtonModule,
    CdkTableModule,
    FlexLayoutModule,
    SktnPaginationModule
  ],
  declarations: [
    SktnDataTableComponent
  ],
  exports: [
    SktnDataTableComponent,
    CdkTableModule,
    MdTableModule
  ]
})
export class SktnDataTableModule { }
