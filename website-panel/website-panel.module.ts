import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdProgressSpinnerModule } from '@angular/material';
import { SktnMessagesModule } from './../messages'
import { SktnWebsitePanelComponent } from './website-panel.component';
import { SktnWebsitePanelService } from './website-panel.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MdProgressSpinnerModule,
    SktnMessagesModule
  ],
  declarations: [
    SktnWebsitePanelComponent
  ],
  exports: [
    SktnWebsitePanelComponent
  ],
  providers: [
    SktnWebsitePanelService
  ]
})
export class SktnWebsitePanelModule { }
