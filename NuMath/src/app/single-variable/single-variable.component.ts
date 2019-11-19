import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-single-variable',
  templateUrl: './single-variable.component.html',
  styleUrls: ['./single-variable.component.css']
})
export class SingleVariableComponent implements OnInit {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  f_control = new FormControl('', [Validators.required]);
  x0_control = new FormControl('', [Validators.required]);
  delta_control = new FormControl('', [Validators.required]);
  nIter_control = new FormControl('', [Validators.required, Validators.min(1)]);
  xi_control = new FormControl('', [Validators.required]);
  xu_control = new FormControl('', [Validators.required]);
  tol_control = new FormControl('', [Validators.required]);
  error_control = new FormControl('', [Validators.required]);
  g_control = new FormControl('', [Validators.required]);
  xa_control = new FormControl('', [Validators.required]);
  d_control = new FormControl('', [Validators.required]);
  x1_control = new FormControl('', [Validators.required]);
  d2_control = new FormControl('', [Validators.required]);


  methods = [
    "Incremental Search",
    "Bisection",
    "False Position",
    "Fixed Point",
    "Newton",
    "Secant",
    "Multiple Roots"
  ];

  errorTypes = [
    'Absolute',
    'Relative',
  ];

  method = ''; 

  f = '';
  x0 = '';
  delta = '';
  nIter = '';
  xi = '';
  xu = '';
  tolerance = '';
  error = '';
  g = '';
  xa = '';
  d = '';
  x1 = '';
  d2 = '';

  show = false;
  errorFound = false;
  result = '';

  firstNum = '';
  secondNum = '';
  table;
  showF = false;

