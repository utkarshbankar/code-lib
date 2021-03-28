import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeViewComponent } from './code-view/code-view.component';
import { PrittyViewService } from './pritty-view.service';
import { TestViewComponent } from './test-view/test-view.component';

import { ROUTES } from '@angular/router';
import { CodeTempRoutingModule } from './code-temp-routing.module';
import {
  ELEMENT_MODULE_LOAD_CALLBACKS,
  ELEMENT_MODULE_LOAD_CALLBACKS_AS_ROUTES,
  ELEMENT_MODULE_LOAD_CALLBACKS_TOKEN
} from './elm-registry';

import {  ElmLoaderService } from './elm-loader.service';
import { LozyCustElmComponent } from './lozy-cust-elm/lozy-cust-elm.component';

@NgModule({
  declarations: [ LozyCustElmComponent],
  imports: [
    CommonModule,
    CodeTempRoutingModule
  ],
  exports:[LozyCustElmComponent],
  providers:[  ElmLoaderService,
    { provide: ELEMENT_MODULE_LOAD_CALLBACKS_TOKEN, useValue: ELEMENT_MODULE_LOAD_CALLBACKS },

    // Providing these routes as a signal to the build system that these modules should be
    // registered as lazy-loadable.
    // TODO(andrewjs): Provide first-class support for providing this.
    { provide: ROUTES, useValue: ELEMENT_MODULE_LOAD_CALLBACKS_AS_ROUTES, multi: true },] 
  // entryComponents:[TestViewComponent]
})
export class CodeTempModule { }
