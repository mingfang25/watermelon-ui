import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { FormGroup, FormControl } from '@angular/forms';
import { Issue } from 'src/app/classes/issue';
import { IssueService } from '../../services/issue.service'
import { IssueRequest } from 'src/app/classes/issue-request';
import { IssueDialogComponent } from './issue-dialog/issue-dialog.component';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';


export interface Status {
	value: string;
	viewValue: string;
}

@Component({
	selector: 'app-issues',
	templateUrl: './issues.component.html',
	styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

	status: Status[] = [
		{ value: 'NEW', viewValue: 'New' },
		{ value: 'IN PROGRESS', viewValue: 'In Progress' },
		{ value: 'COMPLETED', viewValue: 'Completed' }
	];

	issuesForm: FormGroup = new FormGroup({
		'statusSelect': new FormControl('')
	});

	public issues: Array<Issue>;
	public filter: string;
	public title: string;
	public count: number;

	constructor(private issueService: IssueService, private userService: UserService, public dialog: MatDialog, private activatedRoute: ActivatedRoute, private projectService: ProjectService) { }

	ngOnInit() {
		this.getIssues();
		this.issuesForm.get('statusSelect').valueChanges.subscribe(value => this.filter = value)

		if (this.activatedRoute.snapshot.params['issueId']) {
			this.getOneIssueForNavigation(this.activatedRoute.snapshot.params['issueId']);
		}

		this.projectService.projectChanged$.subscribe(result => this.getIssues());
	}

	filteredIssues() {
		if (this.issues && this.filter) {
			this.title = this.filter + " Issues";
			let filteredIssues = this.issues.filter(item => item.status == this.filter);
			this.count = filteredIssues.length
			return filteredIssues;
		}
		this.title = "All Issues"
		if (this.issues) {
			this.count = this.issues.length
		}
		return this.issues;
	}

	addNewIssue(): void {
		let newIssue: Issue = {} as Issue;
		const createIssueDialog = this.dialog.open(IssueDialogComponent, {
			width: '800px',
			data: { issue: newIssue, option: "CREATE" }
		});

		createIssueDialog.afterClosed().subscribe(result => {
			if (result) {
				let issueRequest: IssueRequest = this.mapIssueToIssueRequest(result);
				this.createIssue(issueRequest);
			}
		});
	}

	editIssue(issue: Issue): void {
		const createIssueDialog = this.dialog.open(IssueDialogComponent, {
			width: '70rem',
			data: { issue: issue, option: "UPDATE" }
		});

		createIssueDialog.afterClosed().subscribe(result => {
			if (result) {
				let issueRequest: IssueRequest = this.mapIssueToIssueRequest(result);
				this.updateIssue(issueRequest, issue.issueId);
			}
			else {
				this.getIssues();
			}
		});
	}

	//TOOD we might want to revisit how priority works
	translatePriority(priority: number): String {
		if (priority === 1) {
			return "Low"
		}
		else if (priority === 5) {
			return "Medium"
		}
		else if (priority === 10) {
			return "High";
		}
	}

	/***************************************************************************
	 * MAPPERS
	*************************************************************************** */
	mapIssueToIssueRequest(issue: Issue): IssueRequest {
		let issueRequest: IssueRequest = new IssueRequest();
		issueRequest.title = issue.title;
		issueRequest.description = issue.description;
		issueRequest.priority = issue.priority;
		issueRequest.status = issue.status;
		issueRequest.estimate = issue.estimate;
		if (issue.createdByUser) {
			issueRequest.createdByUserId = issue.createdByUser.userId;
		}
		if (issue.assignedUser) {
			issueRequest.assignedUserId = issue.assignedUser.userId;
		}
		return issueRequest;
	}

	/***************************************************************************
	 * TEST SERVICE CALLS
	*************************************************************************** */

	getIssues() {

		this.issueService.getIssues().subscribe(results => {
			this.issues = results;
		});
	}

	getOneIssueForNavigation(issueId: number) {
		this.issueService.getIssueById(issueId).subscribe(result => this.editIssue(result));
	}

	createIssue(issue: IssueRequest) {
		this.issueService.createIssue(issue).subscribe(result => this.getIssues());
	}

	updateIssue(issue: IssueRequest, issueId: number) {
		this.issueService.updateIssue(issue, issueId).subscribe();
	}

	deleteIssue(issueId: number) {
		if (confirm('Are you sure you want to delete this issue?')) {
			this.issueService.deleteIssue(issueId).subscribe(result => this.getIssues());
		}
	}

}