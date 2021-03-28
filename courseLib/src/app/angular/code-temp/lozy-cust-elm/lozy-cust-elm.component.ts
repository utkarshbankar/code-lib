import { Component, ElementRef, Input, OnInit } from '@angular/core';
//import { Logger } from 'app/shared/logger.service';
import { ElmLoaderService } from '../elm-loader.service';

@Component({
  selector: 'app-lozy-cust-elm',
  template:''
  //,
  //styleUrls: ['./lozy-cust-elm.component.css']
})
export class LozyCustElmComponent implements OnInit {
@Input() selector = '';

  constructor(
    private elementRef: ElementRef,
    private elementsLoader:ElmLoaderService
  ) { }

  ngOnInit() {
    if (!this.selector || /[^\w-]/.test(this.selector)) {
      //this.logger.error(new Error(`Invalid selector for 'aio-lazy-ce': ${this.selector}`));
      return;
    }

    this.elementRef.nativeElement.innerHTML = `<${this.selector}></${this.selector}>`;
    this.elementsLoader.loadCustomElement(this.selector);
  
  }

}
