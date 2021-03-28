import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PritifyCodeComponent } from './pritify-code.component';

import { PrittyViewService } from '../../pritty-view.service';

@NgModule({
 imports: [ CommonModule],
  declarations: [ PritifyCodeComponent ],
  entryComponents: [ PritifyCodeComponent ],
  exports: [ PritifyCodeComponent ],
  providers: [ PrittyViewService ]
})
export class PrittifyCodeModule { }
