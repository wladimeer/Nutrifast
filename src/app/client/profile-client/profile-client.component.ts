import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/service/firebase.service';
import { User } from 'src/app/model/object';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.css'],
})
export class ProfileClientComponent implements OnInit {
  public profileForm: FormGroup;
  public userData: User;

  constructor(
    private firebase: FirebaseService,
    private formBuilder: FormBuilder
  ) {}

  onModify() {
    if (this.profileForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Atención',
        text: 'Verifica que el teléfono está completo!',
      });
      return;
    }

    this.profileForm.value.id = this.userData.id;
    this.firebase
      .updateUser(this.profileForm.value)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Atención',
          text: String(response),
        });
        this.ngOnInit();
      })
      .catch((response) => {
        Swal.fire({ icon: 'error', title: 'Atención', text: String(response) });
        return;
      });
  }

  loadUser() {
    this.userData = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
    this.loadUser();

    this.profileForm = this.formBuilder.group({
      phone: [
        this.userData.phone,
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(12),
        ],
      ],
    });
  }
}
