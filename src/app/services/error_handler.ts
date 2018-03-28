import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHandler {

  constructor(
    // public snackbar: MatSnackBar,
  ) {}

  public handleError(err: any) {
    console.log("ErrorHandler: " + err.message)
    // this.snackbar.open(err.message, 'close');
  }
}
