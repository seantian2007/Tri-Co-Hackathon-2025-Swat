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
    // Get accepted jobs (these are jobs the user took)
    const acceptedJobs = JSON.parse(localStorage.getItem('acceptedJobs') || '[]');
    
    // Get requested jobs (these are jobs the user posted)
    const requestedJobs = JSON.parse(localStorage.getItem('requestedJobs') || '[]');

    // For now, we'll consider accepted jobs as "delivered" if they have a timeFrame that has passed
    // In a real app, you'd have a separate "completed" status
    const now = new Date();
    const deliveredJobs = acceptedJobs.filter(job => {
        if (job.timeFrame && job.timeFrame.endDate && job.timeFrame.endTime) {
            try {
                const dueDate = new Date(`${job.timeFrame.endDate}T${job.timeFrame.endTime}`);
                return dueDate < now;
            } catch (e) {
                return false;
            }
        }
        return false;
    });

    // Count by service type (for requested jobs, use serviceType; for accepted, we'll need to infer or track)
    const deliveryCount = deliveredJobs.filter(job => {
        // Check if it's a delivery job (you might need to add serviceType to accepted jobs)
        return job.serviceType === 'delivery' || 
               (job.mission && job.mission.toLowerCase().includes('deliver'));
    }).length;

    const tutoringCount = deliveredJobs.filter(job => {
        return job.serviceType === 'tutoring' || 
               (job.mission && job.mission.toLowerCase().includes('tutor'));
    }).length;

    const movingCount = deliveredJobs.filter(job => {
        return job.serviceType === 'moving' || 
               (job.mission && job.mission.toLowerCase().includes('move') || 
                job.mission.toLowerCase().includes('transport'));
    }).length;

    // Update stats
    document.getElementById('total-completed').textContent = deliveredJobs.length;
    document.getElementById('total-requested').textContent = requestedJobs.length;
    document.getElementById('total-delivered').textContent = deliveredJobs.length;
    document.getElementById('delivery-count').textContent = deliveryCount;
    document.getElementById('tutoring-count').textContent = tutoringCount;
    document.getElementById('moving-count').textContent = movingCount;
}

// Language settings
const languageSelect = document.getElementById('language-select');
const savedLanguage = localStorage.getItem('language') || 'en';
languageSelect.value = savedLanguage;

languageSelect.addEventListener('change', function() {
    localStorage.setItem('language', this.value);
    // In a real app, you'd reload translations here
    alert('Language preference saved!');
});

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

// Initialize
loadUserInfo();
loadProfilePicture();
calculateStats();

