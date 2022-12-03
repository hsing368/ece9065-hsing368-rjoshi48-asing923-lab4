import { User } from './../../services/user.model';
import { FormGroup, Validators,FormControl, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Auth, sendEmailVerification } from '@angular/fire/auth';


export function passwordsMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword= control.get('confirmPassword')?.value;

      if(password && confirmPassword && password!=confirmPassword){
        return {
          passwordsDontMatch: true
        }
      }
      return null;
        
    };
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm= new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  },
  {validators: passwordsMatchValidator()}
  )

  constructor(private authService: AuthenticationService, private auth: Auth,
    private router1: RouterModule,private route:ActivatedRoute, private router:Router,
    private toast:HotToastService) { }

  ngOnInit(): void {
  }

  get username(){
      return this.signUpForm.get('username');
      }

  get email(){
    return this.signUpForm.get('email');
    }

  get password(){
    return this.signUpForm.get('password');
      }

  get confirmPassword(){
    return this.signUpForm.get('confirmPassword');
    };

    submit(){
      const {username, email, password} = this.signUpForm.value;

      if(!this.signUpForm.valid) return;

      // this.authService.signUp(username, email, password).pipe(
      //   this.toast.observe({       
      //     success: 'Registration complete',
      //     loading: 'Signing in',
      //     error: ({ message }) => `${message}`
      //   })
      // ).subscribe(() => {
      //   this.router.navigate(['/verify-email']);
      // });

      this.authService.signUp(username, email, password).then(resp =>{
          alert("user registered")
          //send verfication email to new user
           this.SendEmailVerification(resp).then((res: any) =>{
              alert("Registration success. Please verify the email before logging in.")
              this.router.navigate(['/verify-email']);
          })
      })
    }

    SendEmailVerification(userdata : any){
      return sendEmailVerification(userdata.user);

    }

}


