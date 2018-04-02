import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'bus-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  driverNumber = new FormControl('', [
    Validators.required,
  ]);

  password = new FormControl('', [
    Validators.required,
  ]);

}
