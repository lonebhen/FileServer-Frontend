import { Component } from '@angular/core';
import { faKey, faMessage, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
  faKey = faKey;
  faMessage = faMessage;
  faEnvelope = faEnvelope;
  faUser = faUser;

  signupForm: FormGroup;
  emailRegex: string = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$";

  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.signupForm = fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      password1: ['', [Validators.required, Validators.minLength(8), this.passwordComplexityValidator()]],
      password2: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }


  get email() {
    return this.signupForm.get("email");
  }

  get password1() {
    return this.signupForm.get("password1");
  }

  get password2() {
    return this.signupForm.get("password2");
  }

  passwordMatchValidator(control: AbstractControl) {
    const password1 = control.get('password1')?.value;
    const password2 = control.get('password2')?.value;

    if (password1 !== password2) {
      control.get('password2')?.setErrors({ passwordMismatch: true });
    } else {
      control.get('password2')?.setErrors(null);
    }

    return null;
  }

  passwordComplexityValidator() {
    return (control: AbstractControl) => {
      const password = control.value;
      const hasNumber = /\d/.test(password);
      const hasUpper = /[A-Z]/.test(password);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      if (!hasNumber || !hasUpper || !hasSpecial) {
        return { passwordComplexity: true };
      }

      return null;
    };
  }

  showVerificationAlert() {
    alert("Sign up successful! Please check your email to verify your registration before you can log in.");
  }
  

  signup() {
    const email = this.email.value;
    const password1 = this.password1.value;
    const password2 = this.password2.value

    this.spinner.show();

    this.authService.signup(email, password1, password2).subscribe(
      (response) => {
        this.spinner.hide();
        this.router.navigateByUrl('/signup').then(() => {
          setTimeout(() => {
            this.showVerificationAlert();
          }, 100);
        });
      },
      (error) => {
        this.spinner.hide();
        alert("Credentials already exist");
      }
    )
  }
}
