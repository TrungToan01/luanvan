import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  panelOpenState = false;
  peopleclick = false;
  constructor() {}

  ngOnInit(): void {}
}
