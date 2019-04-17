import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatFormFieldModule, MatSnackBarModule, MatInputModule } from "@angular/material";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

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
        NoopAnimationsModule
      ],
      declarations: [ 
        RegisterComponent 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('username should be invalid when blank', ()  => {
    let username = component.registrationForm.controls['username'];
    username.setValue('')
    fixture.detectChanges();
    expect(username.valid).toBeFalsy();
  });

  it('username should be invalid when twenty one plus characters', ()  => {
    let username = component.registrationForm.controls['username'];
    username.setValue('XXXXXXXXXXXXXXXXXXXXX')
    fixture.detectChanges();
    expect(username.valid).toBeFalsy();
  });

  it('username should be valid when twenty characters or less ', ()  => {
    let username = component.registrationForm.controls['username'];
    username.setValue('spiderman')
    fixture.detectChanges();
    expect(username.valid).toBeTruthy();
  });

  it('firstname should be invalid when blank', ()  => {
    let firstname = component.registrationForm.controls['firstname'];
    firstname.setValue('')
    fixture.detectChanges();
    expect(firstname.valid).toBeFalsy();
  });

  it('firstname should be invalid when fifty one plus characters', ()  => {
    let firstname = component.registrationForm.controls['firstname'];
    firstname.setValue('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    fixture.detectChanges();
    expect(firstname.valid).toBeFalsy();
  });

  it('firstname should be valid when fifty characters or less', ()  => {
    let firstname = component.registrationForm.controls['firstname'];
    firstname.setValue('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    fixture.detectChanges();
    expect(firstname.valid).toBeTruthy();
  });

  it('lastname should be invalid when blank', ()  => {
    let lastname = component.registrationForm.controls['lastname'];
    lastname.setValue('')
    fixture.detectChanges();
    expect(lastname.valid).toBeFalsy();
  });

  it('lastname should be invalid when fifty one plus characters', ()  => {
    let lastname = component.registrationForm.controls['lastname'];
    lastname.setValue('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    fixture.detectChanges();
    expect(lastname.valid).toBeFalsy();
  });

  it('lastname should be valid when fifty characters or less', ()  => {
    let lastname = component.registrationForm.controls['lastname'];
    lastname.setValue('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    fixture.detectChanges();
    expect(lastname.valid).toBeTruthy();
  });

  it('email should be invalid when blank', ()  => {
    let email = component.registrationForm.controls['email'];
    email.setValue('')
    fixture.detectChanges();
    expect(email.valid).toBeFalsy();
  });

  it('email should be invalid when fifty one plus characters', ()  => {
    let email = component.registrationForm.controls['email'];
    email.setValue('XXXXXXXXXXXXXXXXXXXXXXXXXXX@XXXXXXXXXXXXXXXXXXXXXXX')
    fixture.detectChanges();
    expect(email.valid).toBeFalsy();
  });

  it('email should be valid when fifty characters or less', ()  => {
    let email = component.registrationForm.controls['email'];
    email.setValue('XXXXXXXXXXXXXXXXXXXXXXXXXX@XXXXXXXXXXXXXXXXXXXXXXX')
    fixture.detectChanges();
    expect(email.valid).toBeTruthy();
  });

  it('email should be invalid when format is incorrect', ()  => {
    let email = component.registrationForm.controls['email'];
    email.setValue('testemail')
    fixture.detectChanges();
    expect(email.valid).toBeFalsy();
  });

  it('email should be valid when format is correct', ()  => {
    let email = component.registrationForm.controls['email'];
    email.setValue('testemail@test')
    fixture.detectChanges();
    expect(email.valid).toBeTruthy();
  });

  it('password should be invalid when blank', ()  => {
    let password = component.registrationForm.controls['password'];
    password.setValue('')
    fixture.detectChanges();
    expect(password.valid).toBeFalsy();
  });

  it('password should be invalid when twenty one plus characters', ()  => {
    let password = component.registrationForm.controls['password'];
    password.setValue('XXXXXXXXXXXXXXXXXXXXX')
    fixture.detectChanges();
    expect(password.valid).toBeFalsy();
  });

  it('password should be valid when twenty or less characters', ()  => {
    let password = component.registrationForm.controls['password'];
    password.setValue('XXXXXXXXXXXXXXXXXXXX')
    fixture.detectChanges();
    expect(password.valid).toBeTruthy();
  });

  it('verifypassword should be invalid when blank', ()  => {
    let verifypassword = component.registrationForm.controls['verifypassword'];
    verifypassword.setValue('')
    fixture.detectChanges();
    expect(verifypassword.valid).toBeFalsy();
  });
  
  it('verifypassword should be invalid if password does not match', ()  => {
    let verifypassword = component.registrationForm.controls['verifypassword'];
    let password = component.registrationForm.controls['password'];
    password.setValue('4321')
    verifypassword.setValue('1234');
    fixture.detectChanges();
    expect(verifypassword.valid).toBeFalsy();
  });

  it('verifypassword should be valid if password matches', ()  => {
    let verifypassword = component.registrationForm.controls['verifypassword'];
    let password = component.registrationForm.controls['password'];
    password.setValue('1234')
    verifypassword.setValue('1234');
    fixture.detectChanges();
    expect(verifypassword.valid).toBeTruthy();
  });

  it('form should be valid when all fields are filled out correctly', ()  => {
    let verifypassword = component.registrationForm.controls['verifypassword'];
    let password = component.registrationForm.controls['password'];
    let firstname = component.registrationForm.controls['firstname'];
    let lastname = component.registrationForm.controls['lastname'];
    let username = component.registrationForm.controls['username'];
    let email = component.registrationForm.controls['email'];
    username.setValue("cap")
    firstname.setValue("Steve");
    lastname.setValue("Rogers");
    email.setValue("test@test");
    password.setValue('1234');
    verifypassword.setValue('1234');
    fixture.detectChanges();
    expect(component.registrationForm.valid).toBeTruthy();
  });
});
