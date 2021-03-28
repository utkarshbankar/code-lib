import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-faq-temp',
  templateUrl: './faq-temp.component.html',
  styleUrls: ['./faq-temp.component.css']
})
export class FaqTempComponent implements OnInit {

  public tempFormData: any;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  this.tempFormData =  this.fb.group({
      fapTempSubject: ['Python'],
      fapTempId:[''],
      fapTempTopic: [''],
      fapTempQue:[''],
      fapTempCode:[''],
      fapTempDesc:['']
    })
  }

  saveProgramTemplate() {
    let tempCodeBlockStr = this.tempFormData.controls.fapTempCode.value
    let tempStr= '';  
    let allStr = tempCodeBlockStr.match(/[^\r\n]+/g);
        allStr.forEach( elm => { tempStr += `\n ${elm}` });
        tempStr.replace(/"=/g, '\"');
    this.tempFormData.controls.fapTempCode.setValue(
    `<code-view>
        ${ tempStr }
    </code-view>
    `);
    console.log(this.tempFormData.value);
    this.tempFormData.reset();    
  }

}
