import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Project } from '../classes/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectUrl: string = environment.url + "/projects"
  private projectChangedSource = new Subject<string>();

  projectChanged$ = this.projectChangedSource.asObservable();

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Array<Project>> {
    let headers: HttpHeaders = this.getHeaders();

    return this.http.get<Array<Project>>(this.projectUrl, { headers: headers, withCredentials: true });
  }

  getProjectById(projectId: number): Observable<Project> {
    let headers: HttpHeaders = this.getHeaders();
    let url = this.projectUrl + "/" + projectId;

    return this.http.get<Project>(url, { headers: headers, withCredentials: true });
  }

  getActiveProject(): Project {
    return JSON.parse(sessionStorage.getItem('project'));
  }

  getFilterUrl(originalUrl: string): string {
    //get the active project and append a filter to the url if the project is set
    let project = JSON.parse(sessionStorage.getItem('project'));
    let url = originalUrl;
    if (project) {
      url = url + "?project=" + project.projectId
    }
    return url;
  }

  createProject(project: Project): Observable<Object> {
    let headers: HttpHeaders = this.getHeaders();

    return this.http.post(this.projectUrl, JSON.stringify(project), { headers: headers, withCredentials: true });
  }

  updateProject(project: Project, projectId: number): Observable<Object> {
    let headers: HttpHeaders = this.getHeaders();
    let url = this.projectUrl + "/" + projectId;

    return this.http.put(url, JSON.stringify(project), { headers: headers, withCredentials: true });
  }

  deleteProject(projectId: number): Observable<Object> {
    let headers: HttpHeaders = this.getHeaders();
    let url = this.projectUrl + "/" + projectId;

    return this.http.delete(url, { headers: headers, withCredentials: true });
  }

  announceProjectChange(project: string) {
    this.projectChangedSource.next(project);
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('X-Requested-With', 'XMLHttpRequest')
      .set('Content-Type', 'application/json');
  }
}
