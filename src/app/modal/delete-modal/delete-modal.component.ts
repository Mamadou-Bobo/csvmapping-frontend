import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  // @Input() show: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  // show(template) {
  //   console.log(template);
  // }

}
