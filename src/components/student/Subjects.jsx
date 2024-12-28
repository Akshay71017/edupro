import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

const SubjectsContainer = styled(motion.div)`
  display: grid;
  gap: 1.5rem;
`;

const SubjectCard = styled(motion.div)`
  background: rgba(19, 47, 76, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;

  .icon {
    background: rgba(33, 150, 243, 0.1);
    color: var(--accent-color);
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h3 {
    color: var(--text-primary);
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
  }
`;

const NoSubjects = styled.div`
  text-align: center;
  color: var(--text-secondary);
  padding: 2rem;
  background: rgba(19, 47, 76, 0.4);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Subjects = () => {
  const studentData = JSON.parse(localStorage.getItem('currentStudent'));
  const subjects = studentData?.subjects || [];

  return (
    <SubjectsContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2>My Subjects</h2>
      
      {subjects.length > 0 ? (
        subjects.map((subject, index) => (
          <SubjectCard
            key={subject}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="icon">
              <FontAwesomeIcon icon={faBook} />
            </div>
            <div>
              <h3>{subject}</h3>
            </div>
          </SubjectCard>
        ))
      ) : (
        <NoSubjects>
          <FontAwesomeIcon icon={faBook} style={{ fontSize: '2rem', marginBottom: '1rem' }} />
          <p>No subjects assigned yet</p>
        </NoSubjects>
      )}
    </SubjectsContainer>
  );
};

export default Subjects; 