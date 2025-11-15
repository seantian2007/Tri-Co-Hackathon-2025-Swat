// Convert requested jobs to feed format
function convertRequestedJobsToFeedFormat() {
    const requestedJobs = JSON.parse(localStorage.getItem('requestedJobs') || '[]');
    const feedJobs = [];
    let maxId = 100; // Start IDs higher than sample jobs

    requestedJobs.forEach((request, index) => {
        // Format time from timeFrame
        let timeString = 'Not specified';
        if (request.timeFrame) {
            const startDate = new Date(`${request.timeFrame.startDate}T${request.timeFrame.startTime}`);
            const endDate = new Date(`${request.timeFrame.endDate}T${request.timeFrame.endTime}`);
            
            if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
                const startTime = startDate.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                });
                const endTime = endDate.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                });
                timeString = `${startTime} - ${endTime}`;
            }
        }

        // Create mission from service type and destination
        const mission = `${request.serviceType.charAt(0).toUpperCase() + request.serviceType.slice(1)}: ${request.destination}`;

        feedJobs.push({
            id: maxId + index,
            college: request.college || 'swarthmore',
            collegeName: request.collegeName || 'Swarthmore',
            mission: mission,
            destination: request.destination,
            price: `${request.fee} Swat Point${parseInt(request.fee) !== 1 ? 's' : ''}`,
            time: timeString,
            description: request.moreDetails || `Service type: ${request.serviceType}. Destination: ${request.destination}.`,
            serviceType: request.serviceType // Preserve serviceType for stats
        });
    });

    return feedJobs;
}

// Sample job data
const sampleJobs = [
    {
        id: 1,
        college: 'swarthmore',
        collegeName: 'Swarthmore',
        mission: 'Pick up package from bookstore',
        destination: 'McCabe Library, Swarthmore College',
        price: '15 Swat Points',
        time: '2:00 PM - 3:00 PM',
        description: 'Need someone to pick up a textbook order from the bookstore and deliver it to McCabe Library. The package is ready for pickup. Please bring a valid ID.'
    },
    {
        id: 2,
        college: 'haverford',
        collegeName: 'Haverford',
        mission: 'Deliver documents to registrar',
        destination: 'Registrar Office, Haverford College',
        price: '10 Swat Points',
        time: '9:00 AM - 11:00 AM',
        description: 'Urgent delivery of signed forms to the registrar office. Documents are in a sealed envelope. Must be delivered before 11 AM.'
    },
    {
        id: 3,
        college: 'brynmawr',
        collegeName: 'Bryn Mawr',
        mission: 'Food delivery from dining hall',
        destination: 'Pembroke Hall, Bryn Mawr College',
        price: '12 Swat Points',
        time: '12:00 PM - 1:00 PM',
        description: 'Pick up lunch order from the dining hall and deliver to Pembroke Hall. Order includes vegetarian options. Contact person will meet you at the entrance.'
    },
    {
        id: 4,
        college: 'swarthmore',
        collegeName: 'Swarthmore',
        mission: 'Library book return',
        destination: 'Cornell Library, Swarthmore College',
        price: '8 Swat Points',
        time: '4:00 PM - 5:00 PM',
        description: 'Return three library books to the circulation desk. Books are due today. Please get a receipt as confirmation.'
    },
    {
        id: 5,
        college: 'haverford',
        collegeName: 'Haverford',
        mission: 'Campus mail pickup',
        destination: 'Student Mail Center, Haverford College',
        price: '7 Swat Points',
        time: '10:00 AM - 12:00 PM',
        description: 'Pick up mail from the student mail center and deliver to dormitory. Multiple packages expected. Will provide mailbox number upon acceptance.'
    },
    {
        id: 6,
        college: 'brynmawr',
        collegeName: 'Bryn Mawr',
        mission: 'Lab equipment transport',
        destination: 'Park Science Building, Bryn Mawr College',
        price: '20 Swat Points',
        time: '1:00 PM - 2:30 PM',
        description: 'Transport delicate lab equipment from one building to another. Equipment is already packaged. Handle with care. Cart will be provided.'
    },
    {
        id: 7,
        college: 'swarthmore',
        collegeName: 'Swarthmore',
        mission: 'Coffee delivery',
        destination: 'Kohlberg Hall, Swarthmore College',
        price: '5 Swat Points',
        time: '8:30 AM - 9:00 AM',
        description: 'Pick up coffee order from local café and deliver to professor\'s office. Order includes 4 drinks. Building access code will be provided.'
    },
    {
        id: 8,
        college: 'haverford',
        collegeName: 'Haverford',
        mission: 'Event setup materials',
        destination: 'Sharpless Auditorium, Haverford College',
        price: '18 Swat Points',
        time: '3:00 PM - 4:00 PM',
        description: 'Help transport event setup materials from storage to auditorium. Includes tables, chairs, and decorations. Multiple trips may be needed.'
    }
];

