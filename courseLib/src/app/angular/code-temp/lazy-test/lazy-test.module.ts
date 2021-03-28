import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyTestingComponent } from './lazy-testing/lazy-testing.component';
import { WithCustomElementComponent } from '../../code-temp/elm-registry'; 

@NgModule({
  declarations: [LazyTestingComponent],
  imports: [   CommonModule],
  exports:[  LazyTestingComponent ],
  entryComponents:[LazyTestingComponent]
})
export class LazyTestModule implements WithCustomElementComponent {
  customElementComponent : Type<any> = LazyTestingComponent;
 }
