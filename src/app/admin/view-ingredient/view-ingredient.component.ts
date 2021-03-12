import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/service/firebase.service';
import { Ingredient } from 'src/app/model/object';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-ingredient',
  templateUrl: './view-ingredient.component.html',
  styleUrls: ['./view-ingredient.component.css'],
})
export class ViewIngredientComponent implements OnInit {
  public ingredientList: Array<Ingredient>;
  public ingredientForm: FormGroup;
  public selectedItem: Ingredient;
  public formModify = false;
  public tableView = false;
  public position = 0;

  constructor(
    private firebase: FirebaseService,
    private formBuilder: FormBuilder
  ) {}

  onView(ingredient: any) {
    this.position = 0;
    (ingredient.selected = true), (this.selectedItem = ingredient);
    (this.tableView = true), (this.formModify = false);
  }

  onPrevious() {
    if (this.position > 0) {
      this.position--;
    }
  }

  onNext() {
    if (this.position < 8) {
      this.position++;
    }
  }

  onHide(ingredient: any) {
    (this.tableView = false), (ingredient.selected = false);
  }

  onModify() {
    if (this.ingredientForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Atención',
        text: 'Verifica que todos los campos estén completos!',
      });
      return;
    }

    this.firebase
      .updateIngredient(this.ingredientForm.value)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Atención',
          text: String(response),
        });
        this.loadIngredients();
      })
      .catch((response) => {
        Swal.fire({ icon: 'error', title: 'Atención', text: String(response) });
        return;
      });
  }

  onRemove(id: string) {
    this.firebase
      .deleteIngredient(id)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Atención',
          text: String(response),
        });
        this.loadIngredients();
      })
      .catch((response) => {
        Swal.fire({ icon: 'error', title: 'Atención', text: String(response) });
        return;
      });
  }

  loadFormModify(ingredient: any) {
    (this.tableView = false), (this.formModify = true);
    this.ingredientForm.get('id').setValue(ingredient.id);
    this.ingredientForm.get('name').setValue(ingredient.name);
    this.ingredientForm.get('font').setValue(ingredient.font);
  }

  loadIngredients() {
    (this.tableView = false), (this.formModify = false);
    this.firebase.readIngredients().then((response: Array<Ingredient>) => {
      response.forEach((itemIngredient) => {
        if (itemIngredient.typeValue == 'Gramos') {
          itemIngredient.typeValue = 'g';
        }

        if (itemIngredient.typeValue == 'Miligramos') {
          itemIngredient.typeValue = 'mg';
        }

        if (itemIngredient.typeValue == 'Microgramos') {
          itemIngredient.typeValue = 'mcg';
        }
        // itemIngredient.font = itemIngredient.font.slice(0, -10);
      });

      this.ingredientList = response;
    });
  }

  ngOnInit(): void {
    this.loadIngredients();

    this.ingredientForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      font: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  get form() {
    return this.ingredientForm.controls;
  }
}
