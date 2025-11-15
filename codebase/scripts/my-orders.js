// Get accepted jobs from localStorage (excluding completed ones)
function getAcceptedJobs() {
    const stored = localStorage.getItem('acceptedJobs');
    const jobs = stored ? JSON.parse(stored) : [];
    return jobs.filter(job => !job.completed);
}

// Get requested jobs from localStorage (excluding completed ones)
function getRequestedJobs() {
    const stored = localStorage.getItem('requestedJobs');
    const jobs = stored ? JSON.parse(stored) : [];
    return jobs.filter(job => !job.completed);
}

// Get all accepted jobs (including completed)
function getAllAcceptedJobs() {
    const stored = localStorage.getItem('acceptedJobs');
    return stored ? JSON.parse(stored) : [];
}

// Get all requested jobs (including completed)
function getAllRequestedJobs() {
    const stored = localStorage.getItem('requestedJobs');
    return stored ? JSON.parse(stored) : [];
}

// Format time elapsed
function getTimeElapsed(acceptedAt) {
    const now = new Date();
    const accepted = new Date(acceptedAt);
    const diffMs = now - accepted;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
        return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
        return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
}

// Format due time
function getDueTime(timeString) {
    // Parse time string like "2:00 PM - 3:00 PM" or use date/time from request
    return timeString || 'Not specified';
}

// Get time until due
function getTimeUntilDue(dueDate, dueTime) {
    if (!dueDate || !dueTime) return null;
    
    try {
        const due = new Date(`${dueDate}T${dueTime}`);
        const now = new Date();
        const diffMs = due - now;
        
        if (diffMs < 0) {
            return { text: 'Overdue', urgent: true };
        }
        
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) {
            return { text: `Due in ${diffMins} minute${diffMins !== 1 ? 's' : ''}`, urgent: true };
        } else if (diffHours < 24) {
            return { text: `Due in ${diffHours} hour${diffHours !== 1 ? 's' : ''}`, urgent: true };
        } else if (diffDays < 3) {
            return { text: `Due in ${diffDays} day${diffDays !== 1 ? 's' : ''}`, urgent: false, warning: true };
        } else {
            return { text: `Due in ${diffDays} day${diffDays !== 1 ? 's' : ''}`, urgent: false };
        }
    } catch (e) {
        return null;
    }
}

// Render accepted jobs
function renderAcceptedJobs() {
    const container = document.getElementById('accepted-jobs-container');
    const jobs = getAcceptedJobs();

    if (jobs.length === 0) {
        container.innerHTML = `
            <div class="order-card empty">
                <div class="empty-message">No orders available!</div>
            </div>
        `;
        return;
    }

    container.innerHTML = '';
    jobs.forEach((job, index) => {
        const card = document.createElement('article');
        card.className = 'order-card';
        card.setAttribute('role', 'listitem');
        card.setAttribute('aria-label', `Accepted job: ${job.mission}`);

        const timeElapsed = getTimeElapsed(job.acceptedAt);
        const dueInfo = job.timeFrame ? 
            getTimeUntilDue(job.timeFrame.endDate, job.timeFrame.endTime) : null;
        
        // Create a unique identifier for the job
        const jobIdentifier = job.id || job.acceptedAt || `accepted-${index}`;

        card.innerHTML = `
            <div class="job-college college-${job.college}">${job.collegeName}</div>
            <div class="order-mission">${job.mission}</div>
            <div class="order-detail-row">
                <span class="order-detail-label">Destination:</span>
                <span class="order-detail-value">${job.destination}</span>
            </div>
            <div class="order-detail-row">
                <span class="order-detail-label">Time Frame:</span>
                <span class="order-detail-value">${job.time || 'Not specified'}</span>
            </div>
            <div class="order-price">${job.price}</span>
            <div class="time-info">
                <div class="time-item">
                    <span class="time-label">Accepted:</span>
                    <span class="time-value">${timeElapsed}</span>
                </div>
                ${dueInfo ? `
                    <div class="time-item">
                        <span class="time-label">Due:</span>
                        <span class="time-value ${dueInfo.urgent ? 'urgent' : dueInfo.warning ? 'warning' : ''}">${dueInfo.text}</span>
                    </div>
                ` : ''}
            </div>
            ${job.description ? `
                <div class="order-detail-row" style="margin-top: 12px;">
                    <span class="order-detail-label">Description:</span>
                    <span class="order-detail-value">${job.description}</span>
                </div>
            ` : ''}
            <div class="order-actions">
                <button class="btn btn-complete" onclick="completeAcceptedJob('${jobIdentifier}')" aria-label="Mark this accepted order as complete" data-i18n="orders.completeOrder">
                    ${window.Settings ? window.Settings.t('orders.completeOrder') : 'Complete Order'}
                </button>
            </div>
        `;

        container.appendChild(card);
        
        // Apply translations to dynamically created content
        if (window.Settings) {
            window.Settings.applyLanguage();
        }
    });
}

