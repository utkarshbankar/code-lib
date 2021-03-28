import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public isMenuClose: boolean = false;
  public heightOfWindow;
  constructor() {
    this.heightOfWindow = window.innerHeight;
  }

  ngOnInit() {
  }

  toggalAsideMenu(val) {
    this.isMenuClose = val;
  }

}
