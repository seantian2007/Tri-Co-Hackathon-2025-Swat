// Get user info from localStorage or use defaults
function getUserInfo() {
    const stored = localStorage.getItem('userInfo');
    if (stored) {
        return JSON.parse(stored);
    }
    // Default values - in a real app, this would come from authentication
    return {
        name: 'User Name',
        email: 'user@swarthmore.edu'
    };
}

// Save user info
function saveUserInfo(userInfo) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

// Load user info
function loadUserInfo() {
    const userInfo = getUserInfo();
    document.getElementById('profile-name').textContent = userInfo.name;
    document.getElementById('profile-email').textContent = userInfo.email;
}

// Load profile picture
function loadProfilePicture() {
    const picture = localStorage.getItem('profilePicture');
    if (picture) {
        document.getElementById('profile-image').src = picture;
        document.getElementById('profile-image').style.display = 'block';
        document.getElementById('profile-placeholder').style.display = 'none';
    }
}

// Handle profile picture upload
document.getElementById('profile-picture-input').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageData = event.target.result;
            localStorage.setItem('profilePicture', imageData);
            document.getElementById('profile-image').src = imageData;
            document.getElementById('profile-image').style.display = 'block';
            document.getElementById('profile-placeholder').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

// Calculate stats
function calculateStats() {
    // Get all accepted jobs (including completed)
    const allAcceptedJobs = JSON.parse(localStorage.getItem('acceptedJobs') || '[]');
    
    // Get all requested jobs (including completed)
    const allRequestedJobs = JSON.parse(localStorage.getItem('requestedJobs') || '[]');

    // Count completed jobs (both accepted and requested)
    const completedAcceptedJobs = allAcceptedJobs.filter(job => job.completed === true);
    const completedRequestedJobs = allRequestedJobs.filter(job => job.completed === true);
    const totalCompleted = completedAcceptedJobs.length + completedRequestedJobs.length;

    // Count by service type for completed jobs (both accepted and requested)
    const allCompletedJobs = [...completedAcceptedJobs, ...completedRequestedJobs];
    
    const deliveryCount = allCompletedJobs.filter(job => {
        return job.serviceType === 'delivery' || 
               (job.mission && job.mission.toLowerCase().includes('deliver'));
    }).length;

    const tutoringCount = allCompletedJobs.filter(job => {
        return job.serviceType === 'tutoring' || 
               (job.mission && job.mission.toLowerCase().includes('tutor'));
    }).length;

    const movingCount = allCompletedJobs.filter(job => {
        return job.serviceType === 'moving' || 
               (job.mission && (job.mission.toLowerCase().includes('move') || 
                job.mission.toLowerCase().includes('transport')));
    }).length;

    // Update stats
    document.getElementById('total-completed').textContent = totalCompleted;
    document.getElementById('total-requested').textContent = allRequestedJobs.length;
    document.getElementById('total-delivered').textContent = completedAcceptedJobs.length;
    document.getElementById('delivery-count').textContent = deliveryCount;
    document.getElementById('tutoring-count').textContent = tutoringCount;
    document.getElementById('moving-count').textContent = movingCount;
}

// Export function to be called from other pages
if (typeof window !== 'undefined') {
    window.updateProfileStats = calculateStats;
}

// Language settings
const languageSelect = document.getElementById('language-select');
if (languageSelect) {
    const savedLanguage = localStorage.getItem('language') || 'en';
    languageSelect.value = savedLanguage;

    languageSelect.addEventListener('change', function() {
        if (window.Settings) {
            window.Settings.setLanguage(this.value);
        } else {
            localStorage.setItem('language', this.value);
            window.location.reload();
        }
    });
}

// Font size settings
const fontSizeInput = document.getElementById('font-size-input');
const savedFontSize = localStorage.getItem('fontSize') || '16';
fontSizeInput.value = savedFontSize;
document.body.style.fontSize = savedFontSize + 'px';

fontSizeInput.addEventListener('change', function() {
    const size = this.value;
    localStorage.setItem('fontSize', size);
    document.body.style.fontSize = size + 'px';
});

// Logout functionality
document.getElementById('logout-button').addEventListener('click', function() {
    // Clear all user data from localStorage
    localStorage.removeItem('userInfo');
    localStorage.removeItem('profilePicture');
    localStorage.removeItem('acceptedJobs');
    localStorage.removeItem('requestedJobs');
    localStorage.removeItem('language');
    localStorage.removeItem('fontSize');
    
    // Redirect to sign-in page
    window.location.href = 'index.html';
});

// Initialize
loadUserInfo();
loadProfilePicture();
calculateStats();

