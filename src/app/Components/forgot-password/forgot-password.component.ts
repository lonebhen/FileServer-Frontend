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

  resetForm: any;

  constructor(private spinner: NgxSpinnerService, private fb: FormBuilder, private authService: AuthService, private router: Router){
    this.resetForm = fb.group({
      username: fb.control('',[Validators.required]),
      new_password: fb.control('',[Validators.required, Validators.minLength(8)])
    })
  }

  get username(){
    return this.resetForm.get("username")
  }

  get new_password(){
    return this.resetForm.get("new_password")
  }


  resetPassword(){
    const username = this.username.value
    const new_password = this.new_password.value

    this.spinner.show();


    this.authService.reset(username, new_password).subscribe(
      response => {

        this.spinner.hide();

        this.router.navigate(['login']).then(
          () => {
            setTimeout(()=>{
              alert("Password reset! Login now")
            }, 100)
          }
        )
        
      },
      error=>{
        this.spinner.hide();

        alert("Username does not exit")

      }
      

    )

    

  }

}
