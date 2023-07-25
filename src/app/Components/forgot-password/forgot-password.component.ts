import { Component } from '@angular/core';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  faLock = faLock;

  emailRegex: string = "[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"

  resetForm: any;

  constructor(private spinner: NgxSpinnerService, private fb: FormBuilder, private authService: AuthService, private router: Router){
    this.resetForm = fb.group({
      email: fb.control('', [Validators.required, Validators.pattern(this.emailRegex)]),
    })
  }

  get email(){
    return this.resetForm.get("email")
  }




  resetPassword(){
    const email = this.email.value

    this.spinner.show();


    this.authService.reset(email).subscribe(
      response => {

        this.spinner.hide();

        this.router.navigate(['login']).then(
          () => {
            setTimeout(()=>{
              alert("Check your mail to begin your password reset")
            }, 100)
          }
        )
        
      },
      error=>{
        this.spinner.hide();

        alert("Email does not exit")

      }
      

    )

    

  }

}
