// Populate fee dropdown (2-20 Swat Points)
const feeSelect = document.getElementById('fee');
for (let i = 2; i <= 20; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${i} Swat Point${i !== 1 ? 's' : ''}`;
    feeSelect.appendChild(option);
}

// Form validation
const form = document.getElementById('request-form');
const requiredFields = {
    'service-type': document.getElementById('service-type-group'),
    'fee': document.getElementById('fee-group'),
    'destination': document.getElementById('destination-group'),
    'start-date': document.getElementById('timeframe-group'),
    'start-time': document.getElementById('timeframe-group'),
    'end-date': document.getElementById('timeframe-group'),
    'end-time': document.getElementById('timeframe-group')
};

function validateField(fieldId) {
    const field = document.getElementById(fieldId);
    const group = requiredFields[fieldId];
    
    if (!field || !group) return true;

    if (fieldId.startsWith('start-') || fieldId.startsWith('end-')) {
        // Validate time frame as a group
        const startDate = document.getElementById('start-date').value;
        const startTime = document.getElementById('start-time').value;
        const endDate = document.getElementById('end-date').value;
        const endTime = document.getElementById('end-time').value;

        if (!startDate || !endDate  ) {
            group.classList.add('error');
            return false;
        }

        // Check if end is after start
        const start = new Date(`${startDate}T${startTime}`);
        const end = new Date(`${endDate}T${endTime}`);

        if (end <= start) {
            group.classList.add('error');
            group.querySelector('.error-message').textContent = 'End time must be after start time';
            return false;
        }

        group.classList.remove('error');
        return true;
    }

    if (field.hasAttribute('required') && !field.value.trim()) {
        group.classList.add('error');
        return false;
    }

    // Special validation for fee (minimum 2)
    if (fieldId === 'fee' && field.value) {
        const feeValue = parseInt(field.value);
        if (feeValue < 2) {
            group.classList.add('error');
            return false;
        }
    }

    group.classList.remove('error');
    return true;
}

// Add college to required fields
requiredFields['college'] = document.getElementById('college-group');

// Real-time validation
Object.keys(requiredFields).forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
        field.addEventListener('blur', () => validateField(fieldId));
        field.addEventListener('change', () => validateField(fieldId));
    }
});

// Validate time frame fields together
['start-date', 'start-time', 'end-date', 'end-time'].forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
        field.addEventListener('change', () => {
            validateField('start-date');
        });
    }
});

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate all required fields
    let isValid = true;
    Object.keys(requiredFields).forEach(fieldId => {
        if (!validateField(fieldId)) {
            isValid = false;
        }
    });

    if (!isValid) {
        // Scroll to first error
        const firstError = document.querySelector('.form-group.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }

    // Collect form data
    const collegeValue = document.getElementById('college').value;
    const collegeNames = {
        'swarthmore': 'Swarthmore',
        'haverford': 'Haverford',
        'brynmawr': 'Bryn Mawr'
    };

    const formData = {
        serviceType: document.getElementById('service-type').value,
        fee: document.getElementById('fee').value,
        college: collegeValue,
        collegeName: collegeNames[collegeValue],
        destination: document.getElementById('destination').value,
        timeFrame: {
            startDate: document.getElementById('start-date').value,
            startTime: document.getElementById('start-time').value,
            endDate: document.getElementById('end-date').value,
            endTime: document.getElementById('end-time').value
        },
        moreDetails: document.getElementById('more-details').value,
        requestedAt: new Date().toISOString()
    };

    // Save to localStorage
    const requestedJobs = getRequestedJobs();
    requestedJobs.push(formData);
    localStorage.setItem('requestedJobs', JSON.stringify(requestedJobs));

    // Here you would typically send this to your backend
    console.log('Request submitted:', formData);

    // Show success animation
    showRequestSubmittedAnimation();

    // Reset form
    form.reset();

    // Optionally redirect to feed
    // window.location.href = 'feed.html';
});

// Get requested jobs from localStorage
function getRequestedJobs() {
    const stored = localStorage.getItem('requestedJobs');
    return stored ? JSON.parse(stored) : [];
}

// Show success animation when request is submitted
function showRequestSubmittedAnimation() {
    const notification = document.createElement('div');
    notification.className = 'request-submitted-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">✓</div>
            <div class="notification-text">
                <div class="notification-title">Request Submitted!</div>
                <div class="notification-message">Your job request has been posted to the feed.</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 2500);
}

// Set minimum date to today (wait for DOM to be ready)
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    
    if (startDateInput) {
        startDateInput.setAttribute('min', today);
    }
    if (endDateInput) {
        endDateInput.setAttribute('min', today);
    }
});

// Also set immediately in case DOM is already loaded
const today = new Date().toISOString().split('T')[0];
const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');

if (startDateInput) {
    startDateInput.setAttribute('min', today);
}
if (endDateInput) {
    endDateInput.setAttribute('min', today);
}

