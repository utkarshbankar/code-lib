import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularModule } from './angular/angular.module';
import { DocTempComponent } from './components/doc-temp/doc-temp.component';
import { FaqTempComponent } from './components/faq-temp/faq-temp.component';
import { AngularRoutingModule } from './angular/angular-routing.module';

const routes: Routes = [
  
  {
    path: 'Angular',
    loadChildren: () => import('./angular/angular.module').then(m => m.AngularModule)
    /**
     * This is the way or syntax to load the lazy loading module in Angular 7 or before
     * loadChildren: () => import('./angular/angular-routing.module').then(m => m.AngularRoutingModule)
     */
  },
  {
    path: 'docTemp',
    component:DocTempComponent
  },
  {
    path: 'faqTemp',
    component:FaqTempComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
