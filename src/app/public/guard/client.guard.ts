import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ClientGuard implements CanActivate {
  constructor(
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!localStorage.getItem('user')) {
      this.router.navigate(['login']);
      return false;
    } else {
      let user = JSON.parse(localStorage.getItem('user'));

      switch(user.typeUser) {
        case 'Cliente': return true;
        default: this.router.navigate(['admin']);
        return false;
      }
    }
  } 
}