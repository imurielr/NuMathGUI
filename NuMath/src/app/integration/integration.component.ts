import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.css']
})
export class IntegrationComponent implements OnInit {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  methods = [
    "General Trapezium",
    "General Simpson 1/3",
    "General Simpson 3/8"
  ];

  method;

  method_control = new FormControl('', [Validators.required]);
  n_control = new FormControl('', [Validators.required, Validators.min(2)]);


  numEq = 0;
  data;
  returningDataPoints;
  showTable = false;
  num;

  result;
  show;

  showMatrix() {
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
      case "General Trapezium":
        this.postTrapezium(this.numEq, this.returningDataPoints);
        break;
      case "General Simpson 1/3":
        this.postSimpsonOne(this.numEq, this.returningDataPoints);
        break;
      case "General Simpson 3/8":
        this.postSimpsonThree(this.numEq, this.returningDataPoints);
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

  postTrapezium(numPoints: Number, points) {

    const req = this.http.post(`/methods/trapezium`, JSON.stringify({
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
          this.result = res['value'];
          this.show = true;
        }
      )
  }

  postSimpsonOne(numPoints: Number, points) {

    const req = this.http.post(`/methods/simpsonOne`, JSON.stringify({
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
          this.result = res['value'];
          this.show = true;
        }
      )
  }

  postSimpsonThree(numPoints: Number, points) {

    const req = this.http.post(`/methods/simpsonThree`, JSON.stringify({
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
          this.result = res['value'];
          this.show = true;
        }
      )
  }


}
