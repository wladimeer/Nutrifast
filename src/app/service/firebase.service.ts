import { EventEmitter, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { User, Ingredient, Quantity } from '../model/object';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { v4 as uuid } from 'uuid';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})

export class FirebaseService {
  constructor(
    private firestore: AngularFirestore,
    private database: AngularFireDatabase,
    private fireauth: AngularFireAuth,
    private redirect: Router
  ) {}

  login(form: any) {
    return new Promise((resolve, reject) => {
      this.fireauth.signInWithEmailAndPassword(
        form.email, form.password
      )
      .then(response => {
        this.readUsers().then((users: Array<User>) => {
          let user = (users.filter(
            r => r.email === form.email)
          )[0];

          localStorage.setItem('user', JSON.stringify(user));

          switch(user.typeUser) {
            case 'Cliente':
              this.redirect.navigate(['client/profileClient']);
              break;
            case 'Administrador':
              this.redirect.navigate(['admin/profileAdmin']);
              break;
            default:
              this.redirect.navigate(['']);
              break;
          }
        });
      })
      .catch(response => {
        if (response.code == 'auth/too-many-requests') {
          reject('La cuenta ingresada se encuentra deshabilitada!');
        }

        if (response.code == 'auth/user-not-found') {
          reject('El correo ingresado no se encuentra registrado!')
        }

        if (response.code == 'auth/wrong-password') {
          reject('La contraseña ingresada es incorrecta!')
        }
      });
    });
  }

  register(form: any) {
    this.fireauth.createUserWithEmailAndPassword(
      form.email, form.password
    )
    .then(response => {
      form.id = response.user.uid;
      form.registerDate = moment().format('DD-MM-YYYY');
      form.typeUser = 'Cliente';
      form.password = null;
      
      this.database.list('Users').push(form);
      localStorage.setItem('user', JSON.stringify(form));
      this.redirect.navigate(['client/profileClient']);
    });
  }

  readUsers() {
    return new Promise((resolve, reject) => {
      this.database.list('Users').valueChanges()
      .subscribe((response: Array<User>) => {
        resolve(response);
      });
    })
  }

  resetPassword(email: string) {
    return this.fireauth.sendPasswordResetEmail(email);
  }

  logout() {
    this.redirect.navigate(['']);
    localStorage.removeItem('user');
    this.fireauth.signOut();
  }

  createIngredient(form: any) {
    return new Promise((resolve, reject) => {
      form.registerDate = moment().format('DD-MM-YYYY');
      form.id = uuid();

      this.database.list('Ingredients').push(form)
      .then(response => {
        resolve('El ingrediente se creó exitosamente!');
      })
      .catch(response => {
        reject('El ingrediente no se pudo crear!');
      });
    });
  }

  readIngredients() {
    return new Promise((resolve, reject) => {
      this.database.list('Ingredients').valueChanges()
      .subscribe((response: Array<Ingredient>) => {
        resolve(response);
      });
    });
  }

  updateIngredient(form: any) {
    return new Promise((resolve, reject) => {
      this.obtainKey(form.id).then(response => {
        this.database.list('Ingredients').update(
          String(response), {name: form.name, font: form.font})
        .then(response => {
          resolve('El ingrediente se actualizó exitosamente!');
        })
        .catch(response => {
          reject('El ingrediente no se pudo actualizar!');
        });
      });
    });
  }

  deleteIngredient(id: string) {
    return new Promise((resolve, reject) => {
      this.obtainKey(id).then(response => {
        this.database.list('Ingredients').remove(
          String(response)
        )
        .then(response => {
          resolve('El ingrediente se eliminó exitosamente!');
        })
        .catch(response => {
          reject('El ingrediente no se pudo eliminar!');
        });
      });
    });
  }

  obtainKey(id: string) {
    return new Promise((resolve, reject) => {
      this.database.list('Ingredients')
      .snapshotChanges().subscribe(response => {
        response.forEach(itemIngredient => {
          if(itemIngredient.payload.exportVal().id == id) {
            resolve(itemIngredient.key);
          }
        });
      });
    });
  }
}