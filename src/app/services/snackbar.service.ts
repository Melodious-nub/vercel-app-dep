import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) { }

  open(
    message: string,
    action: string = 'Close',
    config: any = { duration: 2000, horizontalPosition: 'end', verticalPosition: 'bottom' }
  ) {
    this.snackBar.open(message, action, config);
  }
}
