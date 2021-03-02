import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
import { ForgetComponent } from './public/forget/forget.component';
import { NavbarAdminComponent } from './admin/navbar-admin/navbar-admin.component';
import { NavbarClientComponent } from './client/navbar-client/navbar-client.component';
import { ProfileClientComponent } from './client/profile-client/profile-client.component';
import { FoodRequestComponent } from './client/food-request/food-request.component';
import { NewIngredientComponent } from './admin/new-ingredient/new-ingredient.component';
import { ViewIngredientComponent } from './admin/view-ingredient/view-ingredient.component';
import { NutritionalInformationComponent } from './client/nutritional-information/nutritional-information.component';
import { ProfileAdminComponent } from './admin/profile-admin/profile-admin.component';
import { ListOfRequestsComponent } from './admin/list-of-requests/list-of-requests.component';
import { NutritionalInformationCreatedComponent } from './admin/nutritional-information-created/nutritional-information-created.component';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage'
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { NgModule } from '@angular/core';
import { Ng2Rut } from 'ng2-rut';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgetComponent,
    ProfileClientComponent,
    FoodRequestComponent,
    NutritionalInformationComponent,
    ProfileAdminComponent,
    ListOfRequestsComponent,
    NutritionalInformationCreatedComponent,
    NavbarClientComponent,
    NavbarAdminComponent,
    NewIngredientComponent,
    ViewIngredientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    Ng2Rut
  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {}