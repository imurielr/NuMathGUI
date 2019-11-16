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

  n_control = new FormControl('', [Validators.required, Validators.min(2)]);


  numEq = 0;
  data;
  returningDataPoints;
  showTable = false;
  num;

  showMatrix() {
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
        this.returningDataPoints.push(cell)
      }
    }

    switch (this.method) {
      case "General Trapezium":
        break;
      case "General Simpson 1/3":
        break;
      case "General Simpson 3/8":
        break;
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


}
