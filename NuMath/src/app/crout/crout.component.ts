import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-crout',
  templateUrl: './crout.component.html',
  styleUrls: ['./crout.component.css']
})
export class CroutComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  n_control = new FormControl('', [Validators.required, Validators.min(2)]);


  title = 'Crout Method';
  numEq = 0;
  data;
  returningDataMatrix;
  returningDataB;
  showTable = false;
  num;

  showMatrix() {
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
      this.returningDataMatrix = new Array();
      this.returningDataB = new Array();  
      this.showTable = true; 
    }
  }

  calculate() {
    //We clear the Array
    this.returningDataMatrix = [];
    this.returningDataB = [];
    //Then we calculate a new one
    for (let i = 1; i < Number(this.numEq) + 1; i++){
      for (let j = 1; j < Number(this.numEq) + 1; j++){
        let cell = (document.getElementById('cell'+i+''+j) as HTMLInputElement).value
        this.returningDataMatrix.push(cell)
      }
      let b = (document.getElementById('b'+i) as HTMLInputElement).value
      this.returningDataB.push(b)
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
