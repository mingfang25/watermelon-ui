import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IssueRequest } from '../classes/issue-request';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Issue } from '../classes/issue';
import { ProjectService } from './project.service';
import { Project } from '../classes/project';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private issueUrl: string = environment.url + "/issues"

  constructor(private http: HttpClient, private projectService: ProjectService) { }

  getIssues(): Observable<Array<Issue>> {
    let headers: HttpHeaders = this.getHeaders();

    
    let project = this.projectService.getActiveProject();
    let url = this.issueUrl;
    if (project) {
      url = url + "?project=" + project.projectId 
    }

    return this.http.get<Array<Issue>>(url, {headers: headers, withCredentials:true});
  }

  getIssueById(issueId: number): Observable<Issue> {
    let headers: HttpHeaders = this.getHeaders();
    let url = this.issueUrl + "/" + issueId;

    return this.http.get<Issue>(url, {headers: headers, withCredentials:true});
  }

  createIssue(issue: IssueRequest): Observable<Object> {
    let headers: HttpHeaders = this.getHeaders();

    let project = this.projectService.getActiveProject();
    issue.projectId = project.projectId;

    return this.http.post(this.issueUrl, JSON.stringify(issue), {headers: headers, withCredentials:true});
  }

  updateIssue(issue: IssueRequest, issueId: number): Observable<Object> {
    let headers: HttpHeaders = this.getHeaders();
    let url = this.issueUrl + "/" + issueId;

    return this.http.put(url, JSON.stringify(issue), {headers: headers, withCredentials:true});
  }

  deleteIssue(issueId: number): Observable<Object> {
    let headers: HttpHeaders = this.getHeaders();
    let url = this.issueUrl + "/" + issueId;

    return this.http.delete(url, {headers: headers, withCredentials:true});
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders()
    .set('X-Requested-With', 'XMLHttpRequest')
    .set('Content-Type', 'application/json');
  }
}
