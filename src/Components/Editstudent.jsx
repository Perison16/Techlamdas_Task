
import React, { useState } from 'react';

const EditStudent = ({ show, onClose, onUpdate, formData, setFormData, isEditing }) => {
    const [error, setError] = useState("");

    if (!show) return null;
    const formatDateForInput = (displayDate) => {
        if (!displayDate) return "";
        const [day, month, year] = displayDate.split(".");
        return `20${year}-${month}-${day}`; 
      };

    const handleOverlayClick = (e) => {
        if (e.target.className === "sidebar-overlay") {
            onClose();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePercentageChange = (e) => {
        const percentage = Number(e.target.value);
        setFormData((prev) => ({
            ...prev,
            percentage: percentage,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (
            !formData.date||
            !formData.StudentID ||
            !formData.name ||
            !formData.contact ||
            !formData.course ||
            !formData.year
        ) {
            setError("Please fill all required fields marked with *");
            return;
        }

        //student id digit suffix

        const isEligible = formData.percentage >= 30;
        if (!formData.StudentID.startsWith("STU")) {
            formData.StudentID = "STU" + formData.StudentID;
          }

        onUpdate({ ...formData, eligible: isEligible, StudentID:formData.StudentID });
        setError(""); 
        onClose();
    };

    return (
        <>
            <div className="sidebar-overlay" onClick={handleOverlayClick}>
                <div className="sidebar-form">
                    <div className="header">
                        <h3>{isEditing ? "Edit Student" : "Add New Student"}</h3>
                        <button className="close-btn" onClick={onClose}>×</button>
                    </div>

                    <form onSubmit={handleSubmit} className="form">
                        {error && <p className="error-message">{error}</p>}
                      
                        <label>Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date.includes(".") ? formatDateForInput(formData.date) : formData.date}
                                onChange={handleChange}
                                className="input-box"
                                
                         />
                
                        <label>Student ID *</label>
                        <input
                            type="text"
                            name="StudentID"
                            value={formData.StudentID}
                            onChange={handleChange}
                            placeholder="Enter Student ID"
                            className="input-box"
                            maxlength="3"
                            required
                        />

                        <label>Student Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter Name"
                            className="input-box"
                            required
                        />

                        <label>Gender</label>
                        <div className="gender-options">
                            <label>
                                <input

                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={formData.gender === "Male"}
                                    onChange={handleChange}
                                
                                /> Male
                            </label>
                            <label>
                                <input

                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={formData.gender === "Female"}
                                    onChange={handleChange}
                                
                                /> Female
                            </label>
                        </div>

                        <label>Contact Number *</label>
                        <input
                            type="text"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            placeholder="Enter Contact Number"
                            className="input-box"
                            required
                        />

                        <label>Course *</label>
                        <input
                            type="text"
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            placeholder="Enter Course"
                            className="input-box"
                            required
                        />

                        <label>  Year of Study *</label>
                        <select
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="input-box"
                            required
                        >
                            <option value="">Select Year</option>
                            <option value="1st Year">First Year</option>
                            <option value="2nd Year">Second Year</option>
                            <option value="3rd Year">Third Year</option>
                            <option value="4th Year">Fourth Year</option>
                        </select>

                        <label>Percentage</label>
                        <div className="range-container">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                name="percentage"
                                value={formData.percentage}
                                onChange={handlePercentageChange}
                                className="range-slider"
                            />
                            <span className="percentage-value">{formData.percentage}%</span>
                        </div>

                        <div className="button-group">

                            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                            <button type="submit" className="submit-btn">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>    
    );
};

export default EditStudent;
