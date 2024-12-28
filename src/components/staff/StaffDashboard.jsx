import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSignOutAlt, 
  faHome,
  faGraduationCap,
  faClipboardList
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import StudentManagement from './StudentManagement';
import ResultsManagement from './ResultsManagement';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: var(--primary-dark);
  display: flex;
`;

const Sidebar = styled.div`
  width: 280px;
  background: rgba(19, 47, 76, 0.4);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  height: 100vh;
  position: fixed;
`;

const Logo = styled.h1`
  font-size: 2rem;
  background: linear-gradient(135deg, var(--accent-color), var(--highlight));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 3rem;
`;

const NavItem = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 12px;
  cursor: pointer;
  color: ${props => props.active ? 'var(--accent-color)' : 'var(--text-secondary)'};
  background: ${props => props.active ? 'rgba(33, 150, 243, 0.1)' : 'transparent'};
  border: 1px solid ${props => props.active ? 'var(--accent-color)' : 'transparent'};

  &:hover {
    background: rgba(33, 150, 243, 0.1);
    color: var(--accent-color);
  }

  svg {
    margin-right: 1rem;
    width: 20px;
  }
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 280px;
  padding: 2rem;
`;

const WelcomeCard = styled(motion.div)`
  background: rgba(19, 47, 76, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;

  h2 {
    color: var(--text-primary);
    margin-bottom: 1rem;
  }

  p {
    color: var(--text-secondary);
  }
`;

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = React.useState('dashboard');
  const staffData = JSON.parse(localStorage.getItem('currentStaff'));

  const renderContent = () => {
    switch(activeView) {
      case 'students':
        return <StudentManagement />;
      case 'results':
        return <ResultsManagement />;
      default:
        return (
          <WelcomeCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2>Welcome back, {staffData?.name}</h2>
            <p>Department: {staffData?.department}</p>
            <p>Subject: {staffData?.subject}</p>
          </WelcomeCard>
        );
    }
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <Logo>EduPro</Logo>
        <NavItem 
          active={activeView === 'dashboard'}
          onClick={() => setActiveView('dashboard')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FontAwesomeIcon icon={faHome} />
          Dashboard
        </NavItem>
        <NavItem 
          active={activeView === 'students'}
          onClick={() => setActiveView('students')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FontAwesomeIcon icon={faGraduationCap} />
          Students
        </NavItem>
        <NavItem 
          active={activeView === 'results'}
          onClick={() => setActiveView('results')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FontAwesomeIcon icon={faClipboardList} />
          Results
        </NavItem>
        <NavItem 
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ marginTop: 'auto' }}
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          Logout
        </NavItem>
      </Sidebar>

      <MainContent>
        {renderContent()}
      </MainContent>
    </DashboardContainer>
  );
};

export default StaffDashboard; 