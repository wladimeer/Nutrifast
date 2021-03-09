import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../service/firebase.service'

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})

export class NavbarAdminComponent implements OnInit {
  public user: string = '';

  constructor(
    private firebase: FirebaseService
  ) {}

  onLogout() {
    this.firebase.logout();
  }

  ngOnInit(): void {
    this.user =  JSON.parse(
      localStorage.getItem('user')
    ).names;
  }
}