import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../service/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css'],
})
export class ForgetComponent implements OnInit {
  public forgetForm: FormGroup;

  constructor(
    private firebase: FirebaseService,
    private formBuilder: FormBuilder
  ) {}

  onRecover() {
    if (this.forgetForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Atención',
        text: 'Verifica que hayas ingresado el correo electrónico!',
      });
      return;
    }

    this.firebase
      .resetPassword(this.forgetForm.value.email)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Atención',
          text: String(response),
        });
        this.forgetForm.reset();
      })
      .catch((response) => {
        Swal.fire({ icon: 'error', title: 'Atención', text: String(response) });
        return;
      });
  }

  ngOnInit() {
    this.forgetForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  get email() {
    return this.forgetForm.get('email');
  }
}
