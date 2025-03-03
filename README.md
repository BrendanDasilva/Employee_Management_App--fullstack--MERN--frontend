### See backend here: https://github.com/BrendanDasilva/fullstackdev-I--backend

# **COMP3123 Full Stack Development - Frontend**

## **Project Overview**
This project is the **frontend** for the **COMP3123 Full Stack Development** assignment. It is built using **React.js** and provides a user-friendly interface for managing users and employees. The frontend communicates with the backend API using **Axios** for HTTP requests.

The application supports:
- **User Authentication** (Signup, Login, JWT-based authentication)
- **Employee Management** (CRUD operations on employee data)
- **Navigation and UI Components** (Navbar, Forms, Lists)

## **Features**
### **User Management**
✅ User signup and login with JWT authentication  
✅ Persistent authentication using local storage  
✅ Secure login with protected routes  

### **Employee Management**
✅ Retrieve and display a list of employees  
✅ Add a new employee  
✅ View employee details  
✅ Update employee details  
✅ Delete an employee  
✅ Search employees by **department** or **position**  

## **Technologies Used**
- **Frontend Framework:** React.js (Vite)
- **State Management:** useState, useEffect (React Hooks)
- **Routing:** React Router
- **API Calls:** Axios (with `axiosConfig.js` for base URL handling)
- **Styling:** CSS
- **Authentication:** JWT stored in local storage

## **Installation & Setup**
### **1. Clone the Repository**
```sh
git clone https://github.com/your-repository-link.git
cd your-repository-folder
```

### **2. Install Dependencies**
```sh
npm install
```

### **3. Setup Environment Variables**
Create a `.env` file in the root directory and define the following:
```sh
REACT_APP_BACKEND_URL=http://localhost:3000/api/v1
```

### **4. Run the Frontend**
```sh
npm run dev
```
The frontend should now be running on `http://localhost:5173`.

---

## **Folder Structure**
```
📂 project-root/
├── 📂 src/
│   ├── 📂 components/          # UI components
│   │   ├── AddEmployee.jsx
│   │   ├── EmployeeDetails.jsx
│   │   ├── EmployeeList.jsx
│   │   ├── UpdateEmployee.jsx
│   │   ├── Navbar.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   ├── App.jsx                 # Main application component
│   ├── index.js                # React entry point
│   ├── axiosConfig.js          # Axios base URL configuration
├── 📂 public/                   # Static assets
├── 📂 styles/                   # CSS files
├── package.json                 # Dependencies
├── .env.example                 # Example environment file
```

---

## **API Integration**
This frontend interacts with the backend API through **Axios**. The base URL is defined in `axiosConfig.js`:
```js
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
```

All API requests are made using `apiClient`, ensuring a centralized configuration for base URLs and headers.

---

## **Future Enhancements**
🔹 Improve UI styling with a design library (e.g., Material-UI, TailwindCSS)  
🔹 Implement role-based authentication (Admin/User)  
🔹 Add pagination for employee list  
🔹 Enhance error handling with better user feedback  

---

## **Contributors**
- **Brendan Dasilva** - *Full Stack Developer*

