import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';
import { Food, Ingredient, User } from 'src/app/model/object';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-of-requests',
  templateUrl: './list-of-requests.component.html',
  styleUrls: ['./list-of-requests.component.css'],
})
export class ListOfRequestsComponent implements OnInit {
  public requestList: Array<Food>;
  public selectedItem: User;
  public tableView = false;

  constructor(private firebase: FirebaseService) {}

  onApprove(request: any) {
    this.firebase.readIngredients().then((response: Array<Ingredient>) => {
      let nutritionalInformation = {
        energy: 0,
        totalFats: 0,
        protein: 0,
        saturatedFats: 0,
        monoUnsaturatedFats: 0,
        polyUnsaturatedFats: 0,
        sodium: 0,
        cholesterol: 0,
        totalCarbohydrates: 0,
        insolubleFiber: 0,
        availableCarbohydrates: 0,
        typeValue: request.typeValue,
        solubleFiber: 0,
        transFattyAcids: 0,
        dietaryFiber: 0,
        portion: request.portion,
        idClient: request.idClient,
        servingPerContainer: request.servingPerContainer,
        totalSugars: 0,
        insulin: 0,
        idFood: request.id,
      };

      request.quantitiesList.forEach((request: any) => {
        response.forEach((itemIngredient: Ingredient) => {
          if (request.idIngredient == itemIngredient.id) {
            let percentage = request.ingredientPercentage;

            nutritionalInformation.energy +=
              (itemIngredient.calories * percentage) / 100;

            nutritionalInformation.totalFats +=
              (itemIngredient.totalFats * percentage) / 100;

            nutritionalInformation.protein +=
              (itemIngredient.totalProteins * percentage) / 100;

            nutritionalInformation.saturatedFats +=
              (itemIngredient.saturatedFats * percentage) / 100;

            nutritionalInformation.monoUnsaturatedFats +=
              (itemIngredient.monoUnsaturatedFats * percentage) / 100;

            nutritionalInformation.polyUnsaturatedFats +=
              (itemIngredient.polyUnsaturatedFats * percentage) / 100;

            nutritionalInformation.cholesterol +=
              (itemIngredient.cholesterol * percentage) / 100;

            nutritionalInformation.totalCarbohydrates +=
              (itemIngredient.totalCarbohydrates * percentage) / 100;

            nutritionalInformation.availableCarbohydrates +=
              (itemIngredient.availableCarbohydrates * percentage) / 100;

            nutritionalInformation.insolubleFiber +=
              (itemIngredient.insolubleDietaryFiber * percentage) / 100;

            // nutritionalInformation.transFattyAcids += (
            //   ((itemIngredient.transFattyAcids * percentage) / 100)
            // );

            nutritionalInformation.solubleFiber +=
              itemIngredient.solubleDietaryFiber / 100;

            nutritionalInformation.dietaryFiber +=
              (itemIngredient.dietaryFiber * percentage) / 100;

            nutritionalInformation.totalSugars +=
              (itemIngredient.totalSugars * percentage) / 100;

            nutritionalInformation.insulin +=
              (itemIngredient.insulin * percentage) / 100;

            nutritionalInformation.sodium +=
              (itemIngredient.sodium * percentage) / 100;
          }
        });
      });

      this.firebase
        .createNutritionalInformation(nutritionalInformation)
        .then((response) => {
          Swal.fire({
            icon: 'success',
            title: 'Atención',
            text: String(response),
          }).then(() => {
            (this.tableView = false), (request.selected = false);
            this.loadRequest(), this.newState(request.id, 1);
          });
        })
        .catch((response) => {
          Swal.fire({
            icon: 'error',
            title: 'Atención',
            text: String(response),
          });
          return;
        });
    });
  }

  onReject(request: any) {
    this.newState(request.id, 2);
    (this.tableView = false), (request.selected = false);
  }

  newState(id: string, state: number) {
    this.firebase
      .updateStateRequest({ id: id, state: state })
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Atención',
          text: String(response),
        });
        this.loadRequest();
      })
      .catch((response) => {
        Swal.fire({ icon: 'error', title: 'Atención', text: String(response) });
        return;
      });
  }

  onView(request: any) {
    this.firebase.searchUser(request.idClient).then((response: User) => {
      this.selectedItem = response;
    });

    (this.tableView = true), (request.selected = true);
  }

  onHide(request: any) {
    (this.tableView = false), (request.selected = false);
  }

  loadRequest() {
    this.firebase.readRequest().then((response: Array<Food>) => {
      this.requestList = response;
    });
  }

  ngOnInit(): void {
    this.loadRequest();
  }
}
