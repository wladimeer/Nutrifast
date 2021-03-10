import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {
  User,
  Ingredient,
  Food,
  NutritionalInformation,
} from '../model/object';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { v4 as uuid } from 'uuid';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private database: AngularFireDatabase,
    private fireauth: AngularFireAuth,
    private redirect: Router
  ) {}

  login(form: any) {
    return new Promise((resolve, reject) => {
      this.fireauth
        .signInWithEmailAndPassword(form.email, form.password)
        .then((response) => {
          this.readUsers().then((users: Array<User>) => {
            let user = users.filter((r) => r.email === form.email)[0];
            localStorage.setItem('user', JSON.stringify(user));

            switch (user.typeUser) {
              case 'Cliente':
                this.redirect.navigate(['client/profileclient']);
                break;
              case 'Administrador':
                this.redirect.navigate(['admin/profileadmin']);
                break;
              default:
                this.redirect.navigate(['']);
                break;
            }
          });
        })
        .catch((response) => {
          if (response.code == 'auth/too-many-requests') {
            reject('La cuenta ingresada se encuentra deshabilitada!');
          }

          if (response.code == 'auth/user-not-found') {
            reject('El correo ingresado no se encuentra registrado!');
          }

          if (response.code == 'auth/wrong-password') {
            reject('La contraseña ingresada es incorrecta!');
          }
        });
    });
  }

  register(form: any) {
    this.fireauth
      .createUserWithEmailAndPassword(form.email, form.password)
      .then((response) => {
        form.id = response.user.uid;
        form.registerDate = moment().format('DD-MM-YYYY');
        form.typeUser = 'Cliente';
        form.password = null;

        this.database.list('Users').push(form);
        localStorage.setItem('user', JSON.stringify(form));
        this.redirect.navigate(['client/profileclient']);
      });
  }

  readUsers() {
    return new Promise((resolve, reject) => {
      this.database
        .list('Users')
        .valueChanges()
        .subscribe((response: Array<User>) => {
          resolve(response);
        });
    });
  }

  updateUser(form: any) {
    return new Promise((resolve, reject) => {
      this.obtainKey(form.id, 'Users').then((response) => {
        this.database
          .list('Users')
          .update(String(response), { phone: form.phone })
          .then((response) => {
            let user = JSON.parse(localStorage.getItem('user'));
            user.phone = form.phone;

            localStorage.setItem('user', JSON.stringify(user));
            resolve('El teléfono se actualizó exitosamente!');
          })
          .catch((response) => {
            reject('El teléfono no pudo ser actualizado!');
          });
      });
    });
  }

  searchUser(id: string) {
    return new Promise((resolve, reject) => {
      this.database
        .list('Users')
        .valueChanges()
        .subscribe((response: Array<User>) => {
          resolve(response.find((r) => r.id == id));
        });
    });
  }

  resetPassword(email: string) {
    return new Promise((resolve, reject) => {
      this.fireauth
        .sendPasswordResetEmail(email)
        .then((response) => {
          resolve(
            'Se envió un correo de recuperación a tu correo electrónico!'
          );
        })
        .catch((response) => {
          reject('No se pudo enviar el correo de recuperación a tu correo!');
        });
    });
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

      this.database
        .list('Ingredients')
        .push(form)
        .then((response) => {
          resolve('El ingrediente se creó exitosamente!');
        })
        .catch((response) => {
          reject('El ingrediente no se pudo crear!');
        });
    });
  }

  readIngredients() {
    return new Promise((resolve, reject) => {
      this.database
        .list('Ingredients')
        .valueChanges()
        .subscribe((response: Array<Ingredient>) => {
          resolve(response);
        });
    });
  }

  updateIngredient(form: any) {
    return new Promise((resolve, reject) => {
      this.obtainKey(form.id, 'Ingredients').then((response) => {
        this.database
          .list('Ingredients')
          .update(String(response), { name: form.name, font: form.font })
          .then((response) => {
            resolve('El ingrediente se actualizó exitosamente!');
          })
          .catch((response) => {
            reject('El ingrediente no se pudo actualizar!');
          });
      });
    });
  }

  deleteIngredient(id: string) {
    return new Promise((resolve, reject) => {
      this.obtainKey(id, 'Ingredients').then((response) => {
        this.database
          .list('Ingredients')
          .remove(String(response))
          .then((response) => {
            resolve('El ingrediente se eliminó exitosamente!');
          })
          .catch((response) => {
            reject('El ingrediente no se pudo eliminar!');
          });
      });
    });
  }

  obtainKey(id: string, list: string) {
    return new Promise((resolve, reject) => {
      this.database
        .list(list)
        .snapshotChanges()
        .subscribe((response) => {
          response.forEach((itemObject: any) => {
            if (itemObject.payload.exportVal().id == id) {
              resolve(itemObject.key);
            }
          });
        });
    });
  }

  sendRequest(form: any) {
    return new Promise((resolve, reject) => {
      form.idClient = JSON.parse(localStorage.getItem('user')).id;
      form.createDate = moment().format('DD-MM-YYYY');
      form.id = uuid();
      form.state = 0;

      this.database
        .list('Requests')
        .push(form)
        .then((response) => {
          resolve('La solicitud de alimento se envío exitosamente!');
        })
        .catch((response) => {
          reject('La solicitud de alimento no pudo ser enviada!');
        });
    });
  }

  readRequest() {
    return new Promise((resolve, reject) => {
      this.database
        .list('Requests')
        .valueChanges()
        .subscribe((response: Array<Food>) => {
          resolve(response);
        });
    });
  }

  updateStateRequest(form: any) {
    return new Promise((resolve, reject) => {
      this.obtainKey(form.id, 'Requests').then((response) => {
        this.database
          .list('Requests')
          .update(String(response), { state: form.state })
          .then((response) => {
            switch (form.state) {
              case 1:
                resolve('La solicitud de alimento se aprobó exitosamente!');
                break;
              case 2:
                resolve('La solicitud de alimento se rechazó exitosamente!');
                break;
            }
          })
          .catch((response) => {
            switch (form.state) {
              case 1:
                reject('La solicitud de alimento no se pudo aprobar!');
                break;
              case 2:
                reject('La solicitud de alimento no se pudo rechazar!');
                break;
            }
          });
      });
    });
  }

  searchRequest(id: string) {
    return new Promise((resolve, reject) => {
      this.database
        .list('Requests')
        .valueChanges()
        .subscribe((response: Array<Food>) => {
          resolve(response.find((r) => r.id == id));
        });
    });
  }

  createNutritionalInformation(form: any) {
    return new Promise((resolve, reject) => {
      form.energy = Number(form.energy.toFixed());

      form.protein = Number(form.protein.toFixed(1));

      form.portion = Number(form.portion.toFixed(1));

      form.totalFats = Number(form.totalFats.toFixed(1));

      form.totalSugars = Number(form.totalSugars.toFixed(1));

      form.saturatedFats = Number(form.saturatedFats.toFixed(1));

      form.monoUnsaturatedFats = Number(form.monoUnsaturatedFats.toFixed(1));

      form.polyUnsaturatedFats = Number(form.polyUnsaturatedFats.toFixed(1));

      form.servingPerContainer = Number(form.servingPerContainer.toFixed(1));

      form.totalCarbohydrates = Number(form.totalCarbohydrates.toFixed(1));

      form.transFattyAcids = Number(form.transFattyAcids.toFixed(1));

      form.insolubleFiber = Number(form.insolubleFiber.toFixed(1));

      form.solubleFiber = Number(form.solubleFiber.toFixed(1));

      form.dietaryFiber = Number(form.dietaryFiber.toFixed(1));

      form.cholesterol = Number(form.cholesterol.toFixed(1));

      form.insulin = Number(form.insulin.toFixed(1));

      form.sodium = Number(form.sodium.toFixed(1));

      form.createDate = moment().format('DD-MM-YYYY');
      form.id = uuid();
      this.database
        .list('NutritionalInformation')
        .push(form)
        .then((response) => {
          resolve('La información nutricional ya está disponible!');
        })
        .catch((response) => {
          reject('La información nutricional no se pudo crear!');
        });
    });
  }

  readNutritionalInformation() {
    return new Promise((resolve, reject) => {
      this.database
        .list('NutritionalInformation')
        .valueChanges()
        .subscribe((response: Array<NutritionalInformation>) => {
          resolve(response);
        });
    });
  }

  searchNutritionalInformation(id: string) {
    return new Promise((resolve, reject) => {
      this.database
        .list('NutritionalInformation')
        .valueChanges()
        .subscribe((response: Array<NutritionalInformation>) => {
          resolve(response.find((r) => r.id == id));
        });
    });
  }
}
