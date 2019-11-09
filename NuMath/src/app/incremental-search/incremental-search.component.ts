import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-incremental-search',
  templateUrl: './incremental-search.component.html',
  styleUrls: ['./incremental-search.component.css']
})
export class IncrementalSearchComponent implements OnInit {
  
  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  f_control = new FormControl('', [Validators.required]);
  x0_control = new FormControl('', [Validators.required]);
  delta_control = new FormControl('', [Validators.required]);
  nIter_control = new FormControl('', [Validators.required, Validators.min(1)]);

  title = 'Incremental Search';

  f = '';
  x0 = '';
  delta = '';
  nIter = '';

  plot() {
    if(this.f_control.invalid || this.x0_control.invalid || this.delta_control.invalid || this.nIter_control.invalid){
      if(this.nIter_control.hasError('min')){
        this.openSnackBar("Please enter a valid value for the number of iterations", "Ok");
      }
      else{
        this.openSnackBar("Please enter all the values", "Ok");
      }
    }
    else{
      this.f = (document.getElementById('function') as HTMLInputElement).value;
      this.x0 = (document.getElementById('x0') as HTMLInputElement).value;
      this.delta = (document.getElementById('delta') as HTMLInputElement).value;
      this.nIter = (document.getElementById('nIter') as HTMLInputElement).value;
    }
    
  }

  getErrorMessage(type: string) {
    switch(type){
      case "f":
        return this.f_control.hasError('required') ? 'You must enter a value' : '';
        break;
      case "x0":
          return this.x0_control.hasError('required') ? 'You must enter a value' : '';
          break;
      case "delta":
          return this.delta_control.hasError('required') ? 'You must enter a value' : '';
          break;
      case "nIter":
          return this.nIter_control.hasError('required') ? 'You must enter a value' : 
                 this.nIter_control.hasError('min') ? 'The number of iterations must be bigger than 1' : 
                 '';
          break;
    } 
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
