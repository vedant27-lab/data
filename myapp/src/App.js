import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [student, setStudent] = useState({
    name: '',
    age: '',
    studentClass: '',
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/students', student);
      alert('Student added successfully');
      console.log(response.data);
    } catch (error) {
      console.error('Error adding student', error);
    }
  };

  return (
    <div>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={student.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Age:
          <input type="number" name="age" value={student.age} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Class:
          <input type="text" name="studentClass" value={student.studentClass} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

export default App;
