import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from  '@angular/material';

import { MatSliderModule } from '@angular/material/slider';
import { SingleVariableEqComponent } from './single-variable-eq/single-variable-eq.component';
import { EquationSystemsComponent } from './equation-systems/equation-systems.component';
import { InterpolationComponent } from './interpolation/interpolation.component';
import { DiferentiationComponent } from './diferentiation/diferentiation.component';
import { IntegrationComponent } from './integration/integration.component';

@NgModule({
  declarations: [
    AppComponent,
    SingleVariableEqComponent,
    EquationSystemsComponent,
    InterpolationComponent,
    DiferentiationComponent,
    IntegrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
