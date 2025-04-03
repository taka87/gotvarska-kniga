import { CanActivateFn } from '@angular/router';
import Swal from 'sweetalert2';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const unlockCodeGuard: CanActivateFn = async (route, state) => {
  // Проверяваме дали кодът е изтекъл
  const unlockCodeTime = localStorage.getItem('unlockCodeTime');
  const currentTime = new Date().getTime();

   // Проверяваме дали кодът за достъп съществува
  const router = inject(Router); // Използваме inject за да вземем Router

  if (unlockCodeTime && (currentTime - parseInt(unlockCodeTime)) > 3600000) {
    // Ако кодът е невалиден след 24 часа, премахваме стойността и времето
    localStorage.removeItem('unlockCode');
    localStorage.removeItem('unlockCodeTime');
  }

  // Ако няма ключ за отворен достъп, показваме модала
  const isUnlocked = localStorage.getItem('unlockCode') === 'open-sesame';

  if (!isUnlocked) {
    // Връщаме Promise от SweetAlert2
    const result = await Swal.fire({
      title: 'Please insert code',
      input: 'password',
      inputPlaceholder: 'Enter Your Code',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      const enteredCode = result.value;
      if (enteredCode === 'sesame') { // 🔹 Замени с твой код
        localStorage.setItem('unlockCode', 'open-sesame'); // Записваме, че достъпът е отворен
        localStorage.setItem('unlockCodeTime', new Date().getTime().toString()); // Записваме времето на въвеждане
        return true; // Позволяваме достъп
      } else {
        Swal.fire('Code Incorrect', 'Try again!', 'error');
        return false; // Не позволяваме достъп
      }
    } else {
      router.navigate(['/']);
      return false; // Ако не е потвърдено или е натиснат "Отказ"
    }
  } else {
    return true; // Ако достъпът вече е разрешен
  }
};