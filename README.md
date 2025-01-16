🚑 Hospital Management System (HMS)
A comprehensive Hospital Management System (HMS) built using the MERN stack. The platform enables hospitals to streamline operations, manage appointments, process payments, and provide video consultations.

🚀 Start the Development Server

Backend:
npm start

Frontend:
npm run dev

## Project Setup

- npm install
- Set up environment variables                          

🛠 Technologies Used

Frontend:=
React.js: For building the user interface.
Axios: For API requests.
Ant Design: For components and responsive design.

Backend:=
Node.js: Backend runtime.
Express.js: Web framework.
Socket.IO: For real-time communication.
Database
MongoDB: NoSQL database for storing application data.
Payment Gateway
Razorpay: Secure payment processing.
Video Call
ZegoCloud: Real-time, high-quality video calling.


## Key Features

### All Usable Panels

1. **Admin Panel**:
   - Manage users (doctors, patients, receptionists).
   - Monitor hospital operations.
   - View and generate reports.
   - Manage appointments and schedules.

2. **Doctor Panel**:
   - View upcoming, past, and canceled appointments.
   - Access patient records and medical history.
   - Conduct video consultations using **ZegoCloud**.
   - Create prescriptions and teleconsultation notes.
   - Manage availability and holiday schedules.

3. **Patient Panel**:
   - Book and manage appointments.
   - Access medical records and prescriptions.
   - Join video consultations with doctors.
   - Make payments securely using Razorpay.
   - View appointment history and reminders.

4. **Receptionist Panel**:
   - Schedule appointments for patients.
   - Manage doctor and patient interactions.
   - Generate bills manually.
   - Maintain real-time updates on schedules.

### Payment Integration
- Integrated **Razorpay** for secure and seamless payment processing.

### Video Call Integration
- Powered by **ZegoCloud** for reliable, high-quality video calls between patients and doctors.  
- Key Features:
  - One-on-one video consultations.
  - Secure and HIPAA-compliant communication.
  - Easy integration with appointment scheduling.

### General Features
- Authentication and Role-Based Access Control (RBAC).
- Real-time notifications using **Socket.IO**.
- Teleconsultation support with prescription generation.
- Modular and reusable components for scalability.
- Comprehensive dashboard for admins and other roles.
- API-driven architecture with detailed documentation.

