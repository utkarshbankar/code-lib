import { Component, OnInit, ViewChild, ElementRef ,HostListener} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs'

import { DocTempService } from '../../appshared/doc-temp.service';

@Component({
  selector: 'app-doc-temp',
  templateUrl: './doc-temp.component.html',
  styleUrls: ['./doc-temp.component.css']
})
export class DocTempComponent implements OnInit {
  private formData: any;
  public elmTextErrorMsg: string;
  @ViewChild('elmTextInput') elmTextInput: any='';
  public infoPointArray: any = [];
  public infoListElmRef: HTMLElement;
  public refElm: HTMLElement;
  public docTempString:String='';
  defTempObj:any = {
    defConcept:'',
    defDescription:''
  }
  @ViewChild('infoPointToAdd') infoPointToAdd:any ='';
  public infoPointIsAdded:String = '';
  @ViewChild('codeBlock') codeBlock:any ='';
  public codeBlockStr:string = '';
  @ViewChild('headingTemp') headingTemp;
  public theHeadingType:string;
  @ViewChild('defTempForm') tempFormData:any; 
  @ViewChild('paraBlock') paraString:any;
  constructor(private fb: FormBuilder, private docTemplate: DocTempService, private elmref: ElementRef) {}

  //   profileForm = this.fb.group({
  //       docDef:'',
  //       lastName:'',
  //       skills: this.fb.array([ ])
  //   })

  //   get skills() {
  //   return this.profileForm.get('skills') as FormArray;
  // }

  // addSkills() {
  //   this.skills.push(this.fb.control(''));
  // }

  // deleteSkills(){
  // //	this.profileForm.controls.skills.splice(this.fb.control(''),0,1);
  // }

  ngOnInit(): void {
  }

  // saveData(){
  //   alert('hi')
  //   this.formData = this.profileForm.value;

  //   let str='';
  //   str += `<p>${this.formData.docDef}</p>`;
  //   str += `\n<code-view> ${this.formData.lastName} </code-view>`
  //   str.replace( /"/, '\"');

  //   this.docTemplate.getDocData( { "id":'Component',"contents":str,"infoItem": this.formData.skills	}).subscribe();

  // }

  createElm(elm) {
    let refElm = document.getElementById('contentElm');
    var tempCurrentElm = document.createElement(elm);
    var elmTextContent = this.elmTextInput.nativeElement.value;

    if (elm == 'p' && elmTextContent) {
      tempCurrentElm.innerText = elmTextContent;
    } else if (elm == 'h4' && elmTextContent) {
      tempCurrentElm.innerText = elmTextContent;
    }

    refElm.appendChild(tempCurrentElm);
    this.elmTextInput.nativeElement.value = '';
  }

  createInfoListPoint(elm) {
    let refElm = document.getElementById('contentElm');
    //let infoPointArray:any = [];
    let infoItemContent = this.elmTextInput.nativeElement.value;
    let liRef = document.createElement('li');

    if (refElm !== null && refElm.lastChild !== null && refElm.lastChild.nodeName !== null) {
      let lastChildElm = refElm.lastChild.nodeName;
      if (lastChildElm == 'UL') {
        liRef.textContent = infoItemContent;
        this.infoListElmRef.appendChild(liRef);
      } else {
        this.infoListElmRef = document.createElement('ul');
        let ulLength = refElm.getElementsByTagName('UL');
        this.infoListElmRef.id = `infoList${ulLength.length}`;
        liRef.textContent = infoItemContent;
        this.infoListElmRef.appendChild(liRef);
      }
      refElm.appendChild(this.infoListElmRef);
      this.elmTextInput.nativeElement.value = '';
    } else {
      this.infoListElmRef = document.createElement('ul');
      let ulLength = refElm.getElementsByTagName('UL');
      this.infoListElmRef.id = `infoList${ulLength.length}`;
      liRef.textContent = infoItemContent;
      this.infoListElmRef.appendChild(liRef);
      refElm.appendChild(this.infoListElmRef);
      this.elmTextInput.nativeElement.value = '';
    }
  }

  elementTextContent(elmTextContent) {
    if (elmTextContent) {
      this.elmTextErrorMsg = '';
    } else {
      this.elmTextErrorMsg = 'please Add element Text content';
    }
  }

