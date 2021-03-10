import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../service/firebase.service';
import { User } from '../../model/object';
import { RutValidator } from 'ng2-rut';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public communesList: any = [];
  public regionsList: any = [];
  public users: Array<User>;

  constructor(
    private firebase: FirebaseService,
    private rutValidator: RutValidator,
    private formBuilder: FormBuilder
  ) {}

  public async onRegister() {
    if (this.registerForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Atención',
        text: 'Verifica que todos los campos estén completos!',
      });
      return;
    } else {
      if (
        this.users.find(
          (response) =>
            response.rut == this.registerForm.value.rut ||
            response.email == this.registerForm.value.email
        )
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Atención',
          text: 'El correo electrónico o RUT ya están siendo utilizados!',
        });
        return;
      } else {
        this.firebase.register(this.registerForm.value);
      }
    }
  }

  private async loadRegions() {
    try {
      const response = await fetch('assets/api/country.json');
      this.regionsList = (await response.json()).regions;
    } catch (exception) {}
  }

  public async loadCommunes() {
    try {
      const response = await fetch('assets/api/country.json');
      (await response.json()).regions.forEach((region) => {
        if (this.registerForm.value.region == region.name) {
          this.communesList = region.communes;
        } else if (this.registerForm.value.region == '') {
          this.commune.setValue('');
          this.communesList = [];
        }
      });
    } catch (exception) {
      console.log('RegisterException: ', exception);
    }
  }

  ngOnInit(): void {
    this.loadRegions();

    this.firebase.readUsers().then((response: Array<User>) => {
      this.users = response;
    });

    this.registerForm = this.formBuilder.group({
      rut: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(15),
          this.rutValidator,
        ],
      ],
      names: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(15),
        ],
      ],
      mothersLastName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(15),
        ],
      ],
      email: [
        '',
        [
          Validators.email,
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(25),
        ],
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(12),
        ],
      ],
      commune: ['', [Validators.required]],
      region: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  get rut() {
    return this.registerForm.get('rut');
  }

  get names() {
    return this.registerForm.get('names');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get mothersLastName() {
    return this.registerForm.get('mothersLastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get address() {
    return this.registerForm.get('address');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get commune() {
    return this.registerForm.get('commune');
  }

  get region() {
    return this.registerForm.get('region');
  }

  get password() {
    return this.registerForm.get('password');
  }
}
