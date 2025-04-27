
import React, { useState, useEffect, useCallback } from 'react';
import StudentTable from './StudentTable';
import Editstudent from './Editstudent';
import Deletestudent from './Deletestudent';
import studentsData from '../Data/Studentdata';
import { FaSearch } from 'react-icons/fa';

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);


  //date filter method
  const filterStudentsByDate = useCallback ( () => {
    if (!startDate || !endDate) {
      setFilteredStudents([]);
      return;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);

    const filtered = students.filter((student) => {
      const [day, month, year] = student.date.split(".");
      const formattedDate = new Date(`20${year}-${month}-${day}`);
      return formattedDate >= start && formattedDate <= end;
    });

    setFilteredStudents(filtered);
  },[startDate, endDate, students]);

  useEffect(() => {
    filterStudentsByDate();
  },[filterStudentsByDate] );


  useEffect(() => {
    // Update eligible dynamically 
    const updatedStudents = studentsData.map((student) => ({
      ...student,
      eligible: student.percentage >= 30,
    }));
    setStudents(updatedStudents);
    setFilteredStudents(updatedStudents);
  }, []);

  useEffect(() => {
    //  students or searchTerm changes
    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.StudentID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.contact.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  const handleEdit = (student) => {

    setEditData(student);
    setIsEditing(true);
    setIsEditOpen(true);
  };

  const handleDelete = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };



  const handleUpdateStudent = (updatedStudent) => {
    updatedStudent.eligible = updatedStudent.percentage >= 30; // ✅ Update eligibility dynamically

    // Format date 2025-04-13 --> 13.04.25 before saving

    if (updatedStudent.date && updatedStudent.date.includes("-")) {
      const [year, month, day] = updatedStudent.date.split("-");
      const shortYear = year.slice(2);
      updatedStudent.date = `${day}.${month}.${shortYear}`;
    }

    if (isEditing) {
      // Editing existing
      setStudents((prev) =>
        prev.map((std) => (std.id === updatedStudent.id ? updatedStudent : std))
      );
    } else {
      // Adding new
      const newStudent = { ...updatedStudent, id: Date.now() };
      setStudents((prev) => [...prev, newStudent]);
    }

    setIsEditOpen(false);
  };

  const handleAddNew = () => {
    setEditData({
      id: "",
      date: "",
      StudentID: "",
      name: "",
      gender: "",
      contact: "",
      course: "",
      year: "",
      percentage: 0,
      eligible: false,
    });
    setIsEditOpen(true);
    setIsEditing(false);
  };

  return (
    <>
      <div className="container">
        <div className="controls-row">
          <div className="left-section">
            <h3>All Students</h3>
            <div className="search-container">
              {searchTerm === "" && <FaSearch className="search-icon" />}

              <input
                type="search"
                placeholder="Search..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="right-section">
            <input
              type={startDate ? "date" : "text"}
              placeholder="From Date"
              value={startDate}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = "text";
              }}
              onChange={(e) => setStartDate(e.target.value)}
              className="date-input"
            />
            <input
              type={endDate ? "date" : "text"}
              placeholder="To Date"
              value={endDate}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = "text";
              }}
              onChange={(e) => setEndDate(e.target.value)}
              className="date-input"
            />
            <button className="add-new-btn" onClick={handleAddNew}>
              + Add New
            </button>
          </div>
        </div>

        {/* Table with filtered students */}
        <StudentTable
          students={filteredStudents.length > 0 ? filteredStudents : students}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <Editstudent
          show={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onUpdate={handleUpdateStudent}
          formData={editData}
          setFormData={setEditData}
          isEditing={isEditing}
        />

        {showModal && (
          <Deletestudent
            student={selectedStudent}
            onClose={() => setShowModal(false)}
            onConfirm={() => {
              setStudents(students.filter((s) => s.id !== selectedStudent.id));
              setShowModal(false);
            }}
          />
        )}
      </div>
    </>  
  );
};

export default StudentPage;
