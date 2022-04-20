import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor() { }

  showMessages = {
    error: false,
    success: false,
  }

  pass: string = "";
  confirmPassword: string = "";

  submitted = false

  errors = [];

  messages = [];

  //constructor() { }

  ngOnInit() {
  }

  resetPass() {

  }

}
