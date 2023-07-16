import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarAction } from '@angular/material/snack-bar';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['user']);
    }
  }

  faSignIn = faSignIn

  loginForm: any;
  signupForm: any;
  loggedIn: boolean = false;

  emailRegex: string = "[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"


  constructor(private spinner: NgxSpinnerService, private fb: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar){
    this.loginForm = fb.group({
      email: fb.control('', [Validators.required, Validators.pattern(this.emailRegex)]),
      password: fb.control('', [Validators.required, Validators.minLength(8)])
    });


    this.signupForm = fb.group({
      email: fb.control('', []),
      username : fb.control('',[Validators.required]),
      password: fb.control('', [Validators.required, Validators.minLength(8)])

    })
  }

  get email(){
    return this.loginForm.get('email')
  }

  get password(){
    return this.loginForm.get('password')
  }

  login(){

    const email = this.email.value
    const password = this.password.value

    this.spinner.show()

    

    this.authService.login(email,  password).subscribe(
      response => {


        this.authService.setToken(response["token"])
        this.router.navigateByUrl('/user').then(() => {

          setTimeout(()=>{
            this.spinner.hide();
            alert("Welcome!!")
          }, 200)
        
      },
      
      );  

      },

      error => {

        this.spinner.hide();

        this.router.navigateByUrl('/login').then(()=>
        
        {
          setTimeout(()=> {
            alert("Login Failed, Check credentials")
          }, 30)
        }
        
        )      

      }
     
    )

  }

}
