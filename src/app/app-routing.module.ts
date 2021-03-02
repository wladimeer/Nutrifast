import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './public/register/register.component';
import { NavbarAdminComponent } from './admin/navbar-admin/navbar-admin.component';
import { NavbarClientComponent } from './client/navbar-client/navbar-client.component';
import { ProfileClientComponent } from './client/profile-client/profile-client.component';
import { NewIngredientComponent } from './admin/new-ingredient/new-ingredient.component';
import { ViewIngredientComponent } from './admin/view-ingredient/view-ingredient.component';
import { FoodRequestComponent } from './client/food-request/food-request.component';
import { NutritionalInformationComponent } from './client/nutritional-information/nutritional-information.component';
import { ProfileAdminComponent } from './admin/profile-admin/profile-admin.component';
import { ListOfRequestsComponent } from './admin/list-of-requests/list-of-requests.component';
import { NutritionalInformationCreatedComponent } from './admin/nutritional-information-created/nutritional-information-created.component';
import { LoginComponent } from './public/login/login.component';
import { PublicGuard } from './public/guard/public.guard';
import { ClientGuard } from './public/guard/client.guard';
import { AdminGuard } from './public/guard/admin.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [PublicGuard] },
  { path: 'login', component: LoginComponent, canActivate: [PublicGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [PublicGuard] },
  { path: 'admin', component: NavbarAdminComponent, canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'profileAdmin', pathMatch: 'full'},
      { path: 'nutritionalInformationCreated',
        component: NutritionalInformationCreatedComponent,
      },
      { path: 'newIngredient', component: NewIngredientComponent },
      { path: 'viewIngredient', component: ViewIngredientComponent },
      { path: 'profileAdmin', component: ProfileAdminComponent },
      { path: 'listOfRequest', component: ListOfRequestsComponent },
  ]},
  { path: 'client', component: NavbarClientComponent, canActivate: [ClientGuard],
    children: [
      { path: '', redirectTo: 'profileClient', pathMatch: 'full'},
      { path: 'nutritionalInformation',
        component: NutritionalInformationComponent
      },
      { path: 'profileClient', component: ProfileClientComponent },
      { path: 'foodRequest', component: FoodRequestComponent }
  ]},
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}