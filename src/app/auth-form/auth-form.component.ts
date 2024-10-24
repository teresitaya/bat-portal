import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [ReactiveFormsModule, PasswordModule, InputTextModule, ButtonModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss'
})
export class AuthFormComponent implements OnInit {
  authForm!: UntypedFormGroup;

  private readonly _fb = inject(FormBuilder);

  ngOnInit(): void {
      this.authForm = this._fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      });
  }


  login(){
    console.log('Form Submitted', this.authForm.value);
  }
}
