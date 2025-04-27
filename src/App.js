import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router, Routes, and Route
import Sidebar from './Components/Sidebar';
import Topbar from './Components/Topbar';
import StudentPage from './Components/Studentpage';
import './Components/Style.css';

function App() {
  const [students, setStudents] = useState([]); // Initial state for students

  return (
    <Router>
      <div className="main-container">
        <Sidebar />
        <div className="content-area">
          <Topbar />
          <Routes>
            {/* Define the route for the student page */}
            <Route
              path="/"
              element={<StudentPage students={students} setStudents={setStudents} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
