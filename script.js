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

// ✅ CONTACT FORM HANDLING WITH DATABASE
document.addEventListener('DOMContentLoaded', function () {
  // Find all contact forms (main contact form and quick contact forms)
  const contactForms = document.querySelectorAll('#contactForm, .quick-contact-form');
  
  contactForms.forEach((form, index) => {
    // Give unique IDs to avoid conflicts
    if (!form.id) {
      form.id = `contactForm${index}`;
    }
    
    // Add unique IDs to form elements within this form
    const formMessage = form.querySelector('[id="formMessage"]') || form.querySelector('.form-message');
    const submitBtn = form.querySelector('[id="submitBtn"]') || form.querySelector('button[type="submit"]');
    
    if (formMessage && !formMessage.id.includes(index)) {
      formMessage.id = `formMessage${index}`;
    }
    if (submitBtn && !submitBtn.id.includes(index)) {
      submitBtn.id = `submitBtn${index}`;
    }
    
    form.addEventListener('submit', (e) => handleContactForm(e, form));
  });
});

function handleContactForm(e, form) {
  e.preventDefault();
  
  const submitBtn = form.querySelector('button[type="submit"]');
  const formMessage = form.querySelector('[id*="formMessage"]') || form.querySelector('.form-message');
  
  // Show loading state
  submitBtn.disabled = true;
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = 'Sending...';
  
  if (formMessage) {
    formMessage.innerHTML = '';
  }
  
  // Get form data
  const formData = {
    firstName: form.firstName.value.trim(),
    lastName: form.lastName.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim()
  };
  
  // Validate required fields
  if (!formData.firstName || !formData.lastName || !formData.email) {
    showFormError('Please fill out all required fields.', formMessage);
    resetSubmitButton(submitBtn, originalText);
    return;
  }
  
  // Check if we're running with database server or simple server
  fetch('/submit-contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else if (response.status === 404) {
      // Database server not running, fallback to email
      fallbackToEmail(formData);
      showFormSuccess('Form submitted! Your email client should open.', formMessage);
      form.reset();
      return { success: true };
    } else {
      throw new Error('Server error');
    }
  })
  .then(data => {
    if (data && data.success) {
      showFormSuccess(data.message || 'Thank you! Your message has been saved successfully.', formMessage);
      form.reset();
    } else if (data && !data.success) {
      showFormError(data.message || 'Something went wrong. Please try again.', formMessage);
    }
  })
  .catch(error => {
    console.log('Database server not available, using email fallback');
    fallbackToEmail(formData);
    showFormSuccess('Form submitted! Your email client should open.', formMessage);
    form.reset();
  })
  .finally(() => {
    resetSubmitButton(submitBtn, originalText);
  });
}

function fallbackToEmail(formData) {
  const subject = `Contact Form Submission from ${formData.firstName} ${formData.lastName}`;
  const body = `Name: ${formData.firstName} ${formData.lastName}%0D%0AEmail: ${formData.email}%0D%0AMessage: ${formData.message}`;
  const mailtoLink = `mailto:info@navamya.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  window.location.href = mailtoLink;
}

function resetSubmitButton(submitBtn, originalText) {
  submitBtn.disabled = false;
  submitBtn.innerHTML = originalText;
}

function showFormSuccess(message, formMessage) {
  if (!formMessage) return;
  formMessage.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>Success!</strong> ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
}

function showFormError(message, formMessage) {
  if (!formMessage) return;
  formMessage.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Error!</strong> ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
}
