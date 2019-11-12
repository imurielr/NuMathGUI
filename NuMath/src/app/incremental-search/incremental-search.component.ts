import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-incremental-search',
  templateUrl: './incremental-search.component.html',
  styleUrls: ['./incremental-search.component.css']
})
export class IncrementalSearchComponent implements OnInit {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  f_control = new FormControl('', [Validators.required]);
  x0_control = new FormControl('', [Validators.required]);
  delta_control = new FormControl('', [Validators.required]);
  nIter_control = new FormControl('', [Validators.required, Validators.min(1)]);
  firstNum = '';
  secondNum = '';
  show = false;
  error = false;
  
  title = 'Incremental Search';

  f = '';
  x0 = '';
  delta = '';
  nIter = '';

  plot() {

    this.show = false;
    this.error = false;

    if(this.f_control.invalid || this.x0_control.invalid || this.delta_control.invalid || this.nIter_control.invalid){
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
      this.delta = (document.getElementById('delta') as HTMLInputElement).value;
      this.nIter = (document.getElementById('nIter') as HTMLInputElement).value;

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
    this.post(this.f, Number(this.x0), Number(this.delta), Number(this.nIter));
  }

  post(func: string, x0: Number, delta: Number, nIter: Number) {

    const req = this.http.post(`/methods/incrSearch`, JSON.stringify({
      func: func,
      x0: x0,
      delta: delta,
      nIter: nIter
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .subscribe(
      res => {
        if (res['first'] == undefined) {
          this.error = true;
        }
        else {
          this.firstNum = res['first'];
          this.secondNum = res['last'];
          this.show = true;
        }
      }
    );
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
      case "delta":
          return this.delta_control.hasError('required') ? 'You must enter a value' : '';
          break;
      case "nIter":
          return this.nIter_control.hasError('required') ? 'You must enter a value' :
                 this.nIter_control.hasError('min') ? 'The number of iterations must be bigger than 1' :
                 '';
          break;
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
