import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../service/firebase.service';

@Component({
  selector: 'app-navbar-client',
  templateUrl: './navbar-client.component.html',
  styleUrls: ['./navbar-client.component.css'],
})
export class NavbarClientComponent implements OnInit {
  public user: string = '';

  constructor(private firebase: FirebaseService) {}

  onLogout() {
    this.firebase.logout();
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')).names;
  }
}
