import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root' // ✅ Esto permite la inyección de dependencias
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // ✅ Verifica si el token existe
    if (!token) {
      this.router.navigate(['/login']); // 🔒 Redirige si no hay token
      return false;
    }
    return true;
  }
}