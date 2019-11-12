import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-total-pivot-gaussian-elimination',
  templateUrl: './total-pivot-gaussian-elimination.component.html',
  styleUrls: ['./total-pivot-gaussian-elimination.component.css']
})
export class TotalPivotGaussianEliminationComponent implements OnInit {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  n_control = new FormControl('', [Validators.required, Validators.min(2)]);


  title = 'Simple Gaussian Elimination with total pivoting';
  numEq = 0;
  data;
  columns;
  returningData;
  showTable = false;
  num;

  result;
  show = false;
  errorFound = false;

  showMatrix() {
    this.show = false;
    this.errorFound = false;

    if (this.n_control.invalid){
      if (this.n_control.hasError('min')){
        this.openSnackBar("The number of equations should be greater than 2", "Ok");
      }
      else {
        this.openSnackBar("Please enter the number of equations", "Ok");
      }
    }
    else {
      this.numEq = Number((document.getElementById('n') as HTMLInputElement).value);
      this.data = Array(Number(this.numEq));
      this.columns = Array(Number(this.numEq+1));
      this.returningData = new Array();  
      this.showTable = true; 
    }
  }

  calculate() {
    //We clear the Array
    this.returningData = [];
    //Then we calculate a new one
    for (let i = 1; i < Number(this.numEq) + 1; i++){
      for (let j = 1; j <= Number(this.numEq) + 1; j++){
        let cell = (document.getElementById('cell'+i+''+j) as HTMLInputElement).value
        this.returningData.push(Number(cell))
      }
    }
    this.post(Number(this.numEq), this.returningData);
  }

  post(numEq: Number, data) {

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

}
