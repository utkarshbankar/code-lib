import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsideMenuRoutingModule } from './aside-menu-routing.module';
import { MenuListComponent } from './menu-list/menu-list.component';

@NgModule({
  declarations: [MenuListComponent],
  imports: [
    CommonModule,
    AsideMenuRoutingModule
  ]
  //,exports:[MenuListComponent]
})
export class AsideMenuModule { }
