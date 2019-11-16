import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatSelectModule, MatTableModule } from  '@angular/material';

import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IncrementalSearchComponent } from './incremental-search/incremental-search.component';
import { BisectionComponent } from './bisection/bisection.component';
import { FalsePositionComponent } from './false-position/false-position.component';
import { FixedPointComponent } from './fixed-point/fixed-point.component';
import { NewtonSingleVarEqComponent } from './newton-single-var-eq/newton-single-var-eq.component';
import { SecantComponent } from './secant/secant.component';
import { MultipleRootsComponent } from './multiple-roots/multiple-roots.component';
import { SimpleGaussianEliminationComponent } from './simple-gaussian-elimination/simple-gaussian-elimination.component';
import { PartialPivotGaussianEliminationComponent } from './partial-pivot-gaussian-elimination/partial-pivot-gaussian-elimination.component';
import { TotalPivotGaussianEliminationComponent } from './total-pivot-gaussian-elimination/total-pivot-gaussian-elimination.component';
import { DoolittleComponent } from './doolittle/doolittle.component';
import { CroutComponent } from './crout/crout.component';
import { CholeskyComponent } from './cholesky/cholesky.component';
import { LagrangeComponent } from './lagrange/lagrange.component';
import { NewtonInterpolationComponent } from './newton-interpolation/newton-interpolation.component';
import { SimpleSplineComponent } from './simple-spline/simple-spline.component';
import { QuadraticSplineComponent } from './quadratic-spline/quadratic-spline.component';
import { CubicSplineComponent } from './cubic-spline/cubic-spline.component';
import { Dif2PointsComponent } from './dif2-points/dif2-points.component';
import { Dif3PointsComponent } from './dif3-points/dif3-points.component';
import { Dif5PointsComponent } from './dif5-points/dif5-points.component';
import { GeneralTrapeziumComponent } from './general-trapezium/general-trapezium.component';
import { GeneralSimpson13Component } from './general-simpson13/general-simpson13.component';
import { GeneralSimpson38Component } from './general-simpson38/general-simpson38.component';
import { JacobiComponent } from './jacobi/jacobi.component';
import { GaussSeidelComponent } from './gauss-seidel/gauss-seidel.component';
import { SingleVariableComponent } from './single-variable/single-variable.component';
import { EquationSystemComponent } from './equation-system/equation-system.component';


@NgModule({
  declarations: [
    AppComponent,
    IncrementalSearchComponent,
    BisectionComponent,
    FalsePositionComponent,
    FixedPointComponent,
    NewtonSingleVarEqComponent,
    SecantComponent,
    MultipleRootsComponent,
    SimpleGaussianEliminationComponent,
    PartialPivotGaussianEliminationComponent,
    TotalPivotGaussianEliminationComponent,
    DoolittleComponent,
    CroutComponent,
    CholeskyComponent,
    LagrangeComponent,
    NewtonInterpolationComponent,
    SimpleSplineComponent,
    QuadraticSplineComponent,
    CubicSplineComponent,
    Dif2PointsComponent,
    Dif3PointsComponent,
    Dif5PointsComponent,
    GeneralTrapeziumComponent,
    GeneralSimpson13Component,
    GeneralSimpson38Component,
    JacobiComponent,
    GaussSeidelComponent,
    SingleVariableComponent,
    EquationSystemComponent
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
    MatSliderModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
