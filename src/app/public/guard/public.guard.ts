import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class PublicGuard implements CanActivate {
  constructor(
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!localStorage.getItem('user')) {
      return true;
    } else {
      let user = JSON.parse(localStorage.getItem('user'));

      switch(user.typeUser) {
        case 'Cliente': this.router.navigate(['/client']);
        return false;
        case 'Administrador': this.router.navigate(['/admin']);
        return false;
      }
    }
  }
}