  plot() {
    this.show = false;
    this.errorFound = false;
    
    if (this.method == 'Incremental Search') {
      this.show = false;
      this.errorFound = false;

      if (this.f_control.invalid || this.x0_control.invalid || this.delta_control.invalid || this.nIter_control.invalid) {
        if (this.nIter_control.hasError('min')) {
          this.openSnackBar("Please enter a valid value for the number of iterations", "Ok");
        }
        else {
          this.openSnackBar("Please enter all the values", "Ok");
        }
      }
      else {
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

        this.postIncrementalSearch(this.f, Number(this.x0), Number(this.delta), Number(this.nIter));
      }
    }

    else if (this.method == 'Bisection') {
      this.show = false;
      this.errorFound = false;

      if (this.f_control.invalid || this.xi_control.invalid || this.xu_control.invalid || this.nIter_control.invalid || this.tol_control.invalid || this.error_control.invalid) {
        if (this.nIter_control.hasError('min')) {
          this.openSnackBar("Please enter a valid value for the number of iterations", "Ok");
        }
        else {
          this.openSnackBar("Please enter all the values", "Ok");
        }
      }
      else {
        this.f = (document.getElementById('function') as HTMLInputElement).value;
        this.xi = (document.getElementById('xi') as HTMLInputElement).value;
        this.xu = (document.getElementById('xu') as HTMLInputElement).value;
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

        this.postBisection(this.f, Number(this.xi), Number(this.xu), Number(this.nIter), Number(this.tolerance), this.error);
      }
    }

    else if (this.method == 'False Position') {
      this.show = false;
      this.errorFound = false;

      if (this.f_control.invalid || this.xi_control.invalid || this.xu_control.invalid || this.nIter_control.invalid || this.tol_control.invalid || this.error_control.invalid) {
        if (this.nIter_control.hasError('min')) {
          this.openSnackBar("Please enter a valid value for the number of iterations", "Ok");
        }
        else {
          this.openSnackBar("Please enter all the values", "Ok");
        }
      }
      else {
        this.f = (document.getElementById('function') as HTMLInputElement).value;
        this.xi = (document.getElementById('xi') as HTMLInputElement).value;
        this.xu = (document.getElementById('xu') as HTMLInputElement).value;
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

        this.postFalsePosition(this.f, Number(this.xi), Number(this.xu), Number(this.nIter), Number(this.tolerance), this.error);
      }
    }

    else if (this.method == 'Fixed Point') {
      this.show = false;
      this.errorFound = false;

      if (this.f_control.invalid || this.g_control.invalid || this.xa_control.invalid || this.nIter_control.invalid || this.tol_control.invalid || this.error_control.invalid) {
        if (this.nIter_control.hasError('min')) {
          this.openSnackBar("Please enter a valid value for the number of iterations", "Ok");
        }
        else {
          this.openSnackBar("Please enter all the values", "Ok");
        }
      }
      else {
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
          plotFunction2 = function plotFunction2(fn, range, color) {
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

        plotFunction2(exprF, [0, Math.PI * 4, -10, 10], "red"); // range to plot as [Xstart, Xend, Ystart, Yend]
        plotFunction2(exprG, [0, Math.PI * 4, -10, 10], "blue"); // range to plot as [Xstart, Xend, Ystart, Yend]
        plotFunction2(exprX, [0, Math.PI * 4, -10, 10], "green"); // range to plot as [Xstart, Xend, Ystart, Yend]

        this.showF = true;

        this.postFixedPoint(this.f, this.g, Number(this.xa), Number(this.nIter), Number(this.tolerance), this.error);
      }
    }

    else if (this.method == 'Newton') {
      this.show = false;
      this.errorFound = false;

      if (this.f_control.invalid || this.d_control.invalid || this.x0_control.invalid || this.nIter_control.invalid || this.tol_control.invalid || this.error_control.invalid) {
        if (this.nIter_control.hasError('min')) {
          this.openSnackBar("Please enter a valid value for the number of iterations", "Ok");
        }
        else {
          this.openSnackBar("Please enter all the values", "Ok");
        }
      }
      else {
        this.f = (document.getElementById('function') as HTMLInputElement).value;
        this.d = (document.getElementById('dFunction') as HTMLInputElement).value;
        this.x0 = (document.getElementById('x0') as HTMLInputElement).value;
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

        this.postNewton(this.f, this.d, Number(this.x0), Number(this.nIter), Number(this.tolerance), this.error);
      }
    }

    else if (this.method == 'Secant') {
      this.show = false;
      this.errorFound = false;

      if (this.f_control.invalid || this.x0_control.invalid || this.x1_control.invalid || this.nIter_control.invalid || this.tol_control.invalid || this.error_control.invalid) {
        if (this.nIter_control.hasError('min')) {
          this.openSnackBar("Please enter a valid value for the number of iterations", "Ok");
        }
        else {
          this.openSnackBar("Please enter all the values", "Ok");
        }
      }
      else {
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

        this.postSecant(this.f, Number(this.x0), Number(this.x1), Number(this.nIter), Number(this.tolerance), this.error);
      }
    }

    else if (this.method == 'Multiple Roots') {
      this.show = false;
      this.errorFound = false;

      if (this.f_control.invalid || this.d_control.invalid || this.d2_control.invalid || this.x0_control.invalid || this.nIter_control.invalid || this.tol_control.invalid || this.error_control.invalid) {
        if (this.nIter_control.hasError('min')) {
          this.openSnackBar("Please enter a valid value for the number of iterations", "Ok");
        }
        else {
          this.openSnackBar("Please enter all the values", "Ok");
        }
      }
      else {
        this.f = (document.getElementById('function') as HTMLInputElement).value;
        this.d = (document.getElementById('d') as HTMLInputElement).value;
        this.d2 = (document.getElementById('d2') as HTMLInputElement).value;
        this.x0 = (document.getElementById('x0') as HTMLInputElement).value;
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

        this.postMultipleRoots(this.f, this.d, this.d2, Number(this.x0), Number(this.nIter), Number(this.tolerance), this.error);
      }
    }
  }


  clear() {
    var canvas = ((document.getElementById('myCanvas')) as HTMLCanvasElement);
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var exprY = new Function("return 0");

    var canvas = ((document.getElementById('myCanvas')) as HTMLCanvasElement);
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
    switch (type) {
      case "f":
        return this.f_control.hasError('required') ? 'You must enter a value' : '';
        break;
      case "x0":
        return this.x0_control.hasError('required') ? 'You must enter a value' : '';
        break;
      case "delta":
        return this.delta_control.hasError('required') ? 'You must enter a value' : '';
        break;
      case "d":
        return this.d_control.hasError('required') ? 'You must enter a value' : '';
        break;
      case "d2":
        return this.d2_control.hasError('required') ? 'You must enter a value' : '';
        break;
      case "x0":
        return this.x0_control.hasError('required') ? 'You must enter a value' : '';
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
      case "xi":
        return this.xi_control.hasError('required') ? 'You must enter a value' : '';
        break;
      case "xu":
        return this.xu_control.hasError('required') ? 'You must enter a value' : '';
        break;
      case "g":
        return this.g_control.hasError('required') ? 'You must enter a value' : '';
        break;
      case "xa":
        return this.xa_control.hasError('required') ? 'You must enter a value' : '';
        break;
      case "x1":
        return this.x1_control.hasError('required') ? 'You must enter a value' : '';
        break;
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  postIncrementalSearch(func: string, x0: Number, delta: Number, nIter: Number) {

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
            this.errorFound = true;
          }
          else {
            this.firstNum = res['first'];
            this.secondNum = res['last'];
            this.table = res['table'];
            this.show = true;
          }
        }
      );
  }

