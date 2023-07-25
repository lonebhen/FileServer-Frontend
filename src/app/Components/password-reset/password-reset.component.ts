import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { faKey,  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  faKey = faKey;
  token: string;
  resetForm: FormGroup;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });

    this.resetForm = this.formBuilder.group({
      password1: ['', [Validators.required, Validators.minLength(8), this.passwordComplexityValidator()]],
      password2: ['', Validators.required]
    });
  }

  get password1() {
    return this.resetForm.value.password1
  }

  get password2() {
    return this.resetForm.value.password2
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

  onSubmit() {
    if (this.resetForm.valid && this.resetForm.value.password1 === this.resetForm.value.password2) {
      const newPassword = this.resetForm.value.password1;
      this.http.post('https://file-server-ben.onrender.com/api/password_reset/confirm/', { token: this.token, password: newPassword }).subscribe(
        (response) => {
          this.router.navigate(['/login']);
          alert("Password Reset Successful");
        },
        (error) => {
          // Handle API errors
        }
      );
    } else {
      // Handle form validation errors (if any)
    }
  }
}
