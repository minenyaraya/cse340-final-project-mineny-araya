**Loan Neny – Mortgage Loan Application System**

Loan Neny is a server‑side rendered web application built for the CSE 340 Web Backend Development final project. The system allows users to apply for mortgage loans online and track their application status through a multi‑stage workflow. It supports loan applications for new construction homes, existing homes, and refinancing, while providing managers and admins with tools to review, approve, or deny applications.

The project demonstrates backend development concepts including authentication, authorization, MVC architecture, PostgreSQL integration, and secure session handling.

**Project Description**

Loan Neny is designed for individuals seeking mortgage financing. Users can create an account, submit a loan application, and follow its progress through several stages:

Pending – Application submitted
Under Review – A loan manager is evaluating the request
Approved – The loan has been accepted
Denied – The loan was not approved
Loan managers and admins can log into a secure dashboard to review applications, update statuses, and manage system content.

**Database Schema (ERD)**

The ERD will be added once the database structure is finalized.

**Expected tables:**

Users
Roles
Loan Applications
Loan Types
Status History

**User Roles**
**Admin**
* Full access to the system
* Manage users and roles
* View and manage all loan applications
* Edit loan types and system content

**Loan Manager**
* Review submitted loan applications
* Update application status (Pending → Under Review → Approved/Denied)
* Add notes or comments to applications

**Standard User**
* Create an account and log in
* Submit mortgage loan applications
* View the status of their applications
* Edit or delete their own applications (before review begins)

**Test Accounts**

All test accounts use the password: P@$$w0rd!

**Role And Email**

|Role | Email | 
|----------------|--------------------| 
| Admin | admin@example.com | 
| Loan Manager | manager@example.com| |
Standard User | user@example.com |

**Technology Stack**
* Node.js
* Express.js
* EJS (server‑side rendering)
* PostgreSQL
* express-session (session-based authentication)
* bcrypt (password hashing)
* ESM modules (no CommonJS)
* Deployed on Render

**Core Features**

**Authentication & Authorization**

* Secure session-based login
* Password hashing
* Role-based access control
* Protected routes for managers and admins

**MVC Architecture**

* Organized into Models, Views, and Controllers
* Reusable EJS layouts and partials
* Clean routing structure

**Multi‑Stage Workflow**

* Loan applications move through:
* Pending
* Under Review
* Approved or Denied

**Users can track their status at any time.**

**Admin & Manager Dashboard**

* View all loan applications
* Update statuses
* Manage loan types
* Moderate user submissions

**Deployment**

Deployment link will be added once the project is deployed on Render.

**Known Limitations**

* UI is functional but not fully styled
* No email notifications implemented
* No document uploads (paystubs, W‑2, etc.)
* Admin user management is basic

**Commit History**
The repository includes commits demonstrating development progress