// Render requested jobs
function renderRequestedJobs() {
    const container = document.getElementById('requested-jobs-container');
    const jobs = getRequestedJobs();

    if (jobs.length === 0) {
        container.innerHTML = `
            <div class="order-card empty">
                <div class="empty-message">No orders available!</div>
            </div>
        `;
        return;
    }

    container.innerHTML = '';
    jobs.forEach((job, index) => {
        const card = document.createElement('article');
        card.className = 'order-card';
        card.setAttribute('role', 'listitem');
        card.setAttribute('aria-label', `Requested job: ${job.destination}`);

        const timeFrame = job.timeFrame ? 
            `${job.timeFrame.startDate} ${job.timeFrame.startTime} - ${job.timeFrame.endDate} ${job.timeFrame.endTime}` : 
            'Not specified';

        // Create a unique ID for requested jobs if they don't have one
        const jobId = job.id || `requested-${job.destination}-${job.timeFrame?.startDate || index}`;
        
        card.innerHTML = `
            <div class="service-type-badge">${job.serviceType}</div>
            <div class="order-mission">Request: ${job.destination}</div>
            <div class="order-detail-row">
                <span class="order-detail-label">Service Type:</span>
                <span class="order-detail-value">${job.serviceType}</span>
            </div>
            <div class="order-detail-row">
                <span class="order-detail-label">Destination:</span>
                <span class="order-detail-value">${job.destination}</span>
            </div>
            <div class="order-detail-row">
                <span class="order-detail-label">Time Frame:</span>
                <span class="order-detail-value">${timeFrame}</span>
            </div>
            <div class="order-price">${job.fee} Swat Point${parseInt(job.fee) !== 1 ? 's' : ''}</div>
            ${job.moreDetails ? `
                <div class="order-detail-row" style="margin-top: 12px;">
                    <span class="order-detail-label">Details:</span>
                    <span class="order-detail-value">${job.moreDetails}</span>
                </div>
            ` : ''}
            <div class="order-actions">
                <button class="btn btn-complete" onclick="completeRequestedJob('${jobId}')" aria-label="Mark this requested order as complete" data-i18n="orders.completeOrder">
                    ${window.Settings ? window.Settings.t('orders.completeOrder') : 'Complete Order'}
                </button>
            </div>
        `;

        container.appendChild(card);
        
        // Apply translations to dynamically created content
        if (window.Settings) {
            window.Settings.applyLanguage();
        }
    });
}

// Complete an accepted job
function completeAcceptedJob(jobIdentifier) {
    const allJobs = getAllAcceptedJobs();
    const jobIndex = allJobs.findIndex(job => {
        // Match by ID or acceptedAt timestamp
        return (job.id && job.id.toString() === jobIdentifier) || 
               (job.acceptedAt && job.acceptedAt === jobIdentifier);
    });
    
    if (jobIndex > -1) {
        allJobs[jobIndex].completed = true;
        allJobs[jobIndex].completedAt = new Date().toISOString();
        localStorage.setItem('acceptedJobs', JSON.stringify(allJobs));
        
        // Show success animation
        showOrderCompletedAnimation();
        
        // Update profile stats if function exists
        if (typeof window.updateProfileStats === 'function') {
            window.updateProfileStats();
        }
        
        // Re-render to remove completed job
        renderAcceptedJobs();
    }
}

// Complete a requested job
function completeRequestedJob(jobId) {
    const allJobs = getAllRequestedJobs();
    const jobIndex = allJobs.findIndex((job, index) => {
        const currentId = job.id || `requested-${job.destination}-${job.timeFrame?.startDate || index}`;
        return currentId === jobId;
    });
    
    if (jobIndex > -1) {
        allJobs[jobIndex].completed = true;
        allJobs[jobIndex].completedAt = new Date().toISOString();
        localStorage.setItem('requestedJobs', JSON.stringify(allJobs));
        
        // Show success animation
        showOrderCompletedAnimation();
        
        // Update profile stats if function exists
        if (typeof window.updateProfileStats === 'function') {
            window.updateProfileStats();
        }
        
        // Re-render to remove completed job
        renderRequestedJobs();
    }
}

// Show success animation when order is completed
function showOrderCompletedAnimation() {
    const notification = document.createElement('div');
    notification.className = 'order-completed-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">✓</div>
            <div class="notification-text">
                <div class="notification-title">Order Completed!</div>
                <div class="notification-message">The order has been removed from your list.</div>
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

// Initialize
renderAcceptedJobs();
renderRequestedJobs();

