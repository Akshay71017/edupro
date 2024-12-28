import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faCalendar } from '@fortawesome/free-solid-svg-icons';

const ResultsContainer = styled(motion.div)`
  display: grid;
  gap: 1.5rem;
`;

const ResultCard = styled(motion.div)`
  background: rgba(19, 47, 76, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  h3 {
    color: var(--text-primary);
    font-size: 1.2rem;
  }

  .date {
    color: var(--text-secondary);
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .marks {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .score {
    font-size: 2rem;
    font-weight: 600;
    color: ${props => {
      if (props.marks >= 75) return '#4CAF50';
      if (props.marks >= 60) return '#FFC107';
      if (props.marks >= 35) return '#FF9800';
      return '#F44336';
    }};
  }

  .grade {
    padding: 0.5rem 1rem;
    border-radius: 8px;
    background: ${props => {
      if (props.marks >= 75) return 'rgba(76, 175, 80, 0.1)';
      if (props.marks >= 60) return 'rgba(255, 193, 7, 0.1)';
      if (props.marks >= 35) return 'rgba(255, 152, 0, 0.1)';
      return 'rgba(244, 67, 54, 0.1)';
    }};
    color: ${props => {
      if (props.marks >= 75) return '#4CAF50';
      if (props.marks >= 60) return '#FFC107';
      if (props.marks >= 35) return '#FF9800';
      return '#F44336';
    }};
  }
`;

const NoResults = styled.div`
  text-align: center;
  color: var(--text-secondary);
  padding: 3rem;
  background: rgba(19, 47, 76, 0.4);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
`;

const Results = () => {
  const studentData = JSON.parse(localStorage.getItem('currentStudent'));
  const results = studentData?.results || [];

  const getGrade = (marks) => {
    if (marks >= 75) return 'Distinction';
    if (marks >= 60) return 'First Class';
    if (marks >= 35) return 'Pass';
    return 'Fail';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <ResultsContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2>My Results</h2>

      {results.length > 0 ? (
        results.map((result, index) => (
          <ResultCard
            key={`${result.subject}-${result.date}`}
            marks={result.marks}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="header">
              <h3>{result.subject}</h3>
              <span className="date">
                <FontAwesomeIcon icon={faCalendar} />
                {formatDate(result.date)}
              </span>
            </div>
            <div className="marks">
              <span className="score">{result.marks}/100</span>
              <span className="grade">{getGrade(result.marks)}</span>
            </div>
          </ResultCard>
        ))
      ) : (
        <NoResults>
          <FontAwesomeIcon icon={faTrophy} />
          <p>No results available yet</p>
        </NoResults>
      )}
    </ResultsContainer>
  );
};

export default Results; 