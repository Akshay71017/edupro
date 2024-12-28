import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserPlus, 
  faSignOutAlt, 
  faTrash,
  faUsers,
  faHome,
  faEye,
  faEyeSlash,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

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

const StaffSection = styled.div`
  background: rgba(19, 47, 76, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const StaffList = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StaffCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  padding-right: 3rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;

  h3 {
    color: var(--text-primary);
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }

  p {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }
`;

const AddStaffSection = styled.div`
  background: rgba(19, 47, 76, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 600px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--text-primary);
  text-align: center;
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
  width: 100%;
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

const Button = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 12px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  cursor: pointer;
  border: none;
  width: 100%;
  
  ${props => props.primary ? `
    background: linear-gradient(135deg, var(--accent-color), var(--highlight));
    color: white;
  ` : `
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-primary);
  `}
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

const Dashboard = () => {
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState(() => {
    return JSON.parse(localStorage.getItem('staffAccounts')) || [];
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    department: '',
    subject: '',
    qualification: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStaff = {
      ...formData,
      joinDate: new Date().toISOString()
    };

    const updatedStaff = [...staffList, newStaff];
    localStorage.setItem('staffAccounts', JSON.stringify(updatedStaff));
    setStaffList(updatedStaff);
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      department: '',
      subject: '',
      qualification: ''
    });

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleDelete = (email) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      const updatedStaff = staffList.filter(staff => staff.email !== email);
      localStorage.setItem('staffAccounts', JSON.stringify(updatedStaff));
      setStaffList(updatedStaff);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderContent = () => {
    switch(activeView) {
      case 'create':
        return (
          <AddStaffSection>
            <SectionTitle>Add New Staff</SectionTitle>
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
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <Input
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
                required
              />
              <Input
                name="subject"
                placeholder="Subject Specialization"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <Input
                name="qualification"
                placeholder="Qualification"
                value={formData.qualification}
                onChange={handleChange}
                required
              />
              <div style={{ position: 'relative' }}>
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Set Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Button
                  type="button"
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    padding: '0.5rem',
                    background: 'none',
                    width: 'auto'
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </Button>
              </div>
              <Button primary type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <FontAwesomeIcon icon={faUserPlus} />
                Add Staff Member
              </Button>
            </Form>
          </AddStaffSection>
        );
      case 'manage':
        return (
          <StaffSection>
            <SectionTitle>Staff Members ({staffList.length})</SectionTitle>
            <StaffList>
              {staffList.map((staff, index) => (
                <StaffCard
                  key={staff.email}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <DeleteButton
                    onClick={() => handleDelete(staff.email)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </DeleteButton>
                  <h3>{staff.name}</h3>
                  <p>{staff.email}</p>
                  <p>{staff.department} - {staff.subject}</p>
                  <p>{staff.qualification}</p>
                </StaffCard>
              ))}
            </StaffList>
          </StaffSection>
        );
      default:
        return (
          <div>
            <SectionTitle>Dashboard Overview</SectionTitle>
            <StaffSection>
              <h3>Quick Stats</h3>
              <p>Total Staff Members: {staffList.length}</p>
            </StaffSection>
          </div>
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
          active={activeView === 'create'}
          onClick={() => setActiveView('create')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FontAwesomeIcon icon={faUserPlus} />
          Create Staff
        </NavItem>
        <NavItem 
          active={activeView === 'manage'}
          onClick={() => setActiveView('manage')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FontAwesomeIcon icon={faUsers} />
          Manage Staff
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

      {showToast && (
        <Toast
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          <FontAwesomeIcon icon={faCheckCircle} />
          Staff member added successfully!
        </Toast>
      )}
    </DashboardContainer>
  );
};

export default Dashboard; 