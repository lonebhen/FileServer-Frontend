import { Component } from '@angular/core';
import { faKey, faMessage, faEnvelope, faUser,  } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { MatSnackBar, } from '@angular/material/snack-bar';
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
  faUser = faUser

  signupForm: any;
  emailRegex: string = "[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"


  constructor(private spinner: NgxSpinnerService, private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar, private router: Router){

    this.signupForm = fb.group({
      username: fb.control('',[Validators.required]),
      email: fb.control('',[Validators.required, Validators.pattern(this.emailRegex)]),
      password: fb.control('',[Validators.required, Validators.minLength(8)])
    })

  }

  get username(){
    return this.signupForm.get("username");
  }

  get email(){
    return this.signupForm.get("email");
  }

  get password(){
    return this.signupForm.get("password")
  }


  signup(){

    const username = this.username.value
    const email = this.email.value
    const password = this.password.value

    this.spinner.show()


    this.authService.signup(username, email, password).subscribe(

      (response) => {


        this.spinner.hide()

        this.router.navigateByUrl('/login').then(
          () => {
            setTimeout(()=>{
              alert("Sign up successful, Login");
            },100)
          }
        )
        


      },
      (error) => {
        this.spinner.hide();
        alert("Credentials already exits")
      }
      
    )


  }
}
