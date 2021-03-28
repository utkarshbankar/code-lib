import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PritifyCodeComponent } from '../prittify-code/pritify-code.component';
@Component({
  selector: 'code-view',
  template:`
  <div #content style="display: none" ><ng-content></ng-content></div>
  <pritify-view [linenums]="false" > </pritify-view> `
})

export class CodeViewComponent implements OnInit, AfterViewInit {

  public codeTemp =` 
  // #docregion imports
  import { Component } from '@angular/core';
  // #enddocregion imports
@Component({ 
    selector:   'app-comp',
    templateUrl:'./template.path',OR tempLate:'your Embeded Html Template',
    styleUrls:  './styles url', OR styles: 'your embeded style' ,
    providers: ['serviceName'],
    encapsulation: 'ViewEncapsulation.None'
  });
export Class AppComponent{ }`

  public path = '../code-view/code-view.component';
  public region = 'import'; 

  codeTemp2 = `import{ Directive } from @angular/comp`;

constructor() { }

  ngOnInit() {
  }

  @ViewChild('content', { static: true }) content: ElementRef;
  
  @ViewChild(PritifyCodeComponent, { static: true }) viewCode: PritifyCodeComponent;

  ngAfterViewInit() {
    this.viewCode.code = this.content.nativeElement.innerHTML;
  }

}
