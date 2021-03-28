//import { Directive, Input, TemplateRef, ViewContainerRef  } from '@angular/core';
import { Directive, ElementRef, ViewChild, OnInit, AfterViewInit  } from '@angular/core';
import { Renderer2 } from '@angular/core';
@Directive({
  selector: '[appBasic]'
})
export class BasicDirective implements OnInit, AfterViewInit{
  /**
   *1.https://medium.com/javascript-everyday/reusable-components-with-configurable-templates-in-angular-3c55741c97f3
   2.https://alligator.io/angular/reusable-components-ngtemplateoutlet/
   3.https://christianlydemann.com/creating-reusable-angular-components-how-to-avoid-the-painful-trap-most-go-in/
  */
  
  private hasView = false;
  @ViewChild('basicDirective', /* TODO: add static flag */ {}) basicDir;
   constructor(
  //private templateRef: TemplateRef<any>,
  //private viewContainer: ViewContainerRef
  private el:ElementRef,
  private renderer:Renderer2
  ) { 
    this.createBasicTemplate();
  }

ngOnInit(){}
 ngAfterViewInit() {
}
  createBasicTemplate(){
    this.el.nativeElement.innerHTML = `
    <button id="btn" class="hello" (click)="btnWorking()"> Hello </button>
    `
  }

  btnWorking(){
    console.log(this.basicDir);
  }
}
