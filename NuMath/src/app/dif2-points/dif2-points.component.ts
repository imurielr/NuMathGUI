import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dif2-points',
  templateUrl: './dif2-points.component.html',
  styleUrls: ['./dif2-points.component.css']
})
export class Dif2PointsComponent implements OnInit {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  directionTypes = [
    'Backwards',
    'Forward',
    'Center'
  ];

  direction_control = new FormControl('', [Validators.required]);
  h_control = new FormControl('', [Validators.required]);

  title = 'Diferentiation Using Two Points';
  direction = '';
  h = '';
  returningDataPoints;

  result;
  show;

  calculate() {

    if(this.h_control.invalid || this.direction_control.invalid){
        this.openSnackBar("Please enter all the values", "Ok");
    }
    else{
      this.h = (document.getElementById('h') as HTMLInputElement).value;
      //We clear the Array
      this.returningDataPoints = [];

      for (let i = 1; i <= 2; i++){
        for (let j = 0; j < 2; j++){
          let cell = ((document.getElementById('cell' + i + '' + j)) as HTMLInputElement).value
          this.returningDataPoints.push(Number(cell));
        }
      }
      this.post(2, this.returningDataPoints, this.direction, Number(this.h));    
    }
  }

  getErrorMessage(type: string) {
    switch(type){
      case "dir":
        return this.direction_control.hasError('required') ? 'You must enter a value' : '';
        break;
      case "h":
          return this.h_control.hasError('required') ? 'You must enter a value' : '';
          break;
    } 
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  post(numPoints: Number, points, direction: string, h: Number) {

    const req = this.http.post(`/methods/diferentiation`, JSON.stringify({
      numPoints: numPoints,
      points: points,
      direction: direction,
      h: h
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
