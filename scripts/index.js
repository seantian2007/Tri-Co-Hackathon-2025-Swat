// Floating label animation
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const emailGroup = emailInput.closest('.form-group');
const passwordGroup = passwordInput.closest('.form-group');

// Check if inputs have values on load
if (emailInput.value) {
    emailGroup.classList.add('has-value');
}
if (passwordInput.value) {
    passwordGroup.classList.add('has-value');
}

// Add has-value class when input has value
emailInput.addEventListener('input', function() {
    if (this.value) {
        emailGroup.classList.add('has-value');
    } else {
        emailGroup.classList.remove('has-value');
    }
});

passwordInput.addEventListener('input', function() {
    if (this.value) {
        passwordGroup.classList.add('has-value');
    } else {
        passwordGroup.classList.remove('has-value');
    }
});

// Ripple effect on button click
const signinButton = document.getElementById('signin-button');

signinButton.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// Form submission
document.getElementById('signin-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value;
    const domain = document.getElementById('domain-select').value;
    const password = passwordInput.value;
    const fullEmail = email + domain;
    
    // Extract college from domain
    const collegeMap = {
        '@swarthmore.edu': { college: 'swarthmore', collegeName: 'Swarthmore' },
        '@haverford.edu': { college: 'haverford', collegeName: 'Haverford' },
        '@brynmawr.edu': { college: 'brynmawr', collegeName: 'Bryn Mawr' }
    };
    const collegeInfo = collegeMap[domain] || { college: 'swarthmore', collegeName: 'Swarthmore' };
    
    // Save user info to localStorage
    const userInfo = {
        name: email.charAt(0).toUpperCase() + email.slice(1) || 'User',
        email: fullEmail,
        college: collegeInfo.college,
        collegeName: collegeInfo.collegeName
    };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    
    // Here you would typically send this to your backend
    console.log('Sign in attempt:', {
        email: fullEmail,
        password: password
    });
    
    // Navigate to feed page
    window.location.href = 'feed.html';
});

// Focus animations
const inputs = [emailInput, passwordInput];
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.closest('.form-group').classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.closest('.form-group').classList.remove('focused');
    });
});

