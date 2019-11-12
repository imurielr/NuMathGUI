import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-secant',
  templateUrl: './secant.component.html',
  styleUrls: ['./secant.component.css']
})
export class SecantComponent implements OnInit {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  errorTypes = [
    'Absolute',
    'Relative',
  ];

  f_control = new FormControl('', [Validators.required]);
  x0_control = new FormControl('', [Validators.required]);
  x1_control = new FormControl('', [Validators.required]);
  nIter_control = new FormControl('', [Validators.required, Validators.min(1)]);
  tol_control = new FormControl('', [Validators.required]);
  error_control = new FormControl('', [Validators.required]);

  title = 'Secant';
  result = '';
  show = false;
  errorFound = false;

  f = '';
  x0 = '';
  x1 = '';
  nIter = '';
  tolerance = '';
  error = '';

  plot() {
    this.show = false;
    this.errorFound = false;

    if(this.f_control.invalid || this.x0_control.invalid || this.x1_control.invalid || this.nIter_control.invalid || this.tol_control.invalid || this.error_control.invalid){
      if(this.nIter_control.hasError('min')){
        this.openSnackBar("Please enter a valid value for the number of iterations", "Ok");
      }
      else{
        this.openSnackBar("Please enter all the values", "Ok");
      }
    }
    else{
      this.f = (document.getElementById('function') as HTMLInputElement).value;
      this.x0 = (document.getElementById('x0') as HTMLInputElement).value;
      this.x1 = (document.getElementById('x1') as HTMLInputElement).value;
      this.nIter = (document.getElementById('nIter') as HTMLInputElement).value;
      this.tolerance = (document.getElementById('tol') as HTMLInputElement).value;
      
      let func = this.f;
      
      func = func.replace("sin", "Math.sin");
      func = func.replace("cos", "Math.cos");
      func = func.replace("exp", "Math.exp");
      func = func.replace("log", "Math.log");
      func = func.replace("sqrt", "Math.sqrt");
      func = func.replace("pow", "Math.pow");

      var expr = new Function("x", "return " + func);  // Create functin to plot

      this.clear();   // Clear canvas to draw a new function

      var canvas = ((document.getElementById('myCanvas')) as HTMLCanvasElement),
      ctx = canvas.getContext('2d'),
      width = canvas.width,
      height = canvas.height,
      plotFunction = function plotFunction(fn, range) {
          var widthScale = (width / (range[1] - range[0])),
              heightScale = (height / (range[3] - range[2])),
              first = true;

          ctx.beginPath();

          for (var x = 0; x < width; x++) {
              var xFnVal = (x / widthScale) - range[0],
                  yGVal = (fn(xFnVal) - range[2]) * heightScale;

              yGVal = height - yGVal; // 0,0 is top-left

              if (first) {
                  ctx.moveTo(x, yGVal);
                  first = false;
              }
              else {
                  ctx.lineTo(x, yGVal);
              }
          }

          ctx.strokeStyle = "red";
          ctx.lineWidth = 3;
          ctx.stroke();
      };
      // plotFunction(expr, [15, 100, -20, 20]); // range to plot as [Xstart, Xend, Ystart, Yend]

      plotFunction(expr, [0, Math.PI * 4, -10, 10]); // range to plot as [Xstart, Xend, Ystart, Yend]

    }
    this.post(this.f, Number(this.x0), Number(this.x1), Number(this.nIter), Number(this.tolerance), this.error);
  }

  post(func: string, x0: Number, x1: Number, nIter: Number, tol: Number, error: String) {

    const req = this.http.post(`/methods/secant`, JSON.stringify({
      func: func,
      x0: x0,
      x1: x1,
      nIter: nIter,
      tol: tol,
      err: error
    }),
    {
      headers:{
        'Content-Type': 'application/json',
      }
    })
    .subscribe(
      res => {
        if (res['error'] == undefined) {
          this.result = res['root'];
          this.show = true;
        }
        else {
          this.result = res['error'];
          this.errorFound = true;
        }
      }
    )

  }

  clear() {
    var canvas = ((document.getElementById('myCanvas')) as HTMLCanvasElement);
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);

    var exprY = new Function("return 0");

    var canvas = ((document.getElementById('myCanvas')) as HTMLCanvasElement);
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);

    var canvas = ((document.getElementById('myCanvas')) as HTMLCanvasElement),
    ctx = canvas.getContext('2d'),
    width = canvas.width,
    height = canvas.height,
    plotFunction = function plotFunction(fn, range, color) {
        var widthScale = (width / (range[1] - range[0])),
            heightScale = (height / (range[3] - range[2])),
            first = true;

        ctx.beginPath();

        for (var x = 0; x < width; x++) {
            var xFnVal = (x / widthScale) - range[0],
                yGVal = (fn(xFnVal) - range[2]) * heightScale;

            yGVal = height - yGVal; // 0,0 is top-left

            if (first) {
                ctx.moveTo(x, yGVal);
                first = false;
            }
            else {
                ctx.lineTo(x, yGVal);
            }
        }

        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.stroke();
    };
    // plotFunction(expr, [15, 100, -20, 20]); // range to plot as [Xstart, Xend, Ystart, Yend]

    plotFunction(exprY, [0, Math.PI * 4, -20, 20], "black"); // range to plot as [Xstart, Xend, Ystart, Yend]
  }

  getErrorMessage(type: string) {
    switch(type){
      case "f":
        return this.f_control.hasError('required') ? 'You must enter a value' : '';
        break;
      case "x0":
          return this.x0_control.hasError('required') ? 'You must enter a value' : '';
          break;
      case "x1":
          return this.x1_control.hasError('required') ? 'You must enter a value' : '';
          break;
      case "nIter":
          return this.nIter_control.hasError('required') ? 'You must enter a value' : 
                 this.nIter_control.hasError('min') ? 'The number of iterations must be bigger than 1' : 
                 '';
          break;
      case "tol":
        return this.tol_control.hasError('required') ? 'You must enter a value' : '';
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
