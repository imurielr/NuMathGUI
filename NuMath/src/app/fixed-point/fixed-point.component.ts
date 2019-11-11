import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-fixed-point',
  templateUrl: './fixed-point.component.html',
  styleUrls: ['./fixed-point.component.css']
})
export class FixedPointComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  errorTypes = [
    'Absolute',
    'Relative',
  ];

  f_control = new FormControl('', [Validators.required]);
  g_control = new FormControl('', [Validators.required]);
  xa_control = new FormControl('', [Validators.required]);
  nIter_control = new FormControl('', [Validators.required, Validators.min(1)]);
  tol_control = new FormControl('', [Validators.required]);
  error_control = new FormControl('', [Validators.required]);

  title = 'Fixed Point';

  f = '';
  g = '';
  xa = '';
  nIter = '';
  tolerance = '';
  error = '';
  show = false;

  plot() {
    if(this.f_control.invalid || this.g_control.invalid || this.xa_control.invalid || this.nIter_control.invalid || this.tol_control.invalid || this.error_control.invalid){
      if(this.nIter_control.hasError('min')){
        this.openSnackBar("Please enter a valid value for the number of iterations", "Ok");
      }
      else{
        this.openSnackBar("Please enter all the values", "Ok");
      }
    }
    else{
      this.f = (document.getElementById('function') as HTMLInputElement).value;
      this.g = (document.getElementById('g') as HTMLInputElement).value;
      this.xa = (document.getElementById('xa') as HTMLInputElement).value;
      this.nIter = (document.getElementById('nIter') as HTMLInputElement).value;
      this.tolerance = (document.getElementById('tol') as HTMLInputElement).value;
      
      let func = this.f;
      let g_func = this.g;
      
      func = func.replace("sin", "Math.sin");
      func = func.replace("cos", "Math.cos");
      func = func.replace("exp", "Math.exp");
      func = func.replace("log", "Math.log");
      func = func.replace("sqrt", "Math.sqrt");
      func = func.replace("pow", "Math.pow");

      g_func = g_func.replace("sin", "Math.sin");
      g_func = g_func.replace("cos", "Math.cos");
      g_func = g_func.replace("exp", "Math.exp");
      g_func = g_func.replace("log", "Math.log");
      g_func = g_func.replace("sqrt", "Math.sqrt");
      g_func = g_func.replace("pow", "Math.pow");

      var exprF = new Function("x", "return " + func);  // Create functin to plot
      var exprG = new Function("x", "return " + g_func);
      var exprX = new Function("x", "return x");

      this.clear();   // Clear canvas to draw a new function

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

      plotFunction(exprF, [0, Math.PI * 4, -10, 10], "red"); // range to plot as [Xstart, Xend, Ystart, Yend]
      plotFunction(exprG, [0, Math.PI * 4, -10, 10], "blue"); // range to plot as [Xstart, Xend, Ystart, Yend]
      plotFunction(exprX, [0, Math.PI * 4, -10, 10], "green"); // range to plot as [Xstart, Xend, Ystart, Yend]

      this.show = true;
    }

  }

  clear() {
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
      case "g":
          return this.g_control.hasError('required') ? 'You must enter a value' : '';
          break;
      case "xa":
          return this.xa_control.hasError('required') ? 'You must enter a value' : '';
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
