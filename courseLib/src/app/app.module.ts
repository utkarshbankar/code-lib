import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
/**
 * Third Party lib/modules
*/
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// importign feature module 
import { AsideMenuModule } from './aside-menu/aside-menu.module';
/**
 * Do no import lazy loading module here you will get error 
 *  
 * import { AngularModule } from './angular/angular.module';
 * import { AngularHomeComponent } from './angular/angular-home/angular-home.component';
*/
// custome components 
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ELEMENT_MODULE_LOAD_CALLBACKS_TOKEN } from './angular/code-temp/elm-registry';
import { DocTempComponent } from './components/doc-temp/doc-temp.component';
import { FaqTempComponent } from './components/faq-temp/faq-temp.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DocTempComponent,
    FaqTempComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AsideMenuModule,
    //ModalModule.forChild() 
    /** import feature module which is eager loading module curentely 
    *   not in use just for concept implementation
    */
  ],
  entryComponents:[], 
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
