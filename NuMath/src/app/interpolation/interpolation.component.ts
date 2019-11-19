import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-interpolation',
  templateUrl: './interpolation.component.html',
  styleUrls: ['./interpolation.component.css']
})
export class InterpolationComponent implements OnInit {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  methods = [
    "Lagrange",
    "Newton",
    "Linear Spline",
    "Quadratic Spline",
    "Cubic Spline"
  ];

  method_control = new FormControl('', [Validators.required]);
  n_control = new FormControl('', [Validators.required, Validators.min(2)]);


  numEq = 0;
  data;
  dataResult;
  dataResultCubic;
  returningDataPoints;
  showTable = false;
  num;

  result;
  function;
  matrix;
  indep;

  limits = [];
  show = false;

  method;

  showMatrix() {
    this.show = false;

    if (this.n_control.invalid || this.method_control.invalid) {
      if (this.n_control.hasError('min')) {
        this.openSnackBar("The number of equations should be greater than 2", "Ok");
      }
      else if (this.method_control.hasError('required')) {
        this.openSnackBar("Please select a method", "Ok");
      }
      else {
        this.openSnackBar("Please enter the number of equations", "Ok");
      }
    }
    else {
      this.numEq = Number((document.getElementById('n') as HTMLInputElement).value);
      this.data = Array(Number(this.numEq));
      this.dataResult = Array((Number(this.numEq) - 1) * 3);
      this.dataResultCubic = Array((Number(this.numEq) - 1) * 4);
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
    switch (this.method) {
      case "Lagrange":
        this.postLagrange(Number(this.numEq), this.returningDataPoints);
        break;
      case "Newton":
        this.postNewton(Number(this.numEq), this.returningDataPoints);
        break;
      case "Linear Spline":
        this.postLinearSpline(Number(this.numEq), this.returningDataPoints);
        break;
      case "Quadratic Spline":
        this.postQuadraticSpline(Number(this.numEq), this.returningDataPoints);
        break;
      case "Cubic Spline":
        this.postCubicSpline(Number(this.numEq), this.returningDataPoints);
        break;
    }
  }

  getErrorMessage(type: string) {
    switch (type) {
      case "method":
        return this.method_control.hasError('required') ? 'You must select a method' : '';
        break;
      case "n":
        return this.n_control.hasError('required') ? 'Please enter a number' :
          this.n_control.hasError('min') ? 'Please enter a bigger number' :
          ''
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  postLagrange(numPoints: Number, points) {

    const req = this.http.post(`/methods/lagrange`, JSON.stringify({
      numPoints: numPoints,
      points: points,
    }),
      {
        headers: {
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

  postNewton(numPoints: Number, points) {

    const req = this.http.post(`/methods/newtonInterp`, JSON.stringify({
      numPoints: numPoints,
      points: points,
    }),
      {
        headers: {
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

  postLinearSpline(numPoints: Number, points) {

    const req = this.http.post(`/methods/linearSpline`, JSON.stringify({
      numPoints: numPoints,
      points: points
    }),
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .subscribe(
        res => {
          this.function = res['functions'];
          let lim = res['limits'];

          for (let i = 0; i < lim.length; i += 2) {
            this.limits.push(lim[i] + ' <= x <= ' + lim[i + 1]);
          }
          this.show = true;
        }
      )
  }

  postQuadraticSpline(numPoints: Number, points) {

    const req = this.http.post(`/methods/quadraticSpline`, JSON.stringify({
      numPoints: numPoints,
      points: points
    }),
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .subscribe(
        res => {
          this.matrix = res['matrix'];
          this.indep = res['indep'];

          this.show = true;
        }
      )
  }

  postCubicSpline(numPoints: Number, points) {

    const req = this.http.post(`/methods/cubicSpline`, JSON.stringify({
      numPoints: numPoints,
      points: points
    }),
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .subscribe(
        res => {
          this.matrix = res['matrix'];
          this.indep = res['indep'];
          console.log(this.matrix)
          this.show = true;
        }
      )
  }


}