// Get user's college from localStorage
function getUserCollege() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    return userInfo.college || 'swarthmore'; // Default to swarthmore if not set
}

// Filter jobs by user's college
function filterJobsByCollege(allJobs) {
    const userCollege = getUserCollege();
    return allJobs.filter(job => job.college === userCollege);
}

// Merge sample jobs with requested jobs from localStorage
const requestedJobs = convertRequestedJobsToFeedFormat();
const allJobs = [...sampleJobs, ...requestedJobs];
const jobs = filterJobsByCollege(allJobs);

let currentJobId = null;

// Render jobs
function renderJobs() {
    const container = document.getElementById('jobs-container');
    container.innerHTML = '';

    // Re-filter jobs in case user info changed
    const filteredJobs = filterJobsByCollege(allJobs);

    if (filteredJobs.length === 0) {
        container.innerHTML = `
            <div class="job-card" style="text-align: center; padding: 48px 24px;">
                <div style="font-size: 16px; color: rgba(0, 0, 0, 0.54);">
                    No jobs available for your school at this time.
                </div>
            </div>
        `;
        return;
    }

    filteredJobs.forEach(job => {
        const jobCard = document.createElement('article');
        jobCard.className = 'job-card';
        jobCard.setAttribute('role', 'listitem');
        jobCard.setAttribute('aria-label', `Job: ${job.mission}`);
        jobCard.setAttribute('tabindex', '0');
        jobCard.onclick = () => openModal(job.id);
        jobCard.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(job.id);
            }
        };

        jobCard.innerHTML = `
            <div class="job-college college-${job.college}">${job.collegeName}</div>
            <div class="job-mission">${job.mission}</div>
            <div class="job-detail-row">
                <svg class="job-detail-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>${job.destination}</span>
            </div>
            <div class="job-detail-row">
                <svg class="job-detail-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
                <span>${job.time}</span>
            </div>
            <div class="job-price">${job.price}</div>
        `;

        container.appendChild(jobCard);
        
        // Apply translations to dynamically created content
        if (window.Settings) {
            window.Settings.applyLanguage();
        }
    });
}

// Open modal with job details
function openModal(jobId) {
    const filteredJobs = filterJobsByCollege(allJobs);
    const job = filteredJobs.find(j => j.id === jobId);
    if (!job) return;

    currentJobId = jobId;
    const modal = document.getElementById('job-modal');
    
    document.getElementById('modal-college').textContent = job.collegeName;
    document.getElementById('modal-college').className = `job-college college-${job.college}`;
    document.getElementById('modal-title').textContent = job.mission;
    document.getElementById('modal-mission').textContent = job.mission;
    document.getElementById('modal-destination').textContent = job.destination;
    document.getElementById('modal-time').textContent = job.time;
    document.getElementById('modal-price').textContent = job.price;
    document.getElementById('modal-description').textContent = job.description;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus on modal close button for accessibility
    setTimeout(() => {
        const closeButton = modal.querySelector('.modal-close');
        if (closeButton) closeButton.focus();
    }, 100);
}

// Close modal
function closeModal() {
    const modal = document.getElementById('job-modal');
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    currentJobId = null;
}

// Take job
function takeJob() {
    if (!currentJobId) return;

    const filteredJobs = filterJobsByCollege(allJobs);
    const job = filteredJobs.find(j => j.id === currentJobId);
    if (job) {
        // Save to localStorage
        const acceptedJob = {
            ...job,
            acceptedAt: new Date().toISOString(),
            // Preserve serviceType if it exists (from requested jobs)
            serviceType: job.serviceType || null
        };
        
        const acceptedJobs = getAcceptedJobs();
        acceptedJobs.push(acceptedJob);
        localStorage.setItem('acceptedJobs', JSON.stringify(acceptedJobs));
        
        // Show success animation
        showJobAcceptedAnimation(job.mission);
        
        // Remove job from allJobs list (in a real app, this would update the backend)
        const index = allJobs.findIndex(j => j.id === currentJobId);
        if (index > -1) {
            allJobs.splice(index, 1);
            renderJobs();
        }
        
        closeModal();
    }
}

// Get accepted jobs from localStorage
function getAcceptedJobs() {
    const stored = localStorage.getItem('acceptedJobs');
    return stored ? JSON.parse(stored) : [];
}

// Show success animation when job is accepted
function showJobAcceptedAnimation(jobMission) {
    // Create success notification element
    const notification = document.createElement('div');
    notification.className = 'job-accepted-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">✓</div>
            <div class="notification-text">
                <div class="notification-title">Job Accepted!</div>
                <div class="notification-message">${jobMission}</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after animation completes
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Close modal when clicking outside
document.getElementById('job-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Initialize
renderJobs();