  saveTemplate() {
    let templateStr = document.getElementById('contentElm').innerHTML;
    let idForContent = document.getElementById('contentElm').firstElementChild.textContent;
    //templateStr.replace( /"=/, '\"');
    //let str = `${templateStr}`;
    let str= '';
    if( templateStr !=='' || str != ''){
        let allStr = templateStr.match(/[^\r\n]+/g);
        allStr.forEach( elm => { str += `\n ${elm}` });
        str.replace(/"=/g, '\"');

        if(str){
        this.docTemplate.saveDocTemplate({ 
        "contentId": idForContent ,
        "contentTitle": idForContent,
        "content": str , 
        "contentNote":'',
        "contentParam":'' }).subscribe();
        }
        
    } else{
      alert('No data avilabel to store');
    }
    
  }

  clearTemplate(){
    this.elmTextInput.nativeElement.value = ''; 
    document.getElementById('contentElm').innerHTML = '';
  }

  createCodeTemp(){
    let codeTempStr = this.elmTextInput.nativeElement.value;
    let str = `<code-view>${codeTempStr}</code-view>`;
    let appendStrToContent = document.createElement('div');
    //appendStrToContent.setAttribute('style','display:none');
    appendStrToContent.innerHTML = str;
    document.getElementById('contentElm').appendChild(appendStrToContent);
    this.elmTextInput.nativeElement.value='';
  }

  saveDefTemp(defTempFormdata){
    
    let defString = `
    <div class="row pt-1">
    <div class="col-md-2 text-right concept-name">
     <h4> ${ defTempFormdata.defConcept }</h4>
    </div>
    <div class="col-md-10 concept-def">
      <b>Defination:</b>
      <br>
      <p>
        ${defTempFormdata.defDescription}
      </p>
    </div>
    </div>`;
    let appendStrToContent = document.createElement('div');
    appendStrToContent.setAttribute('class', 'concept-wrapper');
    appendStrToContent.innerHTML = defString;
    document.getElementById('contentElm').appendChild(appendStrToContent);
    this.tempFormData.reset();
  }

  checkinfoPointIsAdded(){
    this.infoPointIsAdded = this.infoPointToAdd.nativeElement.value;
  }

  addAnotherInfoPpoint(){
    let infoItemContent = this.infoPointToAdd.nativeElement.value;
    let liRef = document.createElement('li');
    let refElm = document.getElementById('infoPointDisaplyList');
    this.infoListElmRef = document.createElement('ul');
    if (refElm !== null ) {
        liRef.textContent = infoItemContent;
        this.infoListElmRef.appendChild(liRef);
    }
    refElm.appendChild(this.infoListElmRef);
    this.infoPointToAdd.nativeElement.value = '';  
     this.infoPointIsAdded = '';
  }
  saveInfoPoints(){
   let  infoPointsStr = document.getElementById('infoPointDisaplyList').innerHTML;

   let infoPointTempStr= `
   <blockquote> ${ infoPointsStr } </blockquote>
   `;
    let appendStrToContent = document.createElement('div');
    appendStrToContent.setAttribute('class', 'concept-points');
    appendStrToContent.innerHTML = infoPointTempStr;
    document.getElementById('contentElm').appendChild(appendStrToContent);
    document.getElementById('infoPointDisaplyList').innerHTML = '';
  }

  clearInfoList(){
   document.getElementById('infoPointDisaplyList').innerHTML = '';
   this.infoPointIsAdded = '';
  }

  saveCodeBlock(clicked?){
    this.codeBlockStr = this.codeBlock.nativeElement.value;
    if(clicked){
      let codeBlockStr = `
      <code-view>
        ${ this.codeBlockStr }
      </code-view>
      `;

    let appendStrToContent = document.createElement('div');
    //appendStrToContent.setAttribute('class', 'code-wrapper');
    appendStrToContent.innerHTML = codeBlockStr;
    document.getElementById('contentElm').appendChild(appendStrToContent);
    document.getElementById('infoPointDisaplyList').innerHTML = '';
    this.codeBlock.nativeElement.value = '';
    }
  }

  clearCodeBlock(){
    this.codeBlock.nativeElement.value = '';
  }

  clearHeading(){
    this.headingTemp.nativeElement.value = ''; 
  }

   headingToAdd(heading){
    this.theHeadingType = heading;
  }

  saveHeading(headingVal?){
    let headingElmVal = this.theHeadingType; 
    if(headingVal && headingElmVal){
      let headingElm = document.createElement(headingElmVal);
      headingElm.innerHTML = titleCase(headingVal);
      document.getElementById('contentElm').appendChild(headingElm);
      this.headingTemp.nativeElement.value = ''; 
      this.closeModel();
    }  
   
  }

  savePara(paraString?){
  let paraBlockStr = '';
  if(paraString){
    let appendStrToContent = document.createElement('p');
    //appendStrToContent.setAttribute('class', 'concept-points');
    appendStrToContent.innerHTML = paraString;
    document.getElementById('contentElm').appendChild(appendStrToContent);
    this.paraString.nativeElement.value = '';
  }


  }

  closeModel(){
    // let modelRef = document.getElementsByClassName('show');
    // let idOfModal = modelRef[0].id;
    // modelRef[0].classList.remove('show');
    // modelRef[0].setAttribute('aria-hidden', 'true');
    // modelRef[0].setAttribute('style','display:none');
    // //modelRef[0].setAttribute('data-dismiss', "modal");
    // //modelRef[0].classList.remove('show');
    // //modelRef[0].setAttribute('style','display:none');
    // // 
    // // modelRef[0].setAttribute('data-dismiss','modal');

    // document.getElementById(`${idOfModal}`).dataset.dismiss = 'modal';
    // // const modalBackdrops = document.getElementsByClassName('modal-backdrop');
    // document.body.removeChild(modalBackdrops[0]);
    // let btnArray = document.querySelectorAll(`.btn`) as any;
    // for( let item of btnArray){
    //   let hedStr = `#${idOfModal}`;
    //   if( item.dataset.target  == hedStr ){
    //      item.addEventListener('click', window.document.body);
    //      item.focus();
    //   }
    // }     
    // document.querySelector(`#${idOfModal}`).addEventListener('click', (e) => {
    //   // btnArray.forEach(elm => {
    //   //   if(elm.id == idOfModal ){
    //   //     elm.focus();   
    //   //   } 
    //   // });
    // });
  }

  // @HostListener('document:click', ['$event'])
  // onclick() {

  // }
}

function titleCase(str) { 
  return str.toLowerCase().split(' ').map(function(word) { 
    return (word.charAt(0).toUpperCase() + word.slice(1)); 
  }).join(' '); 
} 