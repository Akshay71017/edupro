import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Container = styled(motion.div)`
  display: grid;
  gap: 2rem;
`;

const SearchSection = styled.div`
  background: rgba(19, 47, 76, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 2.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: var(--text-primary);
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--accent-color);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
`;

const StudentDetails = styled.div`
  background: rgba(19, 47, 76, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 1rem;

  h3 {
    color: var(--text-primary);
    margin-bottom: 1rem;
  }

  p {
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
  }
`;

const ResultForm = styled.form`
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SubjectSelect = styled.select`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: var(--text-primary);
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;

  option {
    background: var(--primary-dark);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: var(--text-primary);
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
`;

const Button = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, var(--accent-color), var(--highlight));
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  cursor: pointer;
`;

const Toast = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: rgba(0, 183, 74, 0.9);
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

const ResultsManagement = () => {
  const [rollNo, setRollNo] = useState('');
  const [student, setStudent] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [marks, setMarks] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const foundStudent = students.find(s => s.rollNo === rollNo);
    setStudent(foundStudent);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!student || !selectedSubject || !marks) return;

    const students = JSON.parse(localStorage.getItem('students')) || [];
    const updatedStudents = students.map(s => {
      if (s.id === student.id) {
        return {
          ...s,
          results: [
            ...(s.results || []),
            {
              subject: selectedSubject,
              marks: parseInt(marks),
              date: new Date().toISOString()
            }
          ]
        };
      }
      return s;
    });

    localStorage.setItem('students', JSON.stringify(updatedStudents));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    
    // Reset form
    setSelectedSubject('');
    setMarks('');
  };

  return (
    <Container>
      <SearchSection>
        <form onSubmit={handleSearch} style={{ position: 'relative' }}>
          <SearchIcon>
            <FontAwesomeIcon icon={faSearch} />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Enter student roll number"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
          />
        </form>

        {student && (
          <StudentDetails>
            <h3>{student.name}</h3>
            <p>Roll Number: {student.rollNo}</p>
            <p>Year: {student.year} | Branch: {student.branch} | Section: {student.section}</p>
            
            <ResultForm onSubmit={handleSubmit}>
              <SubjectSelect
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                required
              >
                <option value="">Select Subject</option>
                {student.subjects?.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </SubjectSelect>

              <Input
                type="number"
                placeholder="Enter marks"
                min="0"
                max="100"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                required
              />

              <Button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FontAwesomeIcon icon={faPlus} />
                Add Result
              </Button>
            </ResultForm>
          </StudentDetails>
        )}
      </SearchSection>

      {showToast && (
        <Toast
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          <FontAwesomeIcon icon={faCheckCircle} />
          Result added successfully!
        </Toast>
      )}
    </Container>
  );
};

export default ResultsManagement; 