import { Project } from '../classes/project';

export class MockProjectService {
    
    getActiveProject() {
      let project:Project = new Project();
      project.projectId = 1;
      project.projectName = "Watermelon";
      return project;
    }
  
  };