import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public user: User;

  constructor(private router: Router, private authenticationService: AuthenticationService, private userService: UserService) { }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
  }

  authenticated(): boolean {
    this.user = this.userService.getUser();
    return this.authenticationService.isAuthenticated();
  }

}
