import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatFormFieldModule, MatSnackBarModule, MatInputModule, MatTooltipModule } from "@angular/material";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { ProfileComponent } from './profile.component';
import { UserService } from 'src/app/services/user.service';
import { MockUserService } from 'src/app/testing/mockUserService';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        MatInputModule,
        NoopAnimationsModule,
        MatTooltipModule
      ],
      declarations: [ ProfileComponent ],
      providers: [ProfileComponent, {
        provide: UserService,
        useClass : MockUserService
       }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('firstname should be invalid when blank', ()  => {
    let firstname = component.profileNameForm.controls['firstname'];
    firstname.setValue('')
    fixture.detectChanges();
    expect(firstname.valid).toBeFalsy();
  });

  it('firstname should be invalid when fifty one plus characters', ()  => {
    let firstname = component.profileNameForm.controls['firstname'];
    firstname.setValue('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    fixture.detectChanges();
    expect(firstname.valid).toBeFalsy();
  });

  it('firstname should be valid when fifty characters or less', ()  => {
    let firstname = component.profileNameForm.controls['firstname'];
    firstname.setValue('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    fixture.detectChanges();
    expect(firstname.valid).toBeTruthy();
  });

  it('lastname should be invalid when blank', ()  => {
    let lastname = component.profileNameForm.controls['lastname'];
    lastname.setValue('')
    fixture.detectChanges();
    expect(lastname.valid).toBeFalsy();
  });

  it('lastname should be invalid when fifty one plus characters', ()  => {
    let lastname = component.profileNameForm.controls['lastname'];
    lastname.setValue('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    fixture.detectChanges();
    expect(lastname.valid).toBeFalsy();
  });

  it('lastname should be valid when fifty characters or less', ()  => {
    let lastname = component.profileNameForm.controls['lastname'];
    lastname.setValue('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    fixture.detectChanges();
    expect(lastname.valid).toBeTruthy();
  });

  it('name form should be valid when all fields are filled out correctly', ()  => {
    let firstname = component.profileNameForm.controls['firstname'];
    let lastname = component.profileNameForm.controls['lastname'];
    
    firstname.setValue("Steve");
    lastname.setValue("Rogers");
    fixture.detectChanges();
    expect(component.profileNameForm.valid).toBeTruthy();
  });

  it('password should be invalid when blank', ()  => {
    let password = component.profilePasswordForm.controls['password'];
    password.setValue('')
    fixture.detectChanges();
    expect(password.valid).toBeFalsy();
  });

  it('password should be invalid when twenty one plus characters', ()  => {
    let password = component.profilePasswordForm.controls['password'];
    password.setValue('XXXXXXXXXXXXXXXXXXXXX')
    fixture.detectChanges();
    expect(password.valid).toBeFalsy();
  });

  it('password should be valid when twenty or less characters', ()  => {
    let password = component.profilePasswordForm.controls['password'];
    password.setValue('XXXXXXXXXXXXXXXXXXXX')
    fixture.detectChanges();
    expect(password.valid).toBeTruthy();
  });

  it('verifypassword should be invalid when blank', ()  => {
    let verifypassword = component.profilePasswordForm.controls['verifypassword'];
    verifypassword.setValue('')
    fixture.detectChanges();
    expect(verifypassword.valid).toBeFalsy();
  });
  
  it('verifypassword should be invalid if password does not match', ()  => {
    let verifypassword = component.profilePasswordForm.controls['verifypassword'];
    let password = component.profilePasswordForm.controls['password'];
    password.setValue('4321')
    verifypassword.setValue('1234');
    fixture.detectChanges();
    expect(verifypassword.valid).toBeFalsy();
  });

  it('verifypassword should be valid if password matches', ()  => {
    let verifypassword = component.profilePasswordForm.controls['verifypassword'];
    let password = component.profilePasswordForm.controls['password'];
    password.setValue('1234')
    verifypassword.setValue('1234');
    fixture.detectChanges();
    expect(verifypassword.valid).toBeTruthy();
  });

  it('password form should be valid when all fields are filled out correctly', ()  => {
    let verifypassword = component.profilePasswordForm.controls['verifypassword'];
    let password = component.profilePasswordForm.controls['password'];

    password.setValue('1234');
    verifypassword.setValue('1234');
    fixture.detectChanges();
    expect(component.profilePasswordForm.valid).toBeTruthy();
  });

  it('email should be invalid when blank', ()  => {
    let email = component.profileEmailForm.controls['email'];
    email.setValue('')
    fixture.detectChanges();
    expect(email.valid).toBeFalsy();
  });

  it('email should be invalid when fifty one plus characters', ()  => {
    let email = component.profileEmailForm.controls['email'];
    email.setValue('XXXXXXXXXXXXXXXXXXXXXXXXXXX@XXXXXXXXXXXXXXXXXXXXXXX')
    fixture.detectChanges();
    expect(email.valid).toBeFalsy();
  });

  it('email should be valid when fifty characters or less', ()  => {
    let email = component.profileEmailForm.controls['email'];
    email.setValue('XXXXXXXXXXXXXXXXXXXXXXXXXX@XXXXXXXXXXXXXXXXXXXXXXX')
    fixture.detectChanges();
    expect(email.valid).toBeTruthy();
  });

  it('email should be invalid when format is incorrect', ()  => {
    let email = component.profileEmailForm.controls['email'];
    email.setValue('testemail')
    fixture.detectChanges();
    expect(email.valid).toBeFalsy();
  });

  it('email should be valid when format is correct', ()  => {
    let email = component.profileEmailForm.controls['email'];
    email.setValue('testemail@test')
    fixture.detectChanges();
    expect(email.valid).toBeTruthy();
  });
});
