import { CanActivateFn } from '@angular/router';
import Swal from 'sweetalert2';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const unlockCodeGuard: CanActivateFn = async (route, state) => {
  const unlockCodeTime = localStorage.getItem('unlockCodeTime');
  const currentTime = new Date().getTime();
  const router = inject(Router);

  if (unlockCodeTime && (currentTime - parseInt(unlockCodeTime)) > 3600000) {
    localStorage.removeItem('unlockCode');
    localStorage.removeItem('unlockCodeTime');
  }

  const isUnlocked = localStorage.getItem('unlockCode') === 'open-sesame';

  if (!isUnlocked) {
    let accessGranted = false;

    while (!accessGranted) {
      const result = await Swal.fire({
        title: '🔐 Enter Access Code',
        input: 'password',
        inputPlaceholder: 'Type your secret code',
        showCancelButton: true,
        confirmButtonText: 'Unlock',
        cancelButtonText: 'Cancel',
        allowOutsideClick: false
      });

      if (result.isConfirmed) {
        const enteredCode = result.value;

        if (enteredCode === 'sesame') {
          localStorage.setItem('unlockCode', 'open-sesame');
          localStorage.setItem('unlockCodeTime', new Date().getTime().toString());
          accessGranted = true;
          return true;
        } else {
          await Swal.fire({
            icon: 'error',
            title: 'Invalid Code',
            text: 'The code you entered is incorrect. Please try again.',
            confirmButtonText: 'Try Again'
          });
          // Цикълът продължава
        }
      } else {
        router.navigate(['/']); // или какъвто маршрут искаш
        return false;
      }
    }
  }

  return true;
};