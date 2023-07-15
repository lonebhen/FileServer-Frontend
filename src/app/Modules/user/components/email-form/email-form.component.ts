import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})

export class EmailFormComponent {
  emailForm: FormGroup;
  fileId: number;

  constructor(
    private dialogRef: MatDialogRef<EmailFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder
  ) {
    this.fileId = data.fileId; 
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.emailForm.valid) {
      const email = this.emailForm.value.email;
      this.dialogRef.close({ fileId: this.fileId, email }); 
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
