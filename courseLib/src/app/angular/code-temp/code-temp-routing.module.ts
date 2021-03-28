import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestViewComponent } from './test-view/test-view.component';

const routes: Routes = [
   {
    path: '',
    component: TestViewComponent
    /**This component is home(root) componet for lazy loading module */
  }
//   ,
//   {
//     path:'',
//     loadChildren:'./'
//   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeTempRoutingModule { }
