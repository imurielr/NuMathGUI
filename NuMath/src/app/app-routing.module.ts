import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
import { GaussSeidelComponent} from './gauss-seidel/gauss-seidel.component';
import { JacobiComponent } from './jacobi/jacobi.component';
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

import { SingleVariableComponent } from './single-variable/single-variable.component';
import { EquationSystemComponent } from './equation-system/equation-system.component';

const routes: Routes = [
  {
    path: 'incrSearch',
    component: IncrementalSearchComponent
  },
  {
    path: 'bisection',
    component: BisectionComponent
  },
  {
    path: 'falsePosition',
    component: FalsePositionComponent
  },
  {
    path: 'fixedPoint',
    component: FixedPointComponent
  },
  {
    path: 'newtonVarEq',
    component: NewtonSingleVarEqComponent
  },
  {
    path: 'secant',
    component: SecantComponent
  },
  {
    path: 'multipleRoots',
    component: MultipleRootsComponent
  },
  {
    path: 'simpleGaussianElim',
    component: SimpleGaussianEliminationComponent
  },
  {
    path: 'partialPivot',
    component: PartialPivotGaussianEliminationComponent
  },
  {
    path: 'totalPivot',
    component: TotalPivotGaussianEliminationComponent
  },
  {
    path: 'doolitle',
    component: DoolittleComponent
  },
  {
    path: 'crout',
    component: CroutComponent
  },
  {
    path: 'cholesky',
    component: CholeskyComponent
  },
  {
    path: 'gauss-seidel',
    component: GaussSeidelComponent
  },
  {
    path: 'jacobi',
    component: JacobiComponent
  },
  {
    path: 'lagrange',
    component: LagrangeComponent
  },
  {
    path: 'newtonInterpolation',
    component: NewtonInterpolationComponent
  },
  {
    path: 'linearSpline',
    component: SimpleSplineComponent
  },
  {
    path: 'quadraticSpline',
    component: QuadraticSplineComponent
  },
  {
    path: 'cubicSpline',
    component: CubicSplineComponent
  },
  {
    path: '2Points',
    component: Dif2PointsComponent
  },
  {
    path: '3Points',
    component: Dif3PointsComponent
  },
  {
    path: '5Points',
    component: Dif5PointsComponent
  },
  {
    path: 'generalTrapezium',
    component: GeneralTrapeziumComponent
  },
  {
    path: 'generalSimpson_1_3',
    component: GeneralSimpson13Component
  },
  {
    path: 'generalSimpson_3_8',
    component: GeneralSimpson38Component
  },
  {
    path: 'singleVariable',
    component: SingleVariableComponent
  },
  {
    path: 'equationSystems',
    component: EquationSystemComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
