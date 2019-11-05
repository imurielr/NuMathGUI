import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncrementalSearchComponent } from './incremental-search/incremental-search.component';

const routes: Routes = [
  {
    path: 'incrSearch',
    component: IncrementalSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
