import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { UserService } from 'src/app/services/user.service';
import { MatchValidator } from "../../classes/match.validator";
import { ProfileUpdate } from "../../classes/profileupdate";
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileNameForm: FormGroup = this.formBuilder.group({
    'firstname': new FormControl('', [Validators.required, Validators.maxLength(50)]),
    'lastname': new FormControl('', [Validators.required, Validators.maxLength(50)]),
  });;

  profileEmailForm: FormGroup = this.formBuilder.group({
    'email': new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
  });

  profilePasswordForm: FormGroup = this.formBuilder.group({
    'password': new FormControl('', [Validators.required, Validators.maxLength(20)]),
    'verifypassword': new FormControl('', [Validators.required]),
  }, {
      validator: MatchValidator('password', 'verifypassword')
    });;

  user: User = new User();

  constructor(private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.user = this.userService.getUser();
    this.profileNameForm.controls['firstname'].setValue(this.user.firstName);
    this.profileNameForm.controls['lastname'].setValue(this.user.lastName);
    this.profileEmailForm.controls['email'].setValue(this.user.email);
  }

  updateName() {
    if (this.profileNameForm.invalid) {
      return;
    }
    let updatedUser: ProfileUpdate = new ProfileUpdate();
    updatedUser.firstName = this.profileNameForm.get("firstname").value;
    updatedUser.lastName = this.profileNameForm.get("lastname").value;

    this.userService.updateUser(updatedUser).subscribe(result => {
      this.profileNameForm.controls['firstname'].setValue(result.firstName);
      this.profileNameForm.controls['lastname'].setValue(result.lastName);
      this.openSnackBar("profile updated", "OK", "green-snackbar");
      sessionStorage.setItem("user", JSON.stringify(result));
    },
      error => this.handleError(error)
    );
  }

  updateEmail() {
    if (this.profileEmailForm.invalid) {
      return;
    }
    let updatedUser: ProfileUpdate = new ProfileUpdate();
    updatedUser.email = this.profileEmailForm.get("email").value;

    this.userService.updateUser(updatedUser).subscribe(result => {
      this.user = result;
      this.profileEmailForm.controls['email'].setValue(result.email);
      this.openSnackBar("email updated", "OK", "green-snackbar");
      sessionStorage.setItem("user", JSON.stringify(result));
    },
      error => this.handleError(error)
    );
  }

  updatePassword() {
    if (this.profilePasswordForm.invalid) {
      console.log("invalid");
      return;
    }

    let updatedUser: ProfileUpdate = new ProfileUpdate();
    updatedUser.password = this.profilePasswordForm.get("password").value;
    this.userService.updateUser(updatedUser)
      .subscribe(
        result => this.openSnackBar("password updated", "OK", "green-snackbar"),
        error => this.handleError(error)
      );
  }

  handleError(error: any) {
    console.log(error);
    if (error.status == "0") {
      this.openSnackBar("service temporarily unavailable", "dismiss", "red-snackbar");
    } else {
      this.openSnackBar("unable to update account", "dismiss", "red-snackbar");
    }
  }

  openSnackBar(message: string, action: string, color: string) {
    this.snackBar.open(message, action, {
      duration: 600000,
      panelClass: [color],
    });
  }

}
