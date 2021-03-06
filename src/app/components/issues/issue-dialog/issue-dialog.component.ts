import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Issue } from 'src/app/classes/issue';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

export interface IssueDialogData {
  issue: Issue;
  option: string;
}

export interface SelectDialog {
  value: string;
  viewValue: string;
}

export interface SelectDialogNumeric {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-issue-dialog',
  templateUrl: './issue-dialog.component.html',
  styleUrls: ['./issue-dialog.component.scss']
})
export class IssueDialogComponent implements OnInit {

  priorities: SelectDialogNumeric[] = [
    { value: 1, viewValue: 'Low' },
    { value: 5, viewValue: 'Medium' },
    { value: 10, viewValue: 'High' }
  ];

  status: SelectDialog[] = [
    { value: 'NEW', viewValue: 'New' },
    { value: 'IN PROGRESS', viewValue: 'In Progress' },
    { value: 'COMPLETED', viewValue: 'Completed' }
  ];
  
  public dialogTitle;
  public buttonTitle;
  public createdByUserFirstLast;
  public isUpdate: boolean;

  public issue: Issue;
  public users: Array<User>;

  issueForm: FormGroup = this.formBuilder.group({
    'title': new FormControl('', [Validators.required, Validators.maxLength(150)]),
    'description': new FormControl('', [Validators.required, Validators.maxLength(250)]),
    'status': new FormControl('', [Validators.required]),
    'priority': new FormControl('', [Validators.required]),
    'assigneduser': new FormControl(''),
    'estimate': new FormControl(''),
  });;


  constructor(public dialogRef: MatDialogRef<IssueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IssueDialogData,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router) {

    dialogRef.disableClose = true;
    this.issue = data.issue;

    if (data.option === "CREATE") {
      this.isUpdate = false;
      this.dialogTitle = "Add a new Issue";
      this.buttonTitle = "Create";
      this.issueForm.get('status').disable();

      this.issue.status = "NEW";
      let user: User = this.userService.getUser();
      this.issue.createdByUser = user;
    }
    else if (data.option === "UPDATE") {
      this.isUpdate = true;
      this.dialogTitle = "View and Edit Issue";
      this.buttonTitle = "Update";
      this.createdByUserFirstLast = this.issue.createdByUser.firstName + " " + this.issue.createdByUser.lastName;
    }

    this.mapIssueToFormIssue();

  }

  cancel(): void {
    this.dialogRef.close();
  }

  save() {
    if (this.issueForm.invalid) {
      return;
    }
    this.mapFormIssueToIssue();
    this.dialogRef.close(this.issue);
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(response => this.users = response);
  }

  compareUser(user1: User, user2: User): boolean {
    if (user1 && user2) {
      return user1.userId === user2.userId;
    }
  }

  mapIssueToFormIssue() {
    this.issueForm.controls['title'].setValue(this.issue.title);
    this.issueForm.controls['description'].setValue(this.issue.description);
    this.issueForm.controls['status'].setValue(this.issue.status);
    this.issueForm.controls['priority'].setValue(this.issue.priority);
    this.issueForm.controls['assigneduser'].setValue(this.issue.assignedUser);
    this.issueForm.controls['estimate'].setValue(this.issue.estimate);
  }

  mapFormIssueToIssue() {
    this.issue.title = this.issueForm.get("title").value;
    this.issue.description = this.issueForm.get("description").value;
    this.issue.status = this.issueForm.get("status").value;
    this.issue.priority = this.issueForm.get("priority").value;
    this.issue.assignedUser = this.issueForm.get("assigneduser").value;
    this.issue.estimate = this.issueForm.get("estimate").value;

  }

}



