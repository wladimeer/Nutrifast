import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../service/firebase.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private firebase: FirebaseService, private formBuilder: FormBuilder
  ) {}

  onLogin() {
    if (this.loginForm.invalid) {
      Swal.fire({ icon: 'error', title: 'Atención', text: (
        'Verifica que todos los campos estén completos'
      )});
      return;
    }

    this.firebase.login(this.loginForm.value).catch(response => {
      Swal.fire({ icon: 'error', title: 'Atención', text: String(response) });
      return;
    })
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:
      ['', [
        Validators.email,
        Validators.required
      ]],
      password:
      ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}