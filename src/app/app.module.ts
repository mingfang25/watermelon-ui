import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { WatermelonRouter } from './app.router';
import { MaterialModule } from "./app-material.module";
import { MatSelectModule, MatNativeDateModule, MatDialogModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material'  
import { MatIconModule } from "@angular/material/icon";

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { IssuesComponent } from './components/issues/issues.component';
import { MessagesComponent } from './components/messages/messages.component';
import { RequirementsComponent } from './components/requirements_folder/requirements/requirements.component';
import { NewRequirementsComponent } from './components/requirements_folder/new-requirements/new-requirements.component';
import { InProgressRequirementsComponent } from './components/requirements_folder/in-progress-requirements/in-progress-requirements.component';
import { AcceptedRequirementsComponent } from './components/requirements_folder/accepted-requirements/accepted-requirements.component';
import { RequirementFormComponent } from './components/requirements_folder/requirement-form/requirement-form.component';
import { EditRequirementFormComponent } from './components/requirements_folder/edit-requirement-form/edit-requirement-form.component';
import { LoginComponent } from "./components/login/login/login.component";
import { RegisterComponent } from "./components/login/register/register.component";
import { UserService } from './services/user.service';
import { ProfileComponent } from './components/profile/profile.component';
import { IssueDialogComponent } from './components/issues/issue-dialog/issue-dialog.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { ProjectsComponent } from './components/projects/projects.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    IssuesComponent,
    MessagesComponent,
    RequirementsComponent,
    NewRequirementsComponent,
    InProgressRequirementsComponent,
    AcceptedRequirementsComponent,
    RequirementFormComponent,
    EditRequirementFormComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    IssueDialogComponent,
    DateFormatPipe,
    ProjectsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    WatermelonRouter,
    BrowserAnimationsModule,
    MaterialModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatIconModule
  ],
  entryComponents: [IssuesComponent, IssueDialogComponent, EditRequirementFormComponent],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
