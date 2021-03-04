import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FirebaseService } from 'src/app/service/firebase.service';
import { Ingredient } from 'src/app/model/object';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-food-request',
  templateUrl: './food-request.component.html',
  styleUrls: ['./food-request.component.css']
})
export class FoodRequestComponent implements OnInit {
  public ingredientList: Array<Ingredient>;  
  public foodForm: FormGroup;
  public numbers = [];

  constructor(
    private firebase: FirebaseService,
    private formBuilder: FormBuilder
  ) {}

  onNewForm() {
    if (this.quantitiesList.length == this.ingredientList.length) {
      Swal.fire({ icon: 'error', title: 'Atención', text: (
        'Llegaste al límite, no hay mas ingredientes por seleccionar!'
      )});
      return;
    } else {
      this.quantitiesList.push(
        this.formBuilder.group({
          idIngredient: ['', [Validators.required]],
          ingredientPercentage: ['', [Validators.required]]
        })
      );
    }
  }

  onRemoveForm(index: number) {
    this.quantitiesList.removeAt(index);
  }

  onRequest() {
    if (this.foodForm.invalid) {
      Swal.fire({ icon: 'error', title: 'Atención', text: (
        'Verifica que todos los campos estén completos!'
      )});
      return;
    }

    let totalPercentage = 0, totalWeight = 0;

    this.quantitiesList.value.forEach((form: any) => {
      form.ingredientPercentage = Number(form.ingredientPercentage);

      this.ingredientList.forEach((itemIngredient) => {
        if (itemIngredient.id == form.idIngredient) {
          totalWeight += ((itemIngredient.value * form.ingredientPercentage) / 100);
        }
      });
      
      totalPercentage += form.ingredientPercentage;
      this.foodForm.value.servingPerContainer = (
        totalWeight / this.foodForm.value.portion
      );
      
      this.foodForm.value.servingPerContainer = Number(
        (this.foodForm.value.servingPerContainer).toFixed()
      );
    });

    if (totalPercentage != 100) {
      Swal.fire({ icon: 'error', title: 'Atención', text: (
        'La suma de todos los porcentajes debe ser igual a 100!'
      )});
      return;
    }
  
    this.firebase.sendRequest(this.foodForm.value).then(response => {
      this.quantitiesList.controls.splice(0, this.quantitiesList.length);
      Swal.fire({ icon: 'success', title: 'Atención', text: String(response) });
    })
    .catch(response => {
      Swal.fire({ icon: 'error', title: 'Atención', text: String(response) });
      return;
    });
  }

  loadIngredients() {
    this.firebase.readIngredients().then((response: Array<Ingredient>) => {
      this.ingredientList = response;
    });
  }

  ngOnInit(): void {
    this.loadIngredients();

    for (let i = 1; i < 100; i++) {
      this.numbers.push(i);
    }

    this.foodForm = this.formBuilder.group({
      name: 
        ['', [Validators.required]],
      portion:
        ['', [Validators.required]],
      quantitiesList:
        this.formBuilder.array([])
    });
  }
  
  get quantitiesList() {
    return this.foodForm.get('quantitiesList') as FormArray;
  }
}