// Get accepted jobs from localStorage
function getAcceptedJobs() {
    const stored = localStorage.getItem('acceptedJobs');
    return stored ? JSON.parse(stored) : [];
}

// Get requested jobs from localStorage
function getRequestedJobs() {
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
    jobs.forEach(job => {
        const card = document.createElement('div');
        card.className = 'order-card';

        const timeElapsed = getTimeElapsed(job.acceptedAt);
        const dueInfo = job.timeFrame ? 
            getTimeUntilDue(job.timeFrame.endDate, job.timeFrame.endTime) : null;

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
        `;

        container.appendChild(card);
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
    jobs.forEach(job => {
        const card = document.createElement('div');
        card.className = 'order-card';

        const timeFrame = job.timeFrame ? 
            `${job.timeFrame.startDate} ${job.timeFrame.startTime} - ${job.timeFrame.endDate} ${job.timeFrame.endTime}` : 
            'Not specified';

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
        `;

        container.appendChild(card);
    });
}

// Initialize
renderAcceptedJobs();
renderRequestedJobs();

