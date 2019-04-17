import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Requirement } from '../classes/requirement';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../classes/user';
import {environment} from '../../environments/environment';
import { ProjectService } from './project.service';

const httpOptions = {
  headers : new HttpHeaders({
    'accept' : '*/*',
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class RequirementService {

  constructor(private http: HttpClient, private projectService: ProjectService) { }

  usersUrl = environment.url + "/users";
  requirementsUrl= environment.url + "/requirements";

  readRequirements() : Observable<Requirement []>{

    //get the active project and append a filter to the url if the project is set
    let project = this.projectService.getActiveProject();
    let url = this.requirementsUrl;
    if (project) {
      url = url + "?project=" + project.projectId 
    }

    return this.http.get<Requirement []>(url);
  }

  readOneRequirement(id : Number) : Observable<Requirement>{
    let requirementsUrl = this.requirementsUrl + '/' + id;
    return this.http.get<Requirement>(requirementsUrl, httpOptions);
  }

  createRequirement(requirement: Requirement) :Observable<Requirement> {
    //set the current projectId on any newly created requirements
    let project = this.projectService.getActiveProject();
    requirement.projectId = project.projectId;

    return this.http.post<Requirement>(this.requirementsUrl, requirement, httpOptions)
  }

  updateRequirement(requirement : Requirement) : Observable<Requirement> {
    let requirementsUrl = this.requirementsUrl + '/' + requirement.id;
    return this.http.put<Requirement>(requirementsUrl, requirement, httpOptions)
  }

  deleteRequirement(id : Number) : Observable<Requirement> {
    let requirementsUrl = this.requirementsUrl + '/' + id;
    return this.http.delete<Requirement>(requirementsUrl, httpOptions)
  }

  getUsers() : Observable<User []>{
    return this.http.get<User []>(this.usersUrl);
  }
}