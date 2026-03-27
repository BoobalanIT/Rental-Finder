import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class RegisterComponent {

  showPassword = false;
  showConfirm = false;
  isLoading = false;
  strength = 0;

  formData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  };

  constructor(private auth: AuthService) { }

  checkStrength(password: string) {
    if (!password) {
      this.strength = 0;
      return;
    }
    let s = 0;
    if (password.length > 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    this.strength = s > 3 ? 3 : s;
  }

  onSubmit() {
    this.isLoading = true;
    const registrationData = {
      name: `${this.formData.firstName} ${this.formData.lastName}`,
      email: this.formData.email,
      password: this.formData.password
    };

    this.auth.register(registrationData).subscribe({
      next: (res) => {
        this.isLoading = false;
        alert('Registered successfully');
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}