  postBisection(func: string, xi: Number, xu: Number, nIter: Number, tol: Number, error: String) {

    const req = this.http.post(`/methods/bisection`, JSON.stringify({
      func: func,
      xi: xi,
      xu: xu,
      nIter: nIter,
      tol: tol,
      err: error
    }),
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .subscribe(
        res => {
          if (res['error'] == undefined) {
            this.result = res['root'];
            this.table = res['table'];
            this.show = true;
          }
          else {
            this.result = res['error'];
            this.errorFound = true;
          }
        }
      )

  }

  postFalsePosition(func: string, xi: Number, xu: Number, nIter: Number, tol: Number, error: String) {

    const req = this.http.post(`/methods/falsePosition`, JSON.stringify({
      func: func,
      xi: xi,
      xu: xu,
      nIter: nIter,
      tol: tol,
      err: error
    }),
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .subscribe(
        res => {
          if (res['error'] == undefined) {
            this.result = res['root'];
            this.table = res['table'];
            this.show = true;
          }
          else {
            this.result = res['error'];
            this.errorFound = true;
          }
        }
      )

  }

  postFixedPoint(func: string, gFunc: string, xa: Number, nIter: Number, tol: Number, error: String) {

    const req = this.http.post(`/methods/fixedPoint`, JSON.stringify({
      func: func,
      gFunc: gFunc,
      xa: xa,
      nIter: nIter,
      tol: tol,
      err: error
    }),
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .subscribe(
        res => {
          if (res['error'] == undefined) {
            this.result = res['root'];
            this.table = res['table'];
            this.show = true;
          }
          else {
            this.result = res['error'];
            this.errorFound = true;
          }
        }
      )

  }

  postNewton(func: string, dFunc: string, x0: Number, nIter: Number, tol: Number, error: String) {

    const req = this.http.post(`/methods/newtonSingle`, JSON.stringify({
      func: func,
      dFunc: dFunc,
      x0: x0,
      nIter: nIter,
      tol: tol,
      err: error
    }),
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .subscribe(
        res => {
          if (res['error'] == undefined) {
            this.result = res['root'];
            this.table = res['table'];
            this.show = true;
          }
          else {
            this.result = res['error'];
            this.errorFound = true;
          }
        }
      )
  }

  postSecant(func: string, x0: Number, x1: Number, nIter: Number, tol: Number, error: String) {

    const req = this.http.post(`/methods/secant`, JSON.stringify({
      func: func,
      x0: x0,
      x1: x1,
      nIter: nIter,
      tol: tol,
      err: error
    }),
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .subscribe(
        res => {
          if (res['error'] == undefined) {
            this.result = res['root'];
            this.table = res['table'];
            this.show = true;
          }
          else {
            this.result = res['error'];
            this.errorFound = true;
          }
        }
      )

  }

  postMultipleRoots(func: string, dFunc: string, d2Func: string, x0: Number, nIter: Number, tol: Number, error: String) {

    const req = this.http.post(`/methods/multipleRoots`, JSON.stringify({
      func: func,
      dFunc: dFunc,
      d2Func: d2Func,
      x0: x0,
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
          this.table = res['table'];
          this.show = true;
        }
        else {
          this.result = res['error'];
          this.errorFound = true;
        }
      }
    )

  }

}
