import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/service/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-food-request',
  templateUrl: './food-request.component.html',
  styleUrls: ['./food-request.component.css']
})
export class FoodRequestComponent implements OnInit {
  public foodForm: FormGroup;

  constructor(
    private firebase: FirebaseService,
    private formBuilder: FormBuilder
  ) {}

  onRequest() {
    console.log('save...');
  }

  ngOnInit(): void {
    this.foodForm = this.formBuilder.group({
      // name:
      // ['', [
      //   Validators.required,
      //   Validators.minLength(3),
      //   Validators.maxLength(18)
      // ]],
    });
  }
  
  get form() {
    return this.foodForm.controls;
  }
}