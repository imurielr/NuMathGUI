import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lagrange',
  templateUrl: './lagrange.component.html',
  styleUrls: ['./lagrange.component.css']
})
export class LagrangeComponent implements OnInit {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  n_control = new FormControl('', [Validators.required, Validators.min(2)]);


  title = 'LaGrange Interpolation';
  numEq = 0;
  data;
  returningDataPoints;
  showTable = false;
  num;

  result;
  show = false;

  showMatrix() {
    this.show = false;

    if (this.n_control.invalid) {
      if (this.n_control.hasError('min')) {
        this.openSnackBar("The number of equations should be greater than 2", "Ok");
      }
      else {
        this.openSnackBar("Please enter the number of equations", "Ok");
      }
    }
    else {
      this.numEq = Number((document.getElementById('n') as HTMLInputElement).value);
      this.data = Array(Number(this.numEq));
      this.returningDataPoints = new Array();
      this.showTable = true;
    }
  }

  calculate() {
    //We clear the Array
    this.returningDataPoints = [];
    //Then we calculate a new one
    for (let i = 1; i < Number(this.numEq) + 1; i++) {
      for (let j = 0; j < 2; j++) {
        let cell = (document.getElementById('cell' + i + '' + j) as HTMLInputElement).value
        this.returningDataPoints.push(Number(cell))
      }
    }
  this.post(Number(this.numEq), this.returningDataPoints);    
  }

  post(numPoints: Number, points) {

    const req = this.http.post(`/methods/lagrange`, JSON.stringify({
      numPoints: numPoints,
      points: points,
    }),
    {
      headers:{
        'Content-Type': 'application/json',
      }
    })
    .subscribe(
      res => {
          this.result = res['pol'];
          this.show = true;
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
