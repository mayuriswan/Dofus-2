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
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './registre.component.html',
  styleUrl: './registre.component.css'
})
export class RegistreComponent {
  registerForm!: FormGroup;
  submitted: boolean = false;
  submitting: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private tokenService : TokenService){{
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


    onSubmit() {
      this.submitted = true;
      if (this.registerForm.invalid) {
        return;
      }
      const registerRequest : Registre ={
        pseudo : this.registerForm.value.pseudo,
        question_secrete : this.registerForm.value.question_secrete,
        reponse_secrete : this.registerForm.value.reponse_secrete,
        email : this.registerForm.value.email,
        password : this.registerForm.value.password,
        confirmPassword : this.registerForm.value.confirmPassword,
      }

      this.submitting = true;

      this.authService.register(registerRequest)
      .subscribe({
          next: (authResponse) => {
              // saving token in local storage
              this.tokenService.saveToken(authResponse.token)
              let userId=this.tokenService.getUserId();
              this.router.navigate(['/']);
            },
          error: (authResponse) => {
            console.log(authResponse);
            this.submitting = false;
          }
      });
    }
}
