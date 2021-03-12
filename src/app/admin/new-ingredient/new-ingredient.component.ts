import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/service/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-ingredient',
  templateUrl: './new-ingredient.component.html',
  styleUrls: ['./new-ingredient.component.css'],
})
export class NewIngredientComponent implements OnInit {
  public ingredientForm: FormGroup;

  constructor(
    private firebase: FirebaseService,
    private formBuilder: FormBuilder
  ) {}

  onSave() {
    if (this.ingredientForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Atención',
        text: 'Verifica que todos los campos estén completos!',
      });
      return;
    }

    this.firebase
      .createIngredient(this.ingredientForm.value)
      .then((response) => {
        this.ingredientForm.reset();
        this.ingredientForm.get('typeValue').setValue('');
        Swal.fire({
          icon: 'success',
          title: 'Atención',
          text: String(response),
        });
      })
      .catch((response) => {
        Swal.fire({ icon: 'error', title: 'Atención', text: String(response) });
        return;
      });
  }

  ngOnInit(): void {
    this.ingredientForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      font: ['', [Validators.required, Validators.minLength(3)]],
      value: ['', [Validators.min(1), Validators.required]],
      typeValue: ['', [Validators.required]],
      totalProteins: ['', [Validators.min(0), Validators.required]],
      totalFats: ['', [Validators.min(0), Validators.required]],
      saturatedFats: ['', [Validators.min(0), Validators.required]],
      monoUnsaturatedFats: ['', [Validators.min(0), Validators.required]],
      polyUnsaturatedFats: ['', [Validators.min(0), Validators.required]],
      cholesterol: ['', [Validators.min(0), Validators.required]],
      totalCarbohydrates: ['', [Validators.min(0), Validators.required]],
      availableCarbohydrates: ['', [Validators.min(0), Validators.required]],
      totalSugars: ['', [Validators.min(0), Validators.required]],
      dietaryFiber: ['', [Validators.min(0), Validators.required]],
      solubleDietaryFiber: ['', [Validators.min(0), Validators.required]],
      insolubleDietaryFiber: ['', [Validators.min(0), Validators.required]],
      sodium: ['', [Validators.min(0), Validators.required]],
      calcium: ['', [Validators.min(0), Validators.required]],
      calories: ['', [Validators.min(0), Validators.required]],
      vitaminA: ['', [Validators.min(0), Validators.required]],
      vitaminC: ['', [Validators.min(0), Validators.required]],
      vitaminD: ['', [Validators.min(0), Validators.required]],
      iron: ['', [Validators.min(0), Validators.required]],
      potassium: ['', [Validators.min(0), Validators.required]],
      magnesium: ['', [Validators.min(0), Validators.required]],
      insulin: ['', [Validators.min(0), Validators.required]],
    });
  }

  get form() {
    return this.ingredientForm.controls;
  }
}
