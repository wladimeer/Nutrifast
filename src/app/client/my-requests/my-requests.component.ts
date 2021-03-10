import { Component, OnInit } from '@angular/core';
import { Food, NutritionalInformation, User } from 'src/app/model/object';
import { FirebaseService } from '../../service/firebase.service';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css'],
})
export class MyRequestsComponent implements OnInit {
  public selectedList: NutritionalInformation;
  public informationList = [];
  public viewData = false;

  constructor(private firebase: FirebaseService) {}

  onView(id: string) {
    this.firebase
      .searchNutritionalInformation(id)
      .then((response: NutritionalInformation) => {
        switch (response.typeValue) {
          case 'Gramos':
            response.typeValue = 'g';
            break;
          case 'Miligramos':
            response.typeValue = 'mg';
            break;
          case 'Microgramos':
            response.typeValue = 'mcg';
            break;
        }

        this.selectedList = response;
      });

    this.viewData = true;
  }

  onHide() {
    (this.viewData = false), (this.selectedList = null);
  }

  onMakePDF(id: string) {}

  loadNutritionalInformation() {
    this.firebase
      .readNutritionalInformation()
      .then((response: Array<NutritionalInformation>) => {
        response.forEach((response: NutritionalInformation) => {
          this.firebase.searchRequest(response.idFood).then((food: Food) => {
            if (food.idClient == JSON.parse(localStorage.getItem('user')).id) {
              this.informationList.push({
                id: response.id,
                food: food.name,
                date: response.createDate,
              });
            }
          });
        });
      });
  }

  ngOnInit(): void {
    this.loadNutritionalInformation();
  }
}
