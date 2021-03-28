import { Component, OnInit } from '@angular/core';
import { DocTempService }  from '../../appshared/doc-temp.service';
import { Template } from '../../appshared/Template';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {

  public templateArr:any = [];

  constructor(private docTempServ:DocTempService) { }

  ngOnInit(): void {
    this.docTempServ.getAllTemplateTitle().subscribe( rep =>{
     this.templateArr = rep;
     console.log(this.templateArr);
     
    });
  }

}
