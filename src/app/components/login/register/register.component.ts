import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { UserService } from 'src/app/services/user.service';
import { MatchValidator } from "../../../classes/match.validator";
import { Register } from "../../../classes/register";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup = this.formBuilder.group({
    'username': new FormControl('', [Validators.required, Validators.maxLength(20)]),
    'firstname': new FormControl('', [Validators.required, Validators.maxLength(50)]),
    'lastname': new FormControl('', [Validators.required, Validators.maxLength(50)]),
    'email': new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
    'password': new FormControl('', [Validators.required, Validators.maxLength(20)]),
    'verifypassword': new FormControl('', [Validators.required]),
  }, {
      validator: MatchValidator('password', 'verifypassword')
    });

  constructor(private userService: UserService, 
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) {

   }

  ngOnInit() {
  }

  registerUser() {

    if (this.registrationForm.invalid) {
      return;
    }

    let register = new Register();
    register.userName = this.registrationForm.get("username").value;
    register.firstName = this.registrationForm.get("firstname").value;
    register.lastName = this.registrationForm.get("lastname").value;
    register.email = this.registrationForm.get("email").value;
    register.password = this.registrationForm.get("password").value;

    this.userService.registerUser(register)
    .subscribe(result => {this.openSnackBar("account created", "OK", "green-snackbar");},
    error => this.handleError(error));
  }

  handleError(error: any) {
    console.log(error);
    if (error.status == "409") {
      this.openSnackBar("username unavailable", "dismiss", "red-snackbar");
    }
    else if (error.status == "0") {
      this.openSnackBar("service temporarily unavailable", "dismiss", "red-snackbar");
    }
  }

  openSnackBar(message: string, action: string, color: string) {
    this.snackBar.open(message, action, {
      duration: 600000,
      panelClass: [color],
    });
  }
}
