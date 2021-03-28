import { NgModule, Type, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeViewComponent } from './code-view.component';

import { PrittifyCodeModule } from '../prittify-code/prittify-code.module';
import { WithCustomElementComponent } from '../../elm-registry';

@NgModule({
  declarations: [ CodeViewComponent ],
  imports: [  CommonModule, PrittifyCodeModule ],
  exports:[CodeViewComponent],
  entryComponents:[ CodeViewComponent],
   schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CodeViewModule implements WithCustomElementComponent {
   customElementComponent: Type<any> = CodeViewComponent;
 }
