import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleVariableEqComponent } from './single-variable-eq/single-variable-eq.component';
import { EquationSystemsComponent } from './equation-systems/equation-systems.component';
import { DiferentiationComponent } from './diferentiation/diferentiation.component';
import { IntegrationComponent } from './integration/integration.component';
import { InterpolationComponent } from './interpolation/interpolation.component';

const routes: Routes = [
  {
    path: 'singleVariable',
    component: SingleVariableEqComponent
  },
  {
    path: 'equationSystems',
    component: EquationSystemsComponent
  },
  {
    path: 'interpolation',
    component: InterpolationComponent
  },
  {
    path: 'diferentiation',
    component: DiferentiationComponent
  },
  {
    path: 'integration',
    component: IntegrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
