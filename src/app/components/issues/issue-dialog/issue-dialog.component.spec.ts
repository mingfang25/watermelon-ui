import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueDialogComponent } from './issue-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatOptionModule, MatSelectModule, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatInputModule, MatCardTitle, MatCardModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';

describe('IssueDialogComponent', () => {

  const ONE_FIFTY: string = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
  const ONE_FIFTY_ONE: string = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
  const TWO_FIFTY: string = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
  const TWO_FIFTY_ONE: string = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
  let component: IssueDialogComponent;
  let fixture: ComponentFixture<IssueDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        MatDialogModule,
        MatInputModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        MatCardModule,
        RouterTestingModule,
        RouterModule.forRoot([])
      ],
      declarations: [IssueDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {issue: {title:"something"}} }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('title should be valid when one hundred fifty characters or less', ()  => {
    let title = component.issueForm.controls['title'];
    title.setValue(ONE_FIFTY)
    fixture.detectChanges();
    expect(title.valid).toBeTruthy();
  });

  it('title should be invalid when one hundred one characters or more', ()  => {
    let title = component.issueForm.controls['title'];
    title.setValue(ONE_FIFTY_ONE)
    fixture.detectChanges();
    expect(title.valid).toBeFalsy();
  });

  it('title should be invalid when blank', ()  => {
    let title = component.issueForm.controls['title'];
    title.setValue('')
    fixture.detectChanges();
    expect(title.valid).toBeFalsy();
  });

  it('description should be valid when two hundred fifty characters or less', ()  => {
    let description = component.issueForm.controls['description'];
    description.setValue(TWO_FIFTY)
    fixture.detectChanges();
    expect(description.valid).toBeTruthy();
  });

  it('description should be invalid when two hundred fifty one characters or more', ()  => {
    let description = component.issueForm.controls['description'];
    description.setValue(TWO_FIFTY_ONE)
    fixture.detectChanges();
    expect(description.valid).toBeFalsy();
  });

  it('description should be invalid when blank', ()  => {
    let description = component.issueForm.controls['description'];
    description.setValue('')
    fixture.detectChanges();
    expect(description.valid).toBeFalsy();
  });

  it('status should be valid when not blank', ()  => {
    let status = component.issueForm.controls['status'];
    status.setValue('XXXX')
    fixture.detectChanges();
    expect(status.valid).toBeTruthy();
  });

  it('status should be invalid when blank', ()  => {
    let status = component.issueForm.controls['status'];
    status.setValue('')
    fixture.detectChanges();
    expect(status.valid).toBeFalsy();
  });

  it('priority should be valid when not blank', ()  => {
    let priority = component.issueForm.controls['priority'];
    priority.setValue('XXXX')
    fixture.detectChanges();
    expect(priority.valid).toBeTruthy();
  });

  it('priority should be invalid when blank', ()  => {
    let priority = component.issueForm.controls['priority'];
    priority.setValue('')
    fixture.detectChanges();
    expect(priority.valid).toBeFalsy();
  });

  //   it('estimate should be valid when not blank', ()  => {
  //   let estimate = component.issueForm.controls['estimate'];
  //   estimate.setValue('XXXX')
  //   fixture.detectChanges();
  //   expect(estimate.valid).toBeTruthy();
  // });

  // it('estimate should be invalid when blank', ()  => {
  //   let estimate = component.issueForm.controls['estimate'];
  //   estimate.setValue('')
  //   fixture.detectChanges();
  //   expect(estimate.valid).toBeFalsy();
  // });



});
