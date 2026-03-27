import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent {

  showPassword = false;
  isLoading = false;

  formData = {
    email: '',
    password: '',
    remember: false
  };

  constructor(private auth: AuthService) { }

  onSubmit() {
    this.isLoading = true;
    this.auth.login(this.formData).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.auth.saveToken(res.token);
        alert('Login successful');
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}
