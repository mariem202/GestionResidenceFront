
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ListEtudientComponent } from './list-etudient/list-etudient.component';
import { ListCarteComponent } from './list-carte/list-carte.component';
import { ListChambreComponent } from './list-chambre/list-chambre.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { StudentDialogComponent } from './list-chambre/student-dialog/student-dialog.component';
import { DetailscardComponent } from './list-carte/detailscard/detailscard.component';
import { ProfileComponent } from './profile/profile.component';
import { PlainteSuggestionComponent } from './plainte-suggestion/plainte-suggestion.component';
import { AddPlainteSuggestionComponent } from './add-plainte-suggestion/add-plainte-suggestion.component';
import { EditPlainteSuggestionComponent } from './edit-plainte-suggestion/edit-plainte-suggestion.component';
import { DetailchambreComponent } from './detailchambre/detailchambre.component';
import { FactureComponent } from './facture/facture.component';
import { RapportChambreComponent } from './rapport-chambre/rapport-chambre.component';
import { EtudpleinteComponent } from './etudpleinte/etudpleinte.component';
import { GerepaiementComponent } from './gerepaiement/gerepaiement.component';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    RegisterComponent,
    LoginComponent,
    ListEtudientComponent,
    ListCarteComponent,
    ListChambreComponent,
    ListEmployeeComponent,
    StudentDialogComponent,
    DetailscardComponent,
    ProfileComponent,
    PlainteSuggestionComponent,
    AddPlainteSuggestionComponent,
    EditPlainteSuggestionComponent,
    FactureComponent,
    RapportChambreComponent,
    EtudpleinteComponent,
    GerepaiementComponent,
    // DetailchambreComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    AppSidebarComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
