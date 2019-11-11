import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dif3-points',
  templateUrl: './dif3-points.component.html',
  styleUrls: ['./dif3-points.component.css']
})
export class Dif3PointsComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  directionTypes = [
    'Backwards',
    'Forward',
    'Center'
  ];

  direction_control = new FormControl('', [Validators.required]);
  h_control = new FormControl('', [Validators.required]);

  title = 'Diferentiation Using Three Points';
  nPoints = Array(3);
  direction = '';
  h = '';
  returningDataPoints;

  calculate() {

    if(this.h_control.invalid || this.direction_control.invalid){
        this.openSnackBar("Please enter all the values", "Ok");
    }
    else{
      this.h = (document.getElementById('h') as HTMLInputElement).value;
      //We clear the Array
      this.returningDataPoints = [];
      
      for (let i = 1; i <= 3; i++){
        for (let j = 0; j < 2; j++){
          let cell = ((document.getElementById('cell' + i + '' + j)) as HTMLInputElement).value
          this.returningDataPoints.push(cell);
        }
      }      
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

}
