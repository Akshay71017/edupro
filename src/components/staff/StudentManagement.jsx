import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserPlus, 
  faTrash, 
  faEye, 
  faEyeSlash,
  faCheckCircle,
  faPlus 
} from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: grid;
  gap: 2rem;
`;

const StatsCard = styled(motion.div)`
  background: rgba(19, 47, 76, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);

  h2 {
    color: var(--text-secondary);
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 3rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }
`;

const StudentList = styled.div`
  display: grid;
  gap: 1rem;
`;

const StudentCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  padding-right: 3rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;

  h3 {
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }

  .actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
`;

const AddButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, var(--accent-color), var(--highlight));
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
`;

const DeleteButton = styled(motion.button)`
  background: none;
  border: none;
  color: var(--error);
  cursor: pointer;
  padding: 0.5rem;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 1rem;
  opacity: 0.7;
  z-index: 1;

  &:hover {
    opacity: 1;
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
  overflow-y: auto;
`;

const ModalContent = styled(motion.div)`
  background: var(--primary-dark);
  padding: 2.5rem;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-height: 90vh;
  overflow-y: auto;

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--accent-color);
    border-radius: 4px;
  }

  h2 {
    color: var(--text-primary);
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.2rem;
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

  &::placeholder {
    color: var(--text-secondary);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;

  button {
    flex: 1;
  }
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

const ErrorMessage = styled.p`
  color: var(--error);
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const SubjectModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

const SubjectModalContent = styled(motion.div)`
  background: var(--primary-dark);
  padding: 2.5rem;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const SubjectList = styled.div`
  margin-top: 1rem;
  display: grid;
  gap: 0.5rem;
`;

const SubjectItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  color: var(--text-primary);
`;

const AddSubjectButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: 1px solid var(--accent-color);
  color: var(--accent-color);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  margin-top: 1rem;

  &:hover {
    background: rgba(33, 150, 243, 0.1);
  }
`;

const StudentManagement = () => {
  const [students, setStudents] = useState(() => {
    return JSON.parse(localStorage.getItem('students')) || [];
  });
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNo: '',
    password: '',
    year: '',
    branch: '',
    section: ''
  });
  const [error, setError] = useState('');
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newSubject, setNewSubject] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const rollNoExists = students.some(student => student.rollNo === formData.rollNo);
    
    if (rollNoExists) {
      setError('A student with this roll number already exists');
      return;
    }

    const newStudent = {
      ...formData,
      id: Date.now(),
      joinDate: new Date().toISOString()
    };

    const updatedStudents = [...students, newStudent];
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    setStudents(updatedStudents);
    setFormData({
      name: '',
      email: '',
      rollNo: '',
      password: '',
      year: '',
      branch: '',
      section: ''
    });
    setShowModal(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      const updatedStudents = students.filter(student => student.id !== id);
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      setStudents(updatedStudents);
    }
  };

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!newSubject.trim()) return;

    const updatedStudents = students.map(student => {
      if (student.id === selectedStudent.id) {
        return {
          ...student,
          subjects: [...(student.subjects || []), newSubject]
        };
      }
      return student;
    });

    localStorage.setItem('students', JSON.stringify(updatedStudents));
    setStudents(updatedStudents);
    setNewSubject('');
  };

  const handleRemoveSubject = (studentId, subjectToRemove) => {
    const updatedStudents = students.map(student => {
      if (student.id === studentId) {
        return {
          ...student,
          subjects: student.subjects.filter(subject => subject !== subjectToRemove)
        };
      }
      return student;
    });

    localStorage.setItem('students', JSON.stringify(updatedStudents));
    setStudents(updatedStudents);
  };

  return (
    <Container>
      <StatsCard>
        <h2>Total Students</h2>
        <p>{students.length}</p>
        <AddButton
          onClick={() => setShowModal(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FontAwesomeIcon icon={faUserPlus} />
          Add New Student
        </AddButton>
      </StatsCard>

      <StudentList>
        {students.map((student, index) => (
          <StudentCard
            key={student.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <DeleteButton
              onClick={() => handleDelete(student.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </DeleteButton>
            <h3>{student.name}</h3>
            <p>Roll No: {student.rollNo}</p>
            <p>{student.year} Year - {student.branch} - Section {student.section}</p>
            <p>Email: {student.email}</p>
            <div className="actions">
              <AddSubjectButton
                onClick={() => {
                  setSelectedStudent(student);
                  setShowSubjectModal(true);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FontAwesomeIcon icon={faPlus} />
                Manage Subjects
              </AddSubjectButton>
            </div>
            {student.subjects && student.subjects.length > 0 && (
              <SubjectList>
                {student.subjects.map(subject => (
                  <SubjectItem key={subject}>
                    {subject}
                    <DeleteButton
                      onClick={() => handleRemoveSubject(student.id, subject)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </DeleteButton>
                  </SubjectItem>
                ))}
              </SubjectList>
            )}
          </StudentCard>
        ))}
      </StudentList>

      {showModal && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 style={{ marginBottom: '1.5rem' }}>Add New Student</h2>
            <Form onSubmit={handleSubmit}>
              <Input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                name="rollNo"
                placeholder="Roll Number"
                value={formData.rollNo}
                onChange={handleChange}
                required
                style={{ borderColor: error ? 'var(--error)' : undefined }}
              />
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <Input
                name="year"
                type="number"
                placeholder="Year (1-4)"
                min="1"
                max="4"
                value={formData.year}
                onChange={handleChange}
                required
              />
              <Input
                name="branch"
                placeholder="Branch (e.g., CSE, ECE)"
                value={formData.branch}
                onChange={handleChange}
                required
              />
              <Input
                name="section"
                placeholder="Section (A/B/C)"
                value={formData.section}
                onChange={handleChange}
                required
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <ButtonGroup>
                <AddButton
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  Cancel
                </AddButton>
                <AddButton type="submit">
                  Add Student
                </AddButton>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}

      {showToast && (
        <Toast
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          <FontAwesomeIcon icon={faCheckCircle} />
          Student added successfully!
        </Toast>
      )}

      {showSubjectModal && (
        <SubjectModal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <SubjectModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 style={{ marginBottom: '1.5rem' }}>
              Manage Subjects for {selectedStudent?.name}
            </h2>
            <Form onSubmit={handleAddSubject}>
              <Input
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="Enter subject name"
                required
              />
              <ButtonGroup>
                <AddButton
                  type="button"
                  onClick={() => setShowSubjectModal(false)}
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  Cancel
                </AddButton>
                <AddButton type="submit">
                  Add Subject
                </AddButton>
              </ButtonGroup>
            </Form>
            {selectedStudent?.subjects && selectedStudent.subjects.length > 0 && (
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>Current Subjects</h3>
                <SubjectList>
                  {selectedStudent.subjects.map(subject => (
                    <SubjectItem key={subject}>
                      {subject}
                      <DeleteButton
                        onClick={() => handleRemoveSubject(selectedStudent.id, subject)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </DeleteButton>
                    </SubjectItem>
                  ))}
                </SubjectList>
              </div>
            )}
          </SubjectModalContent>
        </SubjectModal>
      )}
    </Container>
  );
};

export default StudentManagement; 