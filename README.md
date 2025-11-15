# 🐝 The Hive - Tri-Co Hackathon 2025 🐝

**The Hive** is a service marketplace platform connecting students within their own college. Students can request services (delivery, tutoring, moving, etc.) and accept jobs from their peers, fostering a collaborative community economy.

---

## Team Members

- Sean Tian, Swarthmore College
- Sean Zhu, Swarthmore College
- Thomas Bundy, Swarthmore College
- Alex Lyu, Swarthmore College

---

## Project Description

### Problem Statement

Students within the college community often need assistance with various tasks—from food delivery to tutoring to moving help. However, there's no centralized platform that connects students who need help with those willing to provide services. This creates a gap in peer-to-peer service exchange within the college community.

### Solution

**The Hive** addresses this gap by providing a user-friendly, web-based marketplace where:
- Students can **request** services they need (delivery, tutoring, moving, etc.)
- Students can **browse and accept** available jobs from peers
- The platform uses a point-based system (e.g."Swat Points") for transactions
- All interactions are limited to verified college email addresses


### Intended Users

**Any Student**

---

#### Core Functionality
- ✅ **User Authentication**: Sign in with college email addresses
- ✅ **Job Feed**: Browse available jobs posted by other students
- ✅ **Job Acceptance**: Accept jobs from the feed with visual confirmation animations
- ✅ **Job Requesting**: Create and post new service requests
- ✅ **Order Management**: View accepted and requested jobs in "My Orders"
- ✅ **Order Completion**: Mark orders as complete (removes from active view)
- ✅ **Profile Statistics**: Track completed orders, requested orders, and delivered orders
- ✅ **Statistics by Type**: Breakdown of completed orders by service type (Delivery, Tutoring, Others)
- ✅ **Local Storage**: All data persists using browser localStorage

#### User Experience Features
- ✅ **The Hive Theme**: Beautiful bee/honeycomb-themed design with hexagonal patterns
- ✅ **Visual Animations**: Custom animations for job acceptance, order completion, and request submission
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile devices
- ✅ **Web Accessibility**: ARIA labels, keyboard navigation, skip links, and focus indicators
- ✅ **Multi-language Support**: English, Spanish, French, and Chinese translations
- ✅ **Font Size Adjustment**: Slider to adjust font size across the entire website


### Features to Implement (Future Work)

- 🔲 **Backend Integration**: Connect to a real database and authentication system
- 🔲 **Real-time Messaging**: WebSocket-based messaging instead of localStorage
- 🔲 **Payment System**: Integration with actual payment processing
- 🔲 **Rating System**: Allow users to rate completed services
- 🔲 **Notifications**: Push notifications for new jobs and messages
- 🔲 **Search and Filter**: Advanced filtering by service type, college, price range
- 🔲 **User Profiles**: Detailed user profiles with history and ratings
- 🔲 **Email Verification**: Actual email verification for sign-up
- 🔲 **Password Recovery**: Forgot password functionality
- 🔲 **Admin Dashboard**: For managing jobs and users

---

## Project Structure

```
Tri-Co-Hackathon-2025-Swat/
├── codebase/
│   ├── html/          
│   ├── css/           
│   └── scripts/       
├── assets/            
└── README.md          
```


## Presentation

https://docs.google.com/presentation/d/1bhgJ6C0O76cG4eNa5Zip8DvMHc5f1PwG1be5tVRc7OI/edit?usp=sharing

---

## License

This repository includes an [unlicense](http://unlicense.org/) statement. 
---

## Acknowledgments

- Tri-College Consortium for the hackathon opportunity
- All contributors and testers

---

*Built with 🐝 for the Tri-College community*
