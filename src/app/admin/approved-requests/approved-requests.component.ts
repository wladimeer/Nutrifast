import { Component, OnInit } from '@angular/core';
import { Food, NutritionalInformation, User } from 'src/app/model/object';
import { FirebaseService } from '../../service/firebase.service';
import { MakepdfService } from '../../service/makepdf.service';

@Component({
  selector: 'app-approved-requests',
  templateUrl: './approved-requests.component.html',
  styleUrls: ['./approved-requests.component.css'],
})
export class ApprovedRequestsComponent implements OnInit {
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
            this.firebase.searchUser(food.idClient).then((user: User) => {
              this.informationList.push({
                id: response.id,
                rut: user.rut,
                food: food.name,
                date: response.createDate,
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
