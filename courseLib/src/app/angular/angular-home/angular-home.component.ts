import { Component, OnInit, ViewChild, AfterViewInit,  OnDestroy } from '@angular/core';
import { Router , ActivatedRoute , ParamMap } from '@angular/router'
import { Location } from '@angular/common';
import { DocService } from '../shared/doc.service';

@Component({
  selector: 'app-angular-home',
  templateUrl: './angular-home.component.html',
  styleUrls: ['./angular-home.component.css']
})
export class AngularHomeComponent implements OnInit, AfterViewInit, OnDestroy {
  public currentDoc ;
  public id:any;
//   public codeTemp =` 
//   // #docregion imports
//   import { Component } from '@angular/core';
//   // #enddocregion imports
// @Component({ 
//     selector:   'app-comp',
//     templateUrl:'./template.path',OR tempLate:'your Embeded Html Template',
//     styleUrls:  './styles url', OR styles: 'your embeded style' ,
//     providers: ['serviceName'],
//     encapsulation: 'ViewEncapsulation.None'
//   });
// export Class AppComponent{ }`;

// public codeChange=`

// <label [prop]="dummyProp">Heelo Evelyone</label>
// <input type="string">
// `

// public stringT1 = 
//    `it('should update the value in the control', () =&gt; {
//   component.favoriteColorControl.setValue('Blue');

//   const input = fixture.nativeElement.querySelector('input');

//   expect(input.value).toBe('Blue');
// });` 
  constructor( private docSrv: DocService, private location: Location,private route:Router , private ar:ActivatedRoute) { }

  
  ngOnInit() { 
  this.id = this.ar.snapshot.paramMap.get('id'); 
  //this.docSrv.currentDocument.subscribe(doc => this.currentDoc = doc); 
  if( this.id !== undefined || this.id !== null ){
    this.docSrv.loadDoc(this.id);
    this.docSrv.currentDocument.subscribe(doc => this.currentDoc = doc); 
  }  
}

  ngAfterViewInit(){
    //this.docSrv.currentDocument.subscribe(doc =>{ this.currentDoc = doc});
    //this.docSrv.currentDocument.unsubscribe()
  } 

  ngOnDestroy(){
    //this.docSrv.currentDocument.unsubscribe()
  }


  goToPath(){
    //this.location.go(`/${path}`)
    this.route.navigate(['./Angular'])
  }
}
