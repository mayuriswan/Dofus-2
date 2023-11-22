import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token-service/token.service';
import { SocialUser } from '../../models/social-user';
import { Login } from '../../models/login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  submitted: boolean = false;
  submitting: boolean = false;
  errorMessage: string = '';
  errors: string[] = [];


  isLogged?: boolean;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _ngZone: NgZone,
    private tokenService: TokenService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/
          ),
        ],
      ],
    });
  }

  onSubmit() {
    this.submitted = true;
    this.errors = [];
    if (this.loginForm.invalid) {
      this.populateErrors();
      return;
    }
    const loginRequest: Login = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.submitting = true;

    this.authService.login(loginRequest).subscribe({
      next: (authResponse) => {
        this.tokenService.saveToken(authResponse.token);
        // routing to home page
        this.router.navigate(['/']);
      },
      error: () => {
        // stop loading
        this.submitting = false;
      },
    });
  }
  private populateErrors() {
    for (const key in this.loginForm.controls) {
      const control = this.loginForm.controls[key];

      if (control.errors) {
        for (const errorKey in control.errors) {
          this.errors.push(this.getErrorMessage(key, errorKey));
        }
      }
    }
  }
  private getErrorMessage(formControlName: string, errorKey: string): string {
    const fieldNames: { [key: string]: string } = {
      email: 'Email',
      password: 'Password'
    };

    let message = `${fieldNames[formControlName] || formControlName} field is `;
    switch (errorKey) {
      case 'required':
        message += 'required.';
        break;
      case 'email':
        message += 'invalid.';
        break;
      case 'pattern':
        message += 'not meeting the pattern requirements.';
        break;
      // Add other cases if needed
    }

    return message;
  }
  navigateToRegister() {
    this.router.navigate(['/registre']);
  }
  
}
