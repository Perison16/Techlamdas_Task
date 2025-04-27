import React from 'react';
import { IoTrashOutline } from "react-icons/io5"
import { FaEdit } from 'react-icons/fa';

const StudentTable = ({ students, onEdit, onDelete }) => {
    return (

        <>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>Date</th>
                            <th>Student ID</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Contact</th>
                            <th>Course</th>
                            <th>Year</th>
                            <th>%</th>
                            <th>Eligibility</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((stu, i) => (
                            <tr key={stu.id}>
                                <td>{i + 1}</td>
                                <td>{stu.date}</td>
                                <td>{stu.StudentID}</td>
                                <td>{stu.name}</td>
                                <td>{stu.gender}</td>
                                <td>{stu.contact}</td>
                                <td>{stu.course}</td>
                                <td>{stu.year}</td>
                                <td>{stu.percentage}%</td>
                                <td style={{ color: stu.eligible ? "green" : "red" }}>
                                    {stu.percentage < 30 ? 'Not Eligible' : 'Eligible'}
                                </td>
                                <td>
                                    <FaEdit
                                        onClick={() => onEdit(stu)}
                                        color="#007bff"
                                        size={18}
                                        style={{ cursor: 'pointer', marginRight: '10px' }}
                                    />
                                    <IoTrashOutline
                                        onClick={() => onDelete(stu)}
                                        color="#dc3545"
                                        size={18}
                                        style={{ cursor: 'pointer', marginRight: '10px' }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>    
    );
};

export default StudentTable;
