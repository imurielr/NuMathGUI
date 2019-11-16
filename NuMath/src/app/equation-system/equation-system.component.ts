import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-equation-system',
  templateUrl: './equation-system.component.html',
  styleUrls: ['./equation-system.component.css']
})
export class EquationSystemComponent implements OnInit {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  n_control = new FormControl('', [Validators.required, Validators.min(2)]);
  nIter_control = new FormControl('', [Validators.required, Validators.min(1)]);
  tol_control = new FormControl('', [Validators.required]);
  lambda_control = new FormControl('', [Validators.required, Validators.min(0), Validators.max(1)]);
  error_control = new FormControl('', [Validators.required]);

  methods = [
    "Simple Gaussian Elimination",
    "Gaussian Elimination with Partial Pivot",
    "Gaussian Elimination witn Total Pivot",
    "Doolittle Factorization",
    "Crout Factorization",
    "Cholesky Factorization",
    "Jacobi",
    "Gauss-Seidel"
  ];

  errorTypes = [
    'Absolute',
    'Relative',
  ];

  method = '';
  numEq = 0;
  data;

  show = false;
  errorFound = false;
  result;

  showTable = false;
  returningDataMatrix;
  returningDataB;
  returningDataInitial;

  nIter = '';
  tolerance = '';
  lambda;
  error = '';


  showMatrix() {
    this.show = false;
    this.errorFound = false;

    if (this.n_control.invalid) {
      if (this.n_control.hasError('min')) {
        this.openSnackBar("The number of equations should be greater than 2", "Ok");
      }
      else if (this.method == "Jacobi" && (this.lambda_control.hasError('min') || this.lambda_control.hasError('max'))) {
        this.openSnackBar("Lambda shoud be a number between 0 and 1", "Ok");
      }
      else {
        this.openSnackBar("Please enter the number of equations", "Ok");
      }
    }
    else {
      this.numEq = Number((document.getElementById('n') as HTMLInputElement).value);
      this.data = Array(Number(this.numEq));
      this.returningDataMatrix = new Array();
      this.returningDataB = new Array();
      this.returningDataInitial = new Array();
      this.showTable = true;
    }
  }

  calculate() {
    //We clear the Array
    this.returningDataMatrix = [];
    this.returningDataB = [];
    //Then we calculate a new one
    for (let i = 1; i < Number(this.numEq) + 1; i++) {
      for (let j = 1; j < Number(this.numEq) + 1; j++) {
        let cell = (document.getElementById('cell' + i + '' + j) as HTMLInputElement).value
        this.returningDataMatrix.push(Number(cell))
      }
      let b = (document.getElementById('b' + i) as HTMLInputElement).value
      this.returningDataB.push(Number(b))
    }
    switch (this.method) {
      case "Simple Gaussian Elimination":
        // this.postSGE(Number(this.numEq), this.returningDataMatrix, this.returningDataB);
        break;
      case "Gaussian Elimination with Partial Pivot":
        // this.postGEP(Number(this.numEq), this.returningData);
        break;
      case "Gaussian Elimination witn Total Pivot":
        // this.postGET(Number(this.numEq), this.returningData);
        break;
      case "Doolittle Factorization":
        this.postDoolittle(Number(this.numEq), this.returningDataMatrix, this.returningDataB);
        break;
      case "Crout Factorization":
        this.postCrout(Number(this.numEq), this.returningDataMatrix, this.returningDataB);
        break;
      case "Cholesky Factorization":
        this.postCholesky(Number(this.numEq), this.returningDataMatrix, this.returningDataB);    
        break;
    }
  }

  calculate2() {
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
      if (this.method == 'Jacobi') {
        this.postJacobi(Number(this.numEq), Number(this.nIter), Number(this.tolerance), Number(this.lambda), this.error, this.returningDataInitial, this.returningDataMatrix, this.returningDataB);
      }
      else if (this.method == 'Gauss-Seidel') {
        this.postGauss_Seidel(Number(this.numEq), Number(this.nIter), Number(this.tolerance), Number(this.lambda), this.error, this.returningDataInitial, this.returningDataMatrix, this.returningDataB);    
      }
    }
  }
 
  getErrorMessage() {
    return this.n_control.hasError('required') ? 'Please enter a number' :
      this.n_control.hasError('min') ? 'Please enter a bigger number' :
        ''
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  postSGE(numEq: Number, data) {  //TODO CHANGE SERVER

    const req = this.http.post(`/methods/SGE`, JSON.stringify({
      numEq: numEq,
      nums: data
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

  postGEP(numEq: Number, data) {

    const req = this.http.post(`/methods/GEP`, JSON.stringify({
      numEq: numEq,
      nums: data
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

  postGET(numEq: Number, data) {

    const req = this.http.post(`/methods/GET`, JSON.stringify({
      numEq: numEq,
      nums: data
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
  
  postDoolittle(numEq: Number, dataA, dataB) {
  
    const req = this.http.post(`/methods/doolittle`, JSON.stringify({
      numEq: numEq,
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

  postCrout(numEq: Number, dataA, dataB) {

    const req = this.http.post(`/methods/crout`, JSON.stringify({
      numEq: numEq,
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

  postCholesky(numEq: Number, dataA, dataB) {

    const req = this.http.post(`/methods/cholesky`, JSON.stringify({
      numEq: numEq,
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

  postJacobi(numEq: Number, nIter: Number, tol: Number, lambda: Number, error: string, init, dataA, dataB) {

    const req = this.http.post(`/methods/jacobi`, JSON.stringify({
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

  postGauss_Seidel(numEq: Number, nIter: Number, tol: Number, lambda: Number, error: string, init, dataA, dataB) {

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

}
