import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RequirementsComponent } from './requirements.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockRequirementService } from '../../../testing/mockRequirementService';
import { RequirementService } from '../../../services/requirement.service';
import { Requirement } from '../../../classes/requirement';
import { MatIconModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RequirementsComponent', () => {
  let component: RequirementsComponent;
  let fixture: ComponentFixture<RequirementsComponent>;

  let dummyRequirements  : Requirement [] = [
    {
      id: 1,
      title: 'Test Title',
      description: 'Test Description',
      createdTime : "2019-03-05T03:20:24.015",
      lastModifiedTime: "2019-03-05T03:20:24.015",
      priority : '10',
      status : 'NEW',
      createdByUser : 'User 1',
      dueDate : "2019-03-05T03:20:24.015",
      comments : [],
      assignedToUser : 'User 2',
      archived : true,
      projectId: 1
    },
    {
      id: 2,
      title: 'Test Title2',
      description: 'Test Description2',
      createdTime : "2019-03-05T03:20:24.015",
      lastModifiedTime: "2019-03-05T03:20:24.015",
      priority : '5',
      status : 'NEW',
      createdByUser : 'User 1',
      dueDate : "2019-03-05T03:20:24.015",
      comments : [],
      assignedToUser : 'User 2',
      archived : true,
      projectId : 1
    },
];

let dummyUsers = [
  {
    userName: 'user1',
    firstName: 'first',
    lastName: 'last'
  },
  {
    userName: 'user2',
    firstName: 'first',
    lastName: 'last'
  }
];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule,
        MatIconModule,
        HttpClientTestingModule
      ],
      declarations: [ RequirementsComponent ],
      providers: [RequirementsComponent, {
        provide: RequirementService,
        useClass : MockRequirementService
       }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementsComponent);
    component = fixture.componentInstance;

    component.getRequirements = () => {
      return dummyRequirements;
    }

    component.getUsers = () => {
      return dummyUsers;
    }

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should spy on getRequirements', () => {
    let spy = spyOn(component, 'getRequirements');
    component.getRequirements();
    expect(spy).toHaveBeenCalled();
  });

  //TODO
  // it('should spy on getRequirements and return dummy data', () => {
  //   let spy = spyOn(component, 'getRequirements').and.returnValue(dummyRequirements);
  //   expect(component.getRequirements).toEqual(dummyRequirements);
  // });

  //TODO
  // it('should spy on and call getUsers', () => {
  //   let spy = spyOn(component, 'getUsers');
  //   expect(spy).toHaveBeenCalled();
  // });

});
