// ✅ NAVAMYA TECHNOLOGY - Global JavaScript

// 1. PAGE FADE-IN EFFECT
window.onload = () => {
  document.body.classList.add('fade-in');
};

// 2. FORM VALIDATION (Basic Example)
document.addEventListener('DOMContentLoaded', function () {
  const contactForms = document.querySelectorAll('form');

  contactForms.forEach(form => {
    form.addEventListener('submit', function (e) {
      const email = form.querySelector('input[type=email]');
      const fname = form.querySelector('input[type=text]');
      let valid = true;

      if (fname && fname.value.trim() === '') {
        showAlert('Please enter your name.');
        valid = false;
      }

      if (email && !validateEmail(email.value)) {
        showAlert('Please enter a valid email address.');
        valid = false;
      }

      if (!valid) e.preventDefault();
    });
  });
});

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// 3. CUSTOM ALERT FUNCTION
function showAlert(message) {
  const alertDiv = document.createElement('div');
  alertDiv.className = 'alert alert-warning alert-dismissible fade show';
  alertDiv.role = 'alert';
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  document.body.prepend(alertDiv);

  setTimeout(() => alertDiv.remove(), 5000);
}

// 4. SMOOTH SCROLL FOR NAVBAR LINKS (optional)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// 5. DYNAMIC SECTION DISPLAY (for Learn More buttons)
document.addEventListener('DOMContentLoaded', function () {
  const learnMoreButtons = document.querySelectorAll('.btn-learn-more');

  learnMoreButtons.forEach(button => {
    button.addEventListener('click', function () {
      const targetId = this.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        targetSection.classList.add('highlight');
        setTimeout(() => targetSection.classList.remove('highlight'), 2000);
      }
    });
  });
});
// ✅ Hide spinner after page fully loads
window.addEventListener('load', function () {
  const spinner = document.getElementById('spinner-overlay');
  if (spinner) {
    spinner.classList.add('spinner-hidden');
    setTimeout(() => spinner.remove(), 500); // Optional: remove from DOM after fade
  }
});
