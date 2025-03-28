# Employwise

A user management application built with React.js and integrated with the Reqres API for authentication, user listing with pagination, and user editing & deletion.

## Features
- **User Authentication** (Login functionality using Reqres API)
- **User Management** (List users, edit user details, and delete users)
- **Pagination** (Fetch paginated user data from API)
- **Environment Variables** for API base URL
- **Responsive UI** built with React

## Tech Stack
- **Frontend:** React.js, Vite
- **Backend:** Reqres API (Mock API for testing)
- **State Management:** React Context API
- **HTTP Client:** Axios
- **Routing:** React Router DOM
- **Notifications:** React Hot Toast
- **Icons:** Lucide React

## Installation & Setup
1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-username/employwise.git
   cd employwise
   ```
2. **Install Dependencies**
   ```sh
   npm install vite@latest react-router-dom react-hot-toast lucide-react axios
   ```
3. **Setup Environment Variables**

   Create a `.env` file in the root directory and add:
   ```sh
     VITE_BASE_URL=https://reqres.in/api
   ```
5. **Run the Project Locally**
   ```sh
   npm run dev
   ```






