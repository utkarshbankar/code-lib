import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AngularHomeComponent } from './angular-home/angular-home.component';
import { CodeTempModule } from './code-temp/code-temp.module';
import { TopicViewComponent } from './topic-view/topic-view.component';
import { TopicListComponent } from './topic-list/topic-list.component'; 

const routes: Routes = [
   {
    path: '',
    //component:AngularHomeComponent
    component: TopicListComponent,
    // pathMatch:'full'
    /**This component is home(root) componet for lazy loading module */
  },
  {
    path:'topic/:id',
    component:AngularHomeComponent
  }

  // {
  //   path:'tempCode',
  //   loadChildren:'./code-temp/code-temp.module#CodeTempModule'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AngularRoutingModule { }
