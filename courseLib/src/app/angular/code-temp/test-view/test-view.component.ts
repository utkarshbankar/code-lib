import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CodeViewComponent } from '../code-view/code-view.component';

@Component({
  selector: 'app-test-view',
  templateUrl: './test-view.component.html',
  styleUrls: ['./test-view.component.css']
})

export class TestViewComponent implements OnInit, AfterViewInit {

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
  
  @ViewChild(CodeViewComponent, { static: true }) viewCode: CodeViewComponent;

  ngAfterViewInit() {
    this.viewCode.code = this.content.nativeElement.innerHTML;
  }

}
