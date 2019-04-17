import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/classes/project';

@Component({
  selector: 'app-project',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public projects: Array<Project>;

  public newProject: string;
  public currentProject: Project;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {

    this.loadProjects();
  }

  setProject(project: Project)   {
    sessionStorage.setItem('project', JSON.stringify(project));
    this.currentProject = project
    this.closeNav();
    this.projectService.announceProjectChange("yes");
  }

  isActiveProject(project: Project) {
    return this.currentProject.projectName === project.projectName;
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(results => {
      this.projects = results;
      if (sessionStorage.getItem('project')) {
        this.currentProject = this.projectService.getActiveProject();
      } else {
        this.setProject(this.projects[0]);
      }
    });
  }

  addProject() {
    if (this.newProject === undefined || this.newProject === '') {return;}
    console.log(this.newProject);

    let project: Project = new Project();
    project.projectName = this.newProject;
    this.projectService.createProject(project).subscribe(result => this.loadProjects());
    this.newProject = '';
  }

  openNav() {
    document.getElementById("side-bar").style.width = "300px";
  }

  closeNav() {
    document.getElementById("side-bar").style.width = "0";
  }

}
