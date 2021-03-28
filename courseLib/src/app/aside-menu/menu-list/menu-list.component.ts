import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  public isMenuClose: boolean = false;
  public isHightOfWindow;
  constructor() {
    this.isHightOfWindow = window.innerHeight;
  }

  ngOnInit() {
  }

  toggalAsideMenu(val) {
    this.isMenuClose = val;
  }
}
