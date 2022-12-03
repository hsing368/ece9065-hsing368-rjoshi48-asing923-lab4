import { RouterModule, Routes, ActivatedRoute, ParamMap,Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators,NonNullableFormBuilder } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthenticationService, 
    private router1: RouterModule,private route:ActivatedRoute, private router:Router,
    private toast:HotToastService){
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  

  ngOnInit(): void {}

  get email(){
    return this.loginForm.get('email');
  };

  get password(){
    return this.loginForm.get('password');
  };

  submit(){
    const {email, password} = this.loginForm.value;

    if(!this.loginForm.valid){
      return;
    }

    this.authService.login(email, password).then(resp =>{
      if(resp.user?.emailVerified === true){
        this.router.navigate(['/home']);
      } else{
        this.router.navigate(['/verify-email'])
      }
    }, err =>{
        alert(err.message);
        this.router.navigate(['/login']);
    })



    // .pipe(
    //   this.toast.observe({
    //     success: 'Logged in successfully',
    //     loading: 'Logging in...',
    //     error: ({ message }) => `There was an error: ${message} `,
    //   })
    // )
    // .subscribe(() => {
    //   this.router.navigate(['/home']);
    //   });
  }

  signInWithGoogle(){
    this.authService.googleSignIn().pipe(
      this.toast.observe({
        success: 'Logged in successfully',
        loading: 'Logging in...',
        error: ({ message }) => `There was an error: ${message} `,
      })
    )
    .subscribe(() => {
      this.router.navigate(['/home']);
      });
  }

}

