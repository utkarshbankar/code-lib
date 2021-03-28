import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularRoutingModule } from './angular-routing.module';
import { AngularHomeComponent } from './angular-home/angular-home.component';
import { BasicDirective } from './basic.directive';
import { CodeTempModule } from './code-temp/code-temp.module';
import { TopicViewComponent } from './topic-view/topic-view.component';
import { TopicListComponent } from './topic-list/topic-list.component';
 
@NgModule({
  declarations: [AngularHomeComponent, TopicViewComponent, TopicListComponent],
  imports: [
    CommonModule,
    AngularRoutingModule,
    CodeTempModule
  ],
  exports:[AngularHomeComponent,TopicViewComponent,TopicListComponent]
})
export class AngularModule { }
