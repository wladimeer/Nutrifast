import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../service/firebase.service';
import { Food, NutritionalInformation, User } from 'src/app/model/object';

@Component({
  selector: 'app-nutritional-information-created',
  templateUrl: './nutritional-information-created.component.html',
  styleUrls: ['./nutritional-information-created.component.css']
})

export class NutritionalInformationCreatedComponent implements OnInit {
  public selectedList: NutritionalInformation;
  public informationList = [];
  public viewData = false;

  constructor(
    private firebase: FirebaseService
  ) {}

  onView(id: string) {
    this.firebase.searchNutritionalInformation(id)
    .then((response: NutritionalInformation) => {
      if (response.typeValue == 'Gramos') {
        response.typeValue = 'g';
      }

      if (response.typeValue == 'Miligramos') {
        response.typeValue = 'mg';
      }

      if (response.typeValue == 'Microgramos') {
        response.typeValue = 'mcg';
      }

      this.selectedList = response;
    });

    this.viewData = true;
  }

  onHide() {
    this.viewData = false, this.selectedList = null;
  }

  onMakePDF(id: string) {
  }
  
  loadNutritionalInformation() {
    this.firebase.readNutritionalInformation()
    .then((response: Array<NutritionalInformation>) => {
      response.forEach((response: NutritionalInformation) => {
        this.firebase.searchRequest(response.idFood).then((food: Food) => {
          this.firebase.searchUser(food.idClient).then((user: User) => {
            this.informationList.push({
              id :response.id, rut: user.rut,
              food: food.name, date: response.createDate
            });
          });
        });
      });
    });
  }

  ngOnInit(): void {
    this.loadNutritionalInformation();
  }
}