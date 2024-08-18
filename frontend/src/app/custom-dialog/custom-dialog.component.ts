import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-custom-dialog',
  standalone: true,
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.css']  // Corrected from 'styleUrl' to 'styleUrls'
})
export class CustomDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CustomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
