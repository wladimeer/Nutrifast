import { Component, OnInit } from '@angular/core';
import { Food, NutritionalInformation } from 'src/app/model/object';
import { FirebaseService } from '../../service/firebase.service';
import { MakepdfService } from '../../service/makepdf.service';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css'],
})
export class MyRequestsComponent implements OnInit {
  public selectedList: NutritionalInformation;
  public informationList = [];
  public viewData = false;

  constructor(
    private firebase: FirebaseService,
    private makepdf: MakepdfService
  ) {}

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

  onMakePDF(label: any, type: number) {
    this.makepdf.builder(label, type);
  }

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
