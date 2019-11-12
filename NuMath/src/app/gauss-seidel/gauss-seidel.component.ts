import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-gauss-seidel',
  templateUrl: './gauss-seidel.component.html',
  styleUrls: ['./gauss-seidel.component.css']
})
export class GaussSeidelComponent implements OnInit {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  errorTypes = [
    'Absolute',
    'Relative',
  ];

  n_control = new FormControl('', [Validators.required, Validators.min(2)]);
  nIter_control = new FormControl('', [Validators.required, Validators.min(1)]);
  tol_control = new FormControl('', [Validators.required]);
  lambda_control = new FormControl('', [Validators.required, Validators.min(0), Validators.max(1)]);
  error_control = new FormControl('', [Validators.required]);


  title = 'Gauss-Seidel Method';
  numEq = 0;
  data;
  returningDataInitial;
  returningDataMatrix;
  returningDataB;
  showTable = false;
  num;
  nIter = '';
  tolerance = '';
  lambda;
  error = '';

  result;
  show = false;
  errorFound = false;

  showMatrix() {
    this.show = false;
    this.errorFound = false;


    if (this.n_control.invalid) {
      if (this.n_control.hasError('min')) {
        this.openSnackBar("The number of equations should be greater than 2", "Ok");
      }
      else if (this.lambda_control.hasError('min') || this.lambda_control.hasError('max')) {
        this.openSnackBar("Lambda shoud be a number between 0 and 1", "Ok");
      }
      else {
        this.openSnackBar("Please enter the number of equations", "Ok");
      }
    }
    else {
      this.numEq = Number((document.getElementById('n') as HTMLInputElement).value);
      this.data = Array(Number(this.numEq));
      this.returningDataInitial = new Array();
      this.returningDataMatrix = new Array();
      this.returningDataB = new Array();
      this.showTable = true;
    }
  }

  calculate() {
    if (this.nIter_control.invalid || this.tol_control.invalid || this.lambda_control.invalid || this.error_control.invalid) {
      if (this.nIter_control.hasError('min')) {
        this.openSnackBar("Please enter a valid value for the number of iterations", "Ok");
      }
      else {
        this.openSnackBar("Please enter all the values", "Ok");
      }
    }
    else {
      //We clear the Arrays
      this.returningDataInitial = [];
      this.returningDataMatrix = [];
      this.returningDataB = [];
      //We get values
      this.nIter = (document.getElementById('nIter') as HTMLInputElement).value;
      this.tolerance = (document.getElementById('tol') as HTMLInputElement).value;
      this.lambda = (document.getElementById('lambda') as HTMLInputElement).value;
      //this.error = (document.getElementById('error') as HTMLInputElement).value;
      //Then we calculate them
      for (let i = 1; i < Number(this.numEq) + 1; i++) {
        //Calculate Initial Values
        let initial = (document.getElementById('initial' + i) as HTMLInputElement).value
        this.returningDataInitial.push(Number(initial))
        //Calculate A Matrix
        for (let j = 1; j < Number(this.numEq) + 1; j++) {
          let cell = (document.getElementById('cell' + i + '' + j) as HTMLInputElement).value
          this.returningDataMatrix.push(Number(cell))
        }
        //Calculate Independent Values
        let b = (document.getElementById('b' + i) as HTMLInputElement).value
        this.returningDataB.push(Number(b))
      }
    }
    this.post(Number(this.numEq), Number(this.nIter), Number(this.tolerance), Number(this.lambda), this.error, this.returningDataInitial, this.returningDataMatrix, this.returningDataB);    
  }

  post(numEq: Number, nIter: Number, tol: Number, lambda: Number, error: string, init, dataA, dataB) {

    const req = this.http.post(`/methods/gaussSeidel`, JSON.stringify({
      numEq: numEq,
      nIter: nIter,
      tol: tol,
      lambda: lambda,
      err: error,
      initVals: init,
      numsA: dataA,
      numsB: dataB
    }),
    {
      headers:{
        'Content-Type': 'application/json',
      }
    })
    .subscribe(
      res => {
        if (res['error'] == undefined) {
          this.result = res['results'];
          this.show = true;
        }
        else {
          this.result = res['error'];
          this.errorFound = true;
        }
      }
    )

  }

  getErrorMessage(type: string) {
    switch (type) {
      case "n":
        return this.n_control.hasError('required') ? 'Please enter a number' :
          this.n_control.hasError('min') ? 'Please enter a bigger number' :
            ''
        break;
      case "nIter":
        return this.nIter_control.hasError('required') ? 'You must enter a value' :
          this.nIter_control.hasError('min') ? 'The number of iterations must be bigger than 1' :
            '';
        break;
      case "tol":
        return this.tol_control.hasError('required') ? 'You must enter a value' : '';
        break;
      case "lambda":
          return this.lambda_control.hasError('required') ? 'You must enter a value' :
            this.lambda_control.hasError('min') ? 'Lambda shoud be a number between 0 and 1' : 
            this.lambda_control.hasError('max') ? 'Lambda shoud be a number between 0 and 1' : 
            '';
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

