import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token-service/token.service';
import { MustMatch } from '../../helpers/must-match.validator';
import { Registre } from '../../models/registre.model';


@Component({
  selector: 'app-registre',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registre.component.html',
  styleUrl: './registre.component.css'
})
export class RegistreComponent {
  registerForm!: FormGroup;
  errors: string[] = [];
  submitted: boolean = false;
  submitting: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private tokenService: TokenService) {
    {
      this.registerForm = this.formBuilder.group({
        pseudo: ['', Validators.required],
        question_secrete: ['', Validators.required],
        reponse_secrete: ['', Validators.required],
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/)]],
        confirmPassword: ['', Validators.required]
      }, {
        validators: MustMatch('password', 'confirmPassword')
      });
    }
  }
  ngOnInit(){
      if(this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
      }
  }

  onSubmit() {
    this.submitted = true;
    this.errors = [];

    if (this.registerForm.invalid) {
      this.populateErrors();
      this.scrollToTop();
      return;
    }
    const registerRequest: Registre = {
      pseudo: this.registerForm.value.pseudo,
      question_secrete: this.registerForm.value.question_secrete,
      reponse_secrete: this.registerForm.value.reponse_secrete,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
    }

    this.submitting = true;

    this.authService.register(registerRequest)
      .subscribe({
        next: (authResponse) => {
          // saving token in local storage
          this.tokenService.saveToken(authResponse.token)
          let userId = this.tokenService.getUserId();
          this.router.navigate(['/profil']);
        },
        error: (error) => {
          this.submitting = false;
          if (error && error.error && error.error.message === 'Email already exists') {
            this.errors.push('Email already exists');
          } else {
            this.errors.push('Email already exists');
          }
          this.scrollToTop();
        }
      });
  }

  private scrollToTop() {
    window.scrollTo(500, 500);
  }

  private populateErrors() {
    if (!this.submitted) {
      return;
    }

    for (const key in this.registerForm.controls) {
      const control = this.registerForm.controls[key];

      if (control.errors) {
        for (const errorKey in control.errors) {
          this.errors.push(this.getErrorMessage(key, errorKey));
        }
      }
    }
  }

  private getErrorMessage(formControlName: string, errorKey: string): string {
    const fieldNames: { [key: string]: string } = {
      pseudo: 'Nickname',
      question_secrete: 'Secret question',
      reponse_secrete: 'Secret answer',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password'
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
      case 'mustMatch':
        message += 'not matching.';
        break;
    }
    return message;
  }
}
