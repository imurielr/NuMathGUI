import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-secant',
  templateUrl: './secant.component.html',
  styleUrls: ['./secant.component.css']
})
export class SecantComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  errorTypes = [
    'Absolute',
    'Relative',
  ];

  f_control = new FormControl('', [Validators.required]);
  x0_control = new FormControl('', [Validators.required]);
  x1_control = new FormControl('', [Validators.required]);
  nIter_control = new FormControl('', [Validators.required, Validators.min(1)]);
  tol_control = new FormControl('', [Validators.required]);
  error_control = new FormControl('', [Validators.required]);

  title = 'Secant';

  f = '';
  x0 = '';
  x1 = '';
  nIter = '';
  tolerance = '';
  error = '';

  plot() {
    if(this.f_control.invalid || this.x0_control.invalid || this.x1_control.invalid || this.nIter_control.invalid || this.tol_control.invalid || this.error_control.invalid){
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
      this.x1 = (document.getElementById('x1') as HTMLInputElement).value;
      this.nIter = (document.getElementById('nIter') as HTMLInputElement).value;
      this.tolerance = (document.getElementById('tol') as HTMLInputElement).value;
      // this.error = (document.getElementById('error') as HTMLInputElement).value;
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
      case "x1":
          return this.x1_control.hasError('required') ? 'You must enter a value' : '';
          break;
      case "nIter":
          return this.nIter_control.hasError('required') ? 'You must enter a value' : 
                 this.nIter_control.hasError('min') ? 'The number of iterations must be bigger than 1' : 
                 '';
          break;
      case "tol":
        return this.tol_control.hasError('required') ? 'You must enter a value' : '';
        break;
        case "error":
          return this.error_control.hasError('required') ? 'You must enter a value' : '';
          break;        
    } 
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
